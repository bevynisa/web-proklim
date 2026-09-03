-- Jalankan SEKALI di Supabase SQL Editor. Versi terbaru — MENIMPA hasil
-- dari ganti-grafik-curah-hujan-suhu.sql yang sebelumnya (kalau sudah
-- sempat dijalankan, tidak masalah, tinggal jalankan yang ini lagi).
--
-- Bentuk daftar batang horizontal (12 baris ke bawah) ternyata bikin
-- pusing dibaca. Diganti jadi grafik BATANG TEGAK (kolom berjajar
-- Januari–Desember), sama seperti grafik Indeks Kerentanan per Dusun
-- yang sudah ada — sekali lihat langsung kebaca bentuk polanya.
--
-- Curah Hujan: warna kolom sesuai kategori (hijau=rendah, oranye=sedang,
-- merah=tinggi). Suhu: warna netral biru, skala mulai dari 25°C (bukan
-- 0°C) supaya beda 27 vs 28°C tetap kelihatan bedanya.

update konten_halaman
set
  tipe_blok = 'peringkat-ganda',
  konten = '{
    "judul": "Curah Hujan Bulanan",
    "deskripsi": "Rata-rata curah hujan tahunan 164 mm/bulan. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "seri": [{ "nama": "Curah Hujan (mm/bulan)", "kode": "CH" }],
    "item": [
      { "label": "Januari", "nilai": ["270"], "kelas": ["Sedang"] },
      { "label": "Februari", "nilai": ["236"], "kelas": ["Sedang"] },
      { "label": "Maret", "nilai": ["230"], "kelas": ["Sedang"] },
      { "label": "April", "nilai": ["103"], "kelas": ["Sedang"] },
      { "label": "Mei", "nilai": ["356"], "kelas": ["Tinggi"] },
      { "label": "Juni", "nilai": ["94"], "kelas": ["Rendah"] },
      { "label": "Juli", "nilai": ["3"], "kelas": ["Rendah"] },
      { "label": "Agustus", "nilai": ["34"], "kelas": ["Rendah"] },
      { "label": "September", "nilai": ["61"], "kelas": ["Rendah"] },
      { "label": "Oktober", "nilai": ["222"], "kelas": ["Sedang"] },
      { "label": "November", "nilai": ["237"], "kelas": ["Sedang"] },
      { "label": "Desember", "nilai": ["124"], "kelas": ["Sedang"] }
    ]
  }'::jsonb
where kunci_blok = 'data-dasar-curah-hujan';

update konten_halaman
set
  tipe_blok = 'peringkat-ganda',
  konten = '{
    "judul": "Suhu Rata-Rata Bulanan",
    "deskripsi": "Rata-rata suhu tahunan 28°C. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "minimal": 25,
    "maksimal": 29,
    "seri": [{ "nama": "Suhu Rata-Rata", "kode": "S" }],
    "item": [
      { "label": "Januari", "nilai": ["27"], "kelas": [""] },
      { "label": "Februari", "nilai": ["27"], "kelas": [""] },
      { "label": "Maret", "nilai": ["28"], "kelas": [""] },
      { "label": "April", "nilai": ["28"], "kelas": [""] },
      { "label": "Mei", "nilai": ["28"], "kelas": [""] },
      { "label": "Juni", "nilai": ["28"], "kelas": [""] },
      { "label": "Juli", "nilai": ["28"], "kelas": [""] },
      { "label": "Agustus", "nilai": ["28"], "kelas": [""] },
      { "label": "September", "nilai": ["28"], "kelas": [""] },
      { "label": "Oktober", "nilai": ["28"], "kelas": [""] },
      { "label": "November", "nilai": ["27"], "kelas": [""] },
      { "label": "Desember", "nilai": ["28"], "kelas": [""] }
    ]
  }'::jsonb
where kunci_blok = 'data-dasar-suhu';
