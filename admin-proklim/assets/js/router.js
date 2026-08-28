(function () {
  "use strict";

  function segmenAktif() {
    var bagian = (location.hash.replace(/^#\/?/, "").trim()).split("/");
    return { menuId: bagian[0] || window.MENU[0].id, subId: bagian[1] || null };
  }

  function tandaiMenuAktif(menuId) {
    document.querySelectorAll(".sidebar nav a").forEach(function (a) {
      a.classList.toggle("aktif", a.dataset.menu === menuId);
    });
  }

  async function gambarUlang() {
    var seg = segmenAktif();
    var item = window.MENU.find(function (m) { return m.id === seg.menuId; }) || window.MENU[0];
    tandaiMenuAktif(item.id);

    document.getElementById("judul-halaman").textContent = item.label;

    var wadah = document.getElementById("konten-halaman");
    if (item.tipe === "halaman") {
      await window.Halaman.generik.render(wadah, item.halaman, seg.subId, item.id);
    } else if (window.Halaman[item.tipe]) {
      await window.Halaman[item.tipe].render(wadah);
    } else {
      wadah.innerHTML = '<div class="kosong">Halaman tidak ditemukan.</div>';
    }
  }

  window.Router = { mulai: function () { gambarUlang(); window.addEventListener("hashchange", gambarUlang); } };
})();
