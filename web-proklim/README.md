# Website ProKlim Desa Sanggang — "Sanggang Berkreasi"

Website Program Kampung Iklim (ProKlim) Desa Sanggang, Kecamatan Bulu, Kabupaten Sukoharjo.
Dibuat dengan HTML, CSS, dan JavaScript murni — **tanpa perlu install apa pun**.

---

## 1. Cara Membuka

Klik dua kali file **`index.html`**. Website langsung terbuka di browser.

## 2. Isi Website

| Menu | Isi |
|------|-----|
| **Beranda** | Profil desa, tentang ProKlim, tiga pilar, visi & misi, **struktur pelaksana**, identitas program, slot peta kerentanan, artikel terbaru |
| **Adaptasi** | Capaian utama + 3 tabel kegiatan adaptasi, indeks kerentanan longsor & kekeringan per dusun, matriks aksi 2026–2030 |
| **Mitigasi** | Capaian utama + 5 tabel kegiatan mitigasi, matriks sumber emisi, serapan GRK, kebutuhan bibit |
| **Kelembagaan** | 8 submenu: Kelembagaan Masyarakat, Dukungan Kebijakan, Partisipasi Masyarakat, Kapasitas Masyarakat, Dukungan Sumber Daya Eksternal, Pengembangan Kegiatan, Pengelolaan Data Aksi, Manfaat Program |
| **Artikel** | 5 artikel awal yang disusun dari dokumen ProKlim |
| **Galeri** | 252 foto dokumentasi yang diambil dari dokumen bukti dukung, dikelompokkan per kategori |

Seluruh isi bersumber dari:
- *Dokumen Perencana Pelaksana ProKlim Desa Sanggang*
- *Bukti Dukung Adaptasi ProKlim Desa Sanggang*
- *Bukti Dukung Mitigasi ProKlim Desa Sanggang*
- *Kelembagaan dan Dokumen Perencanaan Pelaksana ProKlim Desa Sanggang*

---

## 3. Panel Admin

**Alamat:** tambahkan `#/admin` di akhir alamat website, atau klik tautan **Admin** di pojok kanan bawah footer.

**Kata sandi bawaan:** `proklim2026` → ganti lewat tab **Data**.

Setelah masuk akan muncul bilah hijau "Mode Admin aktif". Semua perubahan **langsung tampil** di website.

### Tab yang tersedia

| Tab | Fungsi |
|-----|--------|
| **Situs** | Ganti nama website, jargon, logo, alamat, email, deskripsi footer |
| **Menu** | Tambah / ubah / hapus menu & submenu, ubah urutan (↑ ↓), tentukan halaman tujuan |
| **Halaman** | Buat halaman baru, hapus halaman, dan **Kelola isi** untuk mengedit isinya |
| **Artikel** | Tulis, ubah, hapus artikel; unggah gambar sampul |
| **Galeri** | Unggah foto, tambah foto dari folder, hapus foto |
| **Data** | Unduh cadangan, muat data dari file, ganti kata sandi, kembalikan ke isi awal |

### Membuat menu baru + halamannya

1. Buka tab **Halaman** → isi *Judul halaman* dan *Kode halaman* (contoh: `profil-desa`) → **Buat Halaman**.
2. Halaman langsung terbuka di mode **Kelola isi**. Tambahkan blok sesuai kebutuhan.
3. Buka tab **Menu** → **+ Tambah Menu** → isi nama menu → pilih halaman tujuan → **Simpan**.
4. Menu baru langsung muncul di navbar.

Untuk membuat **dropdown**: pada menu yang sudah ada, klik **+ Submenu**, lalu isi nama dan halaman tujuannya.

### Jenis blok isi halaman

| Blok | Untuk apa | Format pengisian |
|------|-----------|------------------|
| Teks / paragraf | Penjelasan naratif | Satu paragraf per baris. Boleh pakai `<b>tebal</b>`, `<i>miring</i>` |
| Angka capaian | Kotak statistik | `angka \| satuan \| label \| keterangan` |
| Kartu ikon | Kartu bergambar emoji | `emoji \| judul \| penjelasan \| alamat tujuan` |
| Daftar poin | Daftar bercentang/bernomor | Satu poin per baris |
| Tabel | Tabel data | Judul kolom dipisah `\|`; tiap baris isi juga dipisah `\|` |
| Struktur pengurus | Kartu jabatan | `jabatan \| nama1; nama2; nama3` |
| Gambar / peta | Menampilkan gambar | `judul \| alamat file \| keterangan` — bisa juga unggah langsung |
| Banner utama (hero) | Banner hijau besar | Isi judul, subjudul, teks, dan tombol |
| Cuplikan artikel / galeri | Menampilkan artikel atau foto terbaru | Cukup isi jumlah (dan kategori untuk galeri) |

