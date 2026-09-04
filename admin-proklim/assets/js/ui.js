(function () {
  "use strict";

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pesan(teks, ok) {
    var wadah = document.getElementById("pesan-mengambang");
    if (!wadah) return;
    var p = document.createElement("div");
    p.className = "pesan" + (ok ? "" : " gagal");
    p.textContent = teks;
    wadah.appendChild(p);
    setTimeout(function () {
      p.style.opacity = "0";
      setTimeout(function () { p.remove(); }, 200);
    }, 3800);
  }

  function konfirmasi(judul, teks, labelYa) {
    return new Promise(function (selesai) {
      var overlay = document.createElement("div");
      overlay.className = "overlay-modal";
      overlay.innerHTML =
        '<div class="kotak-modal">' +
        "<h3>" + esc(judul) + "</h3>" +
        "<p>" + esc(teks) + "</p>" +
        '<div class="aksi">' +
        '<button class="tombol tombol-luar" data-x="batal">Batal</button>' +
        '<button class="tombol tombol-bahaya" data-x="ya">' + esc(labelYa || "Ya, Hapus") + "</button>" +
        "</div></div>";
      document.body.appendChild(overlay);
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) tutup(false);
      });
      overlay.querySelector('[data-x="batal"]').onclick = function () { tutup(false); };
      overlay.querySelector('[data-x="ya"]').onclick = function () { tutup(true); };
      function tutup(hasil) {
        overlay.remove();
        selesai(hasil);
      }
    });
  }

  /* ---------- baris teks <-> array, dipakai form isian berulang sederhana ---------- */
  function garisKe(t) {
    return String(t || "").split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function keGaris(arr) { return (arr || []).join("\n"); }
  function pipaKe(t) {
    return garisKe(t).map(function (b) { return b.split("|").map(function (x) { return x.trim(); }); });
  }
  function kePipa(arr) { return (arr || []).map(function (r) { return r.join(" | "); }).join("\n"); }

  function nilai(id) {
    var el = document.getElementById(id);
    return el ? el.value : "";
  }
  function checked(id) {
    var el = document.getElementById(id);
    return el ? el.checked : false;
  }

  function baca(namaFile) {
    return new Promise(function (selesai, tolak) {
      var pembaca = new FileReader();
      pembaca.onload = function () { selesai(pembaca.result); };
      pembaca.onerror = function () { tolak(new Error("Gagal membaca file")); };
      pembaca.readAsDataURL(namaFile);
    });
  }

  /* =========================================================
     REPEATER — daftar isian berulang, ditampilkan sebagai TABEL
     ringkas (satu baris = satu data, nama kolom cukup ditulis
     sekali di judul tabel) supaya tidak makan banyak tempat dan
     tidak perlu scroll panjang untuk daftar yang isinya banyak.
     ========================================================= */
  var idJalan = 0;
  function idUnik(awalan) { idJalan++; return awalan + "-" + Date.now().toString(36) + idJalan; }

  var kolomRegistry = {};
  function daftarKolom(id, kolom) { kolomRegistry[id] = kolom; }
  function ambilKolom(id) { return kolomRegistry[id] || []; }

  function selKolom(item, kolom) {
    item = item || {};
    var nilaiSekarang = item[kolom.key] != null ? item[kolom.key] : "";
    if (kolom.tipe === "select") {
      var opsi = (kolom.opsi || []).map(function (o) {
        return '<option value="' + esc(o) + '"' + (o === nilaiSekarang ? " selected" : "") + ">" + esc(o) + "</option>";
      }).join("");
      return '<select data-k="' + kolom.key + '"><option value="">-</option>' + opsi + "</select>";
    }
    if (kolom.tipe === "dokumen") {
      var idDoc = idUnik("doc");
      return (
        '<div class="sel-dokumen">' +
        '<a id="' + idDoc + '-pratinjau" href="' + esc(nilaiSekarang) + '" target="_blank" rel="noopener"' +
          (nilaiSekarang ? "" : ' style="display:none"') + '>📄 Lihat dokumen</a>' +
        '<input type="file" accept="application/pdf" data-docfor="' + idDoc + '">' +
        '<input type="hidden" data-k="' + kolom.key + '" id="' + idDoc + '" value="' + esc(nilaiSekarang) + '">' +
        "</div>"
      );
    }
    if (kolom.tipe === "gambar") {
      var idImg = idUnik("img");
      return (
        '<div class="sel-gambar">' +
        (nilaiSekarang ? '<img id="' + idImg + '-pratinjau" src="' + esc(nilaiSekarang) + '">' : '<img id="' + idImg + '-pratinjau" style="display:none">') +
        '<input type="file" accept="image/*" data-imgfor="' + idImg + '">' +
        '<input type="hidden" data-k="' + kolom.key + '" id="' + idImg + '" value="' + esc(nilaiSekarang) + '">' +
        "</div>"
      );
    }
    if (kolom.tipe === "textarea") {
      return '<textarea data-k="' + kolom.key + '" rows="2" placeholder="' + esc(kolom.placeholder || "") + '">' + esc(nilaiSekarang) + "</textarea>";
    }
    if (kolom.tipe === "grup") {
      return '<div class="sel-grup">' + (kolom.sub || []).map(function (sk) {
        return '<div class="sel-grup-baris">' +
          (sk.label ? '<span class="sel-grup-label">' + esc(sk.label) + "</span>" : "") +
          selKolom(item, sk) +
        "</div>";
      }).join("") + "</div>";
    }
    return '<input type="text" data-k="' + kolom.key + '" value="' + esc(nilaiSekarang) + '" placeholder="' + esc(kolom.placeholder || "") + '">';
  }

  function barisTabel(kolom, item) {
    item = item || {};
    return (
      '<tr class="baris-repeater" data-asli="' + esc(JSON.stringify(item)) + '">' +
      kolom.map(function (k) { return "<td>" + selKolom(item, k) + "</td>"; }).join("") +
      '<td class="kolom-hapus"><button type="button" class="tombol-x" data-repeater-hapus title="Hapus baris ini">✕</button></td>' +
      "</tr>"
    );
  }

  function repeaterFlat(id, label, hint, items, kolom, satuan) {
    daftarKolom(id, kolom);
    var kepala = kolom.map(function (k) { return "<th>" + esc(k.label) + "</th>"; }).join("") + "<th></th>";
    var baris = (items || []).map(function (it) { return barisTabel(kolom, it); }).join("");
    return (
      '<div class="field"><label>' + esc(label) + "</label>" +
      (hint ? '<p class="hint">' + esc(hint) + "</p>" : "") +
      '<div class="tabel-scroll"><table class="tabel-repeater" id="' + id + '"><thead><tr>' + kepala + "</tr></thead><tbody>" + baris + "</tbody></table></div>" +
      '<button type="button" class="tombol tombol-luar tombol-kecil repeater-tambah" data-repeater-tambah="' + id + '">+ Tambah ' + esc(satuan) + "</button>" +
      "</div>"
    );
  }

  function bacaRepeaterFlat(id) {
    var tabel = document.getElementById(id);
    if (!tabel) return [];
    var kolom = ambilKolom(id);
    return Array.prototype.slice.call(tabel.querySelectorAll("tbody > tr")).map(function (baris) {
      var dasar = {};
      try { dasar = JSON.parse(baris.dataset.asli || "{}"); } catch (e) {}
      var obj = Object.assign({}, dasar);
      var adaIsi = false;
      kolom.forEach(function (k) {
        (k.tipe === "grup" ? k.sub || [] : [k]).forEach(function (sk) {
          var el = baris.querySelector('[data-k="' + sk.key + '"]');
          var v = el ? el.value.trim() : "";
          if (v) { obj[sk.key] = v; adaIsi = true; } else { delete obj[sk.key]; }
        });
      });
      return adaIsi ? obj : null;
    }).filter(Boolean);
  }

  var adderKustom = {};
  function daftarTambahKustom(id, fn) { adderKustom[id] = fn; }

  function pasangRepeaterGlobal() {
    document.addEventListener("click", function (e) {
      var btnHapus = e.target.closest && e.target.closest("[data-repeater-hapus]");
      if (btnHapus) {
        var baris = btnHapus.closest(".baris-repeater") || btnHapus.closest(".kelompok-item");
        if (baris) baris.remove();
        return;
      }
      var btnTambah = e.target.closest && e.target.closest("[data-repeater-tambah]");
      if (btnTambah) {
        var tabel = document.getElementById(btnTambah.dataset.repeaterTambah);
        if (tabel) tabel.querySelector("tbody").insertAdjacentHTML("beforeend", barisTabel(ambilKolom(tabel.id), {}));
        return;
      }
      var btnTambahK = e.target.closest && e.target.closest("[data-repeater-tambah-kustom]");
      if (btnTambahK) {
        var wadahK = document.getElementById(btnTambahK.dataset.repeaterTambahKustom);
        var fn = adderKustom[btnTambahK.dataset.repeaterTambahKustom];
        if (wadahK && fn) wadahK.insertAdjacentHTML("beforeend", fn());
      }
    });
  }

  window.UI = {
    esc, pesan, konfirmasi, garisKe, keGaris, pipaKe, kePipa, nilai, checked, bacaFileGambar: baca,
    idUnik, daftarKolom, ambilKolom, repeaterFlat, bacaRepeaterFlat, daftarTambahKustom, pasangRepeaterGlobal,
  };
})();
