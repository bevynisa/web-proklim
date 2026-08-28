/* Ikon sidebar — SVG garis polos (ikut warna teks, tidak berwarna
   sendiri) supaya tidak ramai. */
var IKON_SVG = {
  situs: '<line x1="4" y1="6" x2="20" y2="6"/><circle cx="9" cy="6" r="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="15" cy="12" r="2"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="18" r="2"/>',
  beranda: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
  struktur: '<rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="15" width="6" height="4" rx="1"/><rect x="15" y="15" width="6" height="4" rx="1"/><path d="M12 7v4M6 15v-2a2 2 0 012-2h8a2 2 0 012 2v2"/>',
  adaptasi: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  mitigasi: '<path d="M4 20c8 0 14-6 14-14V4h-2C8 4 4 10 4 18v2z"/><path d="M4 20c4-4 8-8 14-14"/>',
  "klb-lembaga": '<path d="M4 10l8-5 8 5"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 19h18"/>',
  "klb-partisipasi": '<circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><path d="M3 20c0-3 2.2-5 5-5s5 2 5 5"/><path d="M11 20c0-3 2.2-5 5-5s5 2 5 5"/>',
  "klb-eksternal": '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16"/>',
  "klb-data": '<path d="M3 6a1 1 0 011-1h5l2 2h9a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"/>',
  artikel: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  galeri: '<rect x="3" y="4" width="18" height="14" rx="1"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 15l-5-5-4 4-3-3-6 6"/>',
};
function ikonSvg(id) {
  return '<svg class="ikon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (IKON_SVG[id] || "") + "</svg>";
}

/* Daftar menu dasbor — URUTANNYA SENGAJA mengikuti urutan bagian
   tampil di website publik, dari atas ke bawah, supaya admin gampang
   menghubungkan menu di sini dengan bagian yang ia lihat di website. */
window.MENU = [
  { id: "situs", label: "Pengaturan Situs", tipe: "situs" },
  { id: "beranda", label: "Beranda", tipe: "halaman", halaman: "beranda" },
  { id: "struktur", label: "Struktur Pengurus", tipe: "struktur" },
  { id: "adaptasi", label: "Adaptasi", tipe: "halaman", halaman: "adaptasi" },
  { id: "mitigasi", label: "Mitigasi", tipe: "halaman", halaman: "mitigasi" },
  { id: "klb-lembaga", label: "Kelembagaan & Kebijakan", tipe: "halaman", halaman: "klb-lembaga" },
  { id: "klb-partisipasi", label: "Partisipasi & Kapasitas Masyarakat", tipe: "halaman", halaman: "klb-partisipasi" },
  { id: "klb-eksternal", label: "Dukungan & Pengembangan", tipe: "halaman", halaman: "klb-eksternal" },
  { id: "klb-data", label: "Data & Manfaat Program", tipe: "halaman", halaman: "klb-data" },
  { id: "artikel", label: "Artikel", tipe: "artikel" },
  { id: "galeri", label: "Galeri Foto", tipe: "galeri" },
].map(function (m) { m.ikon = ikonSvg(m.id); return m; });
