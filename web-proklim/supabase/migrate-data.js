/**
 * Migrasi isi lama (assets/js/data.js + assets/js/galeri.js + file gambar)
 * ke Supabase. Jalankan SEKALI saja, setelah schema.sql dijalankan dan
 * .env sudah diisi. Lihat SETUP.md.
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createClient } = require("@supabase/supabase-js");

const ROOT = path.resolve(__dirname, "..");
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi di file .env. Lihat SETUP.md.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ---------- muat file window.X = {...} lama tanpa browser ---------- */
function loadWindowFile(relPath) {
  const kode = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(kode, sandbox, { filename: relPath });
  return sandbox.window;
}

const DATA = loadWindowFile("assets/js/data.js").PROKLIM_DEFAULT;
const GALERI = loadWindowFile("assets/js/galeri.js").PROKLIM_GALERI;

function halamanById(id) {
  const h = DATA.halaman.find((x) => x.id === id);
  if (!h) throw new Error("Halaman tidak ditemukan: " + id);
  return h;
}
function blokKe(halamanId, index, tipeDiharapkan) {
  const b = halamanById(halamanId).blok[index];
  if (!b || b.tipe !== tipeDiharapkan) {
    throw new Error(
      `Blok tidak sesuai di halaman "${halamanId}" indeks ${index}: diharapkan tipe "${tipeDiharapkan}", ` +
        `didapat "${b && b.tipe}". Struktur data.js mungkin sudah berubah — cek ulang mapping di migrate-data.js.`
    );
  }
  return b;
}
function tanpaTipe(blok) {
  const { tipe, ...sisanya } = blok;
  return sisanya;
}

