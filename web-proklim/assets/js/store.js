/* =========================================================
   STORE — pengelolaan data website, sekarang membaca dari
   Supabase (bukan lagi dari data.js + localStorage). Beberapa
   bagian struktural yang tidak pernah diedit dari admin (ikon
   halaman, urutan menu) tetap disimpan sebagai konstanta di
   sini, bukan di database.
   ========================================================= */

(function () {
  "use strict";

  var cfg = window.PROKLIM_CONFIG || {};
  var db =
    window.supabase && cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY
      ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
      : null;

  var MENU_TETAP = [
    { id: "m-beranda", label: "Beranda", halaman: "beranda" },
    { id: "m-data-dasar", label: "Data Dasar", halaman: "data-dasar" },
    { id: "m-adaptasi", label: "Adaptasi", halaman: "adaptasi" },
    { id: "m-mitigasi", label: "Mitigasi", halaman: "mitigasi" },
    {
      id: "m-kelembagaan",
      label: "Kelembagaan",
      anak: [
        { id: "m-klb-1", label: "Kelembagaan & Kebijakan", halaman: "klb-lembaga" },
        { id: "m-klb-2", label: "Partisipasi & Kapasitas Masyarakat", halaman: "klb-partisipasi" },
        { id: "m-klb-3", label: "Dukungan & Pengembangan", halaman: "klb-eksternal" },
        { id: "m-klb-4", label: "Data & Manfaat Program", halaman: "klb-data" },
      ],
    },
    { id: "m-perencanaan", label: "Perencanaan", halaman: "perencanaan" },
    { id: "m-data-aksi", label: "Data Aksi", halaman: "data-aksi" },
    { id: "m-artikel", label: "Artikel", halaman: "artikel" },
    { id: "m-galeri", label: "Galeri", halaman: "galeri" },
  ];

  // ikon & judul/subjudul tiap halaman — bagian tetap situs, bukan konten
  // yang diedit admin, jadi tidak perlu disimpan di database
  var META_HALAMAN = {
    "data-dasar": {
      ikon: "📊", judul: "Data Dasar",
      subjudul: "Profil singkat dan data statistik dasar Desa Sanggang.",
    },
    adaptasi: {
      ikon: "💧", judul: "Adaptasi Perubahan Iklim",
      subjudul: "Upaya menyesuaikan diri terhadap dampak perubahan iklim: mengamankan air, pangan, dan kesehatan masyarakat.",
    },
    mitigasi: {
      ikon: "🌱", judul: "Mitigasi Perubahan Iklim",
      subjudul: "Upaya menurunkan emisi gas rumah kaca dan meningkatkan serapan karbon di tingkat desa.",
    },
    "klb-lembaga": {
      ikon: "🏛️", judul: "Kelembagaan & Kebijakan",
      subjudul: "Lembaga pelaksana ProKlim, struktur organisasi, serta kebijakan dan kearifan lokal yang mendukung.",
    },
    "klb-partisipasi": {
      ikon: "🤝", judul: "Partisipasi & Kapasitas Masyarakat",
      subjudul: "Keswadayaan warga, penyebaran praktik baik, tokoh lokal, teknologi tepat guna, jejaring, dan prestasi ProKlim.",
    },
    "klb-eksternal": {
      ikon: "🌐", judul: "Dukungan & Pengembangan",
      subjudul: "Dukungan dana, barang, dan jasa dari pemerintah, dunia usaha, dan perguruan tinggi, serta pengembangan kegiatan dari tahun ke tahun.",
    },
    "klb-data": {
      ikon: "🗂️", judul: "Data & Manfaat Program",
      subjudul: "Sistem pencatatan dan pemantauan data aksi, serta manfaat ekonomi, sosial, dan lingkungan yang dirasakan warga.",
    },
    perencanaan: {
      ikon: "🗓️", judul: "Perencanaan",
      subjudul: "Rencana kerja dan program ProKlim Desa Sanggang.",
    },
    "data-aksi": {
      ikon: "📋", judul: "Data Aksi",
      subjudul: "Rekap kegiatan adaptasi dan mitigasi yang telah dilaksanakan di Desa Sanggang.",
    },
    artikel: {
      ikon: "📰", judul: "Artikel",
      subjudul: "Bacaan ringan seputar Program Kampung Iklim dan praktiknya di Desa Sanggang.",
    },
    galeri: {
      ikon: "🖼️", judul: "Galeri",
      subjudul: "Dokumentasi kegiatan adaptasi, mitigasi, dan kelembagaan ProKlim Desa Sanggang.",
    },
  };

  // "widget" tampilan yang otomatis ambil dari data Artikel/Galeri yang sudah
  // ada — bukan konten tersendiri, jadi parameternya tetap di kode (bukan
  // di database), sama seperti dulu di data.js
  var GALERI_CUPLIKAN_TETAP = {
    adaptasi: { tipe: "galeri-cuplikan", judul: "Dokumentasi Adaptasi", kategori: "Adaptasi", jumlah: 8 },
    mitigasi: { tipe: "galeri-cuplikan", judul: "Dokumentasi Mitigasi", kategori: "Mitigasi", jumlah: 8 },
    "klb-lembaga": {
      tipe: "galeri-cuplikan", judul: "Dokumentasi Kelembagaan & Kebijakan",
      deskripsi: "Suasana kegiatan pengurus, lembaga pendukung, dan penerapan kearifan lokal ProKlim Sanggang Berkreasi.",
      kategori: "Kelembagaan", sub: "Kelembagaan, Kebijakan & Partisipasi", mulai: 0, jumlah: 8,
    },
    "klb-partisipasi": {
      tipe: "galeri-cuplikan", judul: "Dokumentasi Partisipasi & Kapasitas Masyarakat",
      deskripsi: "Gotong royong warga, studi tiru, jejaring, dan prestasi ProKlim Sanggang Berkreasi.",
      kategori: "Kelembagaan", sub: "Kapasitas Masyarakat & Prestasi", mulai: 1, jumlah: 8,
    },
    "klb-eksternal": {
      tipe: "galeri-cuplikan", judul: "Dokumentasi Dukungan & Pengembangan",
      deskripsi: "Jejak kemitraan dengan pemerintah, dunia usaha, perguruan tinggi, serta perkembangan kegiatan dari tahun ke tahun.",
      kategori: "Kelembagaan", sub: "Dukungan Eksternal & Manfaat Program", mulai: 9, jumlah: 7,
    },
    "klb-data": {
      tipe: "galeri-cuplikan", judul: "Dokumentasi Data & Manfaat Program",
      deskripsi: "Arsip pencatatan data aksi serta manfaat ekonomi, sosial, dan lingkungan yang dirasakan warga.",
      kategori: "Kelembagaan", sub: "Dukungan Eksternal & Manfaat Program", mulai: 17, jumlah: 7,
    },
  };
  var ARTIKEL_TERBARU_TETAP = { tipe: "artikel-terbaru", judul: "Artikel Terbaru", jumlah: 4 };

  /* susun baris struktur_pengurus (flat, dari database) jadi bentuk
     bertingkat {baris:[[{unsur,personel}]]} yang dipahami render.js */
  function susunStrukturBlok(daftar) {
    var perKelompok = {};
    (daftar || []).forEach(function (r) {
      var k = r.kelompok || 0;
      if (!perKelompok[k]) perKelompok[k] = [];
      perKelompok[k].push({ unsur: r.jabatan, personel: r.nama_personel || [], _urutan: r.urutan || 0 });
    });
    var kelompokUrut = Object.keys(perKelompok).map(Number).sort(function (a, b) { return a - b; });
    var baris = kelompokUrut.map(function (k) {
      return perKelompok[k]
        .sort(function (a, b) { return a._urutan - b._urutan; })
        .map(function (x) { return { unsur: x.unsur, personel: x.personel }; });
    });
    return { tipe: "struktur", baris: baris };
  }

  /* baris konten_halaman (kunci_blok, tipe_blok, urutan, konten) -> array
     blok siap pakai render.js, yaitu {tipe, ...isi-konten} */
  function susunBlokHalaman(semuaKonten, halamanId) {
    return semuaKonten
      .filter(function (r) { return r.halaman === halamanId; })
      .sort(function (a, b) { return a.urutan - b.urutan; })
      .map(function (r) { return Object.assign({ tipe: r.tipe_blok }, r.konten || {}); });
  }

  // ambil satu blok tertentu lewat kunci_blok-nya, terlepas dari kolom
  // "halaman" di database — dipakai untuk menampilkan ulang blok yang sama
  // di lebih dari satu halaman publik (mis. statistik desa di Beranda & Data Dasar)
  function cariBlokByKunci(semuaKonten, kunci) {
    var r = (semuaKonten || []).filter(function (x) { return x.kunci_blok === kunci; })[0];
    return r ? Object.assign({ tipe: r.tipe_blok }, r.konten || {}) : null;
  }

  function susunHalaman(semuaKonten, strukturBlok) {
    function blok(id) { return susunBlokHalaman(semuaKonten, id); }
    function halamanBiasa(id) {
      var m = META_HALAMAN[id];
      return { id: id, ikon: m.ikon, judul: m.judul, subjudul: m.subjudul, blok: blok(id).concat([GALERI_CUPLIKAN_TETAP[id]]) };
    }

    var blokLembaga = blok("klb-lembaga"); // urutan: [profil, rencana-kerja, tab]
    var statistikDesa = cariBlokByKunci(semuaKonten, "beranda-profil-statistik");

    return [
      { id: "beranda", judul: "Beranda", blok: blok("beranda").concat([strukturBlok, ARTIKEL_TERBARU_TETAP]) },
      {
        id: "data-dasar", ikon: META_HALAMAN["data-dasar"].ikon, judul: META_HALAMAN["data-dasar"].judul,
        subjudul: META_HALAMAN["data-dasar"].subjudul,
        blok: (statistikDesa ? [statistikDesa] : []).concat(blok("data-dasar")),
      },
      halamanBiasa("adaptasi"),
      halamanBiasa("mitigasi"),
      {
        id: "klb-lembaga", ikon: META_HALAMAN["klb-lembaga"].ikon, judul: META_HALAMAN["klb-lembaga"].judul,
        subjudul: META_HALAMAN["klb-lembaga"].subjudul,
        blok: (blokLembaga.length ? [blokLembaga[0], strukturBlok].concat(blokLembaga.slice(1)) : [strukturBlok])
          .concat([GALERI_CUPLIKAN_TETAP["klb-lembaga"]]),
      },
      halamanBiasa("klb-partisipasi"),
      halamanBiasa("klb-eksternal"),
      halamanBiasa("klb-data"),
      { id: "perencanaan", ikon: META_HALAMAN.perencanaan.ikon, judul: META_HALAMAN.perencanaan.judul, subjudul: META_HALAMAN.perencanaan.subjudul, blok: blok("perencanaan") },
      { id: "data-aksi", ikon: META_HALAMAN["data-aksi"].ikon, judul: META_HALAMAN["data-aksi"].judul, subjudul: META_HALAMAN["data-aksi"].subjudul, blok: blok("data-aksi") },
      { id: "artikel", ikon: META_HALAMAN.artikel.ikon, judul: META_HALAMAN.artikel.judul, subjudul: META_HALAMAN.artikel.subjudul, blok: [{ tipe: "daftar-artikel" }] },
      { id: "galeri", ikon: META_HALAMAN.galeri.ikon, judul: META_HALAMAN.galeri.judul, subjudul: META_HALAMAN.galeri.subjudul, blok: [{ tipe: "galeri-penuh" }] },
    ];
  }

  function situsKosong() {
    return { nama: "ProKlim Desa Sanggang", jargon: "", logo: "assets/img/logo.png", lembaga: "", alamat: "", email: "", tentangSingkat: "" };
  }

  var Store = {
    data: null,
    pendengar: [],

    muat: async function () {
      if (!db) {
        console.error("Supabase belum terhubung — cek assets/js/config.js");
        this.data = { situs: situsKosong(), menu: MENU_TETAP, halaman: susunHalaman([], susunStrukturBlok([])), artikel: [], galeri: [] };
        return this.data;
      }

      var hasil = await Promise.all([
        db.from("situs_pengaturan").select("*").eq("id", 1).single(),
        db.from("struktur_pengurus").select("*"),
        db.from("konten_halaman").select("*"),
        db.from("artikel").select("*").order("tanggal", { ascending: false }),
        db.from("galeri").select("*").order("urutan"),
      ]);
      var situsR = hasil[0], strukturR = hasil[1], kontenR = hasil[2], artikelR = hasil[3], galeriR = hasil[4];

      [situsR, strukturR, kontenR, artikelR, galeriR].forEach(function (r) {
        if (r.error) console.error("Gagal mengambil data dari Supabase:", r.error.message);
      });

      var s = situsR.data || {};
      var strukturBlok = susunStrukturBlok(strukturR.data || []);
      var artikelList = (artikelR.data || []).map(function (a) {
        return { id: a.id, judul: a.judul, kategori: a.kategori, tanggal: a.tanggal, penulis: a.penulis, ringkasan: a.ringkasan, gambar: a.gambar_url, isi: a.isi || [] };
      });
      var galeriList = (galeriR.data || []).map(function (g) {
        return { id: g.id, file: g.file_url, kategori: g.kategori, judul: g.judul, keterangan: g.keterangan };
      });

      this.data = {
        situs: {
          nama: s.nama || "ProKlim Desa Sanggang",
          jargon: s.jargon || "",
          logo: s.logo_url || "assets/img/logo.png",
          lembaga: s.lembaga || "",
          alamat: s.alamat || "",
          email: s.email || "",
          tentangSingkat: s.tentang_singkat || "",
          footerTeks: s.footer_teks || "",
          kontakNama: s.kontak_nama || "",
          kontakTelepon: s.kontak_telepon || "",
        },
        menu: MENU_TETAP,
        halaman: susunHalaman(kontenR.data || [], strukturBlok),
        artikel: artikelList,
        galeri: galeriList,
      };
      return this.data;
    },

    // dulu dipakai memberi tahu halaman saat admin.js mengubah localStorage;
    // sekarang halaman publik tidak lagi punya editor sendiri, jadi ini
    // sengaja dikosongkan (tetap ada supaya app.js tidak perlu diubah)
    saatBerubah: function () {},

    halamanById: function (id) {
      for (var i = 0; i < this.data.halaman.length; i++) {
        if (this.data.halaman[i].id === id) return this.data.halaman[i];
      }
      return null;
    },

    artikelById: function (id) {
      for (var i = 0; i < this.data.artikel.length; i++) {
        if (this.data.artikel[i].id === id) return this.data.artikel[i];
      }
      return null;
    },

    halamanPertama: function () {
      var m = this.data.menu[0];
      if (!m) return "beranda";
      if (m.halaman) return m.halaman;
      if (m.anak && m.anak[0]) return m.anak[0].halaman;
      return "beranda";
    },

    kategoriGaleri: function () {
      var set = [];
      this.data.galeri.forEach(function (g) {
        if (g.kategori && set.indexOf(g.kategori) === -1) set.push(g.kategori);
      });
      return set;
    },
  };

  window.Store = Store;
})();
