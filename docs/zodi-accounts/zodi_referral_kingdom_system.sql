-- ============================================================
-- ZODI REFERRAL SYSTEM — the Animal Kingdom / Awakened State
-- Applied to the shared Supabase project on 2026-07-09 as
-- migration "zodi_referral_kingdom_system". Kept here so the
-- backend travels with the repo. Additive only; idempotent.
-- Reuses the existing zodi.internal GUC guard convention.
-- ============================================================

-- 1) Profile columns (zodi_profiles is public-read: only share-safe fields here)
alter table public.zodi_profiles
  add column if not exists referral_code text,
  add column if not exists referral_count int not null default 0,
  add column if not exists awakened_unlocked boolean not null default false,
  add column if not exists awakened_unlocked_at timestamptz;
create unique index if not exists zodi_profiles_referral_code_key
  on public.zodi_profiles (referral_code);

-- 2) Private per-user data (NOT public-read: birth details + pending ref)
create table if not exists public.zodi_private (
  profile_id uuid primary key references public.zodi_profiles(id) on delete cascade,
  pending_ref_code text,
  birth_month int check (birth_month between 1 and 12),
  birth_day   int check (birth_day between 1 and 31),
  birth_year  int check (birth_year between 1850 and 2100),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.zodi_private enable row level security;
drop policy if exists zodi_private_select_own on public.zodi_private;
create policy zodi_private_select_own on public.zodi_private for select
  using (profile_id in (select id from public.zodi_profiles where user_id = auth.uid()));
drop policy if exists zodi_private_insert_own on public.zodi_private;
create policy zodi_private_insert_own on public.zodi_private for insert
  with check (profile_id in (select id from public.zodi_profiles where user_id = auth.uid()));
drop policy if exists zodi_private_update_own on public.zodi_private;
create policy zodi_private_update_own on public.zodi_private for update
  using (profile_id in (select id from public.zodi_profiles where user_id = auth.uid()))
  with check (profile_id in (select id from public.zodi_profiles where user_id = auth.uid()));

-- 3) Referrals: the authoritative record of who arrived through whom.
--    One credit per referred profile, ever. Writes only via SECURITY DEFINER.
create table if not exists public.zodi_referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.zodi_profiles(id) on delete cascade,
  referred_id uuid not null unique references public.zodi_profiles(id) on delete cascade,
  referral_code text,
  status text not null default 'account_created',
  created_at timestamptz not null default now(),
  check (referrer_id <> referred_id)
);
create index if not exists zodi_referrals_referrer_idx on public.zodi_referrals (referrer_id);
alter table public.zodi_referrals enable row level security;
drop policy if exists zodi_referrals_select_own on public.zodi_referrals;
create policy zodi_referrals_select_own on public.zodi_referrals for select
  using (
    referrer_id in (select id from public.zodi_profiles where user_id = auth.uid())
    or referred_id in (select id from public.zodi_profiles where user_id = auth.uid())
  );
-- no insert/update/delete policies: deny by default

-- 4) Awakening rewards
create table if not exists public.zodi_awakening_rewards (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.zodi_profiles(id) on delete cascade,
  reward_key text not null,
  unlocked_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  unique (profile_id, reward_key)
);
alter table public.zodi_awakening_rewards enable row level security;
drop policy if exists zodi_rewards_select_own on public.zodi_awakening_rewards;
create policy zodi_rewards_select_own on public.zodi_awakening_rewards for select
  using (profile_id in (select id from public.zodi_profiles where user_id = auth.uid()));
-- no insert/update/delete policies: deny by default

-- 5) Guard the new profile columns from direct client updates.
--    Same shape as zodi_protect_karma: revert unless zodi.internal = 'on'.
create or replace function public.zodi_protect_referrals()
returns trigger
language plpgsql security definer set search_path to 'public'
as $$
begin
  if coalesce(current_setting('zodi.internal', true), '') <> 'on' then
    new.referral_code        := old.referral_code;
    new.referral_count       := old.referral_count;
    new.awakened_unlocked    := old.awakened_unlocked;
    new.awakened_unlocked_at := old.awakened_unlocked_at;
  end if;
  return new;
