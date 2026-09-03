-- Jalankan SEKALI di Supabase SQL Editor (setelah tambah-matriks-perencanaan-aksi.sql).
-- Membuat kolom pertama ("Ancaman" / "Potensi Mitigasi" / "Kegiatan")
-- di 3 tabel Matriks Perencanaan Aksi jadi rata kiri, bukan rata
-- tengah — soalnya isinya kalimat, bukan nomor urut.

update konten_halaman
set konten = konten || '{"kolomPertamaTeks": true}'::jsonb
where kunci_blok in ('klb-matriks-aksi-adaptasi', 'klb-matriks-aksi-mitigasi', 'klb-matriks-penguatan-kelembagaan');
