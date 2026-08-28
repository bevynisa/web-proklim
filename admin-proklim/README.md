# Admin ProKlim Desa Sanggang

Dasbor admin untuk mengelola isi [website publik ProKlim Desa
Sanggang](../web-proklim) — terpisah dari website publik, disambungkan
lewat database Supabase yang sama.

## Menjalankan

Tanpa install apa pun — buka `index.html` langsung di browser, atau jalankan
server ringan:

```bash
python -m http.server 8130
```

lalu buka `http://localhost:8130`.

## Mode Pratinjau vs Mode Sungguhan

Selama `assets/js/config.js` masih kosong, aplikasi berjalan di **Mode
Pratinjau**: memakai data contoh (`assets/js/demo-data.js`, hasil salinan
isi website saat ini dengan gambar diganti kotak warna), tersimpan
sementara di browser Anda saja. Cocok untuk melihat/menguji tampilan dan
alur kerja sebelum database sungguhan siap.

Untuk menyambungkan ke database sungguhan:
1. Selesaikan `supabase/SETUP.md` di folder website publik.
2. Salin `assets/js/config.example.js` menjadi `assets/js/config.js`.
3. Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di file itu.
4. Muat ulang halaman — pita "Mode Pratinjau" akan hilang begitu berhasil tersambung.

## Struktur folder

```
admin-proklim/
├── login.html              ← halaman masuk
├── index.html               ← kerangka dasbor (sidebar + isi)
└── assets/
    ├── css/style.css
    └── js/
        ├── config.js         ← kunci Supabase (diabaikan git)
        ├── demo-data.js       ← data contoh mode pratinjau
        ├── supabase-client.js
        ├── store.js           ← lapisan akses data (pratinjau/sungguhan)
        ├── auth.js
        ├── ui.js               ← pesan, modal konfirmasi, bantu form
        ├── halaman-config.js   ← daftar menu & bagian tiap halaman website
        ├── blok-forms.js       ← form untuk tiap jenis bagian halaman
        ├── router.js
        ├── app.js
        └── pages/
            ├── situs.js
            ├── struktur.js
            ├── artikel.js
            ├── galeri.js
            └── halaman.js       ← 7 menu halaman (Beranda..Data & Manfaat Program)
```
