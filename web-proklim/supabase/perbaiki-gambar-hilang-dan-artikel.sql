-- Jalankan SEKALI di Supabase SQL Editor.
--
-- BAGIAN 1: 3 bagian di halaman Kelembagaan yang sebelumnya punya gambar
-- (lewat "gambarDari" yang mengambil dari galeri lama) jadi kosong setelah
-- galeri diganti total dengan foto HD baru — nama kategori/komponen lama
-- ("Dukungan Eksternal & Manfaat Program", dst) sudah tidak ada lagi.
-- Diperbaiki dengan menunjuk langsung ke foto HD baru yang sesuai isinya.

update konten_halaman
set konten = jsonb_set(jsonb_set(konten, '{gambar}',
    '"https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-klb-0107.jpg"'),
    '{gambarAlt}', '"Musyawarah warga ProKlim Desa Sanggang"')
where kunci_blok = 'klb-partisipasi-keswadayaan';

update konten_halaman
set konten = jsonb_set(jsonb_set(konten, '{gambar}',
    '"https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-klb-0074.jpg"'),
    '{gambarAlt}', '"Papan bantuan keuangan kabupaten untuk Desa Sanggang"')
where kunci_blok = 'klb-eksternal-dukungan';

update konten_halaman
set konten = jsonb_set(jsonb_set(konten, '{gambar}',
    '"https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-klb-0170.jpg"'),
    '{gambarAlt}', '"Rapat pemantauan data aksi ProKlim Desa Sanggang"')
where kunci_blok = 'klb-data-pengelolaan';

-- BAGIAN 2: ganti foto artikel yang masih pakai foto lama/tidak HD dengan
-- foto HD dari galeri yang baru, dipilih sesuai judul & isi artikelnya.
-- (4 artikel "Mahasiswa KKN UII" sengaja TIDAK disentuh sesuai permintaan.)

update artikel set gambar_url =
  'https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-klb-0113.jpg'
where judul = 'Mengenal Program Kampung Iklim (ProKlim)';

update artikel set gambar_url =
  'https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-adp-0021.jpg'
where judul = 'Mengapa Desa Sanggang Rawan Longsor dan Kekeringan';

update artikel set gambar_url =
  'https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-adp-0026.jpg'
where judul = 'Biopori, Rorak, dan Sumur Resapan: Cara Sederhana Menabung Air';

update artikel set gambar_url =
  'https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-mit-0009.jpg'
where judul = 'Bank Sampah dan Kompos: Mengubah Sampah Jadi Berkah';

update artikel set gambar_url =
  'https://bkvcllvxsfiekszhdbrx.supabase.co/storage/v1/object/public/galeri/drv-mit-0005.jpg'
where judul = 'Agroforestri Lereng: Menanam Pohon yang Menahan Tanah dan Menambah Penghasilan';
