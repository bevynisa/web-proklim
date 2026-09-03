-- Jalankan SEKALI di Supabase SQL Editor. Memindahkan grafik "Indeks
-- Kerentanan Longsor, Kekeringan & Kebakaran per Dusun" dari halaman
-- Adaptasi ke halaman Data Dasar, ditaruh paling atas (di atas kartu
-- statistik desa). Otomatis hilang dari halaman Adaptasi setelah ini.

update konten_halaman
set halaman = 'data-dasar', urutan = 0
where kunci_blok = 'adaptasi-indeks-kerentanan';