> **Penting:** setelah mengubah isi blok, klik **Simpan semua perubahan** di bagian atas halaman.

---

## 4. Menambahkan Peta Kerentanan

Peta asli belum dilampirkan (masih berupa kotak bergaris).

1. Salin file peta ke folder `assets/img/`, misalnya `peta-longsor.jpg` dan `peta-kekeringan.jpg`.
2. Admin → **Halaman** → *Beranda* → **Kelola isi** → cari blok **Peta Kerentanan Desa Sanggang**.
3. Ubah isinya menjadi:
   ```
   Peta Kerentanan Longsor | assets/img/peta-longsor.jpg | Gambar 1. Peta kerentanan longsor Desa Sanggang.
   Peta Kerentanan Kekeringan | assets/img/peta-kekeringan.jpg | Gambar 2. Peta kerentanan kekeringan Desa Sanggang.
   ```
4. Klik **Simpan semua perubahan**.

---

## 5. Menambahkan Foto Galeri Asli

Ada dua cara:

**Cara A — unggah langsung (praktis, untuk sedikit foto)**
Admin → **Galeri** → isi kategori & judul → pilih file → **Unggah ke Galeri**.
Foto otomatis diperkecil ke maksimal 1200 px.

**Cara B — lewat folder (disarankan untuk banyak foto)**
1. Salin file foto ke folder `assets/galeri/`.
2. Admin → **Galeri** → kotak *Tambah dari Folder assets/galeri* → tulis satu baris per foto:
   ```
   assets/galeri/gotong-royong.jpg | Adaptasi | Gotong royong pembuatan biopori | Dusun Kaligunting, Maret 2026
   ```
3. Klik **Tambahkan**.

> Cara B jauh lebih hemat ruang karena foto tidak ikut disimpan di dalam browser.

---

## 6. Cara Kerja Penyimpanan (penting)

Perubahan admin disimpan di **penyimpanan browser (localStorage)** komputer yang dipakai mengedit.
Artinya:

- ✅ Perubahan langsung terlihat dan tetap ada meski browser ditutup.
- ⚠️ Perubahan **belum** otomatis ikut ke komputer/HP lain.

**Agar perubahan ikut terbawa (atau untuk cadangan):**

1. Admin → tab **Data** → **⬇ Unduh data.json**.
2. Di perangkat lain: Admin → tab **Data** → **⬆ Muat dari file** → pilih file tersebut.

Kapasitas localStorage sekitar 5 MB. Kalau muncul peringatan "penyimpanan penuh", gunakan **Cara B** untuk foto.

---

## 7. Mengunggah ke Internet (opsional, gratis)

Website ini statis, jadi bisa diunggah apa adanya:

- **Netlify Drop** — buka [app.netlify.com/drop](https://app.netlify.com/drop), seret folder `web-proklim`. Selesai.
- **GitHub Pages** — unggah isi folder ke repositori, aktifkan Pages di Settings → Pages.

Setelah online, pengunjung melihat isi bawaan dari `assets/js/data.js`.
Supaya hasil editan admin ikut terlihat semua orang, unduh `data.json` lalu minta bantuan untuk memasukkannya ke `data.js`, atau cukup unggah ulang folder setelah isi diperbarui.

---

## 8. Struktur Folder

```
web-proklim/
├── index.html              ← buka file ini
├── README.md
└── assets/
    ├── css/style.css       ← tampilan & warna
    ├── img/logo.png        ← logo ProKlim
    ├── galeri/             ← 252 foto dokumentasi
    └── js/
        ├── data.js         ← seluruh isi teks website
        ├── galeri.js       ← daftar foto galeri
        ├── store.js        ← penyimpanan data
        ├── render.js       ← penggambar halaman
        ├── admin.js        ← panel admin
        └── app.js          ← navigasi & galeri
```

## 9. Mengganti Warna

Buka `assets/css/style.css`, ubah bagian `:root` di baris paling atas.
Warna utama hijau ada pada `--hijau-800`, `--hijau-700`, dan `--hijau-600`.
