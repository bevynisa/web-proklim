(function () {
  "use strict";
  var esc = UI.esc;

  function formIsi(data) {
    data = data || {};
    return (
      '<div class="dua-kolom">' +
      '<div class="field"><label>Jabatan</label><input type="text" id="sp-jabatan" value="' + esc(data.jabatan || "") + '">' +
      '<p class="hint">Contoh: Ketua, Sekretaris, Bendahara, Bidang Adaptasi.</p></div>' +
      '<div class="field"><label>Nama-nama</label><input type="text" id="sp-personel" value="' + esc((data.nama_personel || []).join(", ")) + '">' +
      '<p class="hint">Boleh lebih dari satu nama, pisahkan dengan koma. Contoh: "Sri Rahayu, Ika Listanti"</p></div>' +
      "</div>" +
      '<div class="dua-kolom">' +
      '<div class="field"><label>Baris Tampil</label><input type="number" id="sp-kelompok" value="' + (data.kelompok != null ? data.kelompok : 0) + '">' +
      '<p class="hint">Jabatan dengan angka baris sama akan tampil berdampingan. Kepala Desa/Pembina biasanya baris 0 (paling atas).</p></div>' +
      '<div class="field"><label>Urutan dalam Baris</label><input type="number" id="sp-urutan" value="' + (data.urutan != null ? data.urutan : 0) + '">' +
      '<p class="hint">Kalau ada beberapa jabatan di baris yang sama, angka kecil tampil lebih dulu (kiri).</p></div>' +
      "</div>"
    );
  }

  function bacaForm() {
    return {
      jabatan: UI.nilai("sp-jabatan"),
      nama_personel: UI.nilai("sp-personel").split(",").map(function (s) { return s.trim(); }).filter(Boolean),
      kelompok: Number(UI.nilai("sp-kelompok")) || 0,
      urutan: Number(UI.nilai("sp-urutan")) || 0,
    };
  }

  function modalEdit(judul, data, onSimpan) {
    var overlay = document.createElement("div");
    overlay.className = "overlay-modal";
    overlay.innerHTML =
      '<div class="kotak-modal" style="max-width:480px">' +
      "<h3>" + esc(judul) + "</h3>" +
      '<form id="form-modal-struktur">' + formIsi(data) +
      '<div class="aksi">' +
      '<button type="button" class="tombol tombol-luar" id="btn-batal-struktur">Batal</button>' +
      '<button type="submit" class="tombol tombol-utama">Simpan</button>' +
      "</div></form></div>";
    document.body.appendChild(overlay);
    overlay.querySelector("#btn-batal-struktur").onclick = function () { overlay.remove(); };
    overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector("#form-modal-struktur").addEventListener("submit", async function (e) {
      e.preventDefault();
      await onSimpan(bacaForm());
      overlay.remove();
    });
  }

  async function render(wadah) {
    wadah.innerHTML = '<div class="kosong">Memuat...</div>';
    var daftar;
    try {
      daftar = await Store.listStruktur();
    } catch (err) {
      wadah.innerHTML = '<div class="kosong">Gagal memuat data: ' + esc(err.message) + '</div>';
      return;
    }

    wadah.innerHTML =
      '<div class="kartu-judul"><h3 style="margin:0"></h3></div>' +
      '<button class="tombol tombol-utama" id="btn-tambah-struktur" style="margin-bottom:16px">+ Tambah Pengurus</button>' +
      '<div class="kartu">' +
      (daftar.length
        ? '<table class="daftar"><thead><tr><th>Jabatan</th><th>Nama</th><th>Baris</th><th>Urutan</th><th></th></tr></thead><tbody>' +
          daftar.map(function (d) {
            return "<tr><td>" + esc(d.jabatan) + "</td><td>" + esc((d.nama_personel || []).join(", ")) + "</td>" +
              "<td>" + d.kelompok + "</td><td>" + d.urutan + "</td>" +
              '<td class="aksi-baris">' +
              '<button class="tombol tombol-luar tombol-kecil" data-ubah="' + d.id + '">Ubah</button>' +
              '<button class="tombol tombol-bahaya tombol-kecil" data-hapus="' + d.id + '">Hapus</button>' +
              "</td></tr>";
          }).join("") + "</tbody></table>"
        : '<div class="kosong">Belum ada data pengurus. Klik "+ Tambah Pengurus" untuk mulai mengisi.</div>') +
      "</div>";

    document.getElementById("btn-tambah-struktur").onclick = function () {
      modalEdit("Tambah Pengurus", {}, async function (data) {
        try {
          await Store.addStruktur(data);
          UI.pesan("Berhasil disimpan! Perubahan sudah langsung tampil di website.", true);
          render(wadah);
        } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
      });
    };
    wadah.querySelectorAll("[data-ubah]").forEach(function (btn) {
      btn.onclick = function () {
        var data = daftar.find(function (d) { return d.id === btn.dataset.ubah; });
        modalEdit("Ubah Data Pengurus", data, async function (baru) {
          try {
            await Store.updateStruktur(data.id, baru);
            UI.pesan("Berhasil disimpan! Perubahan sudah langsung tampil di website.", true);
            render(wadah);
          } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
        });
      };
    });
    wadah.querySelectorAll("[data-hapus]").forEach(function (btn) {
      btn.onclick = async function () {
        var data = daftar.find(function (d) { return d.id === btn.dataset.hapus; });
        var ok = await UI.konfirmasi("Hapus Data Pengurus?", 'Data jabatan "' + data.jabatan + '" akan dihapus dan langsung hilang dari website. Yakin?');
        if (!ok) return;
        try {
          await Store.deleteStruktur(data.id);
          UI.pesan("Data berhasil dihapus.", true);
          render(wadah);
        } catch (err) { UI.pesan("Gagal menghapus: " + err.message, false); }
      };
    });
  }

  window.Halaman = window.Halaman || {};
  window.Halaman.struktur = { render: render };
})();
