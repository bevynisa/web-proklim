/* =========================================================
   RENDER — menggambar header, halaman, dan footer dari data
   ========================================================= */

(function () {
  "use strict";

  var S = window.Store;

  /* ---------- pembantu ---------- */
  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  // teks naratif boleh memuat <b>, <i>, <br> dsb.
  function kaya(t) { return t == null ? "" : String(t); }

  // ikon panah chevron (tombol carousel prev/next) — arah "next" bawaan, dibalik via CSS untuk "prev"
  var PANAH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';

  // alamat YouTube (watch?v=, youtu.be/, /embed/, /shorts/) -> alamat embed siap pakai
  function idYoutube(url) {
    var m = String(url || "").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
    return m ? m[1] : null;
  }

  // ikon tematik untuk kartu video (ditebak dari judulnya) — jatuh ke ikon
  // putar polos kalau judulnya tidak cocok kata kunci mana pun
  var IKON_API = '<path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-1-.5-2-1-2 .3 2-1 3-2 3-1.5 0-2-1.3-1.5-2.8C14.2 6.8 13 5 12 3z"/><path d="M9 15a3 3 0 106 0c0-1.2-.7-2-1.5-3-.3 1.3-1.2 1.8-2 1.8-1 0-1.7-.8-1.5-1.8C9.4 12.8 9 13.8 9 15z"/>';
  var IKON_LONGSOR = '<path d="M3 19l6-11 4 6 2-3 6 8H3z"/><path d="M14 8l1.5-2.6L17 8"/>';
  var IKON_KENTUNGAN = '<rect x="9" y="4" width="6" height="15" rx="2"/><path d="M12 4V2"/><path d="M6 21c1-2 3-3 6-3s5 1 6 3"/>';
  var IKON_PETA = '<path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14M15 6v14"/>';
  var IKON_ARTIKEL = '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>';
  function ikonVideo(judul) {
    var j = String(judul || "").toLowerCase();
    if (j.indexOf("kebakaran") > -1 || j.indexOf("karhutla") > -1) return IKON_API;
    if (j.indexOf("longsor") > -1) return IKON_LONGSOR;
    if (j.indexOf("kentungan") > -1 || j.indexOf("komunikasi") > -1) return IKON_KENTUNGAN;
    if (j.indexOf("peta") > -1 || j.indexOf("evakuasi") > -1) return IKON_PETA;
    if (j.indexOf("artikel") > -1) return IKON_ARTIKEL;
    return null;
  }

  var IKON_TELEPON_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>';
  var IKON_EMAIL_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

  // "0858..." atau "+62858..." -> "62858..." (format yang dipakai tautan wa.me)
  function teleponWa(t) {
    var d = String(t || "").replace(/[^\d]/g, "");
    if (d.charAt(0) === "0") d = "62" + d.slice(1);
    return d;
  }

  function tglIndo(s) {
    if (!s) return "";
    var b = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
             "Agustus", "September", "Oktober", "November", "Desember"];
    var d = new Date(s);
    if (isNaN(d)) return esc(s);
    return d.getDate() + " " + b[d.getMonth()] + " " + d.getFullYear();
  }

  var R = {};

  /* =============== HEADER =============== */
  R.header = function (rutaAktif) {
    var s = S.data.situs;
    var el = document.getElementById("situs-header");
    var menu = S.data.menu.map(function (m) {
      var punyaAnak = m.anak && m.anak.length;
      if (punyaAnak) {
        var anakAktif = m.anak.some(function (a) { return a.halaman === rutaAktif; });
        return (
          '<li class="punya-anak">' +
          '<button class="nav-tautan' + (anakAktif ? " aktif" : "") + '" data-buka-sub>' +
          esc(m.label) + ' <span class="panah">▼</span></button>' +
          '<ul class="submenu">' +
          m.anak.map(function (a) {
            return '<li><a href="#/' + esc(a.halaman) + '" class="' +
              (a.halaman === rutaAktif ? "aktif" : "") + '">' + esc(a.label) + "</a></li>";
          }).join("") +
          "</ul></li>"
        );
      }
      return '<li><a class="nav-tautan' + (m.halaman === rutaAktif ? " aktif" : "") +
        '" href="#/' + esc(m.halaman) + '">' + esc(m.label) + "</a></li>";
    }).join("");

    el.innerHTML =
      '<div class="wadah header-baris">' +
        '<a class="merek" href="#/' + esc(S.halamanPertama()) + '" title="' + esc(s.nama) + '">' +
          '<img src="' + esc(s.logo) + '" alt="Logo ProKlim">' +
          '<span class="merek-teks">' +
            '<span class="merek-nama">' + esc(s.nama) + "</span>" +
            '<span class="jargon">' + esc(s.jargon) + "</span>" +
          "</span>" +
        "</a>" +
        '<button class="tombol-menu" id="tombol-menu" aria-label="Buka menu">☰</button>' +
        '<nav class="nav-utama" id="nav-utama"><ul class="nav-daftar">' + menu + "</ul></nav>" +
      "</div>";

    var tm = document.getElementById("tombol-menu");
    var nav = document.getElementById("nav-utama");
    tm.onclick = function () { nav.classList.toggle("tampil"); };

    el.querySelectorAll("[data-buka-sub]").forEach(function (b) {
      b.onclick = function (ev) {
        ev.stopPropagation();
        var li = b.parentElement;
        var sudah = li.classList.contains("buka");
        el.querySelectorAll("li.buka").forEach(function (x) { x.classList.remove("buka"); });
        if (!sudah) li.classList.add("buka");
      };
    });
    document.addEventListener("click", function () {
      el.querySelectorAll("li.buka").forEach(function (x) { x.classList.remove("buka"); });
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("tampil"); });
    });
  };

  /* =============== FOOTER =============== */
  R.footer = function () {
    var s = S.data.situs;

    document.getElementById("situs-footer").innerHTML =
      '<div class="wadah"><div class="footer-grid">' +
        "<div>" +
          '<div class="footer-merek">' +
            '<img src="' + esc(s.logo) + '" alt="Logo ProKlim">' +
            '<div><div class="nama">' + esc(s.nama) + "</div>" +
            '<div class="jargon">' + esc(s.jargon) + "</div></div>" +
          "</div>" +
          "<p>" + esc(s.tentangSingkat) + "</p>" +
        "</div>" +
        "<div><h4>Kontak</h4>" +
          (s.kontakTelepon
            ? '<p class="kontak-baris"><a href="https://wa.me/' + esc(teleponWa(s.kontakTelepon)) + '" target="_blank" rel="noopener">' +
              IKON_TELEPON_SVG + "<span>" + esc(s.kontakTelepon) + (s.kontakNama ? " (" + esc(s.kontakNama) + ")" : "") + "</span></a></p>"
            : "") +
          (s.email
            ? '<p class="kontak-baris"><a href="mailto:' + esc(s.email) + '">' + IKON_EMAIL_SVG + "<span>" + esc(s.email) + "</span></a></p>"
            : "") +
        "</div>" +
      "</div>" +
      '<div class="footer-bawah">' +
        "<span>" + esc(s.footerTeks || ("© " + new Date().getFullYear() + " Desa Sanggang, Bulu, Sukoharjo.")) + "</span>" +
      "</div></div>";
  };

  /* =============== BLOK =============== */
  var blok = {};

  blok.hero = function (b) {
    var latar = (b.latar || []).filter(function (x) {
      return x && (typeof x === "string" ? x : x.src);
    });
    var bgHtml = latar.length
      ? '<div class="hero-latar">' +
          latar.map(function (item, i) {
            var src = typeof item === "string" ? item : item.src || "";
            var pos = item && typeof item === "object" && item.posisi ? item.posisi : "";
            var style = "background-image:url('" + esc(src) + "')" +
              (pos ? ";background-position:" + esc(pos) : "");
            return '<div class="hero-latar-foto' + (i === 0 ? " aktif" : "") +
              '" style="' + style + '"></div>';
          }).join("") +
        "</div>"
      : "";
    return (
      '<section class="hero' + (latar.length ? " hero-berfoto" : "") + '">' + bgHtml +
      '<div class="wadah">' +
        (b.label ? '<span class="label">' + esc(b.label) + "</span>" : "") +
        "<h1>" + esc(b.judul) + "</h1>" +
        (b.subjudul ? '<div class="subjudul">' + esc(b.subjudul) + "</div>" : "") +
        (b.teks ? '<p class="teks">' + kaya(b.teks) + "</p>" : "") +
        (b.tombol && b.tombol.length
          ? '<div class="hero-tombol">' + b.tombol.map(function (t, i) {
              return '<a class="tombol ' + (i === 0 ? "tombol-utama" : "tombol-garis") +
                '" href="' + esc(t.tujuan) + '">' + esc(t.label) + "</a>";
            }).join("") + "</div>"
          : "") +
      "</div></section>"
    );
  };

  function kepalaSeksi(b) {
    return (
      (b.judul ? "<h2>" + esc(b.judul) + "</h2>" : "") +
      (b.deskripsi
        ? '<p class="deskripsi-seksi' + (b.deskripsiSatuBaris ? " satu-baris" : "") + '">' + kaya(b.deskripsi) + "</p>"
        : "")
    );
  }

  blok.teks = function (b) {
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="kartu-putih blok-teks">' +
        (b.paragraf || []).map(function (p) { return "<p>" + kaya(p) + "</p>"; }).join("") +
        (b.sorot ? '<div class="sorot"><strong>' + esc(b.sorot.judul) + "</strong>" + kaya(b.sorot.teks) + "</div>" : "") +
      "</div></div></section>"
    );
  };

  blok.statistik = function (b) {
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-statistik">' +
        (b.item || []).map(function (i, idx) {
          var no = (idx + 1 < 10 ? "0" : "") + (idx + 1);
          return '<div class="stat" data-idx="' + no + '">' +
            '<div class="angka">' + esc(i.angka) +
            (i.satuan ? '<span class="satuan">' + esc(i.satuan) + "</span>" : "") + "</div>" +
            '<div class="stat-garis"></div>' +
            '<div class="label">' + esc(i.label) + "</div>" +
            (i.ket ? '<div class="ket">' + esc(i.ket) + "</div>" : "") + "</div>";
        }).join("") +
      "</div></div></section>"
    );
  };

  blok.kartu = function (b) {
    var kiri = b.rataKiri ? " kartu-kiri" : "";
    var foto = !!b.gayaFoto;
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-kartu' + (foto ? " grid-kartu-foto" : "") + '">' +
        (b.item || []).map(function (i) {
          var kelasIkon = "ikon" + (b.ikonTengah ? " ikon-tengah" : "") + (i.svg ? " ikon-svg" : "");
          var ikon = i.svg ? '<div class="' + kelasIkon + '">' + kaya(i.svg) + "</div>" : '<div class="' + kelasIkon + '">' + esc(i.ikon || "🌱") + "</div>";
          var teksKartu = "<h3>" + esc(i.judul) + "</h3><p>" + kaya(i.teks) + "</p>" +
            (i.tujuan ? '<span class="lanjut">Selengkapnya →</span>' : "");
          var isi = foto && i.gambar
            ? '<div class="kartu-foto"><img src="' + esc(i.gambar) + '" alt="' + esc(i.gambarAlt || i.judul) + '" loading="lazy">' + ikon + "</div>" +
              '<div class="kartu-isi">' + teksKartu + "</div>"
            : ikon + teksKartu;
          return i.tujuan
            ? '<a class="kartu efek-sorot' + kiri + '" href="' + esc(i.tujuan) + '">' + isi + "</a>"
            : '<div class="kartu efek-sorot' + kiri + '">' + isi + "</div>";
        }).join("") +
      "</div></div></section>"
    );
  };

  // prestasi — item peringkat (podium: true) tampil sebagai panggung juara 1/2/3
  // ala podium olimpiade; sisanya (mis. penghargaan non-kompetisi) tetap kartu
  // lencana medali seperti biasa
  var MEDALI_SVG = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 27L9 43l8.5-3.4L22 45l-2-13"/><path d="M32 27l7 16-8.5-3.4L26 45l2-13"/><circle cx="24" cy="19" r="13"/><path d="M24 12.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z" fill="currentColor" stroke="none"/></svg>';
  function kartuPrestasi(i) {
    var kelas = i.kelas || "emas";
    return (
      '<div class="kartu efek-sorot prestasi-kartu prestasi-' + esc(kelas) + '">' +
        '<div class="prestasi-medali">' + MEDALI_SVG + "</div>" +
        (i.peringkat ? '<span class="prestasi-peringkat">' + esc(i.peringkat) + "</span>" : "") +
        "<h3>" + esc(i.judul) + "</h3>" +
        (i.teks ? '<span class="prestasi-tingkat">' + esc(i.teks) + "</span>" : "") +
      "</div>"
    );
  }
  blok.prestasi = function (b) {
    var semua = b.item || [];
    if (!semua.length) return "";
    var podium = semua.filter(function (i) { return i.podium; });
    var sisa = semua.filter(function (i) { return !i.podium; });
    var urutan = { kiri: 1, tengah: 2, kanan: 3 };
    var panggung = podium.length
      ? '<div class="prestasi-grup">' +
          (b.podiumLabel ? '<span class="prestasi-grup-label">' + esc(b.podiumLabel) + "</span>" : "") +
          '<div class="podium">' +
            podium.slice().sort(function (a, c) {
              return (urutan[a.posisi] || 2) - (urutan[c.posisi] || 2);
            }).map(function (i) {
              var kelas = i.kelas || "emas";
              return (
                '<div class="podium-slot efek-sorot podium-' + esc(i.posisi || "tengah") + '">' +
                  '<div class="podium-medali podium-medali-' + esc(kelas) + '">' + MEDALI_SVG + "</div>" +
                  '<div class="podium-judul">' + esc(i.judul) + "</div>" +
                  '<div class="podium-bar podium-' + esc(kelas) + '" data-tinggi="' + esc(i.tinggi || 80) + '">' +
                    '<span class="podium-label">' + esc(i.peringkat || "") + "</span>" +
                  "</div>" +
                "</div>"
              );
            }).join("") +
          "</div>" +
        "</div>"
      : "";
    var kartu = sisa.length ? '<div class="prestasi-sisa">' + sisa.map(kartuPrestasi).join("") + "</div>" : "";
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="prestasi-baris">' + panggung + kartu + "</div>" +
      "</div></section>"
    );
  };

  // rute-jejaring — jangkauan jejaring digambarkan sebagai jalur yang melebar:
  // titik makin besar & warnanya makin pekat menuju tingkat nasional, dihubungkan
  // garis yang "tumbuh" saat digulir — pengganti non-kartu untuk konten berjenjang
  blok["rute-jejaring"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var titik = item.map(function (i, idx) {
      return (
        '<div class="rute-titik efek-sorot" style="--rj-i:' + idx + '">' +
          '<span class="rute-bulat">' + kaya(i.svg || "") + "</span>" +
          '<div class="rute-info"><b>' + esc(i.judul) + "</b><p>" + kaya(i.teks) + "</p></div>" +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="rute-jalur">' +
        '<div class="rute-garis"><span class="rute-garis-isi"></span></div>' +
        titik +
      "</div></div></section>"
    );
  };

  // rencana-kerja — kartu rencana kerja bernomor, tersusun sebagai grid tetap
  // (bukan carousel geser): tiap kartu punya nomor urut, ikon, deskripsi,
  // serta tag Target & PJ yang dipisah dari teks
  blok["rencana-kerja"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var kartu = item.map(function (i, idx) {
      var nomor = (idx + 1 < 10 ? "0" : "") + (idx + 1);
      return (
        '<div class="rencana-item efek-sorot">' +
          '<div class="rencana-atas">' +
            '<div class="rencana-ikon">' + kaya(i.svg || "") + "</div>" +
            '<span class="rencana-nomor">' + nomor + "</span>" +
          "</div>" +
          "<h3>" + esc(i.judul) + "</h3>" +
          (i.teks ? "<p>" + kaya(i.teks) + "</p>" : "") +
          (i.target || i.pj
            ? '<div class="rencana-meta">' +
                (i.target ? '<span class="rencana-tag rencana-target"><b>Target</b>' + esc(i.target) + "</span>" : "") +
                (i.pj ? '<span class="rencana-tag rencana-pj"><b>PJ</b>' + esc(i.pj) + "</span>" : "") +
              "</div>"
            : "") +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
        '<div class="rencana-daftar">' + kartu + "</div>" +
      "</div></section>"
    );
  };

  // kartu-program — kartu 2 bagian: kepala berwarna berisi kategori/tingkat,
  // badan putih berisi penjelasan program
  blok["kartu-program"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var kartu = item.map(function (i) {
      return (
        '<div class="kartu kartu-program efek-sorot">' +
          (i.teks ? '<div class="kartu-program-atas">' + esc(i.teks) + "</div>" : "") +
          '<div class="kartu-program-bawah">' + kaya(i.judul) + "</div>" +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-kartu">' + kartu + "</div>" +
      "</div></section>"
    );
  };

  blok.daftar = function (b) {
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="kartu-putih"><ul class="daftar-rapi' + (b.bernomor ? " bernomor" : "") + '">' +
        (b.item || []).map(function (i) { return "<li>" + kaya(i) + "</li>"; }).join("") +
      "</ul></div></div></section>"
    );
  };

  blok.tab = function (b) {
    var tabs = (b.tab || []).filter(function (t) { return t && t.label; });
    if (!tabs.length) return "";
    var toggle = '<div class="tab-toggle" role="tablist">' +
      tabs.map(function (t, i) {
        return '<button class="tab-tombol' + (i === 0 ? " aktif" : "") +
          '" data-tab-target="' + i + '">' + esc(t.label) + "</button>";
      }).join("") + "</div>";
    var panel = tabs.map(function (t, i) {
      var item = t.item || [];
      var isi = item.length === 1
        ? '<p class="tab-pernyataan">' + kaya(item[0]) + "</p>"
        : '<ol class="tab-daftar">' + item.map(function (x) { return "<li>" + kaya(x) + "</li>"; }).join("") + "</ol>";
      return '<div class="tab-panel' + (i === 0 ? " aktif" : "") +
        '" data-tab-panel="' + i + '">' + isi + "</div>";
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="tab-blok" data-tab-grup>' + toggle +
        '<div class="tab-badan">' + panel + "</div>" +
      "</div></div></section>"
    );
  };

  // daftar centang modern — pengganti tabel 2 kolom "Komponen / Keterangan"
  var CENTANG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  blok.checklist = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var isi = item.map(function (i) {
      return (
        '<li class="checklist-item efek-sorot">' +
          '<span class="checklist-centang">' + CENTANG_SVG + "</span>" +
          '<span class="checklist-teks"><b>' + esc(i.judul) + "</b>" + (i.teks ? "<p>" + kaya(i.teks) + "</p>" : "") + "</span>" +
        "</li>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<ul class="checklist-daftar' + (b.kolomGanda ? " kolom-ganda" : "") + '">' + isi + "</ul>" +
      "</div></section>"
    );
  };

  // profil — pengganti checklist kotak-kotak untuk info "identitas": foto besar bersanding
  // dengan daftar keterangan, ala kartu berita (foto di satu sisi, teks di sisi lain)
  blok.profil = function (b) {
    var foto = null;
    if (b.gambar) {
      foto = typeof b.gambar === "string" ? { file: b.gambar, judul: b.gambarAlt || b.judul || "" } : b.gambar;
    } else if (b.gambarDari) {
      var hasil = pilihFotoGaleri({
        kategori: b.gambarDari.kategori, sub: b.gambarDari.sub,
        mulai: b.gambarDari.indeks || 0, jumlah: 1,
      });
      if (hasil.length) foto = hasil[0].g;
    }
    var item = b.item || [];
    var daftar = !item.length ? "" :
      b.gayaDaftar === "alur"
        ? '<dl class="profil-daftar profil-alur">' + item.map(function (i) {
            return '<div><span class="pa-titik"></span><dt>' + esc(i.judul) + "</dt><dd>" + (i.teks ? kaya(i.teks) : "") + "</dd></div>";
          }).join("") + "</dl>"
        : '<dl class="profil-daftar">' + item.map(function (i) {
            return "<div><dt>" + esc(i.judul) + "</dt><dd>" + (i.teks ? kaya(i.teks) : "") + "</dd></div>";
          }).join("") + "</dl>";
    var media = foto
      ? '<figure class="profil-media' + (b.gambarKontain ? " kontain" : "") + '">' +
          '<img src="' + esc(foto.file) + '" alt="' + esc(foto.judul || b.judul || "") + '" loading="lazy">' +
        "</figure>"
      : "";
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="profil-blok' + (b.arah === "kanan" ? " kanan" : "") + '">' +
        media +
        '<div class="profil-konten efek-sorot">' + (b.teks ? "<p>" + kaya(b.teks) + "</p>" : "") + daftar + "</div>" +
      "</div></div></section>"
    );
  };

  // evaluasi-tab — topik (Adaptasi/Mitigasi/Kelembagaan) dipilih lewat tab,
  // cuma satu topik yang tampil sekaligus jadi tidak sesak; dipakai untuk
  // konten yang tiap topiknya punya beberapa sub-field panjang (label+isi)
  blok["evaluasi-tab"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var toggle = '<div class="tab-toggle" role="tablist">' +
      item.map(function (t, i) {
        return '<button class="tab-tombol' + (i === 0 ? " aktif" : "") +
          '" data-tab-target="' + i + '">' + esc(t.judul) + "</button>";
      }).join("") + "</div>";
    var panel = item.map(function (t, i) {
      var baris = (t.baris || []).map(function (f) {
        return '<div class="ev-baris"><span class="ev-label">' + esc(f.label) + "</span><p>" + kaya(f.isi) + "</p></div>";
      }).join("");
      return '<div class="tab-panel' + (i === 0 ? " aktif" : "") + '" data-tab-panel="' + i + '">' + baris + "</div>";
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="tab-blok" data-tab-grup>' + toggle +
        '<div class="tab-badan">' + panel + "</div>" +
      "</div></div></section>"
    );
  };

  // manfaat-pita — 3 manfaat sebagai panel warna penuh menyambung (bukan
  // kartu kotak putih): tiap manfaat dapat salah satu dari 3 warna identitas
  // situs (kulit/biru/hijau) supaya terasa berbeda & mengena secara visual
  blok["manfaat-pita"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var warna = ["kulit", "biru", "hijau"];
    var sel = item.map(function (i, idx) {
      return (
        '<div class="manfaat-panel manfaat-' + warna[idx % warna.length] + '">' +
          '<div class="manfaat-ikon">' + kaya(i.svg || "") + "</div>" +
          "<h3>" + esc(i.judul) + "</h3>" +
          (i.teks ? "<p>" + kaya(i.teks) + "</p>" : "") +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="manfaat-pita">' + sel + "</div>" +
      "</div></section>"
    );
  };

  // profil-grid — varian profil untuk daftar keterangan panjang: foto meregang
  // penuh mengikuti tinggi kontennya (bukan kotak pendek terpisah dari teks),
  // daftarnya dijejer 2 kolom supaya tidak jauh lebih tinggi dari fotonya
  blok["profil-grid"] = function (b) {
    var foto = null;
    if (b.gambar) {
      foto = typeof b.gambar === "string" ? { file: b.gambar, judul: b.gambarAlt || b.judul || "" } : b.gambar;
    } else if (b.gambarDari) {
      var hasilPg = pilihFotoGaleri({
        kategori: b.gambarDari.kategori, sub: b.gambarDari.sub,
        mulai: b.gambarDari.indeks || 0, jumlah: 1,
      });
      if (hasilPg.length) foto = hasilPg[0].g;
    }
    var item = b.item || [];
    var sel = item.map(function (i) {
      return (
        '<div class="pg-sel">' +
          '<span class="pg-titik"></span>' +
          "<div><b>" + esc(i.judul) + "</b>" + (i.teks ? "<p>" + kaya(i.teks) + "</p>" : "") + "</div>" +
        "</div>"
      );
    }).join("");
    var media = foto
      ? '<figure class="pg-media"><img src="' + esc(foto.file) + '" alt="' + esc(foto.judul || b.judul || "") + '" loading="lazy"></figure>'
      : "";
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="pg-blok' + (b.arah === "kanan" ? " kanan" : "") + '">' +
        media +
        '<div class="pg-grid efek-sorot">' + sel + "</div>" +
      "</div></div></section>"
    );
  };

  // arah-alur — 3 arah kemitraan ala anak panah yang mengalir (bukan kartu
  // kotak): tiap segmen berbentuk chevron mewarnai penuh, menyambung ke segmen
  // berikutnya, cocok untuk konten yang benar-benar berarti "arah/tahapan"
  blok["arah-alur"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var isi = item.map(function (i) {
      return (
        '<div class="arah-item">' +
          '<div class="arah-ikon">' + kaya(i.svg || "") + "</div>" +
          "<h3>" + esc(i.judul) + "</h3>" +
          (i.teks ? "<p>" + kaya(i.teks) + "</p>" : "") +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="arah-alur">' + isi + "</div>" +
      "</div></section>"
    );
  };

  // foto-kartu — foto sebagai latar penuh (ala hero beranda) dengan kartu "kaca buram"
  // melayang di atasnya, dipakai saat konten lebih cocok tampil sebagai galeri ringkas
  // ketimbang daftar keterangan biasa
  blok["foto-kartu"] = function (b) {
    var foto = null;
    if (b.gambar) {
      foto = typeof b.gambar === "string" ? { file: b.gambar, judul: b.gambarAlt || b.judul || "" } : b.gambar;
    } else if (b.gambarDari) {
      var hasil = pilihFotoGaleri({
        kategori: b.gambarDari.kategori, sub: b.gambarDari.sub,
        mulai: b.gambarDari.indeks || 0, jumlah: 1,
      });
      if (hasil.length) foto = hasil[0].g;
    }
    var item = b.item || [];
    var kartu = item.map(function (i) {
      return (
        '<div class="kartu fk-kartu efek-sorot">' +
          "<h3>" + esc(i.judul) + "</h3>" +
          (i.teks ? "<p>" + kaya(i.teks) + "</p>" : "") +
        "</div>"
      );
    }).join("");
    var style = foto ? ' style="background-image:url(\'' + esc(foto.file) + "')\"" : "";
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="fk-latar"' + style + '>' +
        '<div class="fk-grid">' + kartu + "</div>" +
      "</div></div></section>"
    );
  };

  // jalur berjenjang — pengganti tabel "Tingkat / Bentuk", makin ke atas makin luas jangkauannya
  function kelasTingkat(label) {
    var l = String(label || "").toLowerCase();
    if (l.indexOf("nasional") > -1) return "tk-4";
    if (l.indexOf("provinsi") > -1) return "tk-3";
    if (l.indexOf("kabupaten") > -1 || l.indexOf("kota") > -1) return "tk-2";
    return "tk-1";
  }
  blok.tingkat = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var isi = item.map(function (i) {
      var isiList = Array.isArray(i.isi) ? i.isi : [i.isi];
      return (
        '<div class="tingkat-langkah ' + kelasTingkat(i.level) + '">' +
          '<span class="tingkat-badge">' + esc(i.level) + "</span>" +
          '<div class="tingkat-isi">' + isiList.map(function (t) { return "<p>" + kaya(t) + "</p>"; }).join("") + "</div>" +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="tingkat-jalur">' + isi + "</div>" +
      "</div></section>"
    );
  };

  blok.tabel = function (b) {
    var kolom = b.kolom || [];
    var baris = b.baris || [];
    var gabung = !!b.gabungKolomPertama;
    var sebelumnya = null;
    var isi = baris.map(function (r) {
      return "<tr>" + r.map(function (sel, k) {
        if (gabung && k === 0) {
          var baru = sel !== sebelumnya;
          sebelumnya = sel;
          return '<td class="kelompok">' + (baru ? esc(sel) : "") + "</td>";
        }
        return "<td>" + esc(sel) + "</td>";
      }).join("") + "</tr>";
    }).join("");

    // tabel dengan sedikit kolom (mis. Bulan + 1-2 nilai) dibuat menyesuaikan
    // lebar isinya sendiri, bukan melebar penuh seperti tabel data yang
    // kolomnya banyak — biar tidak kelihatan kosong/kegedean. Gaya "polos"
    // (dulu cuma dipakai tabel kolom banyak) sekarang dipakai semua tabel
    // biar layoutnya konsisten satu gaya, contohnya seperti tabel Data Aksi
    var ringkas = kolom.length <= 3;
    // kolom pertama biasanya nomor urut (rata tengah, sempit) — tapi kalau
    // isinya kalimat panjang (mis. "Ancaman"), biar rata kiri seperti kolom lain
    var kolom1Teks = !!b.kolomPertamaTeks;
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="bungkus-tabel' + (ringkas ? " bungkus-tabel-ringkas" : "") + '"><table class="tabel polos' + (kolom1Teks ? " kolom1-teks" : "") + '">' +
        "<thead><tr>" + kolom.map(function (k) { return "<th>" + esc(k) + "</th>"; }).join("") + "</tr></thead>" +
        "<tbody>" + isi + "</tbody></table></div>" +
      "</div></section>"
    );
  };

  blok.akordeon = function (b) {
    var grupList = b.grup || [];
    if (!grupList.length) return "";
    var isi = grupList.map(function (g) {
      var item = g.item || [];
      return (
        '<div class="akordeon-grup">' +
          '<button class="akordeon-kepala" type="button">' +
            "<span>" + esc(g.judul) + "</span>" +
            '<span class="panah">▾</span>' +
          "</button>" +
          '<div class="akordeon-badan"><ul class="akordeon-daftar">' +
            item.map(function (it) {
              return '<li><span class="keg">' + esc(it.kegiatan) + '</span><span class="jum">' + esc(it.jumlah) + "</span></li>";
            }).join("") +
          "</ul></div>" +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="akordeon">' +
        '<div class="akordeon-legenda"><span>Kegiatan</span><span>Jumlah / Capaian</span></div>' +
        isi +
      "</div>" +
      "</div></section>"
    );
  };

  // skala warna risiko: hijau (aman) -> oranye -> merah (paling rentan)
  var WARNA_KELAS = {
    "Tinggi": "#d32f2f",
    "Sedang": "#f57c00",
    "Rendah": "#43a047",
  };
  var URUTAN_KELAS = ["Tinggi", "Sedang", "Rendah"];

  function lencanaKelas(kelas) {
    var warna = WARNA_KELAS[kelas] || "#43a047";
    return '<span class="peringkat-kelas"><i class="titik" style="background:' + warna + '"></i>' + esc(kelas) + "</span>";
  }

  // warna netral (biru utama situs) dipakai kalau baris tidak punya
  // "kelas" — misalnya data yang tidak berupa tingkat risiko (suhu),
  // biar tidak ikut memakai hijau/merah yang berarti "aman/bahaya"
  var WARNA_NETRAL = "#2A56D6";

  blok.peringkat = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var angka = function (s) { return parseFloat(String(s).replace(",", ".")) || 0; };
    var dasar = angka(b.minimal || 0);
    var maks = b.maksimal || Math.max.apply(null, item.map(function (i) { return angka(i.nilai); }));
    var adaKelas = item.some(function (i) { return i.kelas; });
    var baris = item.map(function (i) {
      var persen = Math.max(4, Math.min(100, ((angka(i.nilai) - dasar) / (maks - dasar)) * 100));
      var warna = i.kelas ? (WARNA_KELAS[i.kelas] || "#43a047") : WARNA_NETRAL;
      return (
        '<div class="peringkat-baris">' +
          '<div class="peringkat-label">' + esc(i.label) + "</div>" +
          '<div class="peringkat-bar-bungkus">' +
            '<div class="peringkat-bar" data-lebar="' + persen + '" style="width:0%;background:' + warna + '"></div>' +
          "</div>" +
          '<div class="peringkat-nilai">' + esc(i.nilai) + "</div>" +
          (i.kelas ? lencanaKelas(i.kelas) : "") +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="kartu-putih peringkat-daftar' + (adaKelas ? "" : " peringkat-daftar-polos") + '">' + baris + "</div>" +
      "</div></section>"
    );
  };

  blok["peringkat-ganda"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var seri = b.seri || [{ nama: "Seri A", kode: "A" }, { nama: "Seri B", kode: "B" }];
    var satuSeri = seri.length === 1; // 1 seri: label kode & legenda seri tak perlu, judul bagian sudah cukup jelas
    var angka = function (s) { return parseFloat(String(s).replace(",", ".")) || 0; };
    var dasar = angka(b.minimal || 0);
    var maks = b.maksimal || Math.max.apply(null, item.map(function (i) {
      return Math.max.apply(null, (i.nilai || []).map(angka));
    }));
    var adaKelas = item.some(function (i) { return (i.kelas || []).some(function (k) { return k; }); });
    var kolom = item.map(function (i) {
      var batang = seri.map(function (s, idx) {
        var nilai = i.nilai[idx], kelas = i.kelas[idx];
        var persen = Math.max(4, Math.min(100, ((angka(nilai) - dasar) / (maks - dasar)) * 100));
        var warna = kelas ? (WARNA_KELAS[kelas] || "#43a047") : WARNA_NETRAL;
        var tip = "<b>" + esc(i.label) + "</b><span>" + esc(s.nama) + ": " + esc(nilai) + "</span>" + (kelas ? lencanaKelas(kelas) : "");
        return (
          '<div class="vbar-satu" data-tip="' + esc(tip) + '">' +
            '<div class="vbar-bungkus"><div class="vbar-isi" data-tinggi="' + persen + '" style="height:0%;background:' + warna + '"></div></div>' +
            (satuSeri ? "" : '<span class="vbar-seri">' + esc(s.kode) + "</span>") +
          "</div>"
        );
      }).join("");
      return (
        '<div class="vbar-kolom">' +
          '<div class="vbar-grup">' + batang + "</div>" +
          '<div class="vbar-label">' + esc(i.label) + "</div>" +
        "</div>"
      );
    }).join("");
    var jumlahTik = 5;
    var sumbuY = "";
    for (var t = jumlahTik; t >= 0; t--) {
      var nilaiTik = Math.round((dasar + (maks - dasar) * t / jumlahTik) * 10) / 10;
      sumbuY += "<span>" + esc(String(nilaiTik).replace(".", ",")) + "</span>";
    }
    var seriKeterangan = satuSeri ? "" : seri.map(function (s) {
      return '<span class="legenda-kotak-item legenda-seri"><b>' + esc(s.kode) + "</b> = " + esc(s.nama) + "</span>";
    }).join("");
    var legendaKelas = !adaKelas ? "" : URUTAN_KELAS.map(function (k) {
      return '<span class="legenda-kotak-item"><i class="kotak" style="background:' + (WARNA_KELAS[k] || "#43a047") + '"></i>' + esc(k) + "</span>";
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="kartu-putih vbar-kartu' + (satuSeri ? " vbar-kartu-rapat" : "") + '">' +
        '<div class="vbar-tooltip"></div>' +
        '<div class="vbar-plot">' +
          '<div class="vbar-sumbu-y">' + sumbuY + "</div>" +
          '<div class="vbar-scroll"><div class="vbar-area">' +
            '<div class="vbar-grid"></div>' +
            '<div class="vbar-chart">' + kolom + "</div>" +
          "</div></div>" +
        "</div>" +
        (seriKeterangan || legendaKelas ? '<div class="legenda-kotak">' + seriKeterangan + legendaKelas + "</div>" : "") +
      "</div>" +
      "</div></section>"
    );
  };

  blok["kartu-data"] = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    var isi = item.map(function (i) {
      return (
        '<div class="kartu-data-sel efek-sorot">' +
          (i.prioritas ? '<span class="kartu-data-prioritas p' + esc(i.prioritas) + '">Prioritas ' + esc(i.prioritas) + "</span>" : "") +
          "<h3>" + esc(i.judul) + "</h3>" +
          '<dl class="kartu-data-field">' +
            (i.field || []).map(function (f) {
              return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.nilai) + "</dd></div>";
            }).join("") +
          "</dl>" +
        "</div>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-kartu-data">' + isi + "</div>" +
      "</div></section>"
    );
  };

  blok.struktur = function (b) {
    // dukung format lama (item = daftar datar) dan baru (baris = bagan)
    var baris = b.baris;
    if (!baris && b.item) baris = (b.item || []).map(function (i) { return [i]; });
    baris = baris || [];

    function kotak(i) {
      return '<div class="org-sel"><div class="org-jabatan">' + esc(i.unsur) + "</div>" +
        '<div class="org-nama">' +
          (i.personel || []).map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("") +
        "</div></div>";
    }

    var chart = baris.map(function (r, idx) {
      var isiRow = (r || []).map(kotak).join("");
      var cabang = (r || []).length > 1;
      // kalau baris sebelumnya JUGA bercabang (mis. Sekretaris/Bendahara), baris ini
      // "melompati" baris sebelumnya dan tersambung langsung ke induk baris sebelumnya
      // itu (mis. Ketua) — supaya semuanya tampak sejajar sebagai anak dari induk yang sama.
      var lompatInduk = idx > 1 && (baris[idx - 1] || []).length > 1;
      var kelas = "org-baris" + (idx > 0 ? " punya-atas" : "") + (cabang ? " cabang" : "") +
        (lompatInduk ? " lompat-induk" : "");
      var dataLompat = lompatInduk ? ' data-lompat-indeks="' + (idx - 2) + '"' : "";
      return '<div class="' + kelas + '"' + dataLompat + ">" + isiRow + "</div>";
    }).join("");

    var isiBagan = '<div class="org-bungkus"><div class="org">' + chart + "</div></div>";
    if (b.bisaDitutup) {
      return (
        '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
        '<div class="akordeon akordeon-tunggal mulai-tertutup">' +
          '<div class="akordeon-grup">' +
            '<button class="akordeon-kepala" type="button">' +
              "<span>" + esc(b.labelTombol || "Lihat Bagan Struktur") + "</span>" +
              '<span class="panah">▾</span>' +
            "</button>" +
            '<div class="akordeon-badan">' + isiBagan + "</div>" +
          "</div>" +
        "</div>" +
        "</div></section>"
      );
    }
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) + isiBagan +
      "</div></section>"
    );
  };

  blok.sorotan = function (b) {
    var item = b.item || [];
    if (!item.length) return "";
    return (
      '<section class="seksi seksi-sorotan"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="bento">' +
        item.map(function (i, n) {
          var kelas = "bento-sel" + (n === 0 ? " bento-besar" : "");
          var isi = i.src
            ? '<img src="' + esc(i.src) + '" alt="' + esc(i.judul) + '" loading="lazy">'
            : '<div class="isi-kosong"><span class="ikon-kosong">📷</span></div>';
          return '<figure class="' + kelas + '">' + isi +
            (i.judul ? '<figcaption>' + esc(i.judul) + "</figcaption>" : "") +
            "</figure>";
        }).join("") +
      "</div></div></section>"
    );
  };

  blok.gambar = function (b) {
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-gambar">' +
        (b.item || []).map(function (i) {
          var isi = i.src
            ? '<img src="' + esc(i.src) + '" alt="' + esc(i.judul) + '">'
            : '<div class="isi-kosong"><span class="ikon-kosong">🗺️</span><span>Gambar belum dilampirkan</span></div>';
          return '<figure class="bingkai-gambar">' + isi +
            "<figcaption><b>" + esc(i.judul) + "</b>" + esc(i.caption || "") + "</figcaption></figure>";
        }).join("") +
      "</div></div></section>"
    );
  };

  // satu kartu video (dipakai blok.video di halaman masing-masing, dan
  // dipakai ulang di tab Video halaman Galeri) — klik-nya otomatis
  // kepasang lewat pasangVideo() di app.js selama masih pakai kelas
  // "kartu-video bisa-klik" dan data-video-* ini
  function kartuVideo(i, idx) {
    var idYt = i.src ? idYoutube(i.src) : null;
    var pratonton;
    if (idYt) {
      pratonton =
        '<div class="pratonton-video" style="background-image:url(\'https://img.youtube.com/vi/' + esc(idYt) + "/hqdefault.jpg')\">" +
        '<span class="tombol-putar"><svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg></span>' +
        "</div>";
    } else if (i.src) {
      pratonton =
        '<div class="pratonton-video"' + (i.poster ? " style=\"background-image:url('" + esc(i.poster) + "')\"" : "") + '>' +
        '<span class="tombol-putar"><svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg></span>' +
        "</div>";
    } else {
      var ikon = ikonVideo(i.judul);
      pratonton =
        '<div class="pratonton-video kosong">' +
        '<span class="nomor-video">' + String(idx + 1).padStart(2, "0") + "</span>" +
        (ikon
          ? '<span class="ikon-tema-video"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ikon + "</svg></span>"
          : "") +
        '<span class="tombol-putar"><svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg></span>' +
        '<span class="label-segera">Segera hadir</span>' +
        "</div>";
    }
    var atributKlik =
      ' data-video-yt="' + esc(idYt || "") + '" data-video-src="' + esc(idYt ? "" : i.src || "") +
      '" data-video-judul="' + esc(i.judul || "") + '" data-video-caption="' + esc(i.caption || "") + '"';
    return '<figure class="kartu-video bisa-klik"' + atributKlik + ">" + pratonton +
      "<figcaption><b>" + esc(i.judul) + "</b>" + esc(i.caption || "") + "</figcaption></figure>";
  }

  blok.video = function (b) {
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-video">' + (b.item || []).map(kartuVideo).join("") + "</div>" +
      "</div></section>"
    );
  };

  function kartuArtikel(a) {
    return (
      '<a class="kartu-artikel" href="#/artikel/' + esc(a.id) + '" data-kat="' + esc(a.kategori || "") + '">' +
        (a.gambar ? '<img class="sampul" src="' + esc(a.gambar) + '" alt="' + esc(a.judul) + '">' : "") +
        (a.kategori ? '<span class="tanda">' + esc(a.kategori) + "</span>" : "") +
        '<div class="badan">' +
          '<span class="tanggal">' + tglIndo(a.tanggal) + "</span>" +
          "<h3>" + esc(a.judul) + "</h3>" +
          "<p>" + esc(a.ringkasan) + "</p>" +
          '<span class="lanjut">Baca selengkapnya →</span>' +
        "</div></a>"
    );
  }

  function urutArtikel() {
    return S.data.artikel.slice().sort(function (a, b) {
      return String(b.tanggal || "").localeCompare(String(a.tanggal || ""));
    });
  }

  blok["artikel-terbaru"] = function (b) {
    var daftar = urutArtikel().slice(0, b.jumlah || 3);
    if (!daftar.length) return "";
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="grid-artikel">' + daftar.map(kartuArtikel).join("") + "</div>" +
      '<p style="margin-top:18px"><a class="tombol tombol-garis-terang" href="#/artikel">Lihat semua artikel</a></p>' +
      "</div></section>"
    );
  };

  blok["daftar-artikel"] = function (b) {
    var daftar = urutArtikel();
    if (!daftar.length) {
      return '<section class="seksi"><div class="wadah">' + kepalaSeksi(b || {}) + '<div class="kosong-galeri">' +
        '<div class="ikon-kosong">📄</div><p>Belum ada artikel. Tambahkan lewat halaman Admin.</p></div></div></section>';
    }
    var kategori = [];
    daftar.forEach(function (a) {
      if (a.kategori && kategori.indexOf(a.kategori) === -1) kategori.push(a.kategori);
    });
    var filter = kategori.length
      ? '<div class="filter-galeri" id="filter-artikel">' +
          '<button class="pil aktif" data-kat="">Semua (' + daftar.length + ")</button>" +
          kategori.map(function (k) {
            var n = daftar.filter(function (a) { return a.kategori === k; }).length;
            return '<button class="pil" data-kat="' + esc(k) + '">' + esc(k) + " (" + n + ")</button>";
          }).join("") +
        "</div>"
      : "";
    return '<section class="seksi"><div class="wadah">' + kepalaSeksi(b || {}) + filter +
      '<div class="grid-artikel" id="grid-artikel">' +
      daftar.map(kartuArtikel).join("") + "</div></div></section>";
  };

  function selFoto(g, indeks) {
    return (
      '<figure class="foto" data-foto="' + indeks + '" data-kat="' + esc(g.kategori || "") + '">' +
        '<img src="' + esc(g.file) + '" alt="' + esc(g.judul) + '" loading="lazy">' +
        (g.kategori ? '<span class="tanda">' + esc(g.kategori) + "</span>" : "") +
        '<figcaption class="keterangan">' + esc(g.judul) + "</figcaption>" +
      "</figure>"
    );
  }

  // pilih foto galeri sesuai kategori (dan opsional sub-kelompok "judul" + offset "mulai") —
  // dipakai supaya beberapa halaman yang berbagi satu kategori tidak menampilkan foto yang sama persis
  function pilihFotoGaleri(b) {
    var semua = S.data.galeri;
    var lewati = b.mulai || 0;
    var pilih = [];
    for (var i = 0; i < semua.length && pilih.length < (b.jumlah || 8); i++) {
      var cocok = (!b.kategori || semua[i].kategori === b.kategori) && (!b.sub || semua[i].judul === b.sub);
      if (!cocok) continue;
      if (lewati > 0) { lewati--; continue; }
      pilih.push({ g: semua[i], i: i });
    }
    return pilih;
  }

  blok["galeri-cuplikan"] = function (b) {
    var pilih = pilihFotoGaleri(b);
    if (!pilih.length) return "";
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="carousel-bungkus">' +
        '<button class="carousel-tombol carousel-prev" type="button" aria-label="Sebelumnya">' + PANAH_SVG + "</button>" +
        '<div class="carousel-galeri">' + pilih.map(function (p) { return selFoto(p.g, p.i); }).join("") + "</div>" +
        '<button class="carousel-tombol carousel-next" type="button" aria-label="Berikutnya">' + PANAH_SVG + "</button>" +
      "</div>" +
      '<p style="margin-top:18px"><a class="tombol tombol-garis-terang" href="#/galeri">Buka galeri lengkap</a></p>' +
      "</div></section>"
    );
  };

  // dokumentasi versi "tumpukan foto" ala polaroid — ukuran kecil (sesuai resolusi asli, jadi tetap tajam),
  // kartu paling depan otomatis terkocok/bergeser ke belakang bergantian, isyarat foto & judulnya
  blok["galeri-transisi"] = function (b) {
    var pilih = pilihFotoGaleri(b).map(function (p) { return p.g; });
    if (!pilih.length) return "";
    var kartu = pilih.map(function (g, idx) {
      return (
        '<figure class="tumpuk-kartu" data-judul="' + esc(g.judul) + '">' +
          '<img src="' + esc(g.file) + '" alt="' + esc(g.judul) + '" loading="lazy">' +
        "</figure>"
      );
    }).join("");
    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) +
      '<div class="tumpuk-panggung">' +
        '<div class="tumpuk-stack">' + kartu + "</div>" +
      "</div>" +
      '<div class="tumpuk-info">' +
        '<span class="tumpuk-keterangan">' + esc(pilih[0].judul) + "</span>" +
        '<span class="tumpuk-hitung">1 / ' + pilih.length + "</span>" +
      "</div>" +
      '<p style="margin-top:14px"><a class="tombol tombol-garis-terang" href="#/galeri">Buka galeri lengkap</a></p>' +
      "</div></section>"
    );
  };

  blok["galeri-penuh"] = function (b) {
    b = b || {};
    var semua = S.data.galeri;
    var itemVideo = (b.video && b.video.item) || [];

    if (!semua.length && !itemVideo.length) {
      return '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) + '<div class="kosong-galeri">' +
        '<div class="ikon-kosong">🖼️</div><p>Galeri masih kosong. Tambahkan foto lewat halaman Admin.</p></div></div></section>';
    }

    var kategori = S.kategoriGaleri();
    var pil =
      '<div class="filter-galeri" id="filter-galeri">' +
        '<button class="pil aktif" data-kat="">Semua (' + semua.length + ")</button>" +
        kategori.map(function (k) {
          var n = semua.filter(function (g) { return g.kategori === k; }).length;
          return '<button class="pil" data-kat="' + esc(k) + '">' + esc(k) + " (" + n + ")</button>";
        }).join("") +
        (itemVideo.length ? '<button class="pil" data-kat="__video__">Video (' + itemVideo.length + ")</button>" : "") +
      "</div>";

    var gridFoto = !semua.length
      ? '<div class="kosong-galeri"><div class="ikon-kosong">🖼️</div><p>Belum ada foto. Tambahkan lewat halaman Admin.</p></div>'
      : '<div class="galeri-masonry" id="grid-galeri">' + semua.map(function (g, i) { return selFoto(g, i); }).join("") + "</div>";

    var gridVideo = itemVideo.length
      ? '<div class="grid-video" id="grid-galeri-video" style="display:none">' + itemVideo.map(kartuVideo).join("") + "</div>"
      : "";

    return (
      '<section class="seksi"><div class="wadah">' + kepalaSeksi(b) + pil + gridFoto + gridVideo + "</div></section>"
    );
  };

  /* =============== BANNER KELEMBAGAAN (khusus 8 sub-halaman menu Kelembagaan) =============== */
  // ikon garis (bukan emoji) untuk header tiap sub-halaman Kelembagaan
  var IKON_KLB = {
    "klb-lembaga": '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L24 8l18 10"/><path d="M8 18h32"/><path d="M11 18v18M18 18v18M24 18v18M30 18v18M37 18v18"/><path d="M6 40h36"/></svg>',
    "klb-partisipasi": '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M34 42v-4a8 8 0 0 0-8-8H10a8 8 0 0 0-8 8v4"/><circle cx="18" cy="14" r="8"/><path d="M46 42v-4a8 8 0 0 0-6-7.74"/><path d="M32 6.26a8 8 0 0 1 0 15.48"/></svg>',
    "klb-eksternal": '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18"/><path d="M6 24h36"/><path d="M24 6c5 5 8 11 8 18s-3 13-8 18c-5-5-8-11-8-18s3-13 8-18z"/></svg>',
    "klb-data": '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14a2 2 0 0 1 2-2h10l4 5h18a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V14z"/></svg>',
  };

  function bannerKelembagaan(hal) {
    return (
      '<section class="klb-banner klb-banner--' + esc(hal.id) + '">' +
        '<span class="klb-banner-blob klb-blob-1"></span>' +
        '<span class="klb-banner-blob klb-blob-2"></span>' +
        '<div class="wadah klb-banner-isi">' +
          '<div class="klb-banner-baris">' +
            '<div class="klb-banner-ikon">' + (IKON_KLB[hal.id] || IKON_KLB["klb-lembaga"]) + "</div>" +
            '<div class="klb-banner-teks">' +
              "<h1>" + esc(hal.judul) + "</h1>" +
              (hal.subjudul ? '<p>' + kaya(hal.subjudul) + "</p>" : "") +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* =============== HALAMAN =============== */
  R.halaman = function (hal) {
    // header teks (judul+subjudul) sengaja ditiadakan di semua halaman menu — nav sudah
    // menandai menu aktif, dan tiap halaman membuka langsung dengan kontennya sendiri.
    // Beranda tidak pernah pakai ini (blok pertamanya "hero").
    // Pengecualian: 8 sub-halaman menu "Kelembagaan" tampil dengan banner + chip-nav sendiri
    // agar terasa sebagai satu bagian yang punya identitas visual lebih hidup.
    var isi = (hal.blok || []).map(function (b) {
      if (!b) return "";
      var f = blok[b.tipe];
      return f ? f(b) : "";
    }).join("");

    if (/^klb-/.test(hal.id)) {
      return '<div class="hal-kelembagaan">' + bannerKelembagaan(hal) + isi + "</div>";
    }
    return isi;
  };

  /* =============== DETAIL ARTIKEL =============== */
  R.artikel = function (a) {
    var lain = urutArtikel().filter(function (x) { return x.id !== a.id; }).slice(0, 3);
    return (
      '<div class="kepala-halaman"><div class="wadah">' +
        '<a class="tautan-kembali" href="#/' + esc(S.halamanPertama()) + '">← Kembali ke Beranda</a>' +
        "<h1>" + esc(a.judul) + "</h1>" +
        '<div class="meta">' + tglIndo(a.tanggal) + (a.penulis ? " • " + esc(a.penulis) : "") + "</div>" +
      "</div></div>" +
      '<section class="seksi"><div class="wadah"><div class="artikel-isi">' +
        (a.gambar ? '<img class="sampul" src="' + esc(a.gambar) + '" alt="' + esc(a.judul) + '">' : "") +
        (a.isi || []).map(function (p) { return "<p>" + kaya(p) + "</p>"; }).join("") +
      "</div></div></section>" +
      (lain.length
        ? '<section class="seksi"><div class="wadah"><h2>Artikel Lainnya</h2>' +
          '<div class="grid-artikel">' + lain.map(kartuArtikel).join("") + "</div></div></section>"
        : "")
    );
  };

  R.tidakDitemukan = function (ruta) {
    return (
      '<div class="kepala-halaman"><div class="wadah"><h1>Halaman tidak ditemukan</h1>' +
      "<p>Alamat <b>#/" + esc(ruta) + "</b> tidak tersedia.</p></div></div>" +
      '<section class="seksi"><div class="wadah"><p><a class="tombol tombol-garis-terang" href="#/' +
      esc(S.halamanPertama()) + '">Kembali ke beranda</a></p></div></section>'
    );
  };

  R.esc = esc;
  R.tglIndo = tglIndo;
  window.Render = R;
})();
