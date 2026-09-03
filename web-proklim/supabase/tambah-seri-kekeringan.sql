-- Jalankan SEKALI di Supabase SQL Editor. Menambah grafik "Indeks
-- Kerentanan" di halaman Adaptasi jadi 3 kelompok data: Longsor,
-- Kekeringan, Kebakaran (sebelumnya cuma Longsor & Kebakaran, walau
-- judulnya sempat menyebut "Kekeringan" padahal belum ada datanya).
--
-- Kode singkat tiap kelompok di grafik: L = Longsor, KR = Kekeringan,
-- KB = Kebakaran — sengaja dibedakan (bukan cuma huruf pertama) biar
-- Kekeringan & Kebakaran tidak ketuker karena sama-sama diawali "K".
--
-- Warna kelas disederhanakan jadi 3 tingkat: Tinggi = merah,
-- Sedang = oranye, Rendah = hijau (sebelumnya ada 4 tingkat termasuk
-- "Sangat Tinggi").
--
-- CATATAN: data Kekeringan per dusun BELUM diisi di sini (dikosongkan)
-- karena belum ada datanya. Isi lewat dashboard admin: menu Adaptasi >
-- bagian "Indeks Kerentanan" > kolom Nilai/Kelas Kekeringan tiap dusun
-- — form-nya sekarang sudah mendukung 3 kelompok data.

update konten_halaman
set
  judul_blok = 'Indeks Kerentanan Longsor, Kekeringan & Kebakaran per Dusun',
  konten = '{
    "judul": "Indeks Kerentanan Longsor, Kekeringan & Kebakaran per Dusun",
    "deskripsi": "Dusun dengan kelas tinggi menjadi lokasi awal intervensi; dusun kelas rendah–sedang diarahkan sebagai zona konservasi, pembibitan, dan pembelajaran praktik baik.",
    "maksimal": 5,
    "seri": [
      { "nama": "Longsor", "kode": "L" },
      { "nama": "Kekeringan", "kode": "KR" },
      { "nama": "Kebakaran", "kode": "KB" }
    ],
    "item": [
      { "label": "Dranjang", "nilai": ["0,8", "", ""], "kelas": ["Sedang", "", "Rendah"] },
      { "label": "Banjarsari", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Rendah"] },
      { "label": "Samin", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Rendah"] },
      { "label": "Klepu", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Rendah"] },
      { "label": "Sanggang", "nilai": ["1,5", "", ""], "kelas": ["Sedang", "", "Rendah"] },
      { "label": "Wates", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Rendah"] },
      { "label": "Kaligunting", "nilai": ["0,8", "", ""], "kelas": ["Sedang", "", "Rendah"] },
      { "label": "Tileng", "nilai": ["", "", ""], "kelas": ["Sedang", "", "Tinggi"] },
      { "label": "Kedungnongko", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Rendah"] },
      { "label": "Tawing", "nilai": ["0,8", "", ""], "kelas": ["Sedang", "", "Rendah"] },
      { "label": "Bedug Kidul", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Rendah"] },
      { "label": "Bedug Tengah", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Sedang"] },
      { "label": "Bedug Lor", "nilai": ["", "", ""], "kelas": ["Rendah", "", "Sedang"] },
      { "label": "Pangkah", "nilai": ["", "", ""], "kelas": ["Sedang", "", "Tinggi"] }
    ]
  }'::jsonb
where kunci_blok = 'adaptasi-indeks-kerentanan';
