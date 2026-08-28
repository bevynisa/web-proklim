(function () {
  "use strict";
  var esc = UI.esc;

  function formIsi(data) {
    data = data || {};
    return (
      '<div class="field"><label>Foto</label>' +
      '<div class="pratinjau-gambar">' +
      (data.file_url ? '<img id="gl-file-pratinjau" src="' + esc(data.file_url) + '">' : '<img id="gl-file-pratinjau" style="display:none">') +
      '<div><input type="file" accept="image/*" data-imgfor="gl-file"><input type="hidden" id="gl-file" value="' + esc(data.file_url || "") + '"></div>' +
      "</div></div>" +
      '<div class="field"><label>Kategori</label><input type="text" id="gl-kategori" value="' + esc(data.kategori || "") + '">' +
      '<p class="hint">Contoh: Adaptasi, Mitigasi, atau Kelembagaan — dipakai untuk mengelompokkan foto.</p></div>' +
      '<div class="field"><label>Judul Foto</label><input type="text" id="gl-judul" value="' + esc(data.judul || "") + '">' +
      '<p class="hint">Judul singkat kegiatan dalam foto.</p></div>' +
      '<div class="field"><label>Keterangan</label><textarea id="gl-keterangan" style="min-height:70px">' + esc(data.keterangan || "") + "</textarea>" +
      '<p class="hint">Penjelasan tambahan, contoh lokasi dan waktu kegiatan.</p></div>'
    );
  }

  function bacaForm() {
    return {
      file_url: UI.nilai("gl-file"),
      kategori: UI.nilai("gl-kategori"),
      judul: UI.nilai("gl-judul"),
      keterangan: UI.nilai("gl-keterangan"),
    };
  }

  function modalEdit(judul, data, onSimpan) {
    var overlay = document.createElement("div");
    overlay.className = "overlay-modal";
    overlay.innerHTML =
      '<div class="kotak-modal" style="max-width:440px">' +
      "<h3>" + esc(judul) + "</h3>" +
      '<form id="form-modal-galeri">' + formIsi(data) +
      '<div class="aksi">' +
      '<button type="button" class="tombol tombol-luar" id="btn-batal-galeri">Batal</button>' +
      '<button type="submit" class="tombol tombol-utama">Simpan</button>' +
      "</div></form></div>";
    document.body.appendChild(overlay);
    overlay.querySelector("#btn-batal-galeri").onclick = function () { overlay.remove(); };
    overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector("#form-modal-galeri").addEventListener("submit", async function (e) {
      e.preventDefault();
      var tombol = e.target.querySelector("button[type=submit]");
      tombol.disabled = true;
      try { await onSimpan(bacaForm()); overlay.remove(); }
      finally { tombol.disabled = false; }
    });
  }

  async function render(wadah) {
    wadah.innerHTML = '<div class="kosong">Memuat...</div>';
    var daftar;
    try {
      daftar = await Store.listGaleri();
    } catch (err) {
      wadah.innerHTML = '<div class="kosong">Gagal memuat data: ' + esc(err.message) + '</div>';
      return;
    }
    var kategori = ["Semua"].concat(Array.from(new Set(daftar.map(function (g) { return g.kategori; }).filter(Boolean))));

    function gambarGrid(list) {
      return list.length
        ? '<div class="grid-galeri">' + list.map(function (g) {
            return '<div class="kartu-foto"><img src="' + esc(g.file_url) + '" alt="">' +
              '<div class="isi"><div class="kategori">' + esc(g.kategori) + '</div>' +
              '<div class="judul">' + esc(g.judul || "(tanpa judul)") + "</div>" +
              '<div class="aksi-baris">' +
              '<button class="tombol tombol-luar tombol-kecil" data-ubah="' + g.id + '">Ubah</button>' +
              '<button class="tombol tombol-bahaya tombol-kecil" data-hapus="' + g.id + '">Hapus</button>' +
              "</div></div></div>";
          }).join("") + "</div>"
        : '<div class="kosong">Belum ada foto pada kategori ini.</div>';
    }

    wadah.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">' +
      '<button class="tombol tombol-utama" id="btn-tambah-galeri">+ Unggah Foto Baru</button>' +
      '<select id="filter-kategori" class="field" style="width:auto;border:1px solid var(--garis);border-radius:9px;padding:8px 12px">' +
      kategori.map(function (k) { return '<option value="' + esc(k) + '">' + esc(k) + "</option>"; }).join("") +
      "</select></div>" +
      '<div id="grid-galeri-wadah">' + gambarGrid(daftar) + "</div>";

    function pasangAksi(list) {
      wadah.querySelectorAll("[data-ubah]").forEach(function (btn) {
        btn.onclick = function () {
          var data = list.find(function (g) { return g.id === btn.dataset.ubah; });
          modalEdit("Ubah Foto", data, async function (baru) {
            try {
              await Store.updateGaleri(data.id, baru);
              UI.pesan("Berhasil disimpan! Perubahan sudah langsung tampil di website.", true);
              render(wadah);
            } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
          });
        };
      });
      wadah.querySelectorAll("[data-hapus]").forEach(function (btn) {
        btn.onclick = async function () {
          var data = list.find(function (g) { return g.id === btn.dataset.hapus; });
          var ok = await UI.konfirmasi("Hapus Foto?", "Foto ini akan dihapus dan langsung hilang dari Galeri website. Yakin?");
          if (!ok) return;
          try {
            await Store.deleteGaleri(data.id);
            UI.pesan("Foto berhasil dihapus.", true);
            render(wadah);
          } catch (err) { UI.pesan("Gagal menghapus: " + err.message, false); }
        };
      });
    }
    pasangAksi(daftar);

    document.getElementById("filter-kategori").onchange = function (e) {
      var v = e.target.value;
      var terfilter = v === "Semua" ? daftar : daftar.filter(function (g) { return g.kategori === v; });
      document.getElementById("grid-galeri-wadah").innerHTML = gambarGrid(terfilter);
      pasangAksi(terfilter);
    };

    document.getElementById("btn-tambah-galeri").onclick = function () {
      modalEdit("Unggah Foto Baru", {}, async function (data) {
        if (!data.file_url) { UI.pesan("Pilih foto terlebih dahulu.", false); return; }
        try {
          await Store.addGaleri(data);
          UI.pesan("Berhasil disimpan! Foto sudah langsung tampil di Galeri website.", true);
          render(wadah);
        } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
      });
    };
  }

  window.Halaman = window.Halaman || {};
  window.Halaman.galeri = { render: render };
})();
