-- Jalankan SEKALI di Supabase SQL Editor. Dua perubahan sekaligus:
--
-- 1) Curah Hujan Bulanan & Suhu Rata-Rata Bulanan balik jadi grafik
--    batang tegak (bukan tabel lagi) — kali ini jarak antar batang
--    dirapatkan (lewat perubahan kode, bukan di sini).
-- 2) Grafik "Indeks Kerentanan per Dusun" dipindah ke bawah — sekarang
--    urutannya: Profil Singkat Desa, Kerentanan Iklim Desa (SIDIK),
--    Data Dasar Lokasi ProKlim, BARU Indeks Kerentanan per Dusun,
--    lalu Curah Hujan Bulanan, Suhu Rata-Rata Bulanan.

update konten_halaman set urutan = 3 where kunci_blok = 'adaptasi-indeks-kerentanan';

update konten_halaman
set
  tipe_blok = 'peringkat-ganda',
  urutan = 4,
  konten = '{
    "judul": "Curah Hujan Bulanan",
    "deskripsi": "Rata-rata curah hujan tahunan 164 mm/bulan. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "seri": [{ "nama": "Curah Hujan (mm/bulan)", "kode": "CH" }],
    "item": [
      { "label": "Januari", "nilai": ["270"], "kelas": ["Sedang"] },
      { "label": "Februari", "nilai": ["236"], "kelas": ["Sedang"] },
      { "label": "Maret", "nilai": ["230"], "kelas": ["Sedang"] },
      { "label": "April", "nilai": ["103"], "kelas": ["Sedang"] },
      { "label": "Mei", "nilai": ["356"], "kelas": ["Tinggi"] },
      { "label": "Juni", "nilai": ["94"], "kelas": ["Rendah"] },
      { "label": "Juli", "nilai": ["3"], "kelas": ["Rendah"] },
      { "label": "Agustus", "nilai": ["34"], "kelas": ["Rendah"] },
      { "label": "September", "nilai": ["61"], "kelas": ["Rendah"] },
      { "label": "Oktober", "nilai": ["222"], "kelas": ["Sedang"] },
      { "label": "November", "nilai": ["237"], "kelas": ["Sedang"] },
      { "label": "Desember", "nilai": ["124"], "kelas": ["Sedang"] }
    ]
  }'::jsonb
where kunci_blok = 'data-dasar-curah-hujan';

update konten_halaman
set
  tipe_blok = 'peringkat-ganda',
  urutan = 5,
  konten = '{
    "judul": "Suhu Rata-Rata Bulanan",
    "deskripsi": "Rata-rata suhu tahunan 28°C. Sumber: Dokumen KPLHD Kabupaten Sukoharjo Tahun 2025.",
    "minimal": 25,
    "maksimal": 29,
    "seri": [{ "nama": "Suhu Rata-Rata", "kode": "S" }],
    "item": [
      { "label": "Januari", "nilai": ["27"], "kelas": [""] },
      { "label": "Februari", "nilai": ["27"], "kelas": [""] },
      { "label": "Maret", "nilai": ["28"], "kelas": [""] },
      { "label": "April", "nilai": ["28"], "kelas": [""] },
      { "label": "Mei", "nilai": ["28"], "kelas": [""] },
      { "label": "Juni", "nilai": ["28"], "kelas": [""] },
      { "label": "Juli", "nilai": ["28"], "kelas": [""] },
      { "label": "Agustus", "nilai": ["28"], "kelas": [""] },
      { "label": "September", "nilai": ["28"], "kelas": [""] },
      { "label": "Oktober", "nilai": ["28"], "kelas": [""] },
      { "label": "November", "nilai": ["27"], "kelas": [""] },
      { "label": "Desember", "nilai": ["28"], "kelas": [""] }
    ]
  }'::jsonb
where kunci_blok = 'data-dasar-suhu';