const guessMime = (file) => {
  const ext = path.extname(file).toLowerCase();
  return { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" }[ext] || "application/octet-stream";
};

async function unggah(bucket, tujuan, sumberRelatif) {
  const filePath = path.join(ROOT, sumberRelatif);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! file tidak ditemukan, dilewati: ${sumberRelatif}`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  const { error } = await supabase.storage.from(bucket).upload(tujuan, buffer, {
    contentType: guessMime(filePath),
    upsert: true,
  });
  if (error) {
    console.warn(`  ! gagal unggah ${sumberRelatif}: ${error.message}`);
    return null;
  }
  return supabase.storage.from(bucket).getPublicUrl(tujuan).data.publicUrl;
}

/* peta nama-file -> URL publik di bucket "galeri", diisi saat tahap galeri */
const petaUrlGaleri = new Map();

async function unggahSemuaGaleri() {
  console.log(`\nMengunggah ${GALERI.length} foto galeri...`);
  let sukses = 0;
  for (const [i, g] of GALERI.entries()) {
    const namaFile = path.basename(g.file);
    const url = await unggah("galeri", namaFile, g.file);
    if (url) {
      petaUrlGaleri.set(g.file, url);
      const { error } = await supabase.from("galeri").insert({
        file_url: url,
        kategori: g.kategori,
        judul: g.judul,
        keterangan: g.keterangan,
        urutan: i,
      });
      if (error) console.warn(`  ! gagal simpan baris galeri ${namaFile}: ${error.message}`);
      else sukses++;
    }
    if ((i + 1) % 25 === 0) console.log(`  ... ${i + 1}/${GALERI.length}`);
  }
  console.log(`Selesai: ${sukses}/${GALERI.length} foto galeri berhasil dipindahkan.`);
}

/* cache supaya file assets/img yang dipakai berkali-kali tidak diunggah ulang */
const cacheGambarSitus = new Map();

async function resolveGambar(src) {
  if (typeof src !== "string") return src;
  if (src.startsWith("assets/galeri/")) {
    return petaUrlGaleri.get(src) || src;
  }
  if (src.startsWith("assets/img/")) {
    if (cacheGambarSitus.has(src)) return cacheGambarSitus.get(src);
    const tujuan = src.replace(/^assets\/img\//, "");
    const url = await unggah("gambar-situs", tujuan, src);
    cacheGambarSitus.set(src, url || src);
    return url || src;
  }
  return src;
}

const KUNCI_GAMBAR = new Set(["src", "gambar", "logo", "file"]);

async function resolveGambarDalam(obj) {
  if (Array.isArray(obj)) {
    const hasil = [];
    for (const item of obj) hasil.push(await resolveGambarDalam(item));
    return hasil;
  }
  if (obj && typeof obj === "object") {
    const hasil = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string" && KUNCI_GAMBAR.has(k) && (v.startsWith("assets/galeri/") || v.startsWith("assets/img/"))) {
        hasil[k] = await resolveGambar(v);
      } else {
        hasil[k] = await resolveGambarDalam(v);
      }
    }
    return hasil;
  }
  return obj;
}

/* ---------- 1) situs_pengaturan ---------- */
async function migrasiSitus() {
  console.log("\nMemindahkan pengaturan situs...");
  const logoUrl = await resolveGambar(DATA.situs.logo);
  const { error } = await supabase
    .from("situs_pengaturan")
    .update({
      nama: DATA.situs.nama,
      jargon: DATA.situs.jargon,
      logo_url: logoUrl,
      lembaga: DATA.situs.lembaga,
      alamat: DATA.situs.alamat,
      email: DATA.situs.email,
      tentang_singkat: DATA.situs.tentangSingkat,
    })
    .eq("id", 1);
  if (error) throw error;
  console.log("Selesai.");
}

/* ---------- 2) struktur_pengurus (sumber: blok "struktur" di Beranda) ---------- */
async function migrasiStruktur() {
  console.log("\nMemindahkan struktur pengurus...");
  const blok = blokKe("beranda", 5, "struktur");
  const baris = [];
  blok.baris.forEach((kelompokBaris, kelompokIdx) => {
    kelompokBaris.forEach((kotak, urutanIdx) => {
      baris.push({
        jabatan: kotak.unsur,
        nama_personel: kotak.personel,
        kelompok: kelompokIdx,
        urutan: urutanIdx,
      });
    });
  });
  const { error } = await supabase.from("struktur_pengurus").insert(baris);
  if (error) throw error;
  console.log(`Selesai: ${baris.length} baris struktur.`);
}

/* ---------- 3) konten_halaman ---------- */
const PEMETAAN_BLOK = [
  ["beranda", 0, "hero", "beranda-hero", "Banner Utama (Hero)"],
  ["beranda", 1, "statistik", "beranda-profil-statistik", "Profil Singkat Desa (Angka)"],
  ["beranda", 2, "teks", "beranda-tentang", "Tentang ProKlim Desa Sanggang"],
  ["beranda", 3, "kartu", "beranda-tiga-pilar", "Tiga Pilar ProKlim"],
  ["beranda", 4, "tab", "beranda-visi-misi", "Visi & Misi"],

  ["adaptasi", 0, "teks", "adaptasi-arah-aksi", "Arah Aksi Adaptasi"],
  ["adaptasi", 1, "statistik", "adaptasi-capaian-utama", "Capaian Utama Adaptasi (Angka)"],
  ["adaptasi", 2, "akordeon", "adaptasi-kekeringan-longsor", "Pengendalian Kekeringan dan Longsor"],
  ["adaptasi", 3, "akordeon", "adaptasi-ketahanan-pangan", "Peningkatan Ketahanan Pangan"],
  ["adaptasi", 4, "akordeon", "adaptasi-penyakit-iklim", "Pengendalian Penyakit Terkait Iklim"],
  ["adaptasi", 5, "peringkat-ganda", "adaptasi-indeks-kerentanan", "Indeks Kerentanan Longsor & Kekeringan per Dusun"],
  // Catatan: sumber datanya masih di halaman "adaptasi" pada data.js (struktur lama),
  // tapi baris ini di database kini dipindah live ke halaman "data-aksi" lewat SQL —
  // lihat supabase/pindah-data-aksi.sql. Jangan jalankan ulang skrip ini tanpa
  // menyesuaikan itu, atau baris ini akan kembali tersimpan di bawah "adaptasi".
  ["adaptasi", 6, "tabel", "adaptasi-data-aksi", "Data Aksi Adaptasi"],

  ["mitigasi", 0, "teks", "mitigasi-arah-aksi", "Arah Aksi Mitigasi"],
  ["mitigasi", 1, "statistik", "mitigasi-capaian-utama", "Capaian Utama Mitigasi (Angka)"],
  ["mitigasi", 2, "akordeon", "mitigasi-sampah-limbah", "Pengelolaan Sampah, Limbah Padat dan Cair"],
  ["mitigasi", 3, "akordeon", "mitigasi-energi", "Energi Baru Terbarukan, Konservasi, dan Penghematan Energi"],
  ["mitigasi", 4, "kartu", "mitigasi-pertanian-rendah-emisi", "Budidaya Pertanian Rendah Emisi GRK"],
  ["mitigasi", 5, "akordeon", "mitigasi-tutupan-vegetasi", "Peningkatan dan Mempertahankan Tutupan Vegetasi"],
  ["mitigasi", 6, "akordeon", "mitigasi-karhutla", "Pencegahan dan Penanggulangan Kebakaran Hutan dan Lahan"],
  ["mitigasi", 7, "tabel", "mitigasi-data-aksi", "Data Aksi Mitigasi"], // juga dipindah live ke "data-aksi", lihat catatan di atas
  ["mitigasi", 8, "gambar", "mitigasi-peta-evakuasi", "Peta Mitigasi Bencana Longsor & Rute Evakuasi"],
  ["mitigasi", 9, "video", "mitigasi-video", "Video Edukasi Mitigasi Bencana"],

  ["klb-lembaga", 0, "profil", "klb-lembaga-profil", "Kelembagaan (Profil Organisasi)"],
  ["klb-lembaga", 2, "rencana-kerja", "klb-lembaga-rencana-kerja", "Rencana Program Kerja Bidang Kelembagaan"],
  ["klb-lembaga", 3, "tab", "klb-lembaga-kebijakan-lokal", "Bentuk Nyata Kebijakan Lokal"],

  ["klb-partisipasi", 0, "profil", "klb-partisipasi-keswadayaan", "Keswadayaan & Pendanaan Lembaga"],
  ["klb-partisipasi", 1, "foto-kartu", "klb-partisipasi-penyebaran", "Menyebarkan Kegiatan ke Pihak Lain"],
  ["klb-partisipasi", 2, "checklist", "klb-partisipasi-tokoh-ttg", "Tokoh Lokal dan Teknologi Tepat Guna"],
  ["klb-partisipasi", 3, "rute-jejaring", "klb-partisipasi-jejaring", "Kemampuan Membangun Jejaring"],
  ["klb-partisipasi", 4, "prestasi", "klb-partisipasi-prestasi", "Prestasi Terkait Pengendalian Perubahan Iklim"],
  ["klb-partisipasi", 5, "kartu-program", "klb-partisipasi-program-lain", "Keikutsertaan dalam Program Terkait Lain"],

  ["klb-eksternal", 0, "profil-grid", "klb-eksternal-dukungan", "Bentuk Dukungan Eksternal"],
  ["klb-eksternal", 1, "arah-alur", "klb-eksternal-arah-kemitraan", "Arah Penguatan Kemitraan"],
  ["klb-eksternal", 2, "profil", "klb-eksternal-pengembangan", "Pengembangan Kegiatan"],

  ["klb-data", 0, "profil", "klb-data-pengelolaan", "Pengelolaan Data Aksi"],
  ["klb-data", 1, "evaluasi-tab", "klb-data-evaluasi", "Rencana Pemantauan dan Evaluasi"],
  ["klb-data", 2, "checklist", "klb-data-capaian-checklist", "Capaian"],
  ["klb-data", 3, "manfaat-pita", "klb-data-manfaat", "Tiga Manfaat Utama"],
  ["klb-data", 4, "teks", "klb-data-penutup", "Penutup"],
];

async function migrasiKontenHalaman() {
  console.log(`\nMemindahkan ${PEMETAAN_BLOK.length} bagian isi halaman...`);
  let urutanPerHalaman = {};
  let sukses = 0;
  for (const [halaman, indeks, tipe, kunci, judul] of PEMETAAN_BLOK) {
    const blok = blokKe(halaman, indeks, tipe);
    const kontenMentah = tanpaTipe(blok);
    const konten = await resolveGambarDalam(kontenMentah);
    urutanPerHalaman[halaman] = (urutanPerHalaman[halaman] || 0) + 1;
    const { error } = await supabase.from("konten_halaman").insert({
      halaman,
      kunci_blok: kunci,
      tipe_blok: tipe,
      judul_blok: judul,
      urutan: urutanPerHalaman[halaman],
      konten,
    });
    if (error) console.warn(`  ! gagal simpan "${kunci}": ${error.message}`);
    else sukses++;
  }
  console.log(`Selesai: ${sukses}/${PEMETAAN_BLOK.length} bagian isi halaman.`);
}

/* ---------- 4) artikel ---------- */
async function migrasiArtikel() {
  console.log(`\nMemindahkan ${DATA.artikel.length} artikel...`);
  let sukses = 0;
  for (const a of DATA.artikel) {
    const gambarUrl = await resolveGambar(a.gambar);
    const { error } = await supabase.from("artikel").insert({
      judul: a.judul,
      kategori: a.kategori,
      tanggal: a.tanggal,
      penulis: a.penulis,
      ringkasan: a.ringkasan,
      gambar_url: gambarUrl,
      isi: a.isi,
    });
    if (error) console.warn(`  ! gagal simpan artikel "${a.judul}": ${error.message}`);
    else sukses++;
  }
  console.log(`Selesai: ${sukses}/${DATA.artikel.length} artikel.`);
}

async function main() {
  console.log("=== Migrasi data ProKlim Desa Sanggang ke Supabase ===");
  await unggahSemuaGaleri();
  await migrasiSitus();
  await migrasiStruktur();
  await migrasiKontenHalaman();
  await migrasiArtikel();
  console.log("\nSemua tahap migrasi selesai. Silakan cek Table Editor & Storage di dashboard Supabase.");
}

main().catch((err) => {
  console.error("\nMigrasi berhenti karena error:", err);
  process.exit(1);
});
