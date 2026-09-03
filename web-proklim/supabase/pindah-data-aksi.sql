-- Jalankan file ini SEKALI di Supabase SQL Editor untuk menambahkan menu
-- baru: Data Dasar, Perencanaan, Data Aksi.
--
-- 1) Izinkan nilai "halaman" baru di tabel konten_halaman (sebelumnya
--    dibatasi hanya 7 nilai lama lewat CHECK constraint).
do $$
declare
  con_name text;
begin
  select conname into con_name
  from pg_constraint
  where conrelid = 'konten_halaman'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%halaman%beranda%';
  if con_name is not null then
    execute format('alter table konten_halaman drop constraint %I', con_name);
  end if;
end $$;

alter table konten_halaman add constraint konten_halaman_halaman_check check (halaman in (
  'beranda', 'data-dasar', 'adaptasi', 'mitigasi',
  'klb-lembaga', 'klb-partisipasi', 'klb-eksternal', 'klb-data',
  'perencanaan', 'data-aksi'
));

-- 2) Pindahkan tabel "Data Aksi Adaptasi" & "Data Aksi Mitigasi" yang
--    sebelumnya nempel di halaman Adaptasi/Mitigasi, ke halaman baru
--    "Data Aksi" (tidak dobel, cuma pindah kolom "halaman"-nya).
update konten_halaman set halaman = 'data-aksi', urutan = 1 where kunci_blok = 'adaptasi-data-aksi';
update konten_halaman set halaman = 'data-aksi', urutan = 2 where kunci_blok = 'mitigasi-data-aksi';

-- 3) Isi awal untuk halaman "Perencanaan" supaya tidak kosong melompong
--    dan bisa langsung diedit dari dashboard admin (menu Perencanaan).
insert into konten_halaman (halaman, kunci_blok, tipe_blok, judul_blok, urutan, konten)
values (
  'perencanaan', 'perencanaan-info', 'teks', 'Informasi Perencanaan', 1,
  '{"judul":"Perencanaan","paragraf":["Halaman ini sedang disiapkan. Rencana kerja dan program ProKlim akan segera ditambahkan di sini."]}'::jsonb
)
on conflict (kunci_blok) do nothing;

-- Catatan: halaman "Data Dasar" TIDAK perlu baris baru — isinya otomatis
-- memakai ulang blok "Profil Singkat Desa (Angka)" yang sudah ada di
-- halaman Beranda (kunci_blok = 'beranda-profil-statistik'). Edit lewat
-- menu "Beranda" di dashboard admin, perubahannya ikut tampil di Data Dasar.
