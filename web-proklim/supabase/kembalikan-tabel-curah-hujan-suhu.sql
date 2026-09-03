-- Jalankan SEKALI di Supabase SQL Editor. Mengembalikan "Curah Hujan
-- Bulanan" & "Suhu Rata-Rata Bulanan" ke bentuk TABEL (bukan grafik
-- batang lagi) — MENIMPA hasil ganti-grafik-curah-hujan-suhu.sql yang
-- sebelumnya, aman dijalankan meski yang itu sudah pernah dijalankan.
--
-- Kali ini gaya tabelnya disamakan dengan tabel Data Aksi (kolom
-- terakhir teks biasa, tidak tebal/berwarna) — kodenya sudah diubah
-- supaya semua tabel di situs otomatis pakai gaya yang sama, jadi
-- tidak perlu diatur lagi di sini.

update konten_halaman
set
  tipe_blok = 'tabel',
  konten = '{
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
where kunci_blok = 'data-dasar-curah-hujan';

update konten_halaman
set
  tipe_blok = 'tabel',
  konten = '{
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
where kunci_blok = 'data-dasar-suhu';
