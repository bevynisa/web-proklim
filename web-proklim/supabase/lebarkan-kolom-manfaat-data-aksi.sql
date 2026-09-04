-- Jalankan SEKALI di Supabase SQL Editor.
-- Melebarkan kolom terakhir ("Manfaat") tabel Data Aksi Adaptasi & Mitigasi
-- supaya teksnya yang panjang tidak memaksa setiap baris jadi sangat tinggi
-- ke bawah — tabel jadi boleh discroll ke samping untuk kolom ini.

update konten_halaman
set konten = jsonb_set(konten, '{kolomTerakhirLebar}', 'true'::jsonb)
where kunci_blok = 'adaptasi-data-aksi';