end $$;
drop trigger if exists zodi_protect_referrals_t on public.zodi_profiles;
create trigger zodi_protect_referrals_t before update on public.zodi_profiles
  for each row when (pg_trigger_depth() = 0) execute function public.zodi_protect_referrals();

-- 6) Referral code generator (definer-only; never exposed to clients directly)
create or replace function public.zodi_generate_referral_code(p_profile_id uuid)
returns text
language plpgsql security definer set search_path to 'public'
as $$
declare
  v_base text; v_code text; v_suffix text;
  v_alpha text := 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  v_len int; i int; v_try int := 0;
begin
  select case
           when nullif(trim(primal_name), '') is not null
           then trim(both '-' from upper(regexp_replace(trim(primal_name), '[^A-Za-z]+', '-', 'g')))
           else 'ZODI'
         end
    into v_base
    from zodi_profiles where id = p_profile_id;
  if v_base is null then return null; end if;
  if v_base = '' then v_base := 'ZODI'; end if;
  v_len := case when v_base = 'ZODI' then 6 else 4 end;
  perform set_config('zodi.internal', 'on', true);
  loop
    v_try := v_try + 1;
    v_suffix := '';
    for i in 1..v_len loop
      v_suffix := v_suffix || substr(v_alpha, 1 + floor(random() * 30)::int, 1);
    end loop;
    v_code := v_base || '-' || v_suffix;
    begin
      update zodi_profiles set referral_code = v_code
        where id = p_profile_id and referral_code is null;
      exit;
    exception when unique_violation then
      if v_try > 20 then v_len := v_len + 1; end if;
    end;
  end loop;
  return (select referral_code from zodi_profiles where id = p_profile_id);
end $$;
revoke all on function public.zodi_generate_referral_code(uuid) from public, anon, authenticated;

-- 7) Stash the ref code at signup (survives cross-device email confirmation).
--    Replaces zodi_handle_new_user: same behavior + zodi_private row with pending ref.
create or replace function public.zodi_handle_new_user()
returns trigger
language plpgsql security definer set search_path to 'public'
as $$
declare pid uuid; v_ref text;
begin
  perform set_config('zodi.internal', 'on', true);
  insert into public.zodi_profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1), 'Unnamed Spirit'))
  on conflict (user_id) do nothing
  returning id into pid;
  if pid is not null then
    insert into public.zodi_karma_events (profile_id, kind, amount, meta)
      values (pid, 'account_created', 1000, '{}');
    update public.zodi_profiles set zodi_karma = zodi_karma + 1000 where id = pid;
    v_ref := upper(trim(coalesce(new.raw_user_meta_data->>'ref', '')));
    if v_ref ~ '^[A-Z0-9-]{4,40}$' then
      insert into public.zodi_private (profile_id, pending_ref_code)
        values (pid, v_ref)
        on conflict (profile_id) do update set pending_ref_code = excluded.pending_ref_code;
    end if;
  end if;
  return new;
end $$;

-- 8) The claim: attach the caller to their referrer. Idempotent, race-safe.
create or replace function public.zodi_claim_referral(p_ref_code text default null)
returns jsonb
language plpgsql security definer set search_path to 'public'
as $$
declare
  v_me zodi_profiles%rowtype;
  v_ref zodi_profiles%rowtype;
  v_code text;
  v_confirmed boolean;
  v_count int;
  v_inserted boolean := false;
