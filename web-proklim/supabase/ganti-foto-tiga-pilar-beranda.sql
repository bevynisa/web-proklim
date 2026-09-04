-- Jalankan SEKALI di Supabase SQL Editor.
-- Mengganti 3 foto kartu "Tiga Pilar ProKlim" di Beranda (Adaptasi, Mitigasi,
-- Kelembagaan) dengan foto HD yang benar-benar menggambarkan isi tiap pilar
-- (bukan lagi foto lama/generik) — diambil dari galeri yang baru diperbarui:
--   Adaptasi    -> terasering sawah (drv-adp-0118.jpg)
--   Mitigasi    -> tutupan vegetasi/hutan (drv-mit-0004.jpg)
--   Kelembagaan -> foto komunitas/kelompok warga (drv-klb-0099.jpg)

update konten_halaman
set konten = jsonb_set(
  jsonb_set(
    jsonb_set(
      konten,
      '{item,0,gambar}',
      '"https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-adp-0118.jpg"'
    ),
    '{item,1,gambar}',
    '"https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-mit-0004.jpg"'
  ),
  '{item,2,gambar}',
  '"https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-klb-0099.jpg"'
)
where kunci_blok = 'beranda-tiga-pilar';
