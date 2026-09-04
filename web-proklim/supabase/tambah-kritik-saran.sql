-- Jalankan SEKALI di Supabase SQL Editor. Membuat tabel baru untuk
-- menampung masukan warga dari form "Pojok Kritik & Saran" di website
-- publik (menu baru di ujung navbar, setelah Galeri).
--
-- Beda dengan tabel lain di situs ini: tabel ini kebalik izinnya —
-- SIAPA SAJA (termasuk yang belum login) boleh MENGIRIM (insert),
-- tapi cuma admin yang login yang boleh MEMBACA, MENGUBAH status
-- dibaca, dan MENGHAPUS. Warga tidak bisa saling melihat masukan
-- orang lain, dan tidak bisa membaca masukannya sendiri lagi setelah
-- dikirim (memang bukan tujuannya).

create table if not exists kritik_saran (
  id uuid primary key default gen_random_uuid(),
  nama text,
  kontak text,
  kategori text,
  pesan text not null,
  dibaca boolean not null default false,
  dibuat_pada timestamptz not null default now()
);

create index if not exists idx_kritik_saran_tanggal on kritik_saran (dibuat_pada desc);

alter table kritik_saran enable row level security;

drop policy if exists "publik kirim kritik_saran" on kritik_saran;
create policy "publik kirim kritik_saran" on kritik_saran
  for insert to anon, authenticated with check (true);

drop policy if exists "admin baca kritik_saran" on kritik_saran;
create policy "admin baca kritik_saran" on kritik_saran
  for select to authenticated using (true);

drop policy if exists "admin ubah kritik_saran" on kritik_saran;
create policy "admin ubah kritik_saran" on kritik_saran
  for update to authenticated using (true) with check (true);

drop policy if exists "admin hapus kritik_saran" on kritik_saran;
create policy "admin hapus kritik_saran" on kritik_saran
  for delete to authenticated using (true);