begin
  if auth.uid() is null then return jsonb_build_object('status','not_signed_in'); end if;
  select * into v_me from zodi_profiles where user_id = auth.uid();
  if not found then return jsonb_build_object('status','no_profile'); end if;

  select email_confirmed_at is not null into v_confirmed from auth.users where id = auth.uid();
  if not coalesce(v_confirmed, false) then return jsonb_build_object('status','unconfirmed'); end if;

  if exists (select 1 from zodi_referrals where referred_id = v_me.id) then
    return jsonb_build_object('status','already_referred');
  end if;

  v_code := upper(trim(coalesce(
    p_ref_code,
    (select pending_ref_code from zodi_private where profile_id = v_me.id)
  )));
  if v_code is null or v_code = '' then return jsonb_build_object('status','no_code'); end if;

  select * into v_ref from zodi_profiles where referral_code = v_code;
  if not found then return jsonb_build_object('status','code_not_found'); end if;
  if v_ref.id = v_me.id then return jsonb_build_object('status','self_referral'); end if;
  if v_ref.user_id is null then return jsonb_build_object('status','code_not_found'); end if;

  perform pg_advisory_xact_lock(hashtext('zodi_ref'), hashtext(v_me.id::text));
  perform set_config('zodi.internal', 'on', true);

  insert into zodi_referrals (referrer_id, referred_id, referral_code)
    values (v_ref.id, v_me.id, v_ref.referral_code)
    on conflict (referred_id) do nothing;
  get diagnostics v_count = row_count;
  v_inserted := v_count > 0;
  if not v_inserted then return jsonb_build_object('status','already_referred'); end if;

  select count(*)::int into v_count from zodi_referrals where referrer_id = v_ref.id;
  update zodi_profiles set referral_count = v_count where id = v_ref.id;

  -- the referrer's earn: an ally joined
  insert into zodi_karma_events (profile_id, kind, amount, meta)
    values (v_ref.id, 'ally_joined', 500, jsonb_build_object('referred_profile', v_me.id));
  update zodi_profiles set zodi_karma = zodi_karma + 500 where id = v_ref.id;

  if v_count >= 5 and not v_ref.awakened_unlocked then
    update zodi_profiles set awakened_unlocked = true, awakened_unlocked_at = now()
      where id = v_ref.id and awakened_unlocked = false;
    insert into zodi_awakening_rewards (profile_id, reward_key, metadata)
      values (v_ref.id, 'awakened_state_referral_5', jsonb_build_object('count', v_count))
      on conflict (profile_id, reward_key) do nothing;
  end if;

  update zodi_private set pending_ref_code = null, updated_at = now()
    where profile_id = v_me.id;

  return jsonb_build_object('status','claimed',
    'referrer', v_ref.display_name, 'referrer_count', v_count);
end $$;
revoke all on function public.zodi_claim_referral(text) from public, anon;
grant execute on function public.zodi_claim_referral(text) to authenticated;

-- 9) One call for the dashboard: my code, my count, my circle.
create or replace function public.zodi_referral_state()
returns jsonb
language plpgsql security definer set search_path to 'public'
as $$
declare v_me zodi_profiles%rowtype; v_referrer text;
begin
  if auth.uid() is null then return jsonb_build_object('status','not_signed_in'); end if;
  select * into v_me from zodi_profiles where user_id = auth.uid();
  if not found then return jsonb_build_object('status','no_profile'); end if;
  if v_me.referral_code is null then
    v_me.referral_code := zodi_generate_referral_code(v_me.id);
  end if;
  select p.display_name into v_referrer
    from zodi_referrals r join zodi_profiles p on p.id = r.referrer_id
    where r.referred_id = v_me.id;
  return jsonb_build_object(
    'status', 'ok',
    'referral_code', v_me.referral_code,
    'referral_count', v_me.referral_count,
    'awakened_unlocked', v_me.awakened_unlocked,
    'awakened_unlocked_at', v_me.awakened_unlocked_at,
    'referred_by_name', v_referrer,
    'circle', coalesce((
      select jsonb_agg(jsonb_build_object(
        'display_name', p.display_name,
        'primal_name', p.primal_name,
        'primal_slug', p.primal_slug,
        'status', r.status,
        'joined_at', r.created_at) order by r.created_at desc)
      from zodi_referrals r join zodi_profiles p on p.id = r.referred_id
      where r.referrer_id = v_me.id), '[]'::jsonb));
end $$;
revoke all on function public.zodi_referral_state() from public, anon;
grant execute on function public.zodi_referral_state() to authenticated;

-- 10) Trigger functions are never meant to be called through the REST RPC
--     surface (applied separately as migration "zodi_lock_trigger_functions").
revoke all on function public.zodi_protect_referrals() from public, anon, authenticated;
revoke all on function public.zodi_protect_karma() from public, anon, authenticated;
revoke all on function public.zodi_handle_new_user() from public, anon, authenticated;
