(function () {
  "use strict";
  var esc = UI.esc;

  function bangunSidebar() {
    var nav = document.getElementById("nav-menu");
    nav.innerHTML = window.MENU.map(function (m) {
      return '<a href="#/' + m.id + '" data-menu="' + m.id + '"><span class="ikon">' + m.ikon + "</span>" + esc(m.label) + "</a>";
    }).join("");
  }

  /* unggah gambar berlaku untuk SEMUA form (situs, artikel, galeri, dan
     tiap bagian halaman) lewat satu pendengar bersama ini */
  function pasangUnggahGambarGlobal() {
    document.addEventListener("change", async function (e) {
      var input = e.target.closest && e.target.closest('input[type=file][data-imgfor]');
      if (!input || !input.files || !input.files[0]) return;
      var idTujuan = input.dataset.imgfor;
      var hidden = document.getElementById(idTujuan);
      var pratinjau = document.getElementById(idTujuan + "-pratinjau");
      var labelAsli = input.disabled;
      input.disabled = true;
      try {
        var url = await Store.uploadGambar(input.files[0]);
        if (hidden) hidden.value = url;
        if (pratinjau) { pratinjau.src = url; pratinjau.style.display = ""; }
        UI.pesan("Gambar berhasil diunggah.", true);
      } catch (err) {
        UI.pesan("Gagal mengunggah gambar: " + err.message, false);
      } finally {
        input.disabled = labelAsli;
      }
    });
  }

  async function mulai() {
    var masuk = await Auth.sedangMasuk();
    if (!masuk) { window.location.href = "/login"; return; }

    bangunSidebar();
    pasangUnggahGambarGlobal();
    UI.pasangRepeaterGlobal();

    document.getElementById("btn-keluar").onclick = function () { Auth.keluar(); };

    if (!location.hash) location.hash = "#/" + window.MENU[0].id;
    window.Router.mulai();
  }

  document.addEventListener("DOMContentLoaded", mulai);
})();
