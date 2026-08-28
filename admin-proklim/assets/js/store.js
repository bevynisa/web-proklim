/* =========================================================
   STORE — satu pintu akses data untuk seluruh dasbor admin.
   Otomatis pakai Supabase sungguhan kalau assets/js/config.js
   sudah diisi, atau data contoh (localStorage) kalau belum —
   halaman-halaman lain tidak perlu tahu bedanya.
   ========================================================= */
(function () {
  "use strict";

  var KUNCI_DEMO = "proklim_admin_demo_data";

  function idBaru(awalan) {
    return awalan + "-" + Date.now().toString(36) + Math.floor(Math.random() * 900 + 100).toString(36);
  }

  /* ---------------- lapisan MODE PRATINJAU (localStorage) ---------------- */
  var Demo = (function () {
    function muat() {
      try {
        var mentah = localStorage.getItem(KUNCI_DEMO);
        if (mentah) {
          var simpanan = JSON.parse(mentah);
          // kalau data contoh sudah diperbarui (mis. ada bagian baru
          // ditambahkan), simpanan lama di browser ini dibuang dan diganti
          // data terbaru — supaya menu/bagian baru tidak "hilang" gara-gara
          // sempat membuka dashboard sebelum pembaruan itu ada
          if (simpanan && simpanan.versi === window.PROKLIM_DEMO.versi) return simpanan;
        }
      } catch (e) {}
      var awal = JSON.parse(JSON.stringify(window.PROKLIM_DEMO));
      simpan(awal);
      return awal;
    }
    function simpan(d) {
      try { localStorage.setItem(KUNCI_DEMO, JSON.stringify(d)); } catch (e) {}
    }
    function tunda(hasil) {
      return new Promise(function (ok) { setTimeout(function () { ok(hasil); }, 120); });
    }

    return {
      async getSitus() { return tunda(muat().situs); },
      async updateSitus(patch) {
        var d = muat(); d.situs = Object.assign({}, d.situs, patch); simpan(d);
        return tunda(d.situs);
      },

      async listStruktur() {
        var d = muat();
        return tunda(d.struktur.slice().sort(function (a, b) { return a.kelompok - b.kelompok || a.urutan - b.urutan; }));
      },
      async addStruktur(row) {
        var d = muat(); row.id = idBaru("struktur"); d.struktur.push(row); simpan(d);
        return tunda(row);
      },
      async updateStruktur(id, patch) {
        var d = muat(); var i = d.struktur.findIndex(function (x) { return x.id === id; });
        if (i >= 0) d.struktur[i] = Object.assign({}, d.struktur[i], patch);
        simpan(d); return tunda(d.struktur[i]);
      },
      async deleteStruktur(id) {
        var d = muat(); d.struktur = d.struktur.filter(function (x) { return x.id !== id; }); simpan(d);
        return tunda(true);
      },

      async listArtikel() {
        var d = muat();
        return tunda(d.artikel.slice().sort(function (a, b) { return (b.tanggal || "").localeCompare(a.tanggal || ""); }));
      },
      async addArtikel(row) {
        var d = muat(); row.id = idBaru("artikel"); d.artikel.unshift(row); simpan(d);
        return tunda(row);
      },
      async updateArtikel(id, patch) {
        var d = muat(); var i = d.artikel.findIndex(function (x) { return x.id === id; });
        if (i >= 0) d.artikel[i] = Object.assign({}, d.artikel[i], patch);
        simpan(d); return tunda(d.artikel[i]);
      },
      async deleteArtikel(id) {
        var d = muat(); d.artikel = d.artikel.filter(function (x) { return x.id !== id; }); simpan(d);
        return tunda(true);
      },

      async listGaleri() {
        var d = muat();
        return tunda(d.galeri.slice().sort(function (a, b) { return a.urutan - b.urutan; }));
      },
      async addGaleri(row) {
        var d = muat(); row.id = idBaru("galeri"); d.galeri.push(row); simpan(d);
        return tunda(row);
      },
      async updateGaleri(id, patch) {
        var d = muat(); var i = d.galeri.findIndex(function (x) { return x.id === id; });
        if (i >= 0) d.galeri[i] = Object.assign({}, d.galeri[i], patch);
        simpan(d); return tunda(d.galeri[i]);
      },
      async deleteGaleri(id) {
        var d = muat(); d.galeri = d.galeri.filter(function (x) { return x.id !== id; }); simpan(d);
        return tunda(true);
      },

      async listKontenHalaman(halaman) {
        var d = muat();
        return tunda(d.konten_halaman.filter(function (x) { return x.halaman === halaman; }).sort(function (a, b) { return a.urutan - b.urutan; }));
      },
      async updateKontenBlok(kunciBlok, konten) {
        var d = muat(); var i = d.konten_halaman.findIndex(function (x) { return x.kunci_blok === kunciBlok; });
        if (i >= 0) d.konten_halaman[i].konten = konten;
        simpan(d); return tunda(true);
      },

      async uploadGambar(file) {
        var dataUrl = await UI.bacaFileGambar(file);
        return tunda(dataUrl);
      },
    };
  })();

  /* ---------------- lapisan SUPABASE SUNGGUHAN ---------------- */
  var Live = (function () {
    function db() { return window.SupabaseClient.klien; }
    function lempar(error, konteks) {
      if (error) throw new Error((konteks ? konteks + ": " : "") + error.message);
    }

    return {
      async getSitus() {
        var r = await db().from("situs_pengaturan").select("*").eq("id", 1).single();
        lempar(r.error, "Ambil pengaturan situs"); return r.data;
      },
      async updateSitus(patch) {
        var r = await db().from("situs_pengaturan").update(patch).eq("id", 1).select().single();
        lempar(r.error, "Simpan pengaturan situs"); return r.data;
      },

      async listStruktur() {
        var r = await db().from("struktur_pengurus").select("*").order("kelompok").order("urutan");
        lempar(r.error, "Ambil struktur pengurus"); return r.data;
      },
      async addStruktur(row) {
        var r = await db().from("struktur_pengurus").insert(row).select().single();
        lempar(r.error, "Tambah struktur pengurus"); return r.data;
      },
      async updateStruktur(id, patch) {
        var r = await db().from("struktur_pengurus").update(patch).eq("id", id).select().single();
        lempar(r.error, "Ubah struktur pengurus"); return r.data;
      },
      async deleteStruktur(id) {
        var r = await db().from("struktur_pengurus").delete().eq("id", id);
        lempar(r.error, "Hapus struktur pengurus"); return true;
      },

      async listArtikel() {
        var r = await db().from("artikel").select("*").order("tanggal", { ascending: false });
        lempar(r.error, "Ambil artikel"); return r.data;
      },
      async addArtikel(row) {
        var r = await db().from("artikel").insert(row).select().single();
        lempar(r.error, "Tambah artikel"); return r.data;
      },
      async updateArtikel(id, patch) {
        var r = await db().from("artikel").update(patch).eq("id", id).select().single();
        lempar(r.error, "Ubah artikel"); return r.data;
      },
      async deleteArtikel(id) {
        var r = await db().from("artikel").delete().eq("id", id);
        lempar(r.error, "Hapus artikel"); return true;
      },

      async listGaleri() {
        var r = await db().from("galeri").select("*").order("urutan");
        lempar(r.error, "Ambil galeri"); return r.data;
      },
      async addGaleri(row) {
        var r = await db().from("galeri").insert(row).select().single();
        lempar(r.error, "Tambah foto galeri"); return r.data;
      },
      async updateGaleri(id, patch) {
        var r = await db().from("galeri").update(patch).eq("id", id).select().single();
        lempar(r.error, "Ubah foto galeri"); return r.data;
      },
      async deleteGaleri(id) {
        var r = await db().from("galeri").delete().eq("id", id);
        lempar(r.error, "Hapus foto galeri"); return true;
      },

      async listKontenHalaman(halaman) {
        var r = await db().from("konten_halaman").select("*").eq("halaman", halaman).order("urutan");
        lempar(r.error, "Ambil isi halaman"); return r.data;
      },
      async updateKontenBlok(kunciBlok, konten) {
        var r = await db().from("konten_halaman").update({ konten: konten }).eq("kunci_blok", kunciBlok);
        lempar(r.error, "Simpan isi bagian halaman"); return true;
      },

      async uploadGambar(file, bucket) {
        bucket = bucket || "gambar-situs";
        var namaFile = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        var r = await db().storage.from(bucket).upload(namaFile, file, { upsert: false });
        lempar(r.error, "Unggah gambar");
        return db().storage.from(bucket).getPublicUrl(namaFile).data.publicUrl;
      },
    };
  })();

  window.Store = window.SupabaseClient.tersambung ? Live : Demo;
})();
