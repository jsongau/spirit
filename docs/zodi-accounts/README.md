# Zodi accounts: the Animal Kingdom referral system

Shipped 2026-07-09. Five allies who create accounts through your link open the
Awakened State of your animal. This doc is the single reference for how the
system works, what runs where, and what to check when something looks off.

## The rule

Every account gets a readable referral code (`GOLDEN-PHEASANT-7K2Q`, or
`ZODI-XXXXXX` before an animal is saved). The share URL is
`https://www.zodianimal.com/?ref=CODE`, and `?ref=` works on any page.
When five distinct, email-confirmed accounts are created through one person's
link, that person's Awakened State opens: `awakened_unlocked` flips true, a
`zodi_awakening_rewards` row (`awakened_state_referral_5`) is written, and
`/awakened.html` shows the open state. Each ally also earns the referrer
500 Zodi Karma (`ally_joined` event).

## Where things live

Pages: `/dashboard.html` (the kingdom ledger, noindex, signed-in only, redirects
to `/account.html?next=%2Fdashboard.html` when logged out), `/awakened.html`
(public teaser, forming state, open state), `/account.html` (unchanged door;
now shows the invited banner when a ref is pending and forwards to the
dashboard after sign-in). The old `/awakening.html` and `/circle.html` are
unrelated content pages and were not touched.

JS: `js/zodi-referrals.js` (ref capture, claim, `window.ZodiRef`, homepage
"Save this animal" card). `js/zodi-auth.js` gained one thing: the pending ref
code rides into signup metadata so cross-device email confirmations still
credit the ally. CSS: `css/dashboard.css`.

Database: the shared Supabase project the site already uses (`zodi-config.js`
points at it). Everything is `zodi_`-prefixed. The full migration is in
`zodi_referral_kingdom_system.sql` next to this file and has already been
applied. New pieces: columns `referral_code`, `referral_count`,
`awakened_unlocked`, `awakened_unlocked_at` on `zodi_profiles`; tables
`zodi_private` (birth details and the pending ref, readable by the owner
only, never on the public-read profiles table), `zodi_referrals`
(one row per credited ally, `referred_id` unique), `zodi_awakening_rewards`;
functions `zodi_claim_referral(p_ref_code)`, `zodi_referral_state()`,
`zodi_generate_referral_code(profile_id)`; trigger `zodi_protect_referrals_t`
(reverts client edits to the referral columns, same `zodi.internal` flag
convention as `zodi_protect_karma`).

Design decisions worth knowing: `referred_by` is NOT a public column; the
`zodi_referrals` table is the only record of who invited whom, and it is
readable only by the two people involved. Credit requires a confirmed email
(`auth.users.email_confirmed_at`), which Google accounts have automatically.
Codes are compared uppercase. Seed profiles cannot be referrers (no auth user)
and are skipped.

## The claim flow

1. Any page load with `?ref=CODE` stores it at `localStorage.zodi_pending_ref`.
2. Email signup carries the code in metadata; `zodi_handle_new_user` stashes it
   in `zodi_private.pending_ref_code` at profile creation.
3. On the first signed-in session, `zodi-referrals.js` calls
   `zodi_claim_referral`, passing the local code or nothing (the server falls
   back to the stashed one). The RPC is idempotent and race-safe; permanent
   outcomes (`claimed`, `already_referred`, `self_referral`, `code_not_found`,
   `no_code`) settle the matter locally, transient errors retry on the next
   auth event.

## localStorage keys added

`zodi_pending_ref`, `zodi_ref_settled`, `zodi_pending_animal`, `zodi_next`
(post-login destination, whitelisted to relative paths). Existing keys
(`zodi_wandering`, `zodi:home-v2:*`, `primal_oracle_v1`) are untouched.

## Supabase dashboard settings (manual, one time)

1. Auth, URL Configuration: Site URL `https://www.zodianimal.com`. Redirect
   URLs must include `https://www.zodianimal.com/account.html` (already used),
   and add `https://www.zodianimal.com/dashboard.html` and
   `https://www.zodianimal.com/awakened.html`.
2. Auth, Providers, Google: enable, paste the Google Cloud OAuth client ID and
   secret. In Google Cloud Console the authorized redirect URI is
   `https://uqefyfqwwkkvydkgepgf.supabase.co/auth/v1/callback` and the
   authorized origin is `https://www.zodianimal.com`.
3. Confirm "Confirm email" is ON (the credit gate assumes it).

No new environment variables. The publishable key in `js/zodi-config.js` is the
only client credential; no service-role key exists anywhere in the site.

## Manual QA script

Direct signup: open `/account.html`, create an account, confirm the email,
land back signed in, open the dashboard, see 0 of 5 allies and a code like
`ZODI-XXXXXX` (it becomes animal-based after the animal is saved only for
profiles that had none when the code was first minted; codes never change once
minted). Name the animal on the dashboard; the card fills and the profile row
updates.

Referral: copy the invite link from user A's dashboard, open it in a private
window, sign up as B, confirm. A's dashboard shows 1 of 5 and B in the circle;
B's `zodi_referrals` row exists. Open A's own link while signed in as A:
nothing is credited. Reload B and revisit the link: still 1, never 2.

Five: repeat to five confirmed accounts. A's dashboard shows 5 of 5, the
Awakened card CTA changes, `/awakened.html` shows the open state, and
`zodi_profiles.awakened_unlocked` is true with a rewards row.

Also check: `/dashboard.html` logged out redirects to the account door; the
homepage reveal still works with the new "Save this animal" card under it;
no console errors on any of the four pages logged out; mobile drawer opens on
the new pages.

## Known limits, deliberate for now

Same-person multi-email or incognito farming is not blocked client-side
(the confirmed-email gate and Supabase signup rate limits are the dampeners;
`zodi_referrals` keeps referrer ids so clusters can be audited and cleaned
retroactively). The awakened reading itself is a placeholder page. Referral
codes never regenerate to the animal-based form if minted before an animal was
saved. The supabase-js CDN include tracks `@2` rather than a pinned version.

## Added 2026-07-09, later the same day: profiles and the birth record

Accounts now carry a public username (unique, lowercase, 3 to 20 characters)
and a chosen mark (one of twelve medallions in `ZodiRef.AVATARS`), plus a
private first name and last initial. The circle showcase renders each ally as
mark, First name plus initial, @username, animal, and join date; that data
reaches the referrer only through `zodi_referral_state()`.

The dashboard's birth record card stores the full birth moment (date, hour,
minute, birthplace, device timezone) in `zodi_private` and caches it at
localStorage `zodi_birth` via `js/zodi-birth.js`. The three cast tools read
that cache on load and cast automatically when the visitor has no chart of
their own yet: Saju (`SajuStudyChart.save`), Purple Star
(`ZiweiStudyChart.save`), and BaZi (fills the mounted controls and clicks
cast). A chart the visitor already cast always wins. The cache is cleared on
sign out. Known limit: cast pages do not load the auth layer, so the prefill
works on devices where the dashboard has been visited once; a fresh device
needs one dashboard visit to warm the cache.
