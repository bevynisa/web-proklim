(function () {
  "use strict";
  var cfg = window.PROKLIM_CONFIG || {};
  var adaKonfigurasi = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  var klien = null;

  if (adaKonfigurasi && window.supabase && typeof window.supabase.createClient === "function") {
    klien = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  } else {
    adaKonfigurasi = false;
  }

  window.SupabaseClient = {
    tersambung: adaKonfigurasi,
    klien: klien,
  };
})();
