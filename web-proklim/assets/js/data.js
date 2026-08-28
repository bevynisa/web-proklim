/* =========================================================
   DATA BAWAAN WEBSITE PROKLIM DESA SANGGANG
   -----------------------------------------
   Semua isi website diambil dari file ini.
   Perubahan yang dilakukan lewat halaman Admin disimpan di
   browser (localStorage) dan otomatis menimpa isi file ini.

   Kalau ingin perubahan itu ikut terlihat di komputer/HP lain,
   buka Admin > Data > "Unduh data.json", lalu unggah kembali
   lewat Admin > Data > "Muat dari file" di perangkat tersebut.
   ========================================================= */

window.PROKLIM_DEFAULT = {
  versi: 54,

  /* ---------- IDENTITAS SITUS ---------- */
  situs: {
    nama: "ProKlim Desa Sanggang",
    jargon: "Sanggang Berkreasi",
    logo: "assets/img/logo.png",
    lembaga: "ProKlim Sanggang Berkreasi",
    alamat: "Desa Sanggang, Kecamatan Bulu, Kabupaten Sukoharjo, Jawa Tengah",
    email: "rkddsanggang@gmail.com",
    tentangSingkat:
      "Program Kampung Iklim Desa Sanggang: aksi lokal adaptasi dan mitigasi perubahan iklim berbasis vegetasi, konservasi tanah–air, dan gotong royong masyarakat.",
  },

  /* ---------- MENU NAVIGASI ---------- */
  menu: [
    { id: "m-beranda", label: "Beranda", halaman: "beranda" },
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
    { id: "m-artikel", label: "Artikel", halaman: "artikel" },
    { id: "m-galeri", label: "Galeri", halaman: "galeri" },
  ],

  /* ---------- HALAMAN ---------- */
  halaman: [
    /* ============ BERANDA ============ */
    {
      id: "beranda",
      judul: "Beranda",
      blok: [
        {
          tipe: "hero",
          label: "Program Kampung Iklim",
          judul: "ProKlim Desa Sanggang",
          subjudul: "Sanggang Berkreasi",
          teks:
            "Desa Sanggang, Kecamatan Bulu, Kabupaten Sukoharjo membangun ketangguhan terhadap longsor dan kekeringan melalui penguatan vegetasi, konservasi tanah dan air, pengurangan emisi, serta kelembagaan masyarakat yang aktif.",
          tombol: [
            { label: "Lihat Aksi Adaptasi", tujuan: "#/adaptasi" },
            { label: "Lihat Aksi Mitigasi", tujuan: "#/mitigasi" },
          ],
          latar: [
            { src: "assets/img/beranda/5.jpg", posisi: "center 15%" },
            { src: "assets/img/beranda/1.jpg", posisi: "center 45%" },
            { src: "assets/img/beranda/2.jpg", posisi: "center 38%" },
            { src: "assets/img/beranda/3.jpg", posisi: "center 35%" },
            { src: "assets/img/beranda/4.jpg", posisi: "center 48%" },
          ],
        },
        {
          tipe: "statistik",
          judul: "Profil Singkat Desa",
          deskripsi:
            "Desa perbukitan dengan basis penghidupan pertanian dan perkebunan — modal ekologis sekaligus sumber kerentanan iklim.",
          item: [
            { angka: "574", satuan: "ha", label: "Luas wilayah", ket: "Setara 5,74 km²" },
            { angka: "±2,9", satuan: "ribu", label: "Jumlah penduduk", ket: "Data operasional desa" },
            { angka: "9 / 19", satuan: "", label: "RW / RT", ket: "Struktur sosial desa" },
            { angka: "12", satuan: "dusun", label: "Wilayah dusun", ket: "Dipetakan tingkat kerentanannya" },
          ],
        },
        {
          tipe: "teks",
          judul: "Tentang ProKlim Desa Sanggang",
          paragraf: [
            "Program Kampung Iklim (ProKlim) merupakan strategi penguatan aksi lokal dalam menghadapi dampak perubahan iklim. Di Desa Sanggang, ProKlim diarahkan pada dua ancaman utama, yaitu <b>longsor</b> dan <b>kekeringan</b>, dengan penekanan pada aksi adaptasi dan mitigasi berbasis vegetasi.",
            "Penyusunan program menggunakan pendekatan perencanaan berbasis risiko. Kegiatan tidak hanya dirancang untuk merespons kejadian bencana, tetapi juga memperkuat kapasitas masyarakat melalui konservasi tanah dan air, rehabilitasi tutupan lahan, pengelolaan limbah organik, serta kemitraan lintas sektor.",
          ],
          sorot: {
            judul: "Prinsip Desain",
            teks:
              "Satu aksi memberi manfaat ganda: mengurangi risiko bencana, meningkatkan serapan karbon, memperkuat ekonomi rumah tangga, dan membangun gotong royong.",
          },
        },
        {
          tipe: "kartu",
          judul: "Tiga Pilar ProKlim",
          deskripsi: "Seluruh kegiatan ProKlim Desa Sanggang berjalan di atas tiga pilar berikut.",
          gayaFoto: true,
          item: [
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6c8 10 14 18 14 26a14 14 0 1 1-28 0c0-8 6-16 14-26z"/></svg>',
              gambar: "assets/galeri/adp-001.jpg",
              gambarAlt: "Kegiatan adaptasi ProKlim Desa Sanggang",
              judul: "Adaptasi",
              teks:
                "Pengendalian kekeringan, longsor, dan kebakaran hutan; peningkatan ketahanan pangan; serta pengendalian penyakit terkait iklim.",
              tujuan: "#/adaptasi",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 42V22"/><path d="M24 24c0-8-6-12-14-12 0 8 6 12 14 12z"/><path d="M24 20c0-7 5-11 12-11 0 7-5 11-12 11z"/></svg>',
              gambar: "assets/galeri/mit-086.jpg",
              gambarAlt: "Kegiatan mitigasi ProKlim Desa Sanggang",
              judul: "Mitigasi",
              teks:
                "Pengelolaan sampah dan limbah, energi terbarukan dan hemat energi, pertanian rendah emisi, tutupan vegetasi, dan pencegahan karhutla.",
              tujuan: "#/mitigasi",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="15" r="6"/><circle cx="33" cy="17" r="5"/><path d="M6 41c0-7.5 5.5-13 12-13s12 5.5 12 13"/><path d="M29 29c5 .8 9.5 5.4 9.5 12"/></svg>',
              gambar: "assets/galeri/klb-145.jpg",
              gambarAlt: "Kegiatan kelembagaan ProKlim Desa Sanggang",
              judul: "Kelembagaan",
              teks:
                "Penguatan organisasi, kebijakan lokal, partisipasi dan kapasitas masyarakat, dukungan eksternal, serta pengelolaan data aksi.",
              tujuan: "#/klb-lembaga",
            },
          ],
        },
        {
          tipe: "tab",
          judul: "Visi & Misi ProKlim Desa Sanggang",
          tab: [
            {
              label: "Visi",
              item: [
                "Terwujudnya Desa Sanggang yang tangguh terhadap longsor dan kekeringan, hijau, produktif, dan berdaya saing melalui penguatan vegetasi, konservasi tanah dan air, serta gotong royong masyarakat.",
              ],
            },
            {
              label: "Misi",
              item: [
                "Mengurangi risiko longsor melalui vegetasi penguat lereng dan drainase mikro.",
                "Menjaga ketersediaan air melalui perlindungan mata air, embung, tandon, dan panen air hujan.",
                "Meningkatkan tutupan vegetasi produktif pada kebun, pekarangan, dan lahan kritis.",
                "Mengurangi emisi melalui pengelolaan biomassa, kompos, biogas, dan pencegahan pembakaran terbuka.",
                "Memperkuat data, monitoring–evaluasi, kelembagaan, dan kemitraan lintas sektor.",
              ],
            },
          ],
        },
        {
          tipe: "struktur",
          judul: "Struktur Pelaksana ProKlim",
          deskripsi:
            "Tim Pelaksana ProKlim Desa Sanggang sesuai Dokumen Perencanaan Pelaksana Kampung Iklim Desa Sanggang.",
          baris: [
            [{ unsur: "Pembina", personel: ["Kepala Desa"] }],
            [{ unsur: "Penasehat", personel: ["Kadus I", "Kadus II", "Kadus III", "Kadus IV"] }],
            [{ unsur: "Ketua", personel: ["Janu Hari Setiawan"] }],
            [
              { unsur: "Sekretaris", personel: ["Arif Tri Yulianto"] },
              { unsur: "Bendahara", personel: ["Surani"] },
            ],
            [
              { unsur: "Bidang Adaptasi", personel: ["Sri Rahayu", "Ika Listanti", "Sri Sulastri"] },
              { unsur: "Bidang Mitigasi", personel: ["Najem", "Fitriana", "Nardi"] },
              { unsur: "Bidang Kelembagaan Masyarakat", personel: ["Edi Prasetyo", "Lailatul Muthoharoh", "Ika Oktaviani"] },
            ],
          ],
        },
        { tipe: "artikel-terbaru", judul: "Artikel Terbaru", jumlah: 4 },
      ],
    },

    /* ============ ADAPTASI ============ */
    {
      id: "adaptasi",
      ikon: "💧",
      judul: "Adaptasi Perubahan Iklim",
      subjudul:
        "Upaya menyesuaikan diri terhadap dampak perubahan iklim: mengamankan air, pangan, dan kesehatan masyarakat.",
      blok: [
        {
          tipe: "teks",
          judul: "Arah Aksi Adaptasi",
          paragraf: [
            "Kerentanan Desa Sanggang dipengaruhi oleh kondisi lereng, jenis tanah, curah hujan, sumber air, penggunaan lahan, dan kapasitas adaptasi masyarakat. Wilayah bagian timur dan tenggara lebih menonjol untuk kerentanan longsor, sedangkan kerentanan kekeringan tampak pada dusun dengan keterbatasan sumber air dan ketergantungan terhadap air hujan.",
            "Karena itu aksi adaptasi difokuskan pada tiga hal: <b>pengendalian kekeringan dan longsor</b>; <b>peningkatan ketahanan pangan</b>; dan <b>pengendalian penyakit terkait iklim</b>.",
          ],
        },
        {
          tipe: "statistik",
          judul: "Capaian Utama Adaptasi",
          item: [
            { angka: "1.112", satuan: "unit", label: "Penampungan Air Hujan (PAH/IPAH)" },
            { angka: "500", satuan: "unit", label: "Lubang biopori" },
            { angka: "492", satuan: "unit", label: "Rorak / jogangan" },
            { angka: "208", satuan: "ha", label: "Terasering" },
            { angka: "427", satuan: "ha", label: "Pola tanam adaptif" },
            { angka: "100", satuan: "% KK", label: "Menerapkan PHBS" },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Pengendalian Kekeringan dan Longsor",
          grup: [
            {
              judul: "Pemanenan air hujan",
              item: [
                { kegiatan: "Embung / DAM / Waduk", jumlah: "1 unit" },
                { kegiatan: "Penampungan Air Hujan (PAH) / IPAH", jumlah: "1.112 unit" },
                { kegiatan: "Lubang penampung air (kolam, sumur tadah hujan)", jumlah: "400 unit" },
              ],
            },
            {
              judul: "Peresapan air",
              item: [
                { kegiatan: "Biopori", jumlah: "500 unit" },
                { kegiatan: "Sumur resapan", jumlah: "5 unit" },
                { kegiatan: "Rorak / jogangan", jumlah: "492 unit" },
              ],
            },
            {
              judul: "Perlindungan mata air",
              item: [
                { kegiatan: "Pembuatan struktur perlindungan mata air", jumlah: "20 unit" },
                { kegiatan: "Penanaman vegetasi di sekitar lokasi mata air", jumlah: "2 ha" },
                { kegiatan: "Aturan lokal yang menjamin mata air tetap hidup", jumlah: "Ada" },
                { kegiatan: "Kearifan lokal: Rasulan / bersih sendang", jumlah: "Ada" },
              ],
            },
            {
              judul: "Penghematan penggunaan air",
              item: [
                { kegiatan: "Penggunaan kembali air bekas (mis. air cucian beras untuk menyiram tanaman)", jumlah: "75% KK" },
                { kegiatan: "Pembatasan penggunaan air", jumlah: "100% KK" },
                { kegiatan: "Shower dan pompa air Pamsimas otomatis", jumlah: "100% KK" },
              ],
            },
            {
              judul: "Sarana & prasarana pengendali longsor",
              item: [
                { kegiatan: "Cekdam / dam penahan / dam pengendali", jumlah: "6 unit" },
                { kegiatan: "Kawasan resapan air", jumlah: "50 ha" },
                { kegiatan: "Sistem evakuasi (jalur, peta, petugas, rambu, tempat)", jumlah: "3 unit" },
                { kegiatan: "Saluran Pengelolaan Air (SPA)", jumlah: "9,8 km" },
                { kegiatan: "Tindakan sipil teknis penguat lereng (bronjong, karung pasir/batu)", jumlah: "5 unit" },
                { kegiatan: "Bangunan Terjunan Air (BTA)", jumlah: "2 unit" },
                { kegiatan: "Pengendali jurang / gully plug", jumlah: "3 unit" },
                { kegiatan: "Alat penanganan longsor (shinso, angkong, cangkul)", jumlah: "3 unit" },
              ],
            },
            {
              judul: "Rancang bangun adaptif",
              item: [
                { kegiatan: "Meninggikan struktur bangunan / rumah panggung", jumlah: "60% KK" },
                { kegiatan: "Menguatkan struktur bangunan", jumlah: "100% KK" },
                { kegiatan: "Rumah tahan gempa (bambu / kayu)", jumlah: "30 rumah" },
              ],
            },
            {
              judul: "Terasering",
              item: [
                { kegiatan: "Pembuatan terasering (saluran peresapan air, saluran pembuangan air, tanaman penguat teras)", jumlah: "208 ha" },
              ],
            },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Peningkatan Ketahanan Pangan",
          grup: [
            {
              judul: "Pola tanam adaptif",
              item: [
                { kegiatan: "Pola tanam kacang–jagung–ketela pohon dan padi–padi–jagung", jumlah: "427 ha" },
                { kegiatan: "Pola heterokultur (tumpang sari / tumpang gilir)", jumlah: "427 ha" },
                { kegiatan: "Jajar legowo", jumlah: "361 ha" },
              ],
            },
            {
              judul: "Sistem irigasi",
              item: [
                { kegiatan: "Luas sawah yang sudah mendapat sarana irigasi", jumlah: "10 ha" },
                { kegiatan: "Inovasi irigasi (tetes, kabut, bawah permukaan)", jumlah: "2 ha" },
              ],
            },
            {
              judul: "Sistem pertanian terpadu",
              item: [
                { kegiatan: "Penggabungan pertanian, peternakan, perikanan, dan kehutanan dalam satu lahan (mina padi)", jumlah: "3 ha" },
                { kegiatan: "Pelestarian potensi pangan lokal (singkong mentho dan singkong tahu)", jumlah: "Ada" },
              ],
            },
            {
              judul: "Penganekaragaman pangan",
              item: [
                { kegiatan: "Budidaya tanaman pangan: jagung, singkong, ketela rambat, talas, sukun, enthik, uwi, mbili, mbolo, suweg, porang", jumlah: "11 jenis" },
                { kegiatan: "Pemanfaatan lahan pekarangan (budidaya tanaman, ternak, ikan, vertikultur, hidroponik)", jumlah: "100% KK" },
                { kegiatan: "Komoditas tahan iklim: padi gogo, jagung hibrida, cabai asoka", jumlah: "3 jenis" },
              ],
            },
            {
              judul: "Urban farming",
              item: [
                { kegiatan: "Penerapan konsep urban farming rumah tangga", jumlah: "70% KK" },
              ],
            },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Pengendalian Penyakit Terkait Iklim",
          grup: [
            {
              judul: "Pengendalian vektor",
              item: [
                { kegiatan: "Pelaksanaan 3M (menguras, menimbun, menutup) sarang nyamuk", jumlah: "100% KK" },
                { kegiatan: "Memasukkan ikan ke dalam kolam / pot tanaman", jumlah: "40% KK" },
                { kegiatan: "Larvatrap", jumlah: "1 kegiatan" },
              ],
            },
            {
              judul: "Sanitasi Total Berbasis Masyarakat (STBM)",
              item: [
                { kegiatan: "Jumantik (juru pemantau jentik) dan jadwal pemantauan", jumlah: "7 tim" },
                { kegiatan: "Sistem kewaspadaan dini penyakit terkait iklim (diare, malaria, DBD)", jumlah: "Ada" },
                { kegiatan: "Layanan dan pengelolaan air minum", jumlah: "100% KK" },
                { kegiatan: "Pengelolaan limbah manusia, hewan, dan industri (jamban, pengomposan kotoran hewan, IPAL)", jumlah: "100% KK" },
                { kegiatan: "Posyandu aktif (lansia, balita, PMT, penyuluhan, ambulans desa)", jumlah: "7 unit" },
                { kegiatan: "Stop Buang Air Besar Sembarangan (SBS)", jumlah: "100% KK" },
                { kegiatan: "Media promosi kesehatan (Promkes)", jumlah: "2 unit" },
              ],
            },
            {
              judul: "Pola Hidup Bersih dan Sehat (PHBS)",
              item: [
                { kegiatan: "Cuci tangan pakai sabun, lingkungan bersih dan sehat (terjadwal)", jumlah: "100% KK" },
                { kegiatan: "Rumah dengan sirkulasi udara yang baik", jumlah: "100% KK" },
                { kegiatan: "Senam sehat", jumlah: "40% KK" },
              ],
            },
          ],
        },
        {
          tipe: "peringkat-ganda",
          judul: "Indeks Kerentanan Longsor & Kekeringan per Dusun",
          deskripsi:
            "Dusun dengan kelas tinggi dan sangat tinggi menjadi lokasi awal intervensi; dusun kelas rendah–sedang diarahkan sebagai zona konservasi, pembibitan, dan pembelajaran praktik baik.",
          maksimal: 5,
          seri: ["Longsor", "Kekeringan"],
          item: [
            { label: "Kaligunting", nilai: ["4,08", "4,10"], kelas: ["Sangat Tinggi", "Sangat Tinggi"] },
            { label: "Tawing", nilai: ["3,21", "3,55"], kelas: ["Tinggi", "Tinggi"] },
            { label: "Banjarsari", nilai: ["3,18", "3,20"], kelas: ["Tinggi", "Tinggi"] },
            { label: "Tileng", nilai: ["3,05", "3,28"], kelas: ["Tinggi", "Tinggi"] },
            { label: "Bedug", nilai: ["2,50", "2,95"], kelas: ["Sedang", "Sedang"] },
            { label: "Kedungnongko", nilai: ["2,45", "2,82"], kelas: ["Sedang", "Sedang"] },
            { label: "Pangkah", nilai: ["2,38", "2,70"], kelas: ["Sedang", "Sedang"] },
            { label: "Klepu", nilai: ["2,32", "2,40"], kelas: ["Sedang", "Rendah"] },
            { label: "Sanggang", nilai: ["1,85", "1,88"], kelas: ["Rendah", "Rendah"] },
            { label: "Wates", nilai: ["1,82", "2,15"], kelas: ["Rendah", "Rendah"] },
            { label: "Dranjang", nilai: ["1,76", "2,05"], kelas: ["Rendah", "Rendah"] },
            { label: "Samin", nilai: ["1,70", "1,95"], kelas: ["Rendah", "Rendah"] },
          ],
        },
        {
          tipe: "tabel",
          judul: "Data Aksi Adaptasi",
          deskripsi: "Rekap output kegiatan pendukung aksi adaptasi di Desa Sanggang, hasil kolaborasi dengan berbagai pihak.",
          kolom: ["No", "Kategori", "Bentuk Aksi", "Nama Kegiatan", "Tanggal Pelaksanaan", "Lokasi", "Pelaksana", "Output/Hasil", "Manfaat"],
          baris: [
            ["1", "Adaptasi", "Edukasi & Informasi Bencana", "Pembuatan Artikel dan Video Edukasi Kesiapsiagaan Tanah Longsor", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 artikel dan 1 video edukasi", "Membekali warga langkah yang tepat sebelum, saat, dan setelah terjadi tanah longsor"],
          ],
        },
        { tipe: "galeri-cuplikan", judul: "Dokumentasi Adaptasi", kategori: "Adaptasi", jumlah: 8 },
      ],
    },

    /* ============ MITIGASI ============ */
    {
      id: "mitigasi",
      ikon: "🌱",
      judul: "Mitigasi Perubahan Iklim",
      subjudul:
        "Upaya menurunkan emisi gas rumah kaca dan meningkatkan serapan karbon di tingkat desa.",
      blok: [
        {
          tipe: "teks",
          judul: "Arah Aksi Mitigasi",
          paragraf: [
            "Sumber emisi gas rumah kaca di Desa Sanggang terutama berasal dari aktivitas rumah tangga, energi, transportasi, pembakaran residu biomassa, serta degradasi tutupan lahan pada titik lereng terbuka.",
            "Di sisi lain, potensi serapan gas rumah kaca cukup besar karena desa memiliki kebun campuran, lahan palawija, pekarangan hijau, dan peluang agroforestri lereng.",
          ],
        },
        {
          tipe: "statistik",
          judul: "Capaian Utama Mitigasi",
          item: [
            { angka: "427", satuan: "ha", label: "Penghijauan" },
            { angka: "344", satuan: "ha", label: "Praktik wanatani" },
            { angka: "10.000", satuan: "batang", label: "Kelapa genjah (2022)" },
            { angka: "75", satuan: "% KK", label: "Pemilahan sampah, kompos & 3R" },
            { angka: "985", satuan: "unit", label: "Lampu hemat energi" },
            { angka: "417", satuan: "ha", label: "Pembukaan lahan tanpa bakar" },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Pengelolaan Sampah, Limbah Padat dan Cair",
          grup: [
            {
              judul: "Pengelolaan sampah dan limbah padat",
              item: [
                { kegiatan: "Pengumpulan sampah", jumlah: "95% KK" },
                { kegiatan: "Pewadahan", jumlah: "90% KK" },
                { kegiatan: "Pemilahan sampah", jumlah: "75% KK" },
                { kegiatan: "Pengomposan", jumlah: "75% KK" },
                { kegiatan: "Kegiatan 3R (reduce, reuse, recycle)", jumlah: "75% KK" },
                { kegiatan: "Bank Sampah", jumlah: "75% KK" },
                { kegiatan: "Dikirim ke Tempat Pembuangan Akhir (TPA)", jumlah: "2% KK" },
                { kegiatan: "Dibuang ke lahan kosong", jumlah: "20% KK" },
                { kegiatan: "Dibakar", jumlah: "10% KK" },
              ],
            },
            {
              judul: "Pengolahan dan pemanfaatan limbah cair",
              item: [
                { kegiatan: "Tangki septik dengan instalasi penangkap metana", jumlah: "Ada" },
                { kegiatan: "IPAL anaerob dengan penangkap dan pemanfaat gas", jumlah: "Ada" },
                { kegiatan: "Pupuk cair dari urin kelinci", jumlah: "80 KK" },
              ],
            },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Energi Baru Terbarukan, Konservasi, dan Penghematan Energi",
          grup: [
            {
              judul: "Energi baru terbarukan",
              item: [
                { kegiatan: "Pemanfaatan gas metana untuk biogas", jumlah: "1 unit" },
                { kegiatan: "Pemanfaatan energi surya (solar cell)", jumlah: "10 unit" },
                { kegiatan: "Pemanfaatan air untuk sumber energi (mikrohidro)", jumlah: "Ada" },
                { kegiatan: "Motor listrik", jumlah: "2 unit" },
              ],
            },
            {
              judul: "Sumber energi non-EBT",
              item: [
                { kegiatan: "Penggunaan minyak tanah", jumlah: "10 unit" },
                { kegiatan: "Penggunaan LPG", jumlah: "985 unit" },
                { kegiatan: "Penggunaan arang kayu", jumlah: "250 unit" },
                { kegiatan: "Tungku hemat kayu bakar, biji, dan sekam", jumlah: "20 unit" },
                { kegiatan: "Teko listrik", jumlah: "2 unit" },
              ],
            },
            {
              judul: "Penghematan energi",
              item: [
                { kegiatan: "Penggunaan lampu hemat energi", jumlah: "985 unit" },
                { kegiatan: "Peningkatan pencahayaan alami rumah tangga", jumlah: "985 unit" },
                { kegiatan: "Sensor otomatis pompa air dan lampu PJU", jumlah: "12 unit" },
              ],
            },
          ],
        },
        {
          tipe: "kartu",
          judul: "Budidaya Pertanian Rendah Emisi GRK",
          ikonTengah: true,
          item: [
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 42c0-10-4-18-10-26"/><ellipse cx="17.5" cy="17" rx="2.1" ry="3.3" transform="rotate(-35 17.5 17)"/><ellipse cx="15" cy="22" rx="2.1" ry="3.3" transform="rotate(-35 15 22)"/><ellipse cx="13.2" cy="27.5" rx="2.1" ry="3.3" transform="rotate(-35 13.2 27.5)"/><ellipse cx="12" cy="33.5" rx="2.1" ry="3.3" transform="rotate(-35 12 33.5)"/><path d="M24 42c0-10 4-18 10-25"/><ellipse cx="30.5" cy="20" rx="2.1" ry="3.3" transform="rotate(35 30.5 20)"/><ellipse cx="33" cy="25" rx="2.1" ry="3.3" transform="rotate(35 33 25)"/><ellipse cx="34.8" cy="30.5" rx="2.1" ry="3.3" transform="rotate(35 34.8 30.5)"/><path d="M10 42h28"/></svg>',
              judul: "Pola tanam rendah emisi",
              teks: "Diterapkan pada 10 ha lahan pertanian untuk menurunkan emisi dari kegiatan budidaya.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40h32"/><path d="M24 40V20"/><path d="M24 26c-8 0-12-6-12-14 8 0 12 6 12 14z"/><path d="M24 22c8 0 12-6 12-14-8 0-12 6-12 14z"/></svg>',
              judul: "Pupuk organik",
              teks: "Sudah digunakan oleh 40% KK sebagai pengganti pupuk kimia.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l10 10H14z"/><path d="M12 16h24"/><circle cx="24" cy="22" r="4"/><path d="M14 42c0-10 4-14 10-14s10 4 10 14"/><path d="M8 42h32"/></svg>',
              judul: "Tanpa bakar jerami",
              teks: "100% KK tidak lagi membakar jerami di sawah setelah panen.",
            },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Peningkatan dan Mempertahankan Tutupan Vegetasi",
          grup: [
            {
              judul: "Peningkatan tutupan vegetasi",
              item: [
                {
                  kegiatan: "Penghijauan (turus jalan, pekarangan, kanan–kiri sungai, kebun/hutan rakyat)",
                  jumlah: "427 ha",
                },
                {
                  kegiatan: "Praktik wanatani (tanaman keras/tahunan dan tanaman semusim seperti empon, jagung, umbi-umbian)",
                  jumlah: "344 ha",
                },
                {
                  kegiatan: "Penanaman 10.000 kelapa genjah (2022), 1.000 tanaman buah (2025), dan 1.000 pohon buah Hari Amal Bakti Kemenag (2025)",
                  jumlah: "427 ha",
                },
              ],
            },
            {
              judul: "Mempertahankan tutupan vegetasi",
              item: [
                { kegiatan: "Partisipasi masyarakat adat dan penduduk lokal", jumlah: "75% KK" },
                { kegiatan: "Perlindungan / konservasi keanekaragaman hayati", jumlah: "1 jenis" },
                { kegiatan: "Implementasi rencana pengelolaan (buku administrasi LMDH)", jumlah: "1 kegiatan" },
                {
                  kegiatan: "Pengembangan pengetahuan dan hak masyarakat lokal (sosialisasi pencegahan karhutla)",
                  jumlah: "2 jenis",
                },
                { kegiatan: "Pemanfaatan hasil hutan bukan kayu", jumlah: "3 jenis" },
                { kegiatan: "Akses informasi publik terkait perhutanan sosial / hutan kota", jumlah: "1 jenis" },
                { kegiatan: "Papan larangan penebangan hutan dan larangan berburu", jumlah: "2 jenis" },
              ],
            },
          ],
        },
        {
          tipe: "akordeon",
          judul: "Pencegahan dan Penanggulangan Kebakaran Hutan dan Lahan",
          grup: [
            {
              judul: "Pembukaan lahan tanpa bakar",
              item: [
                { kegiatan: "Penerapan pembukaan lahan tanpa bakar secara mekanis", jumlah: "417 ha" },
              ],
            },
            {
              judul: "Pengendalian karhutla",
              item: [
                { kegiatan: "Peringatan dan deteksi dini", jumlah: "1 unit" },
                { kegiatan: "Pencegahan (patroli mandiri dan gabungan)", jumlah: "1 kegiatan" },
                { kegiatan: "Kampanye pencegahan karhutla", jumlah: "1 kegiatan" },
                { kegiatan: "Pemadaman", jumlah: "1 kegiatan" },
                { kegiatan: "Sarana dan prasarana pengendali karhutla", jumlah: "1 unit" },
                { kegiatan: "Kelompok masyarakat penanganan karhutla (Masyarakat Peduli Api)", jumlah: "1 kelompok" },
                {
                  kegiatan: "Penanganan pasca kebakaran (identifikasi area, pelaporan, restorasi lahan)",
                  jumlah: "1 kegiatan",
                },
              ],
            },
          ],
        },
        {
          tipe: "tabel",
          judul: "Data Aksi Mitigasi",
          deskripsi: "Rekap output kegiatan pendukung aksi mitigasi di Desa Sanggang, hasil kolaborasi dengan berbagai pihak.",
          kolom: ["No", "Kategori", "Bentuk Aksi", "Nama Kegiatan", "Tanggal Pelaksanaan", "Lokasi", "Pelaksana", "Output/Hasil", "Manfaat"],
          baris: [
            ["1", "Mitigasi", "Edukasi & Informasi Bencana", "Pembuatan Artikel dan Video Edukasi Pencegahan Kebakaran Hutan dan Lahan", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 artikel dan 1 video edukasi", "Meningkatkan kesadaran dan kesiapsiagaan warga menghadapi kebakaran hutan dan lahan"],
            ["2", "Mitigasi", "Edukasi & Informasi Bencana", "Pembuatan Video Panduan Komunikasi Peringatan Dini dengan Kentungan", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 video edukasi", "Memperkuat sistem peringatan dini bencana berbasis kearifan lokal"],
            ["3", "Mitigasi", "Edukasi & Informasi Bencana", "Pembuatan Peta Evakuasi Kebakaran dan Longsor", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 peta evakuasi kebakaran & longsor", "Memudahkan warga mengetahui jalur dan titik kumpul evakuasi saat bencana"],
          ],
        },
        {
          tipe: "gambar",
          judul: "Peta Mitigasi Bencana Longsor & Rute Evakuasi",
          deskripsi:
            "Peta zona kerawanan longsor (rendah–sedang–tinggi) beserta titik dan jalur rute evakuasi di Desa Sanggang. Disusun oleh Faruq Al-Qabil Marada, sumber: Rupa Bumi Indonesia (BIG), Citra Satelit Google, dan hasil survei lapangan.",
          item: [
            {
              judul: "Peta Mitigasi Bencana Longsor Desa Sanggang",
              src: "assets/img/peta-mitigasi-longsor-evakuasi.jpg",
              caption: "Skala 1:10.000 — memuat batas dusun, jalan, titik rute evakuasi, titik kumpul, fasilitas umum, dan kerawanan longsor per zona.",
            },
          ],
        },
        {
          tipe: "video",
          judul: "Video Edukasi Mitigasi Bencana",
          deskripsi: "Panduan singkat menghadapi risiko bencana terkait iklim di Desa Sanggang.",
          item: [
            {
              judul: "Cara Mencegah dan Menghadapi Kebakaran Hutan dan Lahan",
              src: "",
              caption: "Video sedang disiapkan dan akan ditambahkan menyusul.",
            },
            {
              judul: "Hal yang Harus Dilakukan Saat Terjadi Tanah Longsor",
              src: "",
              caption: "Video sedang disiapkan dan akan ditambahkan menyusul.",
            },
            {
              judul: "Komunikasi Peringatan Dini dengan Kentungan",
              src: "",
              caption: "Video sedang disiapkan dan akan ditambahkan menyusul.",
            },
          ],
        },
        { tipe: "galeri-cuplikan", judul: "Dokumentasi Mitigasi", kategori: "Mitigasi", jumlah: 8 },
      ],
    },

    /* ============ KELEMBAGAAN: 4 SUB-HALAMAN ============ */
    {
      id: "klb-lembaga",
      ikon: "🏛️",
      judul: "Kelembagaan & Kebijakan",
      subjudul: "Lembaga pelaksana ProKlim, struktur organisasi, serta kebijakan dan kearifan lokal yang mendukung.",
      blok: [
        {
          tipe: "profil",
          judul: "Kelembagaan",
          gambar: "assets/img/logo.png",
          gambarKontain: true,
          gambarAlt: "Logo ProKlim Sanggang Berkreasi",
          item: [
            { judul: "Nama lembaga", teks: "ProKlim Sanggang Berkreasi" },
            {
              judul: "Lembaga pendukung",
              teks: "PKK, Karang Taruna, RKDD, LPM, Destana, Bank Sampah, dan KWT (Kelompok Wanita Tani)",
            },
            {
              judul: "Pengakuan tertulis terhadap lembaga",
              teks: "Ada — dari PKK, Karang Taruna, RKDD, LPM, Destana, Bank Sampah, dan KWT",
            },
          ],
        },
        {
          tipe: "struktur",
          judul: "Susunan Pengurus ProKlim Sanggang Berkreasi",
          baris: [
            [{ unsur: "Pembina", personel: ["Kepala Desa"] }],
            [{ unsur: "Penasehat", personel: ["Kadus I", "Kadus II", "Kadus III", "Kadus IV"] }],
            [{ unsur: "Ketua", personel: ["Janu Hari Setiawan"] }],
            [
              { unsur: "Sekretaris", personel: ["Arif Tri Yulianto"] },
              { unsur: "Bendahara", personel: ["Surani"] },
            ],
            [
              { unsur: "Bidang Adaptasi", personel: ["Sri Rahayu", "Ika Listanti", "Sri Sulastri"] },
              { unsur: "Bidang Mitigasi", personel: ["Najem", "Fitriana", "Nardi"] },
              { unsur: "Bidang Kelembagaan Masyarakat", personel: ["Edi Prasetyo", "Lailatul Muthoharoh", "Ika Oktaviani"] },
            ],
          ],
        },
        {
          tipe: "rencana-kerja",
          judul: "Rencana Program Kerja Bidang Kelembagaan",
          item: [
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L24 8l18 10"/><path d="M8 18h32"/><path d="M11 18v18M18 18v18M24 18v18M30 18v18M37 18v18"/><path d="M6 40h36"/></svg>',
              judul: "Kelembagaan",
              teks: "Penguatan ProKlim Sanggang Berkreasi dan lembaga pendukung (PKK, Karang Taruna, RKDD, LPM, Destana, Bank Sampah, KWT).",
              target: "Lembaga aktif dan terkoordinasi",
              pj: "Ketua ProKlim & Pemdes",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18"/><path d="M30 18l-4 10-10 4 4-10 10-4z"/></svg>',
              judul: "Struktur Organisasi",
              teks: "Pemutakhiran struktur organisasi, uraian tugas, dan fungsi pengurus.",
              target: "Struktur dan tugas pengurus jelas",
              pj: "Pengurus ProKlim",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="10" width="34" height="30" rx="3"/><path d="M7 18h34"/><path d="M15 6v8M33 6v8"/><path d="M15 26h4M23 26h4M31 26h4M15 33h4M23 33h4"/></svg>',
              judul: "Program Kerja Tahunan",
              teks: "Rencana Program Kerja Tahun 2024 dan 2025 tersedia secara tertulis, dengan realisasi pelaksanaan di atas 60%.",
              pj: "Pengurus ProKlim",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6h20l6 6v30H12z"/><path d="M32 6v6h6"/><path d="M18 20h14M18 26h14M18 32h9"/></svg>',
              judul: "Aturan Organisasi",
              teks: "AD/ART ProKlim Sanggang Berkreasi telah disahkan pengurus, dilengkapi kesepakatan organisasi tertulis.",
              pj: "Pengurus ProKlim",
            },
          ],
        },
        {
          tipe: "tab",
          judul: "Bentuk Nyata Kebijakan Lokal",
          tab: [
            {
              label: "Papan Larangan",
              item: [
                "Papan larangan penebangan pohon dan larangan berburu dipasang di titik-titik kawasan hijau desa.",
              ],
            },
            {
              label: "Bersih Sendang & Rasulan",
              item: [
                "Tradisi gotong royong membersihkan sumber air yang sekaligus menjaga mata air tetap hidup.",
              ],
            },
            {
              label: "SE Bupati Sukoharjo",
              item: [
                "Desa memiliki kebijakan tertulis sendiri, dan kegiatan ProKlim disinkronkan dengan kebijakan kecamatan serta kabupaten melalui Surat Edaran Bupati Sukoharjo.",
              ],
            },
          ],
        },
        {
          tipe: "galeri-cuplikan",
          judul: "Dokumentasi Kelembagaan & Kebijakan",
          deskripsi: "Suasana kegiatan pengurus, lembaga pendukung, dan penerapan kearifan lokal ProKlim Sanggang Berkreasi.",
          kategori: "Kelembagaan",
          sub: "Kelembagaan, Kebijakan & Partisipasi",
          mulai: 0,
          jumlah: 8,
        },
      ],
    },
    {
      id: "klb-partisipasi",
      ikon: "🤝",
      judul: "Partisipasi & Kapasitas Masyarakat",
      subjudul:
        "Keswadayaan warga, penyebaran praktik baik, tokoh lokal, teknologi tepat guna, jejaring, dan prestasi ProKlim.",
      blok: [
        {
          tipe: "profil",
          judul: "Keswadayaan & Pendanaan Lembaga",
          gambarDari: { kategori: "Kelembagaan", sub: "Kelembagaan, Kebijakan & Partisipasi", indeks: 8 },
          item: [
            {
              judul: "Jumlah KK yang menyumbang dana / barang untuk kegiatan masyarakat",
              teks: "Lebih dari 60% KK — dibuktikan dengan aturan terkait dan catatan/daftar donatur",
            },
            { judul: "Dana mandiri dari iuran anggota lembaga", teks: "Ada" },
            { judul: "Pembukuan keuangan tertib yang dikelola bendahara", teks: "Ada — buku kas ProKlim" },
          ],
        },
        {
          tipe: "foto-kartu",
          judul: "Menyebarkan Kegiatan Adaptasi dan Mitigasi ke Pihak Lain",
          gambar: "assets/img/menyebarkan-kegiatan.jpg",
          gambarAlt: "Kegiatan penyebaran adaptasi dan mitigasi ke pihak lain",
          item: [
            {
              judul: "Kunjungan dari kelompok / desa / kelurahan lain",
              teks: "Desa Puhgogor (Polokarto), Kalurahan Sambirejo (Gunungkidul), dan kunjungan Bupati Sukoharjo",
            },
            {
              judul: "Wakil masyarakat menjadi narasumber kegiatan sosialisasi",
              teks: "Ada — materi “Peran Anak Muda dalam Sukseskan Mandiri Pangan” oleh Hari Setiawan",
            },
            {
              judul: "Membuat dan menyebarkan bahan publikasi",
              teks: "Monumen, papan nama, baliho, spanduk, flyer, dan brosur",
            },
            {
              judul: "Menyebarkan informasi secara digital / daring",
              teks: "YouTube Pemerintah Desa Sanggang, kolaborasi KWT Mekarsari dan Bank Sampah Arta Sejahtera, serta pemberitaan media cetak",
            },
          ],
        },
        {
          tipe: "checklist",
          judul: "Tokoh / Pemimpin Lokal dan Teknologi Tepat Guna",
          item: [
            {
              judul: "Tokoh / pemimpin lokal",
              teks: "Ada — ketua kelompok, perangkat desa, dan tokoh masyarakat; aktif dalam rapat koordinasi antar lembaga desa",
            },
            { judul: "Penerapan teknologi tepat guna", teks: "Pupuk padat, pupuk cair, ecoenzim, dan hidroponik" },
            {
              judul: "Tenaga lokal ahli teknologi adaptasi–mitigasi",
              teks: "Ada — tenaga lokal pengelola pupuk padat dan pupuk cair",
            },
          ],
        },
        {
          tipe: "rute-jejaring",
          judul: "Kemampuan Membangun Jejaring",
          item: [
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10h32a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H20l-9 8v-8h-3a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z"/><circle cx="16" cy="21" r="1.6" fill="currentColor" stroke="none"/><circle cx="24" cy="21" r="1.6" fill="currentColor" stroke="none"/><circle cx="32" cy="21" r="1.6" fill="currentColor" stroke="none"/></svg>',
              judul: "Tingkat Lokal",
              teks: "Grup WhatsApp Desa Sanggang.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><circle cx="36" cy="12" r="5"/><circle cx="24" cy="36" r="5"/><path d="M16 15l6 17M32 15l-6 17"/></svg>',
              judul: "Tingkat Kabupaten / Kota",
              teks: "Studi tiru Pemerintah Desa Puhgogor, sharing BUM Kal Sambirejo (Gunungkidul), dan sharing BUM Desa Parangjoro.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v36"/><path d="M12 8h24l-6 8 6 8H12"/></svg>',
              judul: "Tingkat Nasional",
              teks: "Penanaman kelapa genjah bersama Presiden dan penanaman 1.000 pohon Hari Amal Bakti Kemenag.",
            },
          ],
        },
        {
          tipe: "prestasi",
          judul: "Prestasi Terkait Pengendalian Perubahan Iklim",
          podiumLabel: "Tingkat Kabupaten / Kota",
          item: [
            {
              podium: true, posisi: "tengah", tinggi: 128,
              kelas: "emas",
              peringkat: "Juara 1",
              judul: "Kategori Umum Lomba Krenova",
            },
            {
              podium: true, posisi: "kiri", tinggi: 92,
              kelas: "perak",
              peringkat: "Juara 2",
              judul: "Optimalisasi Pemanfaatan Pekarangan KWT",
            },
            {
              podium: true, posisi: "kanan", tinggi: 64,
              kelas: "perunggu",
              peringkat: "Juara Harapan 1",
              judul: "ProKlim Tingkat Kabupaten",
            },
            {
              kelas: "hijau",
              peringkat: "Penghargaan",
              judul: "Bapak Penggerak Inkubator Bisnis Santri",
              teks: "Tingkat Provinsi",
            },
          ],
        },
        {
          tipe: "kartu-program",
          judul: "Keikutsertaan dalam Program Terkait Lain",
          item: [
            {
              judul: "Destana (Desa Tangguh Bencana) dan Kampung KB",
              teks: "Tingkat Kabupaten / Kota",
            },
            {
              judul: "LMDH (Lembaga Masyarakat Desa Hutan) — Perhutani",
              teks: "Tingkat Provinsi",
            },
            {
              judul: "Desa Cerdas",
              teks: "Tingkat Nasional",
            },
          ],
        },
        {
          tipe: "galeri-cuplikan",
          judul: "Dokumentasi Partisipasi & Kapasitas Masyarakat",
          deskripsi: "Gotong royong warga, studi tiru, jejaring, dan prestasi ProKlim Sanggang Berkreasi.",
          kategori: "Kelembagaan",
          sub: "Kapasitas Masyarakat & Prestasi",
          mulai: 1,
          jumlah: 8,
        },
      ],
    },
    {
      id: "klb-eksternal",
      ikon: "🌐",
      judul: "Dukungan & Pengembangan",
      subjudul:
        "Dukungan dana, barang, dan jasa dari pemerintah, dunia usaha, dan perguruan tinggi, serta pengembangan kegiatan dari tahun ke tahun.",
      blok: [
        {
          tipe: "profil-grid",
          judul: "Bentuk Dukungan Eksternal",
          gambarDari: { kategori: "Kelembagaan", sub: "Dukungan Eksternal & Manfaat Program", indeks: 0 },
          item: [
            { judul: "Pemerintah desa / kelurahan", teks: "Bantuan pemerintah desa melalui pengajuan proposal" },
            { judul: "Pemerintah kecamatan", teks: "Bantuan BUM DESMA — kegiatan pembuahan durian" },
            { judul: "Pemerintah kabupaten / kota", teks: "Bantuan biopori, komposter, bibit tanaman, dan bibit ikan" },
            { judul: "Pemerintah pusat", teks: "Bantuan bibit kelapa genjah" },
            { judul: "Dunia usaha", teks: "CSR Pertamina" },
            { judul: "Organisasi non-pemerintah", teks: "LPM Sukoharjo dan Baznas" },
            { judul: "Perguruan tinggi / akademisi", teks: "UNIVET, UII, dan UNS" },
          ],
        },
        {
          tipe: "arah-alur",
          judul: "Arah Penguatan Kemitraan",
          item: [
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L24 8l18 10"/><path d="M8 18h32"/><path d="M11 18v18M18 18v18M24 18v18M30 18v18M37 18v18"/><path d="M6 40h36"/></svg>',
              judul: "Pemerintah",
              teks: "Sinkronisasi program dengan desa, kecamatan, kabupaten, provinsi, dan pusat.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="6" width="20" height="36"/><path d="M30 16h8v26h-8"/><path d="M15 13h4M23 13h4M15 20h4M23 20h4M15 27h4M23 27h4M15 34h4M23 34h4"/><path d="M34 22h2M34 28h2M34 34h2"/></svg>',
              judul: "Dunia Usaha",
              teks: "Penggalangan dukungan CSR untuk sarana adaptasi dan mitigasi desa.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l20-8 20 8-20 8-20-8z"/><path d="M14 22v8c0 3 5 5 10 5s10-2 10-5v-8"/><path d="M44 18v10"/></svg>',
              judul: "Perguruan Tinggi",
              teks: "Pendampingan teknis, penelitian, KKN, dan pelatihan kapasitas masyarakat.",
            },
          ],
        },
        {
          tipe: "profil",
          judul: "Pengembangan Kegiatan",
          arah: "kanan",
          gambar: "assets/img/pengembangan-kegiatan.jpg",
          gambarAlt: "Kegiatan hidroponik ProKlim Desa Sanggang",
          item: [
            {
              judul: "Konsistensi pelaksanaan kegiatan",
              teks: "Kegiatan adaptasi dan mitigasi dilakukan secara terus-menerus, antara lain kegiatan KWT, produksi pupuk dari kotoran hewan, dan Bank Sampah dengan prinsip 3R. Bukti: tercatat dalam buku data aksi.",
            },
            {
              judul: "Penambahan kegiatan",
              teks: "Ada penambahan jenis dan luasan kegiatan adaptasi serta mitigasi dalam dua tahun terakhir. Bukti: data kegiatan berdasarkan tahun pelaksanaan.",
            },
          ],
        },
        {
          tipe: "galeri-cuplikan",
          judul: "Dokumentasi Dukungan & Pengembangan",
          deskripsi: "Jejak kemitraan dengan pemerintah, dunia usaha, perguruan tinggi, serta perkembangan kegiatan dari tahun ke tahun.",
          kategori: "Kelembagaan",
          sub: "Dukungan Eksternal & Manfaat Program",
          mulai: 9,
          jumlah: 7,
        },
      ],
    },
    {
      id: "klb-data",
      ikon: "🗂️",
      judul: "Data & Manfaat Program",
      subjudul:
        "Sistem pencatatan dan pemantauan data aksi, serta manfaat ekonomi, sosial, dan lingkungan yang dirasakan warga.",
      blok: [
        {
          tipe: "profil",
          judul: "Pengelolaan Data Aksi",
          gayaDaftar: "alur",
          gambarDari: { kategori: "Kelembagaan", sub: "Dukungan Eksternal & Manfaat Program", indeks: 16 },
          item: [
            {
              judul: "Sistem pencatatan",
              teks: "Ada sistem pencatatan data aksi adaptasi dan mitigasi, perkembangan kelembagaan, serta dukungan keberlanjutan (manual dan komputerisasi)",
            },
            { judul: "Personel", teks: "Ada personel yang bertanggung jawab mengelola data — sekretaris dan operator data" },
            { judul: "Pembaruan data", teks: "Dilakukan pembaruan secara berkala" },
          ],
        },
        {
          tipe: "evaluasi-tab",
          judul: "Rencana Pemantauan dan Evaluasi",
          item: [
            {
              judul: "Adaptasi",
              baris: [
                { label: "Indikator", isi: "Titik lereng tertanami, jumlah rumah tangga pekarangan tahan iklim, kejadian longsor/retakan, hari gangguan air bersih." },
                { label: "Bukti", isi: "Foto geotag, daftar hadir gotong royong, catatan sumber air, rekap kejadian cuaca." },
                { label: "Frekuensi", isi: "Akhir tahun dan pascahujan ekstrem." },
              ],
            },
            {
              judul: "Mitigasi",
              baris: [
                { label: "Indikator", isi: "Jumlah bibit ditanam, luasan vegetasi tambahan, unit & volume kompos, pemanfaatan biogas, kejadian pembakaran dicegah." },
                { label: "Bukti", isi: "Buku stok bibit, foto tanam, log kompos, catatan operasional biogas, berita acara sosialisasi." },
                { label: "Frekuensi", isi: "Triwulan dan akhir tahun." },
              ],
            },
            {
              judul: "Kelembagaan",
              baris: [
                { label: "Indikator", isi: "SK Tim ProKlim, jumlah pelatihan, tingkat kehadiran, jumlah rapat kemitraan, dukungan yang diperoleh." },
                { label: "Bukti", isi: "SK, undangan, notulen, daftar hadir, dokumentasi dukungan." },
                { label: "Frekuensi", isi: "Semesteran dan akhir tahun." },
              ],
            },
          ],
        },
        {
          tipe: "checklist",
          judul: "Capaian",
          kolomGanda: true,
          item: [
            { judul: "Penanaman vetiver / pohon" },
            { judul: "Sumur resapan / rorak" },
            { judul: "Pekarangan tahan iklim" },
            { judul: "Persemaian" },
            { judul: "Pelatihan" },
            { judul: "Rapat kemitraan" },
          ],
        },
        {
          tipe: "manfaat-pita",
          judul: "Tiga Manfaat Utama",
          item: [
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="24" cy="14" rx="14" ry="6"/><path d="M10 14v20c0 3.3 6.3 6 14 6s14-2.7 14-6V14"/><path d="M10 24c0 3.3 6.3 6 14 6s14-2.7 14-6"/></svg>',
              judul: "Manfaat Ekonomi",
              teks:
                "Kegiatan adaptasi dan mitigasi memberi tambahan penghasilan rumah tangga melalui hasil pekarangan, buah tahunan, pupuk organik, dan Bank Sampah.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="16" r="6"/><circle cx="33" cy="18" r="5"/><path d="M6 40c0-8 5.4-13 12-13s12 5 12 13"/><path d="M28 40c0-6 3.6-11 10-11 4 0 7 2 8.5 5"/></svg>',
              judul: "Manfaat Sosial",
              teks:
                "Gotong royong menguat, kelembagaan desa lebih aktif, dan masyarakat memiliki kesempatan berbagi pengetahuan melalui studi tiru dan pelatihan.",
            },
            {
              svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 38C10 20 24 8 40 8c0 16-12 30-30 30z"/><path d="M10 38c6-10 14-16 22-20"/></svg>',
              judul: "Manfaat Lingkungan",
              teks:
                "Tutupan vegetasi bertambah, sumber air terjaga, sampah berkurang, dan risiko bencana hidrometeorologi menurun.",
            },
          ],
        },
        {
          tipe: "teks",
          judul: "Penutup",
          paragraf: [
            "Desa Sanggang memiliki alasan yang kuat untuk menjadi lokasi ProKlim dengan fokus utama pada longsor dan kekeringan. Desa ini berada pada bentang perbukitan yang membutuhkan penguatan lereng, konservasi air, dan peningkatan vegetasi.",
            "Pada saat yang sama, modal sosial dan ekologis desa sangat mendukung: masyarakat agraris, kebun campuran, komoditas buah tahunan, kelembagaan desa aktif, dan pengalaman kemitraan. Dengan kelembagaan yang rapi dan pemantauan rutin, Desa Sanggang berpeluang menjadi model ProKlim berbasis bentang lahan perbukitan yang sederhana, realistis, dan kuat secara sosial-ekologis.",
          ],
        },
        {
          tipe: "galeri-cuplikan",
          judul: "Dokumentasi Data & Manfaat Program",
          deskripsi: "Arsip pencatatan data aksi serta manfaat ekonomi, sosial, dan lingkungan yang dirasakan warga.",
          kategori: "Kelembagaan",
          sub: "Dukungan Eksternal & Manfaat Program",
          mulai: 17,
          jumlah: 7,
        },
      ],
    },

    /* ============ ARTIKEL & GALERI ============ */
    {
      id: "artikel",
      ikon: "📰",
      judul: "Artikel",
      subjudul: "Bacaan ringan seputar Program Kampung Iklim dan praktiknya di Desa Sanggang.",
      blok: [{ tipe: "daftar-artikel" }],
    },
    {
      id: "galeri",
      ikon: "🖼️",
      judul: "Galeri",
      subjudul: "Dokumentasi kegiatan adaptasi, mitigasi, dan kelembagaan ProKlim Desa Sanggang.",
      blok: [{ tipe: "galeri-penuh" }],
    },
  ],

  /* ---------- ARTIKEL ---------- */
  artikel: [
    {
      id: "a1",
      judul: "Mengenal Program Kampung Iklim (ProKlim)",
      kategori: "Kelembagaan",
      tanggal: "2026-01-12",
      penulis: "Tim ProKlim Sanggang Berkreasi",
      ringkasan:
        "ProKlim adalah gerakan nasional yang mengajak warga desa melakukan aksi nyata menghadapi perubahan iklim, mulai dari halaman rumah sendiri.",
      gambar: "assets/galeri/adp-001.jpg",
      isi: [
        "Program Kampung Iklim atau ProKlim merupakan strategi penguatan aksi lokal dalam menghadapi dampak perubahan iklim. Program ini menempatkan masyarakat desa sebagai pelaku utama, bukan sekadar penerima bantuan. Aksi yang dinilai bukan proyek besar, melainkan kegiatan sehari-hari yang konsisten dilakukan warga.",
        "ProKlim berdiri di atas tiga pilar. Pilar pertama adalah <b>adaptasi</b>, yaitu upaya menyesuaikan diri terhadap dampak yang sudah terasa: kekeringan, longsor, kebakaran hutan, gagal panen, dan penyakit yang muncul mengikuti pola cuaca. Pilar kedua adalah <b>mitigasi</b>, yaitu upaya menekan emisi gas rumah kaca sekaligus meningkatkan serapan karbon. Pilar ketiga adalah <b>kelembagaan</b>, yaitu memastikan ada organisasi, aturan, pendanaan, dan pencatatan agar kegiatan tidak berhenti ketika pengurusnya berganti.",
        "Di Desa Sanggang, Kecamatan Bulu, Kabupaten Sukoharjo, ketiga pilar itu diterjemahkan menjadi paket aksi yang sederhana dan bisa dipantau: memperbanyak tanaman, memperkuat lereng, menahan air hujan, mengamankan sumber air, mengurangi pembakaran terbuka, serta menanam pohon yang memberi manfaat ekonomi.",
        "Prinsip yang dipegang adalah satu aksi memberi manfaat ganda. Menanam pohon buah di lereng, misalnya, sekaligus menahan tanah agar tidak longsor, menambah serapan karbon, dan memberi penghasilan tambahan bagi keluarga. Dengan cara ini, warga tidak merasa sedang mengerjakan program lingkungan yang terpisah dari kehidupan sehari-harinya.",
        "Lembaga pelaksana di desa ini bernama <b>ProKlim Sanggang Berkreasi</b>, didukung PKK, Karang Taruna, RKDD, LPM, Destana, Bank Sampah, dan Kelompok Wanita Tani. Semua kegiatan dicatat dalam buku data aksi dan diperbarui secara berkala sebagai bahan evaluasi tahunan.",
      ],
    },
    {
      id: "a2",
      judul: "Mengapa Desa Sanggang Rawan Longsor dan Kekeringan",
      kategori: "Adaptasi",
      tanggal: "2026-01-20",
      penulis: "Tim ProKlim Sanggang Berkreasi",
      ringkasan:
        "Bentang perbukitan memberi berkah sekaligus risiko. Pemetaan menunjukkan Kaligunting berada pada kelas kerentanan sangat tinggi untuk kedua ancaman.",
      gambar: "assets/galeri/adp-011.jpg",
      isi: [
        "Desa Sanggang memiliki luas sekitar 574 hektare dengan tipologi perbukitan dan basis penghidupan pertanian serta perkebunan. Kondisi ini menjadi modal ekologis yang besar, tetapi sekaligus menjadi sumber kerentanan: longsor pada musim hujan dan kekeringan pada musim kemarau.",
        "Kerentanan desa dipengaruhi oleh kondisi lereng, jenis tanah, curah hujan, ketersediaan sumber air, penggunaan lahan, dan kapasitas adaptasi masyarakat. Hasil pemetaan menunjukkan wilayah bagian timur dan tenggara paling menonjol untuk kerentanan longsor, karena lereng curam, tanah lapuk, curah hujan tinggi, vegetasi jarang, dan drainase yang buruk.",
        "Untuk kekeringan, dusun dengan akses air terbatas dan ketergantungan tinggi terhadap air hujan menunjukkan skor lebih tinggi. Pola sebarannya mirip, yaitu terkonsentrasi di wilayah timur dan tenggara desa.",
        "Dari 12 dusun yang dipetakan, <b>Kaligunting</b> berada pada kelas sangat tinggi untuk longsor (skor 4,08) maupun kekeringan (skor 4,10). <b>Tawing, Tileng, dan Banjarsari</b> masuk kelas tinggi. Sementara Sanggang, Dranjang, Samin, Wates, dan Klepu berada pada kelas rendah hingga sedang.",
        "Klasifikasi ini bukan untuk menakut-nakuti, melainkan untuk menentukan urutan kerja. Dusun kelas tinggi dan sangat tinggi menjadi lokasi awal intervensi seperti reboisasi lereng, drainase mikro, tandon air, dan perlindungan mata air. Sedangkan dusun kelas rendah–sedang diarahkan menjadi zona konservasi, lokasi pembibitan, dan tempat pembelajaran praktik baik bagi dusun lain.",
      ],
    },
    {
      id: "a3",
      judul: "Biopori, Rorak, dan Sumur Resapan: Cara Sederhana Menabung Air",
      kategori: "Adaptasi",
      tanggal: "2026-02-03",
      penulis: "Bidang Adaptasi ProKlim Sanggang",
      ringkasan:
        "Tanpa alat mahal, warga Sanggang membuat 500 biopori, 492 rorak, dan 1.112 unit penampungan air hujan untuk menahan air agar tidak langsung hilang terbawa limpasan.",
      gambar: "assets/galeri/adp-016.jpg",
      isi: [
        "Masalah air di desa perbukitan jarang soal jumlah hujan, melainkan soal kecepatan air pergi. Hujan turun deras, mengalir cepat di permukaan lereng, lalu hilang sebelum sempat meresap. Akibatnya dua musim sama-sama menyulitkan: musim hujan membawa risiko erosi dan longsor, musim kemarau membawa kekeringan.",
        "Karena itu aksi adaptasi di Desa Sanggang bertumpu pada satu ide sederhana: memperlambat air. <b>Biopori</b> berupa lubang silindris kecil di tanah yang diisi sampah organik. Sudah dibuat sekitar 500 unit. Selain meresapkan air, lubang ini menyuburkan tanah di sekitarnya karena sampah organik terurai menjadi kompos.",
        "<b>Rorak atau jogangan</b> adalah lubang memanjang yang digali melintang lereng untuk menampung limpasan. Di desa ini tercatat 492 unit. Ditambah <b>sumur resapan</b> sebanyak 5 unit yang mengarahkan air hujan dari atap dan halaman langsung masuk ke dalam tanah.",
        "Untuk kebutuhan rumah tangga, warga mengandalkan <b>Penampungan Air Hujan (PAH/IPAH)</b> yang jumlahnya mencapai 1.112 unit, ditambah 400 lubang penampung air berupa kolam dan sumur tadah hujan, serta satu embung sebagai cadangan air desa.",
        "Praktik ini dilengkapi kebiasaan hemat air: 75% keluarga memanfaatkan kembali air bekas — misalnya air cucian beras untuk menyiram tanaman — dan 100% keluarga menerapkan pembatasan penggunaan air melalui pompa Pamsimas otomatis.",
        "Pelajaran pentingnya, aksi adaptasi tidak harus mahal. Yang dibutuhkan adalah konsistensi memelihara: lubang biopori perlu diisi ulang, rorak perlu dibersihkan dari endapan, dan bak penampung perlu dicek sebelum musim hujan tiba.",
      ],
    },
    {
      id: "a4",
      judul: "Bank Sampah dan Kompos: Mengubah Sampah Jadi Berkah",
      kategori: "Mitigasi",
      tanggal: "2026-02-17",
      penulis: "Bidang Mitigasi ProKlim Sanggang",
      ringkasan:
        "Sebanyak 75% keluarga sudah memilah sampah, mengompos, dan menjalankan 3R. Hanya 2% sampah desa yang berakhir di TPA.",
      gambar: "assets/galeri/mit-088.jpg",
      isi: [
        "Sampah yang dibakar atau dibuang ke lahan kosong melepaskan karbon dioksida, metana, dan partikulat ke udara. Di sisi lain, sampah organik yang dikelola dengan benar justru bisa dikembalikan ke tanah sebagai kompos. Selisih antara dua perlakuan itulah yang menjadi ruang mitigasi paling mudah dijangkau warga desa.",
        "Di Desa Sanggang, 95% keluarga sudah mengumpulkan sampahnya dengan tertib dan 90% memiliki wadah sampah. Tahap berikutnya yang lebih menentukan adalah pemilahan: saat ini 75% keluarga memilah sampah, mengompos, dan menjalankan prinsip 3R (<i>reduce, reuse, recycle</i>) melalui Bank Sampah.",
        "Hasilnya terlihat pada sisi hilir. Hanya sekitar 2% sampah yang dikirim ke Tempat Pembuangan Akhir. Sisanya diselesaikan di dalam desa. Pekerjaan rumah yang masih tersisa adalah menurunkan angka sampah yang dibuang ke lahan kosong (20%) dan yang dibakar (10%).",
        "Untuk limbah cair, warga memanfaatkan urin kelinci sebagai bahan pupuk cair — kini dilakukan sekitar 80 keluarga. Ada pula tangki septik dengan instalasi penangkap metana dan IPAL anaerob yang dilengkapi penangkap gas.",
        "Bank Sampah Arta Sejahtera menjadi simpul kegiatan ini dan berkolaborasi dengan KWT Mekarsari. Selain mengurangi emisi, kegiatan ini memberi manfaat ekonomi langsung: sampah yang dulunya dibakar kini punya nilai jual, dan kompos yang dihasilkan mengurangi belanja pupuk keluarga tani.",
      ],
    },
    {
      id: "a5",
      judul: "Agroforestri Lereng: Menanam Pohon yang Menahan Tanah dan Menambah Penghasilan",
      kategori: "Mitigasi",
      tanggal: "2026-03-05",
      penulis: "Tim ProKlim Sanggang Berkreasi",
      ringkasan:
        "Alpukat, durian, nangka, petai, dan kaliandra ditanam di lereng — menstabilkan tanah, menambah serapan karbon, sekaligus menjadi tabungan keluarga.",
      gambar: "assets/galeri/mit-105.jpg",
      isi: [
        "Menanam pohon di lereng sering dianggap sekadar penghijauan. Padahal, jika jenis pohonnya dipilih dengan tepat, satu kegiatan bisa menyelesaikan beberapa persoalan sekaligus. Inilah yang dituju oleh konsep agroforestri lereng dalam ProKlim Desa Sanggang.",
        "Akar pohon tahunan mengikat tanah pada lereng curam sehingga risiko longsor menurun. Tajuknya menahan pukulan air hujan agar tidak langsung menggerus permukaan tanah. Biomassanya menyimpan karbon. Dan buahnya memberi penghasilan bagi pemilik lahan.",
        "Jenis yang direkomendasikan adalah <b>alpukat</b> (1.500 batang), <b>durian</b> (1.000 batang), <b>nangka</b> (500 batang), <b>petai atau jengkol</b> (500 batang), serta <b>gliricidia/kaliandra</b> (1.500 batang) sebagai tanaman pagar dan penguat lereng. Untuk pekarangan rumah tangga disiapkan paket kelor, pisang, dan pepaya.",
        "Target aksi agroforestri lereng adalah 3.000 bibit pada minimal 15 hektare, dikerjakan bertahap pada 2027–2028. Sementara penanaman tanaman penutup tanah pada garis kontur ditargetkan minimal 500 bibit sepanjang 1 kilometer garis kontur, mulai 2026.",
        "Desa ini sudah punya rekam jejaknya: penanaman 10.000 kelapa genjah pada 2022, 1.000 tanaman buah pada 2025, dan 1.000 pohon buah dalam rangka Hari Amal Bakti Kemenag pada 2025. Praktik wanatani tercatat mencakup 344 hektare, dan penghijauan secara keseluruhan mencapai 427 hektare.",
        "Kunci keberhasilannya bukan pada hari penanaman, melainkan pada pemeliharaan setelahnya. Karena itu ProKlim Sanggang menyiapkan jadwal gotong royong pemeliharaan tanaman per RT/RW beserta buku kontrol, agar tingkat hidup bibit tetap tinggi dan rasa memiliki warga terus terjaga.",
      ],
    },
  ],
};
