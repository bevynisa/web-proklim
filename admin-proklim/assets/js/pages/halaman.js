(function () {
  "use strict";
  var esc = UI.esc;

  async function render(wadah, halamanId, kunciBlok, menuId) {
    wadah.innerHTML = '<div class="kosong">Memuat...</div>';
    var blokList;
    try {
      blokList = await Store.listKontenHalaman(halamanId);
    } catch (err) {
      wadah.innerHTML = '<div class="kosong">Gagal memuat data: ' + esc(err.message) + '</div>';
      return;
    }

    if (!blokList.length) {
      wadah.innerHTML = '<div class="kosong">Belum ada isi untuk halaman ini.</div>';
      return;
    }

    if (!kunciBlok) {
      renderDaftarKategori(wadah, blokList, menuId);
      return;
    }

    var blok = blokList.find(function (b) { return b.kunci_blok === kunciBlok; });
    if (!blok) {
      wadah.innerHTML = '<div class="kosong">Bagian tidak ditemukan.</div>';
      return;
    }
    renderFormBagian(wadah, blok, menuId);
  }

  function renderDaftarKategori(wadah, blokList, menuId) {
    wadah.innerHTML =
      '<p class="hint" style="margin:-6px 0 14px">Pilih bagian yang mau diubah:</p>' +
      '<div class="daftar-kategori">' +
      blokList.map(function (b) {
        return '<a class="kategori-item" href="#/' + menuId + "/" + esc(b.kunci_blok) + '">' + esc(b.judul_blok) + "</a>";
      }).join("") +
      "</div>";
  }

  function renderFormBagian(wadah, blok, menuId) {
    wadah.innerHTML =
      '<a href="#/' + menuId + '" class="tautan-kembali">← Kembali ke daftar bagian</a>' +
      '<div class="kartu">' +
      '<div class="kartu-judul"><h3>' + esc(blok.judul_blok) + "</h3></div>" +
      '<form onsubmit="return false">' + BlokForms.render(blok) + "</form>" +
      "</div>" +
      '<button class="tombol tombol-utama" id="btn-simpan-blok">Simpan Perubahan</button>';

    document.getElementById("btn-simpan-blok").addEventListener("click", async function () {
      var tombol = this;
      tombol.disabled = true;
      tombol.textContent = "Menyimpan...";
      try {
        var kontenBaru = BlokForms.baca(blok);
        await Store.updateKontenBlok(blok.kunci_blok, kontenBaru);
        blok.konten = kontenBaru;
        UI.pesan("Berhasil disimpan! Perubahan sudah langsung tampil di website.", true);
      } catch (err) {
        UI.pesan("Gagal menyimpan: " + err.message, false);
      } finally {
        tombol.disabled = false;
        tombol.textContent = "Simpan Perubahan";
      }
    });
  }

  window.Halaman = window.Halaman || {};
  window.Halaman.generik = { render: render };
})();
