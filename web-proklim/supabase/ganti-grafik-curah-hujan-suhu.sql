-- Jalankan SEKALI di Supabase SQL Editor. Mengganti tampilan "Curah
-- Hujan Bulanan" dan "Suhu Rata-Rata Bulanan" di halaman Data Dasar
-- dari tabel jadi grafik batang horizontal (sudah dipakai gaya yang
-- sama di bagian lain situs), lebih enak dibaca sekilas.
--
-- Curah Hujan: batang diwarnai sesuai kategori (hijau=rendah,
-- oranye=sedang, merah=tinggi). Suhu: tidak ada kategori risiko, jadi
-- batangnya warna biru netral, dengan skala dimulai dari 25°C (bukan
-- 0°C) supaya perbedaan antar bulan yang tipis (27–28°C) tetap kelihatan.

update konten_halaman
set
  tipe_blok = 'peringkat',
  konten = '{
    "judul": "Curah Hujan Bulanan",
    "deskripsi": "Rata-rata curah hujan tahunan 164 mm/bulan. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "item": [
      { "label": "Januari", "nilai": "270", "kelas": "Sedang" },
      { "label": "Februari", "nilai": "236", "kelas": "Sedang" },
      { "label": "Maret", "nilai": "230", "kelas": "Sedang" },
      { "label": "April", "nilai": "103", "kelas": "Sedang" },
      { "label": "Mei", "nilai": "356", "kelas": "Tinggi" },
      { "label": "Juni", "nilai": "94", "kelas": "Rendah" },
      { "label": "Juli", "nilai": "3", "kelas": "Rendah" },
      { "label": "Agustus", "nilai": "34", "kelas": "Rendah" },
      { "label": "September", "nilai": "61", "kelas": "Rendah" },
      { "label": "Oktober", "nilai": "222", "kelas": "Sedang" },
      { "label": "November", "nilai": "237", "kelas": "Sedang" },
      { "label": "Desember", "nilai": "124", "kelas": "Sedang" }
    ]
  }'::jsonb
where kunci_blok = 'data-dasar-curah-hujan';

update konten_halaman
set
  tipe_blok = 'peringkat',
  konten = '{
    "judul": "Suhu Rata-Rata Bulanan",
    "deskripsi": "Rata-rata suhu tahunan 28°C. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "minimal": 25,
    "maksimal": 29,
    "item": [
      { "label": "Januari", "nilai": "27" },
      { "label": "Februari", "nilai": "27" },
      { "label": "Maret", "nilai": "28" },
      { "label": "April", "nilai": "28" },
      { "label": "Mei", "nilai": "28" },
      { "label": "Juni", "nilai": "28" },
      { "label": "Juli", "nilai": "28" },
      { "label": "Agustus", "nilai": "28" },
      { "label": "September", "nilai": "28" },
      { "label": "Oktober", "nilai": "28" },
      { "label": "November", "nilai": "27" },
      { "label": "Desember", "nilai": "28" }
    ]
  }'::jsonb
where kunci_blok = 'data-dasar-suhu';
