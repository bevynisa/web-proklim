-- Jalankan SEKALI di Supabase SQL Editor. Mengisi halaman "Data Dasar"
-- dengan data resmi dari Lembar Isian Program Kampung Iklim (ProKlim)
-- — Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025 — yang dikirim untuk
-- dimasukkan ke website. Muncul di bawah kartu "Profil Singkat Desa"
-- yang sudah ada (kartu itu tidak diubah, datanya tetap sama dengan Beranda).
--
-- CATATAN: tiga hal di dokumen sumber masih KOSONG / belum ada
-- keterangannya, jadi BELUM dimasukkan di sini — nanti ditambah kalau
-- datanya sudah ada:
--   1. Topografi Daerah, Tipologi Lokasi, Ciri Khas Lokasi (isian kosong di lembar)
--   2. Label 3 kategori "Penggunaan Lahan Dominan" (70% / 21% / 9% -- perlu tahu
--      70% itu lahan apa, 21% apa, 9% apa)
--   3. Label 3 kategori "Sumber Penghasilan Utama Penduduk" (65% / 30% / 5% --
--      perlu tahu 65% dari sektor apa, dst)

insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'data-dasar', 'data-dasar-profil-resmi', 'statistik', 'Data Dasar Lokasi ProKlim (Angka)', 1,
  '{
    "judul": "Data Dasar Lokasi ProKlim",
    "deskripsi": "Data resmi lokasi ProKlim Desa Sanggang — Lembar Isian Program Kampung Iklim, Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "item": [
      { "angka": "574", "satuan": "Ha", "label": "Luas Lokasi ProKlim", "ket": "Update data monografi Desa 2025" },
      { "angka": "985", "satuan": "KK", "label": "Jumlah Kepala Keluarga" },
      { "angka": "2.936", "satuan": "Jiwa", "label": "Jumlah Penduduk" },
      { "angka": "325", "satuan": "mdpl", "label": "Ketinggian dari Permukaan Laut" }
    ]
  }'::jsonb
)
on conflict (kunci_blok) do nothing;

insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'data-dasar', 'data-dasar-curah-hujan', 'tabel', 'Curah Hujan Bulanan', 2,
  '{
    "judul": "Curah Hujan Bulanan",
    "deskripsi": "Rata-rata curah hujan tahunan 164 mm/bulan. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "kolom": ["Bulan", "Curah Hujan (mm/bulan)", "Kategori"],
    "baris": [
      ["Januari", "270", "Curah Hujan Sedang"],
      ["Februari", "236", "Curah Hujan Sedang"],
      ["Maret", "230", "Curah Hujan Sedang"],
      ["April", "103", "Curah Hujan Sedang"],
      ["Mei", "356", "Curah Hujan Tinggi"],
      ["Juni", "94", "Curah Hujan Rendah"],
      ["Juli", "3", "Curah Hujan Rendah"],
      ["Agustus", "34", "Curah Hujan Rendah"],
      ["September", "61", "Curah Hujan Rendah"],
      ["Oktober", "222", "Curah Hujan Sedang"],
      ["November", "237", "Curah Hujan Sedang"],
      ["Desember", "124", "Curah Hujan Sedang"]
    ]
  }'::jsonb
)
on conflict (kunci_blok) do nothing;

insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'data-dasar', 'data-dasar-suhu', 'tabel', 'Suhu Rata-Rata Bulanan', 3,
  '{
    "judul": "Suhu Rata-Rata Bulanan",
    "deskripsi": "Rata-rata suhu tahunan 28°C. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "kolom": ["Bulan", "Suhu Rata-Rata (°C)"],
    "baris": [
      ["Januari", "27"],
      ["Februari", "27"],
      ["Maret", "28"],
      ["April", "28"],
      ["Mei", "28"],
      ["Juni", "28"],
      ["Juli", "28"],
      ["Agustus", "28"],
      ["September", "28"],
      ["Oktober", "28"],
      ["November", "27"],
      ["Desember", "28"]
    ]
  }'::jsonb
)
on conflict (kunci_blok) do nothing;
