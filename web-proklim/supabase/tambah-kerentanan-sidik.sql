-- Jalankan SEKALI di Supabase SQL Editor. Menambahkan kartu "Kerentanan
-- Iklim Desa (Data SIDIK)" di halaman Data Dasar, ditaruh tepat di
-- bawah grafik Indeks Kerentanan per Dusun (sama-sama soal kerentanan,
-- jadi dikelompokkan berdekatan) dan di atas kartu Data Dasar Lokasi
-- ProKlim / Curah Hujan / Suhu.
--
-- CATATAN: dua tabel lain di lembar isian ("Perubahan yang terjadi di
-- lokasi dalam 5 tahun terakhir" dan "Fungsi sumber air") masih KOSONG
-- semua kolom Tingkat Kejadian/Fungsi & Keterangannya di dokumen yang
-- dikirim, jadi BELUM dimasukkan di sini — kirim datanya kalau sudah
-- terisi, nanti saya tambahkan juga.

-- geser urutan 3 blok yang sudah ada supaya ada tempat di urutan 1
update konten_halaman set urutan = 4 where kunci_blok = 'data-dasar-suhu';
update konten_halaman set urutan = 3 where kunci_blok = 'data-dasar-curah-hujan';
update konten_halaman set urutan = 2 where kunci_blok = 'data-dasar-profil-resmi';

insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'data-dasar', 'data-dasar-kerentanan-sidik', 'statistik', 'Kerentanan Iklim Desa (Data SIDIK)', 1,
  '{
    "judul": "Kerentanan Iklim Desa (Data SIDIK)",
    "deskripsi": "Berdasarkan Data Kerentanan Desa/Kelurahan dari SIDIK (Sistem Informasi Data Iklim dan Kerentanan) — sidik.menlhk.go.id.",
    "item": [
      { "angka": "3", "label": "Tingkat Kerentanan" },
      { "angka": "0,55608", "label": "Indeks Kapasitas Adaptif (IKA)" },
      { "angka": "0,501", "label": "Indeks Keterpaparan & Sensitivitas (IKS)" }
    ]
  }'::jsonb
)
on conflict (kunci_blok) do nothing;
