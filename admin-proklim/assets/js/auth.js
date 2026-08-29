(function () {
  "use strict";
  var KUNCI_DEMO_SESI = "proklim_admin_demo_sesi";

  function pesanError(error) {
    if (/invalid login credentials/i.test(error.message || "")) {
      return "Email atau kata sandi salah. Coba lagi.";
    }
    return "Tidak bisa masuk: " + error.message;
  }

  var Auth = {
    async masuk(email, sandi) {
      if (!window.SupabaseClient.tersambung) {
        if (!email || !sandi) return { ok: false, pesan: "Isi email dan kata sandi (mode pratinjau — isian bebas)." };
        try { sessionStorage.setItem(KUNCI_DEMO_SESI, "1"); } catch (e) {}
        return { ok: true };
      }
      var hasil = await window.SupabaseClient.klien.auth.signInWithPassword({ email: email, password: sandi });
      if (hasil.error) return { ok: false, pesan: pesanError(hasil.error) };
      return { ok: true };
    },

    async keluar() {
      if (window.SupabaseClient.tersambung) {
        await window.SupabaseClient.klien.auth.signOut();
      } else {
        try { sessionStorage.removeItem(KUNCI_DEMO_SESI); } catch (e) {}
      }
      window.location.href = "/login";
    },

    async sedangMasuk() {
      if (!window.SupabaseClient.tersambung) {
        try { return sessionStorage.getItem(KUNCI_DEMO_SESI) === "1"; } catch (e) { return false; }
      }
      var hasil = await window.SupabaseClient.klien.auth.getSession();
      return !!(hasil.data && hasil.data.session);
    },
  };

  window.Auth = Auth;
})();
