(function () {
  "use strict";
  var esc = UI.esc;

  var BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  function formatTanggal(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return esc(iso);
    var jam = String(d.getHours()).padStart(2, "0");
    var menit = String(d.getMinutes()).padStart(2, "0");
    return d.getDate() + " " + BULAN[d.getMonth()] + " " + d.getFullYear() + ", " + jam + ":" + menit;
  }

  async function render(wadah) {
    wadah.innerHTML = '<div class="kosong">Memuat...</div>';
    var daftar;
    try {
      daftar = await Store.listKritikSaran();
    } catch (err) {
      wadah.innerHTML = '<div class="kosong">Gagal memuat data: ' + esc(err.message) + '</div>';
      return;
    }

    function daftarHtml(list) {
      if (!list.length) {
        return '<div class="kosong">Belum ada masukan dari warga.</div>';
      }
      return '<div class="daftar-kritik">' + list.map(function (k) {
        return (
          '<div class="kartu-kritik' + (k.dibaca ? "" : " belum-dibaca") + '">' +
            '<div class="kritik-atas">' +
              '<div class="kritik-siapa">' +
                "<strong>" + esc(k.nama || "Warga (tanpa nama)") + "</strong>" +
                (k.kategori ? '<span class="cap">' + esc(k.kategori) + "</span>" : "") +
                (!k.dibaca ? '<span class="cap cap-baru">Belum dibaca</span>' : "") +
              "</div>" +
              '<span class="kritik-tanggal">' + formatTanggal(k.dibuat_pada) + "</span>" +
            "</div>" +
            '<p class="kritik-pesan">' + esc(k.pesan) + "</p>" +
            (k.kontak ? '<p class="kritik-kontak">Kontak: ' + esc(k.kontak) + "</p>" : "") +
            '<div class="aksi-baris">' +
              '<button class="tombol tombol-luar tombol-kecil" data-tandai="' + k.id + '">' +
                (k.dibaca ? "Tandai belum dibaca" : "Tandai sudah dibaca") +
              "</button>" +
              '<button class="tombol tombol-bahaya tombol-kecil" data-hapus="' + k.id + '">Hapus</button>' +
            "</div>" +
          "</div>"
        );
      }).join("") + "</div>";
    }

    var jumlahBaru = daftar.filter(function (k) { return !k.dibaca; }).length;
    wadah.innerHTML =
      '<p class="hint" style="margin:-6px 0 14px">' +
        (jumlahBaru ? "<b>" + jumlahBaru + " masukan belum dibaca.</b> " : "") +
        "Masukan yang dikirim warga lewat form \"Kritik & Saran\" di website akan muncul di sini, terbaru di atas." +
      "</p>" +
      '<div id="daftar-kritik-wadah">' + daftarHtml(daftar) + "</div>";

    function pasangAksi(list) {
      wadah.querySelectorAll("[data-tandai]").forEach(function (btn) {
        btn.onclick = async function () {
          var data = list.find(function (k) { return k.id === btn.dataset.tandai; });
          try {
            await Store.tandaiDibacaKritikSaran(data.id, !data.dibaca);
            render(wadah);
          } catch (err) { UI.pesan("Gagal menyimpan: " + err.message, false); }
        };
      });
      wadah.querySelectorAll("[data-hapus]").forEach(function (btn) {
        btn.onclick = async function () {
          var ok = await UI.konfirmasi("Hapus Masukan?", "Masukan ini akan dihapus permanen. Yakin?");
          if (!ok) return;
          try {
            await Store.deleteKritikSaran(btn.dataset.hapus);
            UI.pesan("Masukan berhasil dihapus.", true);
            render(wadah);
          } catch (err) { UI.pesan("Gagal menghapus: " + err.message, false); }
        };
      });
    }
    pasangAksi(daftar);
  }

  window.Halaman = window.Halaman || {};
  window.Halaman["kritik-saran"] = { render: render };
})();
