-- Jalankan SEKALI di Supabase SQL Editor. Menambahkan bagian
-- "Pengertian Adaptasi" dan "Pengertian Mitigasi" di paling atas
-- halaman Adaptasi & Mitigasi (sebelum "Arah Aksi Adaptasi" /
-- "Arah Aksi Mitigasi"), berisi definisi resmi sesuai yang dikirim.

insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'adaptasi', 'adaptasi-pengertian', 'teks', 'Pengertian Adaptasi', 0,
  '{
    "judul": "Apa Itu Adaptasi Perubahan Iklim?",
    "paragraf": ["<b>Adaptasi perubahan iklim</b> adalah upaya yang dilakukan untuk meningkatkan kemampuan dalam menyesuaikan diri terhadap perubahan iklim, termasuk keragaman iklim dan kejadian iklim ekstrim, sehingga potensi kerusakan akibat perubahan iklim berkurang, peluang yang ditimbulkan akibat perubahan iklim dapat dimanfaatkan, dan konsekuensi yang timbul akibat perubahan iklim dapat diatasi."]
  }'::jsonb
)
on conflict (kunci_blok) do nothing;

insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'mitigasi', 'mitigasi-pengertian', 'teks', 'Pengertian Mitigasi', 0,
  '{
    "judul": "Apa Itu Mitigasi Perubahan Iklim?",
    "paragraf": ["<b>Mitigasi perubahan iklim</b> adalah serangkaian kegiatan yang dilakukan dalam upaya menurunkan tingkat emisi Gas Rumah Kaca (GRK), sebagai bentuk upaya penanggulangan dampak perubahan iklim."]
  }'::jsonb
)
on conflict (kunci_blok) do nothing;
