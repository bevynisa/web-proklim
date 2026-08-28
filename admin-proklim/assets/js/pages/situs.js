(function () {
  "use strict";
  var esc = UI.esc;

  async function render(wadah) {
    wadah.innerHTML = '<div class="kosong">Memuat...</div>';
    var s;
    try {
      s = await Store.getSitus();
    } catch (err) {
      wadah.innerHTML = '<div class="kosong">Gagal memuat data: ' + esc(err.message) + '</div>';
      return;
    }
    if (!s) {
      wadah.innerHTML = '<div class="kosong">Data pengaturan situs tidak ditemukan di database. Coba jalankan ulang <code>schema.sql</code> atau hubungi developer.</div>';
      return;
    }
    wadah.innerHTML =
      '<div class="kartu"><form id="form-situs">' +
      '<div class="field"><label>Logo Website</label>' +
      '<div class="pratinjau-gambar">' +
      (s.logo_url ? '<img id="situs-logo-pratinjau" src="' + esc(s.logo_url) + '">' : '<img id="situs-logo-pratinjau" style="display:none">') +
      '<div><input type="file" accept="image/*" data-imgfor="situs-logo"><input type="hidden" id="situs-logo" value="' + esc(s.logo_url || "") + '"></div>' +
      "</div><p class=\"hint\">Logo yang tampil di pojok kiri atas semua halaman.</p></div>" +

      '<div class="field"><label for="situs-nama">Nama Website</label>' +
      '<input type="text" id="situs-nama" value="' + esc(s.nama || "") + '">' +
      '<p class="hint">Nama utama yang tampil di sebelah logo. Contoh: "ProKlim Desa Sanggang"</p></div>' +

      '<div class="field"><label for="situs-jargon">Jargon / Slogan</label>' +
      '<input type="text" id="situs-jargon" value="' + esc(s.jargon || "") + '">' +
      '<p class="hint">Kalimat pendek di bawah nama website. Contoh: "Sanggang Berkreasi"</p></div>' +

      '<div class="field"><label for="situs-alamat">Alamat</label>' +
      '<input type="text" id="situs-alamat" value="' + esc(s.alamat || "") + '">' +
      '<p class="hint">Alamat lengkap desa, tampil di footer.</p></div>' +

      '<div class="field"><label for="situs-email">Email</label>' +
      '<input type="email" id="situs-email" value="' + esc(s.email || "") + '">' +
      '<p class="hint">Email kontak, tampil di footer.</p></div>' +

      '<div class="field"><label for="situs-tentang">Deskripsi Singkat Footer</label>' +
      '<textarea id="situs-tentang" style="min-height:90px">' + esc(s.tentang_singkat || "") + "</textarea>" +
      '<p class="hint">1–2 kalimat ringkasan program, tampil di bagian bawah setiap halaman.</p></div>' +

      '<div class="field"><label for="situs-footer-teks">Teks Hak Cipta Footer</label>' +
      '<input type="text" id="situs-footer-teks" value="' + esc(s.footer_teks || "") + '">' +
      '<p class="hint">Baris paling bawah tiap halaman, ditulis persis apa adanya. Contoh: "© 2026 ProKlim Sanggang Berkreasi, Desa Sanggang, Bulu, Sukoharjo." Kosongkan untuk pakai teks bawaan.</p></div>' +

      '<button type="submit" class="tombol tombol-utama">Simpan Perubahan</button>' +
      "</form></div>";

    document.getElementById("form-situs").addEventListener("submit", async function (e) {
      e.preventDefault();
      var tombol = e.target.querySelector("button[type=submit]");
      tombol.disabled = true;
      try {
        await Store.updateSitus({
          logo_url: UI.nilai("situs-logo"),
          nama: UI.nilai("situs-nama"),
          jargon: UI.nilai("situs-jargon"),
          alamat: UI.nilai("situs-alamat"),
          email: UI.nilai("situs-email"),
          tentang_singkat: UI.nilai("situs-tentang"),
          footer_teks: UI.nilai("situs-footer-teks"),
        });
        UI.pesan("Berhasil disimpan! Perubahan sudah langsung tampil di website.", true);
      } catch (err) {
        UI.pesan("Gagal menyimpan: " + err.message, false);
      } finally {
        tombol.disabled = false;
      }
    });
  }

  window.Halaman = window.Halaman || {};
  window.Halaman.situs = { render: render };
})();
