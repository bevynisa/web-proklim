-- Jalankan SEKALI di Supabase SQL Editor. Dua bagian:
--
-- 1) Membuat bucket penyimpanan baru "dokumen-situs" (untuk file PDF
--    lampiran, terpisah dari bucket foto "gambar-situs") beserta izin
--    aksesnya — publik boleh baca, admin yang login boleh unggah.
-- 2) Menyiapkan 3 slot lampiran dokumen di halaman Kelembagaan &
--    Kebijakan, bagian "Kelembagaan Masyarakat": kartu "Kelembagaan"
--    (untuk SK), "Program Kerja Tahunan" (untuk 2 dokumen: Proker 2024
--    & 2025), dan "Aturan Organisasi" (untuk AD/ART). Nama lampirannya
--    sudah diisi, tapi file PDF-nya masih KOSONG — silakan unggah lewat
--    dashboard admin (menu Kelembagaan & Kebijakan → bagian "Kelembagaan
--    Masyarakat" → klik kartu terkait → tombol pilih file di kolom
--    Dokumen Lampiran).

insert into storage.buckets (id, name, public) values ('dokumen-situs', 'dokumen-situs', true)
on conflict (id) do nothing;

drop policy if exists "publik baca bucket dokumen-situs" on storage.objects;
create policy "publik baca bucket dokumen-situs" on storage.objects
  for select using (bucket_id = 'dokumen-situs');

drop policy if exists "admin unggah bucket dokumen-situs" on storage.objects;
create policy "admin unggah bucket dokumen-situs" on storage.objects
  for insert to authenticated with check (bucket_id = 'dokumen-situs');

drop policy if exists "admin ubah bucket dokumen-situs" on storage.objects;
create policy "admin ubah bucket dokumen-situs" on storage.objects
  for update to authenticated using (bucket_id = 'dokumen-situs');

drop policy if exists "admin hapus bucket dokumen-situs" on storage.objects;
create policy "admin hapus bucket dokumen-situs" on storage.objects
  for delete to authenticated using (bucket_id = 'dokumen-situs');

update konten_halaman
set konten = '{"item": [{"pj": "Ketua ProKlim & Pemdes", "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 18L24 8l18 10\"/><path d=\"M8 18h32\"/><path d=\"M11 18v18M18 18v18M24 18v18M30 18v18M37 18v18\"/><path d=\"M6 40h36\"/></svg>", "teks": "Penguatan ProKlim Sanggang Berkreasi dan lembaga pendukung (PKK, Karang Taruna, RKDD, LPM, Destana, Bank Sampah, KWT).", "judul": "Kelembagaan", "target": "Lembaga aktif dan terkoordinasi", "lampiran1Label": "SK ProKlim Sanggang Berkreasi", "lampiran1Url": ""}, {"pj": "Pengurus ProKlim", "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"24\" r=\"18\"/><path d=\"M30 18l-4 10-10 4 4-10 10-4z\"/></svg>", "teks": "Pemutakhiran struktur organisasi, uraian tugas, dan fungsi pengurus.", "judul": "Struktur Organisasi", "target": "Struktur dan tugas pengurus jelas"}, {"pj": "Pengurus ProKlim", "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"10\" width=\"34\" height=\"30\" rx=\"3\"/><path d=\"M7 18h34\"/><path d=\"M15 6v8M33 6v8\"/><path d=\"M15 26h4M23 26h4M31 26h4M15 33h4M23 33h4\"/></svg>", "teks": "Rencana Program Kerja Tahun 2024 dan 2025 tersedia secara tertulis, dengan realisasi pelaksanaan di atas 60%.", "judul": "Program Kerja Tahunan", "lampiran1Label": "Program Kerja Tahun 2024", "lampiran1Url": "", "lampiran2Label": "Program Kerja Tahun 2025", "lampiran2Url": ""}, {"pj": "Pengurus ProKlim", "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 6h20l6 6v30H12z\"/><path d=\"M32 6v6h6\"/><path d=\"M18 20h14M18 26h14M18 32h9\"/></svg>", "teks": "AD/ART ProKlim Sanggang Berkreasi telah disahkan pengurus, dilengkapi kesepakatan organisasi tertulis.", "judul": "Aturan Organisasi", "lampiran1Label": "AD/ART ProKlim Sanggang Berkreasi", "lampiran1Url": ""}], "judul": "Kelembagaan Masyarakat"}'::jsonb
where kunci_blok = 'klb-lembaga-rencana-kerja';
