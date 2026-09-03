-- Jalankan SEKALI di Supabase SQL Editor. Memindahkan "Peta Mitigasi
-- Bencana Longsor & Rute Evakuasi" dari halaman Mitigasi ke halaman
-- Data Dasar, ditaruh di atas ketiga grafik (Indeks Kerentanan per
-- Dusun, Curah Hujan Bulanan, Suhu Rata-Rata Bulanan). Otomatis hilang
-- dari halaman Mitigasi setelah ini.
--
-- Urutan baru Data Dasar: Kerentanan Iklim Desa (SIDIK), Data Dasar
-- Lokasi ProKlim, Peta Mitigasi Bencana Longsor, lalu ketiga grafik.

update konten_halaman set urutan = 6 where kunci_blok = 'data-dasar-suhu';
update konten_halaman set urutan = 5 where kunci_blok = 'data-dasar-curah-hujan';
update konten_halaman set urutan = 4 where kunci_blok = 'adaptasi-indeks-kerentanan';

update konten_halaman
set halaman = 'data-dasar', urutan = 3
where kunci_blok = 'mitigasi-peta-evakuasi';
