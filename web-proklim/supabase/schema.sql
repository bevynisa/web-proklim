-- ============================================================
-- SKEMA DATABASE — Website ProKlim Desa Sanggang
-- ============================================================
-- Cara pakai: buka project Supabase Anda -> SQL Editor -> tempel
-- seluruh isi file ini -> Run. Aman dijalankan sekali di project
-- yang masih kosong.
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1) PENGATURAN SITUS (identitas website, satu baris saja)
-- ------------------------------------------------------------
create table if not exists situs_pengaturan (
  id int primary key default 1 check (id = 1),
  nama text not null default 'ProKlim Desa Sanggang',
  jargon text,
  logo_url text,
  lembaga text,
  alamat text,
  email text,
  tentang_singkat text,
  footer_teks text,
  diperbarui_pada timestamptz not null default now()
);
insert into situs_pengaturan (id) values (1) on conflict (id) do nothing;

-- ------------------------------------------------------------
-- 2) STRUKTUR PENGURUS (dipakai bersama oleh halaman Beranda &
--    Kelembagaan & Kebijakan — satu sumber data, tidak dobel)
-- ------------------------------------------------------------
create table if not exists struktur_pengurus (
  id uuid primary key default gen_random_uuid(),
  jabatan text not null,               -- contoh: "Ketua", "Bendahara"
  nama_personel text[] not null default '{}',
  kelompok int not null default 0,     -- baris tampilan ke berapa (0,1,2,...)
  urutan int not null default 0,       -- urutan kartu dalam baris yang sama
  diperbarui_pada timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3) ARTIKEL / BERITA
-- ------------------------------------------------------------
create table if not exists artikel (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  kategori text not null,
  tanggal date not null default current_date,
  penulis text,
  ringkasan text,
  gambar_url text,
  isi text[] not null default '{}',    -- satu elemen array = satu paragraf
  dibuat_pada timestamptz not null default now(),
  diperbarui_pada timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4) GALERI FOTO
-- ------------------------------------------------------------
create table if not exists galeri (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  kategori text not null,
  judul text,
  keterangan text,
  urutan int not null default 0,
  dibuat_pada timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 5) ISI HALAMAN — satu baris = satu bagian/blok tetap pada satu
--    halaman tetap (Beranda, Adaptasi, Mitigasi, dan 4 halaman
--    Kelembagaan). "kunci_blok" tidak pernah berubah, dipakai
--    kode untuk tahu bagian mana yang harus digambar di mana.
--    "tipe_blok" menentukan bentuk form yang dipakai di admin.
-- ------------------------------------------------------------
create table if not exists konten_halaman (
  id uuid primary key default gen_random_uuid(),
  halaman text not null check (halaman in (
    'beranda', 'adaptasi', 'mitigasi',
    'klb-lembaga', 'klb-partisipasi', 'klb-eksternal', 'klb-data'
  )),
  kunci_blok text not null unique,
  tipe_blok text not null,
  judul_blok text not null,
  urutan int not null default 0,
  konten jsonb not null default '{}',
  diperbarui_pada timestamptz not null default now()
);

create index if not exists idx_konten_halaman_halaman on konten_halaman (halaman, urutan);
create index if not exists idx_artikel_tanggal on artikel (tanggal desc);
create index if not exists idx_galeri_kategori on galeri (kategori, urutan);

-- ============================================================
-- ROW LEVEL SECURITY
-- Aturan: SIAPA SAJA boleh membaca (situs publik), HANYA
-- pengguna yang sudah login (admin) yang boleh menulis.
-- ============================================================

alter table situs_pengaturan enable row level security;
alter table struktur_pengurus enable row level security;
alter table artikel           enable row level security;
alter table galeri            enable row level security;
alter table konten_halaman    enable row level security;

-- situs_pengaturan: publik baca, admin login boleh update (tidak perlu insert/delete, cuma 1 baris)
create policy "publik baca situs_pengaturan" on situs_pengaturan
  for select using (true);
create policy "admin ubah situs_pengaturan" on situs_pengaturan
  for update to authenticated using (true) with check (true);

-- struktur_pengurus
create policy "publik baca struktur_pengurus" on struktur_pengurus
  for select using (true);
create policy "admin kelola struktur_pengurus" on struktur_pengurus
  for all to authenticated using (true) with check (true);

-- artikel
create policy "publik baca artikel" on artikel
  for select using (true);
create policy "admin kelola artikel" on artikel
  for all to authenticated using (true) with check (true);

-- galeri
create policy "publik baca galeri" on galeri
  for select using (true);
create policy "admin kelola galeri" on galeri
  for all to authenticated using (true) with check (true);

-- konten_halaman
create policy "publik baca konten_halaman" on konten_halaman
  for select using (true);
create policy "admin kelola konten_halaman" on konten_halaman
  for all to authenticated using (true) with check (true);

-- ============================================================
-- STORAGE BUCKETS (gambar)
-- ============================================================

insert into storage.buckets (id, name, public)
  values ('galeri', 'galeri', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('gambar-situs', 'gambar-situs', true)
  on conflict (id) do nothing;

create policy "publik baca bucket galeri" on storage.objects
  for select using (bucket_id = 'galeri');
create policy "admin unggah bucket galeri" on storage.objects
  for insert to authenticated with check (bucket_id = 'galeri');
create policy "admin ubah bucket galeri" on storage.objects
  for update to authenticated using (bucket_id = 'galeri');
create policy "admin hapus bucket galeri" on storage.objects
  for delete to authenticated using (bucket_id = 'galeri');

create policy "publik baca bucket gambar-situs" on storage.objects
  for select using (bucket_id = 'gambar-situs');
create policy "admin unggah bucket gambar-situs" on storage.objects
  for insert to authenticated with check (bucket_id = 'gambar-situs');
create policy "admin ubah bucket gambar-situs" on storage.objects
  for update to authenticated using (bucket_id = 'gambar-situs');
create policy "admin hapus bucket gambar-situs" on storage.objects
  for delete to authenticated using (bucket_id = 'gambar-situs');
