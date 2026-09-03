-- Jalankan SEKALI di Supabase SQL Editor. Menggabungkan tabel "Data
-- Aksi Adaptasi" dan "Data Aksi Mitigasi" (yang sebelumnya dipindah ke
-- halaman "data-aksi" lewat pindah-data-aksi.sql) jadi SATU tabel saja
-- di halaman Data Aksi. Bedanya cuma dari kolom "Kategori" (Adaptasi /
-- Mitigasi), baris dengan kategori sama dikelompokkan jadi satu blok
-- visual di dalam tabel yang sama — bukan dua kotak terpisah lagi.
--
-- Catatan: kalau kamu jalankan file ini sebelum pindah-data-aksi.sql,
-- jalankan pindah-data-aksi.sql dulu.

update konten_halaman
set
  judul_blok = 'Data Aksi Adaptasi & Mitigasi',
  urutan = 1,
  konten = '{
    "judul": "Data Aksi Adaptasi & Mitigasi",
    "deskripsi": "Rekap output kegiatan pendukung aksi adaptasi dan mitigasi di Desa Sanggang, hasil kolaborasi dengan berbagai pihak.",
    "gabungKolomPertama": true,
    "kolom": ["Kategori", "No", "Bentuk Aksi", "Nama Kegiatan", "Tanggal Pelaksanaan", "Lokasi", "Pelaksana", "Output/Hasil", "Manfaat"],
    "baris": [
      ["Adaptasi", "1", "Edukasi & Informasi Bencana", "Pembuatan Artikel dan Video Edukasi Kesiapsiagaan Tanah Longsor", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 artikel dan 1 video edukasi", "Membekali warga langkah yang tepat sebelum, saat, dan setelah terjadi tanah longsor"],
      ["Mitigasi", "2", "Edukasi & Informasi Bencana", "Pembuatan Artikel dan Video Edukasi Pencegahan Kebakaran Hutan dan Lahan", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 artikel dan 1 video edukasi", "Meningkatkan kesadaran dan kesiapsiagaan warga menghadapi kebakaran hutan dan lahan"],
      ["Mitigasi", "3", "Edukasi & Informasi Bencana", "Pembuatan Video Panduan Komunikasi Peringatan Dini dengan Kentungan", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 video edukasi", "Memperkuat sistem peringatan dini bencana berbasis kearifan lokal"],
      ["Mitigasi", "4", "Edukasi & Informasi Bencana", "Pembuatan Peta Evakuasi Kebakaran dan Longsor", "Agustus 2026", "Desa Sanggang", "Mahasiswa KKN Universitas Islam Indonesia (UII)", "1 peta evakuasi kebakaran & longsor", "Memudahkan warga mengetahui jalur dan titik kumpul evakuasi saat bencana"]
    ]
  }'::jsonb
where kunci_blok = 'adaptasi-data-aksi';

delete from konten_halaman where kunci_blok = 'mitigasi-data-aksi';
