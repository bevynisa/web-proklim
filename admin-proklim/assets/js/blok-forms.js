/* =========================================================
   BLOK-FORMS — form isian untuk tiap jenis "bagian halaman".
   Satu jenis bagian (contoh: "statistik") dipakai di beberapa
   halaman berbeda, tapi bentuk form-nya sama persis, jadi
   cukup ditulis satu kali di sini lalu dipakai berulang.

   Tiap data (misalnya satu angka capaian, satu kartu, satu
   kegiatan) diisi lewat KARTU TERPISAH dengan field masing-
   masing — bukan satu baris teks panjang — supaya gampang
   dibaca dan tidak membingungkan.
   ========================================================= */
(function () {
  "use strict";
  var esc = UI.esc;

  function idBlok(kunci, key) { return "blok__" + kunci + "__" + key.replace(/\./g, "__"); }

  /* ---------- potongan form dasar (field tunggal, bukan daftar) ---------- */
  function fTeks(kunci, key, label, nilai, hint, placeholder) {
    var id = idBlok(kunci, key);
    return (
      '<div class="field"><label for="' + id + '">' + esc(label) + "</label>" +
      '<input type="text" id="' + id + '" value="' + esc(nilai || "") + '" placeholder="' + esc(placeholder || "") + '">' +
      (hint ? '<p class="hint">' + esc(hint) + "</p>" : "") +
      "</div>"
    );
  }
  function fArea(kunci, key, label, nilai, hint, tinggi) {
    var id = idBlok(kunci, key);
    return (
      '<div class="field"><label for="' + id + '">' + esc(label) + "</label>" +
      '<textarea id="' + id + '" style="min-height:' + (tinggi || 90) + 'px">' + esc(nilai || "") + "</textarea>" +
      (hint ? '<p class="hint">' + esc(hint) + "</p>" : "") +
      "</div>"
    );
  }
  function fGambar(kunci, key, label, urlSekarang, hint) {
    var id = idBlok(kunci, key);
    return (
      '<div class="field"><label>' + esc(label) + "</label>" +
      '<div class="pratinjau-gambar">' +
      (urlSekarang ? '<img id="' + id + '-pratinjau" src="' + esc(urlSekarang) + '" alt="">' : '<img id="' + id + '-pratinjau" src="" alt="" style="display:none">') +
      '<div><input type="file" accept="image/*" data-imgfor="' + id + '"><input type="hidden" id="' + id + '" value="' + esc(urlSekarang || "") + '"></div>' +
      "</div>" +
      (hint ? '<p class="hint">' + esc(hint) + "</p>" : "") +
      "</div>"
    );
  }
  function nilaiId(id) { return UI.nilai(id); }

  /* ---------- daftar berjenjang (kelompok berisi sub-daftar): dipakai
     oleh akordeon (Kelompok Kegiatan > Kegiatan), tab (Tab > Poin), dan
     evaluasi-tab (Kelompok > Baris) ---------- */
  function kartuKelompok(cfg, data) {
    data = data || {};
    var innerId = UI.idUnik("sub");
    var subMentah = data[cfg.subKeyName] || [];
    var subItems = cfg.subPolos ? subMentah.map(function (s) { return { teks: s }; }) : subMentah;
    return (
      '<div class="kelompok-item">' +
      '<div class="kelompok-head">' +
      '<input type="text" class="input-judul-kelompok" value="' + esc(data.judul || "") + '" placeholder="' + esc(cfg.placeholderJudulKelompok || "") + '">' +
      '<button type="button" class="tombol tombol-luar tombol-kecil" data-repeater-hapus>Hapus ' + esc(cfg.satuanKelompok) + "</button>" +
      "</div>" +
      UI.repeaterFlat(innerId, cfg.labelSub, cfg.hintSub, subItems, cfg.kolomSub, cfg.satuanSub) +
      "</div>"
    );
  }
  function renderKelompokBerjenjang(kunci, outerKeyName, list, cfg) {
    var outerId = idBlok(kunci, outerKeyName) + "__daftar";
    UI.daftarTambahKustom(outerId, function () { return kartuKelompok(cfg, {}); });
    var isi = (list || []).map(function (d) { return kartuKelompok(cfg, d); }).join("");
    return (
      '<div class="field"><label>' + esc(cfg.labelDaftar) + "</label>" +
      (cfg.hintDaftar ? '<p class="hint">' + esc(cfg.hintDaftar) + "</p>" : "") +
      '<div id="' + outerId + '" class="daftar-kelompok">' + isi + "</div>" +
      '<button type="button" class="tombol tombol-luar tombol-kecil" data-repeater-tambah-kustom="' + outerId + '">+ Tambah ' + esc(cfg.satuanKelompok) + "</button>" +
      "</div>"
    );
  }
  function bacaKelompokBerjenjang(kunci, outerKeyName, cfg) {
    var outerId = idBlok(kunci, outerKeyName) + "__daftar";
    var wadah = document.getElementById(outerId);
    if (!wadah) return [];
    return Array.prototype.slice.call(wadah.querySelectorAll(":scope > .kelompok-item")).map(function (kartu) {
      var judul = kartu.querySelector(".input-judul-kelompok").value.trim();
      if (!judul) return null;
      var tabelDalam = kartu.querySelector(".tabel-repeater");
      var sub = tabelDalam ? UI.bacaRepeaterFlat(tabelDalam.id) : [];
      if (cfg.subPolos) sub = sub.map(function (o) { return o.teks; }).filter(Boolean);
      var obj = { judul: judul };
      obj[cfg.subKeyName] = sub;
      return obj;
    }).filter(Boolean);
  }

  /* ---------- Kelompok A: judul + daftar kartu {judul, teks} ---------- */
  var KOLOM_JUDUL_TEKS = [{ key: "judul", label: "Judul" }, { key: "teks", label: "Penjelasan", tipe: "textarea" }];
  function renderA(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas bagian ini.") +
      UI.repeaterFlat(id, "Daftar Isi", "Satu kartu untuk satu poin.", k.item, KOLOM_JUDUL_TEKS, "Poin");
  }
  function bacaA(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok B: judul + gambar tunggal + daftar {judul, teks} ---------- */
  function renderB(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas bagian ini.") +
      fGambar(kunci, "gambar", "Foto Pendamping", k.gambar, "Foto yang tampil di samping daftar ini (boleh dikosongkan).") +
      UI.repeaterFlat(id, "Daftar Isi", "Satu kartu untuk satu poin.", k.item, KOLOM_JUDUL_TEKS, "Poin");
  }
  function bacaB(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.gambar = nilaiId(idBlok(kunci, "gambar"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok C: rencana-kerja ---------- */
  var KOLOM_RENCANA = [
    { key: "judul", label: "Judul" }, { key: "teks", label: "Penjelasan", tipe: "textarea" },
    { key: "target", label: "Target (boleh kosong)" }, { key: "pj", label: "Penanggung Jawab (boleh kosong)" },
  ];
  function renderC(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas bagian ini.") +
      UI.repeaterFlat(id, "Daftar Rencana Kerja", "Satu kartu untuk satu rencana kerja.", k.item, KOLOM_RENCANA, "Rencana Kerja");
  }
  function bacaC(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok D: statistik (angka capaian) ---------- */
  var KOLOM_STATISTIK = [
    { key: "angka", label: "Angka", lebar: "110px" }, { key: "satuan", label: "Satuan", lebar: "110px" },
    { key: "label", label: "Label" }, { key: "ket", label: "Keterangan (boleh kosong)", tipe: "textarea" },
  ];
  function renderD(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas kotak-kotak angka ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Kalimat pendek di bawah judul (boleh dikosongkan).", 60) : "") +
      UI.repeaterFlat(id, "Daftar Angka Capaian", "Satu kartu untuk satu kotak angka. Contoh: Angka \"500\", Satuan \"unit\", Label \"Lubang biopori\".", k.item, KOLOM_STATISTIK, "Angka Capaian");
  }
  function bacaD(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok E: kartu (kartu berfoto) ---------- */
  var KOLOM_KARTU = [
    { key: "gambar", label: "Foto", tipe: "gambar" }, { key: "judul", label: "Judul" },
    { key: "teks", label: "Penjelasan", tipe: "textarea" }, { key: "tujuan", label: "Tautan tujuan (boleh kosong, contoh: #/adaptasi)" },
  ];
  function renderE(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas kartu-kartu ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Kalimat pendek di bawah judul (boleh dikosongkan).", 60) : "") +
      UI.repeaterFlat(id, "Daftar Kartu", "Satu kartu isian untuk satu kartu yang tampil di website.", k.item, KOLOM_KARTU, "Kartu");
  }
  function bacaE(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok F: gambar (peta/foto tunggal berdaftar) ---------- */
  var KOLOM_GAMBAR = [
    { key: "src", label: "Foto", tipe: "gambar" }, { key: "judul", label: "Judul" },
    { key: "caption", label: "Keterangan", tipe: "textarea" },
  ];
  function renderF(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas gambar ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Penjelasan di bawah judul (boleh dikosongkan).", 70) : "") +
      UI.repeaterFlat(id, "Daftar Gambar", "Satu kartu untuk satu gambar.", k.item, KOLOM_GAMBAR, "Gambar");
  }
  function bacaF(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok N: video ---------- */
  var KOLOM_VIDEO = [
    { key: "src", label: "Tautan Video" }, { key: "judul", label: "Judul" },
    { key: "caption", label: "Keterangan", tipe: "textarea" },
  ];
  function renderN(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas video ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Penjelasan di bawah judul (boleh dikosongkan).", 70) : "") +
      UI.repeaterFlat(id, "Daftar Video", 'Satu kartu untuk satu video. Kolom "Tautan Video" diisi alamat YouTube (contoh: https://youtube.com/watch?v=xxxx) atau alamat file video. Boleh dikosongkan dulu kalau videonya belum siap — nanti tampil sebagai "Video segera hadir" di website.', k.item, KOLOM_VIDEO, "Video");
  }
  function bacaN(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok T: tabel data (kolom bebas, misalnya Data Aksi) ---------- */
  function renderT(kunci, k) {
    var kolomHeader = k.kolom || [];
    var id = idBlok(kunci, "baris");
    var kolomRepeater = kolomHeader.map(function (h, i) { return { key: "c" + i, label: h || "Kolom " + (i + 1) }; });
    var itemUntukForm = (k.baris || []).map(function (row) {
      var obj = {};
      (row || []).forEach(function (v, i) { obj["c" + i] = v; });
      return obj;
    });
    return (
      fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas tabel ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Penjelasan di bawah judul (boleh dikosongkan).", 60) : "") +
      fArea(kunci, "kolom", "Nama Kolom Tabel", kolomHeader.join(" | "),
        'Nama tiap kolom tabel, dipisah dengan tanda " | ". Contoh: "No | Kategori | Bentuk Aksi | Nama Kegiatan | Lokasi | Pelaksana | Output/Hasil | Manfaat". ' +
        "Kalau menambah/mengurangi kolom di sini, klik Simpan Perubahan dulu, baru buka lagi bagian ini supaya isian baris di bawah ikut menyesuaikan.", 60) +
      UI.repeaterFlat(id, "Daftar Baris Data", "Satu baris untuk satu kegiatan/data.", itemUntukForm, kolomRepeater, "Baris")
    );
  }
  function bacaT(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    h.kolom = nilaiId(idBlok(kunci, "kolom")).split("|").map(function (s) { return s.trim(); }).filter(Boolean);
    var barisObj = UI.bacaRepeaterFlat(idBlok(kunci, "baris"));
    h.baris = barisObj.map(function (obj) {
      return h.kolom.map(function (_, i) { return obj["c" + i] || ""; });
    });
    return h;
  }

  /* ---------- Kelompok G: prestasi ---------- */
  var KOLOM_PRESTASI = [
    { key: "peringkat", label: "Peringkat", lebar: "160px" }, { key: "judul", label: "Nama Penghargaan" },
    { key: "teks", label: "Keterangan (boleh kosong)", tipe: "textarea" },
    { key: "kelas", label: "Jenis", tipe: "select", opsi: ["emas", "perak", "perunggu", "hijau"], lebar: "140px" },
  ];
  function renderG(kunci, k) {
    var id = idBlok(kunci, "item");
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas daftar prestasi ini.") +
      UI.repeaterFlat(id, "Daftar Prestasi", 'Satu kartu untuk satu prestasi. "Jenis" emas/perak/perunggu dipakai untuk 3 prestasi utama yang tampil di podium.', k.item, KOLOM_PRESTASI, "Prestasi");
  }
  function bacaG(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    return h;
  }

  /* ---------- Kelompok H: peringkat-ganda (indeks kerentanan, bisa 2 seri data atau lebih) ---------- */
  function renderH(kunci, k) {
    var seri = (k.seri && k.seri.length) ? k.seri : [{ nama: "Seri 1", kode: "1" }, { nama: "Seri 2", kode: "2" }];
    var id = idBlok(kunci, "item");
    var kolom = [{ key: "label", label: "Nama Dusun / Wilayah" }];
    seri.forEach(function (s, i) {
      kolom.push({ key: "nilai" + i, label: "Nilai " + s.nama, lebar: "110px" });
      kolom.push({ key: "kelas" + i, label: "Kelas " + s.nama, lebar: "140px", tipe: "select", opsi: ["Tinggi", "Sedang", "Rendah"] });
    });
    var itemUntukForm = (k.item || []).map(function (it) {
      var obj = { label: it.label };
      seri.forEach(function (s, i) {
        obj["nilai" + i] = (it.nilai || [])[i] || "";
        obj["kelas" + i] = (it.kelas || [])[i] || "";
      });
      return obj;
    });
    var seriFields = seri.map(function (s, i) {
      return (
        fTeks(kunci, "seri." + i + ".nama", "Nama Kelompok Data " + (i + 1), s.nama, 'Contoh: "Longsor"') +
        fTeks(kunci, "seri." + i + ".kode", "Kode Singkat " + (i + 1), s.kode, 'Huruf pendek, contoh "L". Dipakai di label grafik, harus beda-beda tiap kelompok biar tidak ketuker.')
      );
    }).join("");
    return (
      fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas tabel ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Penjelasan di bawah judul.", 70) : "") +
      '<div class="kolom-fleksibel">' + seriFields + "</div>" +
      UI.repeaterFlat(id, "Daftar Nilai per Dusun", "Satu kartu untuk satu dusun/wilayah.", itemUntukForm, kolom, "Dusun")
    );
  }
  function bacaH(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    var jumlahSeri = (k.seri && k.seri.length) || 2;
    h.seri = [];
    for (var i = 0; i < jumlahSeri; i++) {
      h.seri.push({ nama: nilaiId(idBlok(kunci, "seri." + i + ".nama")), kode: nilaiId(idBlok(kunci, "seri." + i + ".kode")) });
    }
    var baris = UI.bacaRepeaterFlat(idBlok(kunci, "item"));
    h.item = baris.map(function (b) {
      var nilai = [], kelas = [];
      for (var i = 0; i < jumlahSeri; i++) { nilai.push(b["nilai" + i] || ""); kelas.push(b["kelas" + i] || ""); }
      return { label: b.label, nilai: nilai, kelas: kelas };
    });
    return h;
  }

  /* ---------- Kelompok I: teks (tulisan biasa) ---------- */
  function renderI(kunci, k) {
    var html =
      fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas tulisan ini.") +
      fArea(kunci, "paragraf", "Isi Tulisan", UI.keGaris(k.paragraf), "Satu baris = satu paragraf. Boleh pakai <b>tebal</b> dan <i>miring</i>.", 160);
    if (k.sorot) {
      html +=
        fTeks(kunci, "sorot.judul", "Judul Kotak Sorotan", k.sorot.judul, "Judul kotak kutipan yang disorot (boleh dikosongkan).") +
        fArea(kunci, "sorot.teks", "Isi Kotak Sorotan", k.sorot.teks, "Kalimat yang tampil di kotak sorotan.", 70);
    }
    return html;
  }
  function bacaI(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.paragraf = UI.garisKe(nilaiId(idBlok(kunci, "paragraf")));
    if (h.sorot) {
      h.sorot.judul = nilaiId(idBlok(kunci, "sorot.judul"));
      h.sorot.teks = nilaiId(idBlok(kunci, "sorot.teks"));
    }
    return h;
  }

  /* ---------- Kelompok J: hero (banner utama beranda) ---------- */
  var KOLOM_TOMBOL = [{ key: "label", label: "Tulisan Tombol" }, { key: "tujuan", label: "Kode Halaman Tujuan (contoh: #/adaptasi)" }];
  var KOLOM_LATAR = [{ key: "src", label: "Foto", tipe: "gambar" }, { key: "posisi", label: "Posisi (boleh kosong, contoh: center 40%)" }];
  function renderJ(kunci, k) {
    var idTombol = idBlok(kunci, "tombol"), idLatar = idBlok(kunci, "latar");
    return (
      fTeks(kunci, "label", "Label Kecil", k.label, "Teks pendek di atas judul utama.") +
      fTeks(kunci, "judul", "Judul Utama", k.judul, "Judul besar di banner depan website.") +
      fTeks(kunci, "subjudul", "Sub-judul", k.subjudul, "Judul kedua, tampil di bawah judul utama.") +
      fArea(kunci, "teks", "Kalimat Pembuka", k.teks, "Paragraf singkat penjelas di banner depan.", 90) +
      UI.repeaterFlat(idTombol, "Tombol di Banner", "Satu kartu untuk satu tombol.", k.tombol, KOLOM_TOMBOL, "Tombol") +
      UI.repeaterFlat(idLatar, "Foto Latar (bergantian)", "Satu kartu untuk satu foto latar yang bergantian tampil.", k.latar, KOLOM_LATAR, "Foto")
    );
  }
  function bacaJ(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    ["label", "judul", "subjudul"].forEach(function (f) { h[f] = nilaiId(idBlok(kunci, f)); });
    h.teks = nilaiId(idBlok(kunci, "teks"));
    h.tombol = UI.bacaRepeaterFlat(idBlok(kunci, "tombol"));
    h.latar = UI.bacaRepeaterFlat(idBlok(kunci, "latar"));
    return h;
  }

  /* ---------- Kelompok K: tab (Visi & Misi, dsb) — berjenjang ---------- */
  var CFG_TAB = {
    subKeyName: "item", subPolos: true, kolomSub: [{ key: "teks", label: "Poin" }],
    labelJudulKelompok: "Nama Tab", placeholderJudulKelompok: "Contoh: Visi",
    labelSub: "Daftar Poin", hintSub: "Satu kartu untuk satu poin.", satuanSub: "Poin",
    labelDaftar: "Daftar Tab", hintDaftar: "Satu kelompok untuk satu tab.", satuanKelompok: "Tab",
  };
  function renderK(kunci, k) {
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas kelompok tab ini.") +
      renderKelompokBerjenjang(kunci, "tab", k.tab, CFG_TAB);
  }
  function bacaK(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.tab = bacaKelompokBerjenjang(kunci, "tab", CFG_TAB);
    return h;
  }

  /* ---------- Kelompok L: akordeon (tabel kegiatan berkelompok) — berjenjang ---------- */
  var CFG_AKORDEON = {
    subKeyName: "item", subPolos: false, kolomSub: [{ key: "kegiatan", label: "Nama Kegiatan" }, { key: "jumlah", label: "Jumlah / Capaian", lebar: "160px" }],
    labelJudulKelompok: "Nama Kelompok Kegiatan", placeholderJudulKelompok: "Contoh: Pemanenan air hujan",
    labelSub: "Daftar Kegiatan", hintSub: "Satu kartu untuk satu kegiatan.", satuanSub: "Kegiatan",
    labelDaftar: "Daftar Kelompok Kegiatan", hintDaftar: "Satu kelompok bisa berisi beberapa kegiatan.", satuanKelompok: "Kelompok Kegiatan",
  };
  function renderL(kunci, k) {
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas kelompok tabel ini.") +
      renderKelompokBerjenjang(kunci, "grup", k.grup, CFG_AKORDEON);
  }
  function bacaL(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.grup = bacaKelompokBerjenjang(kunci, "grup", CFG_AKORDEON);
    return h;
  }

  /* ---------- Kelompok M: evaluasi-tab — berjenjang ---------- */
  var CFG_EVALUASI = {
    subKeyName: "baris", subPolos: false, kolomSub: [{ key: "label", label: "Nama Baris" }, { key: "isi", label: "Isi", tipe: "textarea" }],
    labelJudulKelompok: "Nama Kelompok", placeholderJudulKelompok: "Contoh: Adaptasi",
    labelSub: "Daftar Baris", hintSub: "Satu kartu untuk satu baris.", satuanSub: "Baris",
    labelDaftar: "Daftar Kelompok Evaluasi", hintDaftar: "Satu kelompok untuk satu topik (contoh: Adaptasi, Mitigasi, Kelembagaan).", satuanKelompok: "Kelompok",
  };
  function renderM(kunci, k) {
    return fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas tabel evaluasi ini.") +
      renderKelompokBerjenjang(kunci, "item", k.item, CFG_EVALUASI);
  }
  function bacaM(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    h.item = bacaKelompokBerjenjang(kunci, "item", CFG_EVALUASI);
    return h;
  }

  /* ---------- Kelompok O: peringkat (grafik batang satu baris per data, mis. curah hujan/suhu bulanan) ---------- */
  var KOLOM_PERINGKAT = [
    { key: "label", label: "Label (mis. nama bulan)" },
    { key: "nilai", label: "Nilai", lebar: "110px" },
    { key: "kelas", label: "Kelas (boleh kosong)", lebar: "140px", tipe: "select", opsi: ["Tinggi", "Sedang", "Rendah"] },
  ];
  function renderO(kunci, k) {
    var id = idBlok(kunci, "item");
    return (
      fTeks(kunci, "judul", "Judul Bagian", k.judul, "Judul yang tampil di atas grafik ini.") +
      (k.deskripsi !== undefined ? fArea(kunci, "deskripsi", "Deskripsi Singkat", k.deskripsi, "Penjelasan di bawah judul (boleh dikosongkan).", 60) : "") +
      '<div class="kolom-fleksibel">' +
      fTeks(kunci, "minimal", "Skala Mulai Dari (boleh kosong)", k.minimal != null ? String(k.minimal) : "", "Kosongkan kalau batang mulai dari 0. Isi angka kalau datanya rentang sempit (contoh: suhu 27-28) biar perbedaan antar baris kelihatan.") +
      fTeks(kunci, "maksimal", "Skala Sampai (boleh kosong)", k.maksimal != null ? String(k.maksimal) : "", "Kosongkan supaya otomatis memakai nilai tertinggi di data.") +
      "</div>" +
      UI.repeaterFlat(id, "Daftar Baris", 'Satu baris untuk satu batang (mis. satu bulan). Kolom "Kelas" boleh dikosongkan kalau datanya bukan tingkat risiko (jadi warna batang netral, tanpa lencana).', k.item, KOLOM_PERINGKAT, "Baris")
    );
  }
  function bacaO(kunci, k) {
    var h = JSON.parse(JSON.stringify(k));
    h.judul = nilaiId(idBlok(kunci, "judul"));
    if (h.deskripsi !== undefined) h.deskripsi = nilaiId(idBlok(kunci, "deskripsi"));
    var minimal = nilaiId(idBlok(kunci, "minimal"));
    var maksimal = nilaiId(idBlok(kunci, "maksimal"));
    if (minimal) h.minimal = Number(minimal); else delete h.minimal;
    if (maksimal) h.maksimal = Number(maksimal); else delete h.maksimal;
    h.item = UI.bacaRepeaterFlat(idBlok(kunci, "item")).map(function (b) {
      var o = { label: b.label || "", nilai: b.nilai || "" };
      if (b.kelas) o.kelas = b.kelas;
      return o;
    });
    return h;
  }

  var PEMETAAN = {
    "checklist": [renderA, bacaA], "kartu-program": [renderA, bacaA], "profil-grid": [renderA, bacaA],
    "arah-alur": [renderA, bacaA], "manfaat-pita": [renderA, bacaA], "rute-jejaring": [renderA, bacaA],
    "profil": [renderB, bacaB], "foto-kartu": [renderB, bacaB],
    "rencana-kerja": [renderC, bacaC],
    "statistik": [renderD, bacaD],
    "kartu": [renderE, bacaE],
    "gambar": [renderF, bacaF],
    "video": [renderN, bacaN],
    "tabel": [renderT, bacaT],
    "prestasi": [renderG, bacaG],
    "peringkat-ganda": [renderH, bacaH],
    "peringkat": [renderO, bacaO],
    "teks": [renderI, bacaI],
    "hero": [renderJ, bacaJ],
    "tab": [renderK, bacaK],
    "akordeon": [renderL, bacaL],
    "evaluasi-tab": [renderM, bacaM],
  };

  window.BlokForms = {
    render: function (blok) {
      var p = PEMETAAN[blok.tipe_blok];
      if (!p) return '<p class="hint">Jenis bagian "' + esc(blok.tipe_blok) + '" belum didukung form-nya.</p>';
      return p[0](blok.kunci_blok, blok.konten || {});
    },
    baca: function (blok) {
      var p = PEMETAAN[blok.tipe_blok];
      if (!p) return blok.konten;
      return p[1](blok.kunci_blok, blok.konten || {});
    },
  };
})();
