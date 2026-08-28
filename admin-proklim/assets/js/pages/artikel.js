(function () {
  "use strict";
  var esc = UI.esc;

  function formIsi(data) {
    data = data || {};
    return (
      '<div class="field"><label>Foto Sampul</label>' +
      '<div class="pratinjau-gambar">' +
      (data.gambar_url ? '<img id="ar-gambar-pratinjau" src="' + esc(data.gambar_url) + '">' : '<img id="ar-gambar-pratinjau" style="display:none">') +
      '<div><input type="file" accept="image/*" data-imgfor="ar-gambar"><input type="hidden" id="ar-gambar" value="' + esc(data.gambar_url || "") + '"></div>' +
      "</div><p class=\"hint\">Foto yang tampil di sampul artikel dan di daftar Artikel Terbaru pada Beranda.</p></div>" +

      '<div class="field"><label>Judul</label><input type="text" id="ar-judul" value="' + esc(data.judul || "") + '">' +
      '<p class="hint">Judul singkat, akan tampil besar di atas artikel.</p></div>' +

      '<div class="dua-kolom">' +
      '<div class="field"><label>Kategori</label><input type="text" id="ar-kategori" value="' + esc(data.kategori || "") + '">' +
      '<p class="hint">Contoh: Adaptasi, Mitigasi, atau Kelembagaan.</p></div>' +
      '<div class="field"><label>Tanggal</label><input type="date" id="ar-tanggal" value="' + esc(data.tanggal || "") + '"></div>' +
      "</div>" +

      '<div class="field"><label>Penulis</label><input type="text" id="ar-penulis" value="' + esc(data.penulis || "") + '"></div>' +

      '<div class="field"><label>Ringkasan</label><textarea id="ar-ringkasan" style="min-height:70px">' + esc(data.ringkasan || "") + "</textarea>" +
      '<p class="hint">1-2 kalimat, tampil di daftar artikel sebelum dibuka.</p></div>' +

      '<div class="field"><label>Isi Artikel</label><textarea id="ar-isi" style="min-height:180px">' + esc(UI.keGaris(data.isi)) + "</textarea>" +
      '<p class="hint">Satu baris = satu paragraf. Boleh pakai <b>tebal</b> dan <i>miring</i>.</p></div>'
    );
  }

  function bacaForm() {
    return {
      gambar_url: UI.nilai("ar-gambar"),
      judul: UI.nilai("ar-judul"),
      kategori: UI.nilai("ar-kategori"),
      tanggal: UI.nilai("ar-tanggal") || new Date().toISOString().slice(0, 10),
      penulis: UI.nilai("ar-penulis"),
      ringkasan: UI.nilai("ar-ringkasan"),
      isi: UI.garisKe(UI.nilai("ar-isi")),
    };
  }

  function modalEdit(judul, data, onSimpan) {
    var overlay = document.createElement("div");
    overlay.className = "overlay-modal";
    overlay.innerHTML =
      '<div class="kotak-modal" style="max-width:560px;max-height:88vh;overflow:auto">' +
      "<h3>" + esc(judul) + "</h3>" +
      '<form id="form-modal-artikel">' + formIsi(data) +
      '<div class="aksi">' +
      '<button type="button" class="tombol tombol-luar" id="btn-batal-artikel">Batal</button>' +
      '<button type="submit" class="tombol tombol-utama">Simpan</button>' +
      "</div></form></div>";
    document.body.appendChild(overlay);
    overlay.querySelector("#btn-batal-artikel").onclick = function () { overlay.remove(); };
    overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector("#form-modal-artikel").addEventListener("submit", async function (e) {
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
      daftar = await Store.listArtikel();
    } catch (err) {
      wadah.innerHTML = '<div class="kosong">Gagal memuat data: ' + esc(err.message) + '</div>';
      return;
    }

    wadah.innerHTML =
      '<button class="tombol tombol-utama" id="btn-tambah-artikel" style="margin-bottom:16px">+ Tulis Artikel Baru</button>' +
      '<div class="kartu">' +
      (daftar.length
        ? '<table class="daftar"><thead><tr><th></th><th>Judul</th><th>Kategori</th><th>Tanggal</th><th></th></tr></thead><tbody>' +
          daftar.map(function (a) {
            return "<tr><td>" + (a.gambar_url ? '<img class="mini" src="' + esc(a.gambar_url) + '">' : "") + "</td>" +
              "<td>" + esc(a.judul) + "</td><td>" + esc(a.kategori) + "</td><td>" + esc(a.tanggal) + "</td>" +
              '<td class="aksi-baris">' +
              '<button class="tombol tombol-luar tombol-kecil" data-ubah="' + a.id + '">Ubah</button>' +
              '<button class="tombol tombol-bahaya tombol-kecil" data-hapus="' + a.id + '">Hapus</button>' +
              "</td></tr>";
          }).join("") + "</tbody></table>"
        : '<div class="kosong">Belum ada artikel. Klik "+ Tulis Artikel Baru" untuk mulai menulis.</div>') +
      "</div>";

    document.getElementById("btn-tambah-artikel").onclick = function () {
      modalEdit("Tulis Artikel Baru", {}, async function (data) {
        try {
          await Store.addArtikel(data);
          UI.pesan("Berhasil disimpan! Artikel sudah langsung tampil di website.", true);
          render(wadah);
        } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
      });
    };
    wadah.querySelectorAll("[data-ubah]").forEach(function (btn) {
      btn.onclick = function () {
        var data = daftar.find(function (a) { return a.id === btn.dataset.ubah; });
        modalEdit("Ubah Artikel", data, async function (baru) {
          try {
            await Store.updateArtikel(data.id, baru);
            UI.pesan("Berhasil disimpan! Perubahan sudah langsung tampil di website.", true);
            render(wadah);
          } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
        });
      };
    });
    wadah.querySelectorAll("[data-hapus]").forEach(function (btn) {
      btn.onclick = async function () {
        var data = daftar.find(function (a) { return a.id === btn.dataset.hapus; });
        var ok = await UI.konfirmasi("Hapus Artikel?", 'Artikel "' + data.judul + '" akan dihapus dan langsung hilang dari website. Yakin?');
        if (!ok) return;
        try {
          await Store.deleteArtikel(data.id);
          UI.pesan("Artikel berhasil dihapus.", true);
          render(wadah);
        } catch (err) { UI.pesan("Gagal menghapus: " + err.message, false); }
      };
    });
  }

  window.Halaman = window.Halaman || {};
  window.Halaman.artikel = { render: render };
})();
