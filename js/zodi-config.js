/* ============================================================
   ZODI CONFIG — the single plug for the accounts + karma backend.
   Currently pointed at the shared Supabase project ("BOBA", tables
   are all zodi_-prefixed). To move to a dedicated project later:
   run the zodi_karma_system migration there, then change these
   two values. Nothing else in the codebase references the backend.
   ============================================================ */
window.ZODI_CONFIG = {
  url: "https://uqefyfqwwkkvydkgepgf.supabase.co",
  anonKey: "sb_publishable_0Y-o-QD73luyTYUcjWRWzQ_7b9ogFLs",
  siteUrl: "https://spirit-omega.vercel.app"
};
