/* =========================================================
   APP — router, interaksi galeri, dan bilah admin
   ========================================================= */

(function () {
  "use strict";

  var S = window.Store;
  var R = window.Render;
  var isi = document.getElementById("isi-utama");

  /* ---------------- ROUTER ---------------- */
  function ruta() {
    var h = location.hash.replace(/^#\/?/, "").trim();
    return h || S.halamanPertama();
  }

  var gambarPertamaKali = true;
  function gambarUlang() {
    var lanjut = function () {
      var r = ruta();
      var bagian = r.split("/");

      if (bagian[0] === "artikel" && bagian[1]) {
        var a = S.artikelById(bagian[1]);
        R.header("artikel");
        isi.innerHTML = a ? R.artikel(a) : R.tidakDitemukan(r);
      } else {
        var hal = S.halamanById(bagian[0]);
        R.header(bagian[0]);
        isi.innerHTML = hal ? R.halaman(hal) : R.tidakDitemukan(r);
      }

      R.footer();
      pasangGaleri();
      pasangVideo();
      pasangFormKritikSaran();
      pasangArtikelFilter();
      pasangHeroSlideshow();
      pasangGaleriTransisi();
      pasangTab();
      pasangAkordeon();
      pasangOrgLompat();
      pasangKarusel();
      pasangPeringkat();
      pasangVbarKlik();
      pasangUngkapSaatGulir();
      pasangBabWarna(bagian[0]);
      document.title =
        ((S.halamanById(bagian[0]) || {}).judul ||
          (S.artikelById(bagian[1] || "") || {}).judul ||
          "Halaman") +
        " • " + S.data.situs.nama;
      window.scrollTo({ top: 0, behavior: "auto" });

      // efek transisi masuk: konten baru meluncur & memudar masuk
      isi.classList.remove("transisi-keluar");
      isi.classList.add("transisi-masuk");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { isi.classList.remove("transisi-masuk"); });
      });
    };

    if (gambarPertamaKali) {
      gambarPertamaKali = false;
      lanjut();
      return;
    }
    // efek transisi keluar: konten lama memudar sebelum halaman baru digambar
    isi.classList.add("transisi-keluar");
    setTimeout(lanjut, 140);
  }

  /* ---------------- HERO: SLIDESHOW FOTO LATAR (LIVE) ---------------- */
  var heroTimer = null;
  function pasangHeroSlideshow() {
    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
    var latar = document.querySelector(".hero-latar");
    if (!latar) return;
    var foto = latar.querySelectorAll(".hero-latar-foto");
    if (foto.length < 2) return;
    var i = 0;
    heroTimer = setInterval(function () {
      foto[i].classList.remove("aktif");
      i = (i + 1) % foto.length;
      foto[i].classList.add("aktif");
    }, 4500);
  }

  /* ---------------- GALERI TRANSISI: tumpukan foto ala polaroid, terkocok otomatis ---------------- */
  var galeriTransisiTimer = [];
  function pasangGaleriTransisi() {
    galeriTransisiTimer.forEach(clearInterval);
    galeriTransisiTimer = [];
    document.querySelectorAll(".tumpuk-stack").forEach(function (stack) {
      var kartu = Array.prototype.slice.call(stack.querySelectorAll(".tumpuk-kartu"));
      var info = stack.closest(".seksi").querySelector(".tumpuk-info");
      var ket = info ? info.querySelector(".tumpuk-keterangan") : null;
      var hitung = info ? info.querySelector(".tumpuk-hitung") : null;
      if (kartu.length < 2) { kartu[0] && kartu[0].classList.add("pos-0"); return; }
      var urutan = kartu.map(function (_, idx) { return idx; });
      var mengunci = false;
      var terapkan = function () {
        kartu.forEach(function (k) { k.className = "tumpuk-kartu"; });
        [0, 1, 2].forEach(function (p) {
          var k = kartu[urutan[p]];
          if (k) k.classList.add("pos-" + p);
        });
        if (ket) ket.textContent = kartu[urutan[0]].getAttribute("data-judul");
        if (hitung) hitung.textContent = (urutan[0] + 1) + " / " + kartu.length;
      };
      var geser = function () {
        if (mengunci) return;
        mengunci = true;
        kartu[urutan[0]].classList.add("keluar");
        setTimeout(function () {
          urutan.push(urutan.shift());
          terapkan();
          mengunci = false;
        }, 550);
      };
      terapkan();
      var jalan = function () { return setInterval(geser, 3800); };
      var timer = jalan();
      galeriTransisiTimer.push(timer);
      stack.addEventListener("mouseenter", function () { clearInterval(timer); });
      stack.addEventListener("mouseleave", function () { timer = jalan(); galeriTransisiTimer.push(timer); });
      stack.addEventListener("click", function () { clearInterval(timer); geser(); timer = jalan(); galeriTransisiTimer.push(timer); });
    });
  }

  /* ---------------- TAB (Visi/Misi dll) ---------------- */
  function pasangTab() {
    document.querySelectorAll("[data-tab-grup]").forEach(function (grup) {
      var tombol = grup.querySelectorAll(".tab-tombol");
      var panel = grup.querySelectorAll(".tab-panel");
      tombol.forEach(function (b) {
        b.onclick = function () {
          var idx = b.getAttribute("data-tab-target");
          tombol.forEach(function (x) { x.classList.remove("aktif"); });
          b.classList.add("aktif");
          panel.forEach(function (p) {
            p.classList.toggle("aktif", p.getAttribute("data-tab-panel") === idx);
          });
        };
      });
    });
  }

  /* ---------------- AKORDEON (pengganti tabel panjang) ---------------- */
  function pasangAkordeon() {
    document.querySelectorAll(".akordeon").forEach(function (ak) {
      var grup = ak.querySelectorAll(".akordeon-grup");
      grup.forEach(function (g) {
        var kepala = g.querySelector(".akordeon-kepala");
        var badan = g.querySelector(".akordeon-badan");
        kepala.onclick = function () {
          var sudahBuka = g.classList.contains("buka");
          grup.forEach(function (x) {
            x.classList.remove("buka");
            x.querySelector(".akordeon-badan").style.maxHeight = "";
          });
          if (!sudahBuka) {
            g.classList.add("buka");
            badan.style.maxHeight = badan.scrollHeight + "px";
            pasangOrgLompat(); // ukur ulang garis bagan org yang baru saja terlihat
          }
        };
      });
      if (grup[0] && !ak.classList.contains("mulai-tertutup")) {
        grup[0].querySelector(".akordeon-kepala").click();
      }
    });
  }

  /* ---------------- ORG CHART: garis baris yang melompati induk langsung ---------------- */
  function pasangOrgLompat() {
    var semuaBaris = document.querySelectorAll(".org-baris");
    document.querySelectorAll(".org-baris.lompat-induk").forEach(function (row) {
      var idx = +row.getAttribute("data-lompat-indeks");
      var induk = semuaBaris[idx];
      if (!induk) return;
      var indukRect = induk.getBoundingClientRect();
      var rowRect = row.getBoundingClientRect();
      if (!rowRect.height && !rowRect.width) return; // masih tersembunyi, lewati dulu
      var titikSambung = indukRect.bottom;
      var busSaya = rowRect.top - 17;
      row.style.setProperty("--stub-top", (titikSambung - rowRect.top) + "px");
      row.style.setProperty("--stub-h", (busSaya - titikSambung) + "px");
    });
  }

  /* ---------------- CAROUSEL DOKUMENTASI ---------------- */
  function pasangKarusel() {
    document.querySelectorAll(".carousel-galeri").forEach(function (tr) {
      function segarkan() {
        var tengahX = tr.scrollLeft + tr.clientWidth / 2;
        var terdekat = null, jarakMin = Infinity;
        tr.querySelectorAll(".foto, .rencana-item").forEach(function (f) {
          var c = f.offsetLeft + f.offsetWidth / 2;
          var jarak = Math.abs(c - tengahX);
          if (jarak < jarakMin) { jarakMin = jarak; terdekat = f; }
          f.classList.remove("tengah");
        });
        if (terdekat) terdekat.classList.add("tengah");
      }
      tr.addEventListener("scroll", function () {
        clearTimeout(tr._t);
        tr._t = setTimeout(segarkan, 60);
      });
      segarkan();

      var bungkus = tr.closest(".carousel-bungkus");
      // tombol panah tidak selalu di dalam .carousel-bungkus (mis. rencana-kerja
      // menaruhnya di sebelah judul, bukan di sisi kartu) — cari selingkup
      // .wadah supaya tetap ketemu di kedua kasus
      var kontrol = (tr.closest(".wadah") || bungkus);
      var geser = function (arah) {
        var slide = tr.querySelector(".foto, .rencana-item");
        var lebar = slide ? slide.getBoundingClientRect().width + 14 : 260;
        tr.scrollBy({ left: arah * lebar, behavior: "smooth" });
      };
      if (kontrol) {
        var prev = kontrol.querySelector(".carousel-prev");
        var next = kontrol.querySelector(".carousel-next");
        if (prev) prev.onclick = function () { geser(-1); };
        if (next) next.onclick = function () { geser(1); };
      }

      // putar otomatis, berhenti saat disorot kursor — dilewati untuk kartu
      // berisi teks panjang supaya tidak mengganggu saat dibaca
      var tanpaOtomatis = bungkus && bungkus.classList.contains("rencana-bungkus");
      if (!tanpaOtomatis) {
        var otomatis = setInterval(function () {
          if (tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4) {
            tr.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            geser(1);
          }
        }, 3800);
        tr.addEventListener("mouseenter", function () { clearInterval(otomatis); });
      }
    });
  }

  /* ---------------- PERINGKAT (bar skor) ---------------- */
  function pasangPeringkat() {
    var bar = document.querySelectorAll(".peringkat-bar");
    var vbar = document.querySelectorAll(".vbar-isi");
    var pod = document.querySelectorAll(".podium-bar");
    if (!bar.length && !vbar.length && !pod.length) return;
    setTimeout(function () {
      bar.forEach(function (b) { b.style.width = b.getAttribute("data-lebar") + "%"; });
      vbar.forEach(function (b) { b.style.height = b.getAttribute("data-tinggi") + "%"; });
      pod.forEach(function (b) { b.style.height = b.getAttribute("data-tinggi") + "px"; });
    }, 60);
  }

  // hover (desktop) / tap (layar sentuh) batang diagram vertikal -> tampilkan kartu tooltip
  // di atas batang berisi nama dusun, nilai, dan kelas kerentanannya
  function pasangVbarKlik() {
    document.querySelectorAll(".vbar-kartu").forEach(function (kartu) {
      var tip = kartu.querySelector(".vbar-tooltip");
      if (!tip) return;
      var tampilkan = function (sel) {
        var r = sel.getBoundingClientRect();
        var kr = kartu.getBoundingClientRect();
        tip.innerHTML = sel.getAttribute("data-tip");
        tip.classList.add("tampil");
        var kiri = r.left - kr.left + r.width / 2;
        var atasBatang = r.top - kr.top;
        var atas = Math.max(4, atasBatang - tip.offsetHeight - 8);
        tip.style.left = kiri + "px";
        tip.style.top = atas + "px";
      };
      var sembunyikan = function () { tip.classList.remove("tampil"); };
      kartu.querySelectorAll(".vbar-satu").forEach(function (sel) {
        sel.addEventListener("mouseenter", function () { tampilkan(sel); });
        sel.addEventListener("mouseleave", sembunyikan);
        sel.addEventListener("click", function (e) {
          e.stopPropagation();
          tampilkan(sel);
        });
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll(".vbar-tooltip").forEach(function (t) { t.classList.remove("tampil"); });
    });
  }

  /* ---------------- UNGKAP SAAT DIGULIR: seksi & tiap kartu di dalamnya memudar-masuk
     bertahap begitu terlihat (satu per satu, bukan sekaligus) — pola yang sama dipakai
     situs referensi agrotanisejahtera.co.id (animasi "fadeInUp" per elemen saat digulir).
     Arah masuknya divariasikan per jenis elemen lewat inline transform, supaya tidak
     monoton "naik-fade" diulang sama semua — begitu tampil, inline transform dikosongkan
     lagi supaya tidak bentrok dengan transform hover yang sudah ada di elemen tsb. */
  function gayaMasuk(el) {
    if (el.classList.contains("kartu")) {
      var grid = el.closest(".grid-kartu, .fk-grid");
      var idx = grid ? Array.prototype.indexOf.call(grid.children, el) : 0;
      return "translateY(20px) " + (idx % 2 === 0 ? "translateX(-26px)" : "translateX(26px)") + " scale(.95)";
    }
    if (el.classList.contains("kartu-artikel")) {
      var grid2 = el.closest(".grid-artikel");
      var idx2 = grid2 ? Array.prototype.indexOf.call(grid2.children, el) : 0;
      return "translateY(24px) rotate(" + (idx2 % 2 === 0 ? "-1.5deg" : "1.5deg") + ")";
    }
    if (el.classList.contains("checklist-item")) return "translateX(-32px)";
    if (el.classList.contains("stat")) return "scale(.75)";
    if (el.classList.contains("kartu-data-sel")) return "translateX(34px)";
    if (el.classList.contains("peringkat-baris")) return "translateX(-26px)";
    if (el.classList.contains("profil-blok")) return el.classList.contains("kanan") ? "translateX(36px)" : "translateX(-36px)";
    if (el.classList.contains("akordeon-grup")) return "translateX(-16px)";
    if (el.classList.contains("tingkat-langkah")) return "translateX(-22px)";
    if (el.classList.contains("rute-titik")) return "translateY(14px) scale(.6)";
    if (el.classList.contains("podium-slot")) return "translateY(30px)";
    if (el.classList.contains("rencana-item")) return "translateX(-24px)";
    if (el.classList.contains("arah-item")) return "translateX(30px) scale(.92)";
    if (el.classList.contains("manfaat-panel")) return "translateY(20px)";
    return "translateY(18px)";
  }

  var ungkapObs = null, ungkapObsItem = null, babObs = null;
  function pasangUngkapSaatGulir() {
    if (ungkapObs) ungkapObs.disconnect();
    if (ungkapObsItem) ungkapObsItem.disconnect();

    var seksi = document.querySelectorAll(".seksi, .klb-banner");
    var item = document.querySelectorAll(
      ".kartu, .checklist-item, .stat, .kartu-data-sel, .kartu-artikel, " +
      ".peringkat-baris, .profil-blok, .akordeon-grup, .tingkat-langkah, " +
      ".rute-titik, .podium-slot, .rencana-item, .arah-item, .manfaat-panel"
    );

    if (!("IntersectionObserver" in window)) {
      seksi.forEach(function (s) { s.classList.add("tampak"); });
      item.forEach(function (s) { s.classList.add("tampak"); });
      return;
    }

    ungkapObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("tampak");
          ungkapObs.unobserve(en.target);
        }
      });
    }, { threshold: .1, rootMargin: "0px 0px -60px 0px" });
    seksi.forEach(function (s) { ungkapObs.observe(s); });

    // kartu/item di dalam seksi: muncul bertahap (cascade), bukan bersamaan —
    // jeda dihitung dari urutan kemunculannya dalam satu "gelombang" gulir yang sama
    ungkapObsItem = new IntersectionObserver(function (entries) {
      var terlihat = entries.filter(function (en) { return en.isIntersecting; });
      terlihat.forEach(function (en, i) {
        en.target.style.transitionDelay = (Math.min(i, 7) * 0.07) + "s";
        en.target.style.transform = "";
        en.target.classList.add("tampak");
        ungkapObsItem.unobserve(en.target);
      });
    }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
    item.forEach(function (s) {
      s.style.transform = gayaMasuk(s);
      ungkapObsItem.observe(s);
    });

    // jaring pengaman: kadang IntersectionObserver telat/gagal terpicu di beberapa
    // browser (kontennya nyangkut transparan sampai ada interaksi) — paksa semua
    // yang belum "tampak" untuk langsung muncul setelah jeda singkat, supaya tidak
    // pernah ada konten yang nyangkut tak terlihat
    setTimeout(function () {
      document.querySelectorAll(".seksi:not(.tampak), .klb-banner:not(.tampak)").forEach(function (s) {
        s.classList.add("tampak");
      });
      document.querySelectorAll(
        ".kartu:not(.tampak), .checklist-item:not(.tampak), .stat:not(.tampak), " +
        ".kartu-data-sel:not(.tampak), .kartu-artikel:not(.tampak), .peringkat-baris:not(.tampak), " +
        ".profil-blok:not(.tampak), .akordeon-grup:not(.tampak), .tingkat-langkah:not(.tampak), " +
        ".rute-titik:not(.tampak), .podium-slot:not(.tampak), .rencana-item:not(.tampak), .arah-item:not(.tampak), " +
        ".manfaat-panel:not(.tampak)"
      ).forEach(function (s) {
        s.style.transform = "";
        s.classList.add("tampak");
      });
    }, 1200);
  }

  /* ---------------- BAB-WARNA: wash warna berpindah tiap seksi digulir ke tengah layar
     (kesan "babak"/chapter sinematik) — khusus halaman Beranda supaya tidak berlebihan
     di halaman lain yang lebih padat teks ---------------- */
  var WARNA_BAB = [
    "rgba(61, 104, 222, .07)",   /* biru */
    "rgba(76, 175, 79, .08)",    /* hijau */
    "rgba(224, 150, 92, .07)",   /* hangat */
    "rgba(42, 86, 214, .08)",    /* biru tua */
  ];
  function pasangBabWarna(halamanId) {
    if (babObs) { babObs.disconnect(); babObs = null; }
    var lapis = document.getElementById("bab-warna");
    if (halamanId === "admin") {
      if (lapis) lapis.style.backgroundColor = "transparent";
      return;
    }
    if (!lapis) {
      lapis = document.createElement("div");
      lapis.id = "bab-warna";
      lapis.setAttribute("aria-hidden", "true");
      document.body.insertBefore(lapis, document.body.firstChild);
    }
    var seksi = document.querySelectorAll("#isi-utama .hero, #isi-utama .seksi, #isi-utama .klb-banner");
    if (!("IntersectionObserver" in window) || !seksi.length) {
      lapis.style.backgroundColor = "transparent";
      return;
    }
    babObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(seksi, en.target);
        lapis.style.backgroundColor = WARNA_BAB[idx % WARNA_BAB.length];
      });
    }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });
    seksi.forEach(function (s) { babObs.observe(s); });
  }

  /* ---------------- RIAK KLIK: efek gelembung ripple saat tombol/kartu/chip diklik ---------------- */
  (function pasangRiakKlik() {
    var pilihRiak = ".tombol, .pil, .tab-tombol, .akordeon-kepala, a.kartu, .kartu-artikel, " +
      ".checklist-item, .carousel-tombol, .nav-tautan";
    document.addEventListener("click", function (e) {
      var t = e.target.closest(pilihRiak);
      if (!t) return;
      var lama = t.querySelector(".efek-riak");
      if (lama) lama.remove();
      var riak = document.createElement("span");
      riak.className = "efek-riak";
      var r = t.getBoundingClientRect();
      var ukuran = Math.max(r.width, r.height) * 1.8;
      riak.style.width = riak.style.height = ukuran + "px";
      riak.style.left = (e.clientX - r.left - ukuran / 2) + "px";
      riak.style.top = (e.clientY - r.top - ukuran / 2) + "px";
      t.appendChild(riak);
      setTimeout(function () { riak.remove(); }, 650);
    });
  })();

  /* ---------------- FORM KRITIK & SARAN ---------------- */
  function pasangFormKritikSaran() {
    var form = document.getElementById("form-kritik-saran");
    if (!form) return;
    var tombol = document.getElementById("ks-tombol-kirim");
    var status = document.getElementById("ks-status");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var nama = document.getElementById("ks-nama").value.trim();
      var kontak = document.getElementById("ks-kontak").value.trim();
      var kategori = document.getElementById("ks-kategori").value;
      var pesan = document.getElementById("ks-pesan").value.trim();

      if (!nama || !kontak || !kategori || !pesan) {
        status.className = "ks-status gagal";
        status.textContent = "Mohon lengkapi seluruh kolom yang wajib diisi sebelum mengirimkan masukan.";
        status.style.display = "";
        return;
      }

      tombol.disabled = true;
      tombol.textContent = "Mengirim...";
      status.style.display = "none";
      try {
        await S.kirimKritikSaran({ nama: nama, kontak: kontak, kategori: kategori, pesan: pesan });
        form.reset();
        status.className = "ks-status berhasil";
        status.textContent = "Terima kasih, masukan Anda telah kami terima dan akan segera kami tindaklanjuti.";
        status.style.display = "";
      } catch (err) {
        status.className = "ks-status gagal";
        status.textContent = "Pengiriman masukan tidak berhasil (" + err.message + "). Silakan coba kembali beberapa saat lagi.";
        status.style.display = "";
      } finally {
        tombol.disabled = false;
        tombol.textContent = "Kirim Masukan";
      }
    });
  }

  /* ---------------- GALERI: FILTER + LIGHTBOX ---------------- */
  // tampilkan foto sesuai kategori (pil) + komponen (dropdown, opsional) —
  // langsung tampil, tanpa animasi/jeda
  function tampilkanGaleri(grid, kat, komponen) {
    grid.querySelectorAll(".galeri-kelompok").forEach(function (kel) {
      var cocokKat = !kat || kel.getAttribute("data-kat") === kat;
      var cocokKomponen = !komponen || kel.getAttribute("data-judul") === komponen;
      kel.style.display = (cocokKat && cocokKomponen) ? "" : "none";
    });
  }

  function pasangGaleri() {
    var grid = document.getElementById("grid-galeri");
    var gridVideo = document.getElementById("grid-galeri-video");
    var filter = document.getElementById("filter-galeri");
    var dropdownWadah = document.getElementById("filter-komponen-wadah");
    var dropdown = document.getElementById("filter-komponen");
    var petaKomponen = {};
    try { petaKomponen = JSON.parse((dropdownWadah && dropdownWadah.getAttribute("data-map")) || "{}"); } catch (e) {}

    function isiDropdown(kat) {
      if (!dropdown) return;
      var daftar = petaKomponen[kat || "__semua__"] || [];
      var esc = Render.esc;
      dropdown.innerHTML = '<option value="">Lompat ke komponen…</option>' +
        daftar.map(function (d) {
          return '<option value="' + esc(d.judul) + '">' + esc(d.judul) + " (" + d.jumlah + ")</option>";
        }).join("");
    }

    if (grid) tampilkanGaleri(grid, "", "");
    if (filter) {
      filter.querySelectorAll(".pil").forEach(function (b) {
        b.onclick = function () {
          filter.querySelectorAll(".pil").forEach(function (x) { x.classList.remove("aktif"); });
          b.classList.add("aktif");
          var kat = b.getAttribute("data-kat");
          var pilihVideo = kat === "__video__";
          if (grid) grid.style.display = pilihVideo ? "none" : "";
          if (gridVideo) gridVideo.style.display = pilihVideo ? "" : "none";
          if (dropdownWadah) dropdownWadah.style.display = pilihVideo ? "none" : "";
          isiDropdown(pilihVideo ? "" : kat);
          if (!pilihVideo && grid) tampilkanGaleri(grid, kat, "");
        };
      });
    }
    if (dropdown) {
      isiDropdown("");
      dropdown.onchange = function () {
        var aktifBtn = filter ? filter.querySelector(".pil.aktif") : null;
        var kat = aktifBtn ? aktifBtn.getAttribute("data-kat") : "";
        if (grid) tampilkanGaleri(grid, kat, dropdown.value);
      };
    }
    document.querySelectorAll(".foto").forEach(function (f) {
      f.onclick = function () { bukaLightbox(f); };
    });
  }

  function pasangArtikelFilter() {
    var grid = document.getElementById("grid-artikel");
    var filter = document.getElementById("filter-artikel");
    if (!grid || !filter) return;
    filter.querySelectorAll(".pil").forEach(function (b) {
      b.onclick = function () {
        filter.querySelectorAll(".pil").forEach(function (x) { x.classList.remove("aktif"); });
        b.classList.add("aktif");
        var kat = b.getAttribute("data-kat");
        grid.querySelectorAll(".kartu-artikel").forEach(function (a) {
          var cocok = !kat || a.getAttribute("data-kat") === kat;
          a.style.display = cocok ? "" : "none";
        });
      };
    });
  }

  var lbDaftar = [], lbPosisi = 0;

  function bukaLightbox(sel) {
    var wadahGrid = sel.closest(".grid-galeri, .galeri-masonry, .carousel-galeri");
    lbDaftar = Array.prototype.filter.call(
      wadahGrid.querySelectorAll(".foto"),
      function (f) { return f.style.display !== "none"; }
    ).map(function (f) { return +f.getAttribute("data-foto"); });
    lbPosisi = Math.max(0, lbDaftar.indexOf(+sel.getAttribute("data-foto")));
    tampilLightbox();
  }

  function tampilLightbox() {
    var lb = document.getElementById("lightbox");
    var g = S.data.galeri[lbDaftar[lbPosisi]];
    if (!g) return;
    var img = lb.querySelector("img");
    var sudahTampil = lb.classList.contains("tampil");
    var isiBaru = function () {
      img.src = g.file;
      lb.querySelector(".info").innerHTML =
        "<b>" + R.esc(g.judul) + "</b><br>" + R.esc(g.keterangan || "") +
        '<br><span style="opacity:.7">' + (lbPosisi + 1) + " / " + lbDaftar.length + "</span>";
      lb.classList.add("tampil");
    };
    if (sudahTampil) {
      // memudar keluar dulu sebelum foto berikutnya muncul, biar terasa transisi
      img.classList.add("memuat");
      setTimeout(function () {
        isiBaru();
        img.classList.remove("memuat");
      }, 180);
    } else {
      isiBaru();
    }
  }

  function geser(n) {
    if (!lbDaftar.length) return;
    lbPosisi = (lbPosisi + n + lbDaftar.length) % lbDaftar.length;
    tampilLightbox();
  }

  function tutupLightbox() {
    document.getElementById("lightbox").classList.remove("tampil");
  }

  document.getElementById("lb-tutup").onclick = tutupLightbox;
  document.getElementById("lb-kiri").onclick = function (e) { e.stopPropagation(); geser(-1); };
  document.getElementById("lb-kanan").onclick = function (e) { e.stopPropagation(); geser(1); };
  document.getElementById("lightbox").onclick = function (e) {
    if (e.target.id === "lightbox") tutupLightbox();
  };
  document.addEventListener("keydown", function (e) {
    if (!document.getElementById("lightbox").classList.contains("tampil")) return;
    if (e.key === "Escape") tutupLightbox();
    if (e.key === "ArrowLeft") geser(-1);
    if (e.key === "ArrowRight") geser(1);
  });

  /* ---------------- LIGHTBOX VIDEO ---------------- */
  var lbvDaftar = [], lbvPosisi = 0;

  function pasangVideo() {
    document.querySelectorAll(".kartu-video.bisa-klik").forEach(function (kartu) {
      kartu.onclick = function () { bukaLightboxVideo(kartu); };
    });
  }

  function bukaLightboxVideo(kartu) {
    var grid = kartu.closest(".grid-video");
    lbvDaftar = Array.prototype.slice.call(grid.querySelectorAll(".kartu-video.bisa-klik"));
    lbvPosisi = Math.max(0, lbvDaftar.indexOf(kartu));
    tampilLightboxVideo();
  }

  function tampilLightboxVideo() {
    var kartu = lbvDaftar[lbvPosisi];
    if (!kartu) return;
    var idYt = kartu.getAttribute("data-video-yt");
    var src = kartu.getAttribute("data-video-src");
    var judul = kartu.getAttribute("data-video-judul") || "Video";
    var caption = kartu.getAttribute("data-video-caption") || "";
    var media = document.getElementById("lbv-media");
    if (idYt) {
      media.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + idYt + '?autoplay=1" title="' + R.esc(judul) +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    } else if (src) {
      media.innerHTML = '<video src="' + R.esc(src) + '" controls autoplay></video>';
    } else {
      var ikonEl = kartu.querySelector(".ikon-tema-video");
      media.innerHTML =
        '<div class="pratonton-video kosong lbv-kosong">' +
        (ikonEl ? '<span class="ikon-tema-video">' + ikonEl.innerHTML + "</span>" : "") +
        '<span class="tombol-putar"><svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg></span>' +
        '<span class="label-segera">Video sedang disiapkan</span>' +
        "</div>";
    }
    document.getElementById("lbv-info").innerHTML =
      "<b>" + R.esc(judul) + "</b>" + (caption ? "<br>" + R.esc(caption) : "") +
      (lbvDaftar.length > 1 ? '<br><span style="opacity:.7">' + (lbvPosisi + 1) + " / " + lbvDaftar.length + "</span>" : "");
    document.getElementById("lightbox-video").classList.add("tampil");
    var kiri = document.getElementById("lbv-kiri"), kanan = document.getElementById("lbv-kanan");
    var banyak = lbvDaftar.length > 1;
    kiri.style.display = banyak ? "" : "none";
    kanan.style.display = banyak ? "" : "none";
  }

  function geserVideo(n) {
    if (!lbvDaftar.length) return;
    lbvPosisi = (lbvPosisi + n + lbvDaftar.length) % lbvDaftar.length;
    tampilLightboxVideo();
  }

  function tutupLightboxVideo() {
    document.getElementById("lightbox-video").classList.remove("tampil");
    document.getElementById("lbv-media").innerHTML = ""; // hentikan pemutaran
  }

  document.getElementById("lbv-tutup").onclick = tutupLightboxVideo;
  document.getElementById("lbv-kiri").onclick = function (e) { e.stopPropagation(); geserVideo(-1); };
  document.getElementById("lbv-kanan").onclick = function (e) { e.stopPropagation(); geserVideo(1); };
  document.getElementById("lightbox-video").onclick = function (e) {
    if (e.target.id === "lightbox-video") tutupLightboxVideo();
  };
  document.addEventListener("keydown", function (e) {
    if (!document.getElementById("lightbox-video").classList.contains("tampil")) return;
    if (e.key === "Escape") tutupLightboxVideo();
    if (e.key === "ArrowLeft") geserVideo(-1);
    if (e.key === "ArrowRight") geserVideo(1);
  });

  /* ---------------- MULAI ---------------- */
  (async function mulai() {
    isi.innerHTML = '<div class="wadah" style="padding:80px 20px;text-align:center;color:var(--teks-lembut)">Memuat...</div>';
    await S.muat();
    window.addEventListener("hashchange", gambarUlang);
    window.gambarUlangSitus = gambarUlang;
    gambarUlang();
  })();
})();
