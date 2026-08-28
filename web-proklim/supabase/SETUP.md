# Menyiapkan Supabase untuk Website ProKlim Desa Sanggang

Ikuti urutan ini. Semua kunci/kata sandi cukup Anda simpan sendiri di
komputer — **tidak perlu dikirim ke chat**.

## 1. Buat project Supabase (gratis)

1. Buka [supabase.com](https://supabase.com) → **Start your project** → daftar/masuk.
2. **New Project** → isi nama (misalnya `proklim-sanggang`), buat kata sandi
   database (simpan baik-baik), pilih region terdekat (Singapore).
3. Tunggu 1–2 menit sampai project selesai dibuat.

## 2. Jalankan skema database

1. Di dashboard project → menu **SQL Editor** (ikon di sisi kiri).
2. **New query** → buka file [`schema.sql`](schema.sql) di folder ini, salin
   semua isinya, tempel ke SQL Editor.
3. Klik **Run**. Pastikan muncul "Success. No rows returned".
4. Cek di menu **Table Editor** — harus muncul 5 tabel: `situs_pengaturan`,
   `struktur_pengurus`, `artikel`, `galeri`, `konten_halaman`. Dan di menu
   **Storage** harus muncul 2 bucket: `galeri`, `gambar-situs`.

## 3. Ambil URL dan anon key (untuk website publik & admin)

Menu **Project Settings → API**. Catat dua nilai ini:

- **Project URL** (contoh: `https://xxxxxxxx.supabase.co`)
- **anon / public key** (kunci panjang, ini AMAN untuk dipakai di kode
  frontend — dilindungi oleh aturan RLS yang sudah dibuat lewat `schema.sql`)

Anda boleh memberikan dua nilai ini ke saya di chat — **keduanya bukan
rahasia**, memang dirancang untuk dipakai di sisi browser.

## 4. Ambil service_role key (HANYA untuk migrasi data awal, JANGAN dibagikan)

Masih di **Project Settings → API**, ada juga **service_role key** — ini
**RAHASIA**, jangan pernah kirim ke chat atau taruh di kode manapun yang ikut
diunggah ke internet. Kita hanya butuh sekali, untuk memindahkan 252 foto +
isi teks lama ke Supabase lewat skrip `migrate-data.js`.

Cara pakai:
1. Salin file `.env.example` di folder ini menjadi `.env`.
2. Isi `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` di file `.env` itu
   (file ini sudah otomatis diabaikan git lewat `.gitignore`).
3. Jalankan di terminal, di dalam folder `supabase/`:
   ```bash
   npm install
   npm run migrate
   ```
4. Tunggu sampai selesai (akan memakan waktu karena mengunggah 252 foto).
   Skrip akan mencetak ringkasan berapa data yang berhasil dipindahkan.

Setelah migrasi selesai, **hapus isi `SUPABASE_SERVICE_ROLE_KEY` dari file
`.env`** atau hapus filenya — kunci itu tidak dibutuhkan lagi sehari-hari.

## 5. Buat akun login untuk admin

1. Menu **Authentication → Users** → **Add user** → **Create new user**.
2. Isi email dan kata sandi untuk perangkat desa yang akan mengelola
   website (boleh buat lebih dari satu akun untuk lebih dari satu admin).
3. **Matikan pendaftaran akun oleh umum**: menu **Authentication →
   Providers → Email** → pastikan opsi **Allow new users to sign up**
   dimatikan. Ini penting supaya orang luar tidak bisa mendaftar sendiri
   sebagai admin.

## 6. Serahkan ke saya

Setelah langkah 1–3 selesai, berikan ke saya:
- Project URL
- anon / public key

Saya akan pakai untuk menyambungkan website publik (baca-saja) dan
menyiapkan file konfigurasi aplikasi admin.
