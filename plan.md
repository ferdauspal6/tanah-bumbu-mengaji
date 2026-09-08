# Prompt untuk OpenCode — Landing Page "Tanah Bumbu Mengaji"

Gunakan prompt ini sebagai instruksi awal ke agent OpenCode (DeepSeek/CLI) untuk membangun project.

---

## 1. Konteks Project

Buatkan website media dakwah sunnah bernama **"Tanah Bumbu Mengaji"**, berbasis di Tanah Bumbu, Kalimantan Selatan, Indonesia. Website ini berfungsi sebagai media informasi kajian, dokumentasi kegiatan, dan donasi untuk operasional dakwah.

## 2. Tech Stack

- **Framework**: Astro (versi terbaru, gunakan `npm create astro@latest`)
- **Styling**: Tailwind CSS (integrasi resmi `@astrojs/tailwind`)
- **Mode render**: Static Site Generation (SSG) — semua halaman di-generate statis
- **Hosting**: Cloudflare Pages. Tambahkan adapter `@astrojs/cloudflare` di `astro.config.mjs` (jaga-jaga jika ke depan butuh Pages Functions), tapi untuk sekarang output tetap static (`output: 'static'`) karena feed poster akan pakai widget pihak ketiga, bukan server-side fetch
- **Feed poster harian**: gunakan **Behold.so** (widget Instagram feed berbasis Graph API resmi, free plan, auto-sync). Buat komponen `PosterFeed.astro` yang embed script/JSON dari Behold — beri placeholder Feed ID dengan komentar `// TODO: ganti dengan Feed ID Behold.so setelah akun IG Business dihubungkan`
- **Interaktivitas ringan** (lightbox galeri, mobile menu, form validation): gunakan Alpine.js via CDN atau Astro island minimal (hindari React kecuali diperlukan untuk komponen kompleks)
- **Font**: Google Fonts — heading pakai font tegas/serif islami modern (mis. "Playfair Display" atau "Lora"), body pakai font sans-serif netral (mis. "Inter" atau "Plus Jakarta Sans")
- **Icon**: gunakan `astro-icon` atau lucide-icons (SVG inline)
- **Gambar**: gunakan komponen `<Image />` bawaan Astro (`astro:assets`) untuk optimasi. Semua foto masih PLACEHOLDER (pakai gambar solid color / gradient box beri label "Placeholder: nama-gambar.jpg") karena aset asli akan disediakan menyusul.

## 3. Design System

**Mode**: Light mode saja (belum perlu dark mode).

**Warna primary**: Merah tua (dark red), contoh token:
```css
--color-primary: #7A1315;      /* merah tua utama */
--color-primary-dark: #5C0E10; /* hover/active state */
--color-primary-light: #A63A3C; /* accent lembut */
--color-bg: #FFFFFF;
--color-bg-alt: #FAF6F3;       /* off-white hangat untuk section alternate */
--color-text: #1F1B1A;
--color-text-muted: #6B6260;
--color-accent-gold: #B8892E;  /* aksen emas islami, dipakai sangat sedikit — border, ikon, garis dekoratif */
--color-border: #EDE3DF;
```

**Prinsip desain**:
- Modern, bersih, banyak whitespace — hindari kesan "template masjid" yang generik/berat
- Gunakan pola geometris islami tipis/subtle sebagai dekorasi (opacity rendah) di hero/section divider, bukan ornamen berat
- Rounded corners moderat (rounded-xl/2xl untuk card)
- Shadow lembut (shadow-sm/md), hindari shadow tebal
- Section rhythm: alternate antara `--color-bg` dan `--color-bg-alt` agar tidak flat
- Tipografi jelas dengan hierarchy kuat (hero headline besar & bold)
- Mobile-first, fully responsive

## 4. Struktur Halaman (Astro Pages)

```
src/pages/
  index.astro              -> Beranda
  donasi.astro              -> Donasi
  struktur-organisasi.astro -> Struktur Organisasi
  kegiatan.astro             -> Kegiatan
  hubungi-kami.astro         -> Hubungi Kami (CTA)
```

## 5. Komponen yang Dibuat

```
src/components/
  Navbar.astro          -> sticky, menu: Beranda, Donasi, Struktur Organisasi, Kegiatan + CTA button "Hubungi Kami"
  Footer.astro           -> logo, deskripsi singkat, menu, sosmed icon, kontak, copyright
  Hero.astro              -> reusable hero (dipakai beranda + variant judul halaman lain)
  SectionHeading.astro    -> heading + subheading reusable dengan garis aksen gold
  KajianCard.astro        -> card jadwal kajian (tanggal, waktu, pemateri, lokasi, badge LIVE opsional)
  GalleryGrid.astro       -> grid galeri foto + lightbox (Alpine.js)
  PosterFeed.astro        -> embed feed poster harian dari Instagram via Behold.so (auto-sync)
  YoutubeEmbed.astro      -> embed video YouTube responsive
  SocialCard.astro        -> card sosial media (icon, nama platform, CTA follow)
  DonationInfoCard.astro  -> card info rekening/e-wallet dengan tombol salin nomor
  DonationConfirmForm.astro -> form konfirmasi donasi
  OrgMemberCard.astro     -> card anggota struktur organisasi
  ContactForm.astro        -> form kontak
  CTASection.astro         -> reusable CTA banner merah tua
```

## 6. Detail Konten Tiap Halaman

### `index.astro` (Beranda)
1. Navbar
2. Hero — headline: "Menebar Ilmu Sunnah di Tanah Bumbu", subheadline dakwah singkat, CTA: "Lihat Jadwal Kajian" (scroll ke #kegiatan) & "Donasi Sekarang" (link ke /donasi)
3. Tentang Singkat — 2-3 kalimat + 3 value card (Sunnah, Ilmu, Ukhuwah) dengan icon
4. Jadwal Kajian & Livestream — grid 3 `KajianCard`, data dummy dulu, tombol "Lihat Semua Kegiatan" -> /kegiatan
5. Galeri Kegiatan — `GalleryGrid` dengan 8 placeholder image
6. Poster Harian — `PosterFeed`, section terpisah dengan heading "Poster Dakwah Harian", menampilkan feed Instagram terbaru otomatis via Behold.so + tombol "Lihat Semua di Instagram" ke `https://www.instagram.com/tanahbumbumengaji/`
7. Konten Dakwah — `YoutubeEmbed` video terbaru (pakai video ID dummy) + tombol subscribe ke `https://youtube.com/c/TanahBumbuMengaji`
8. Sosial Media — 3 `SocialCard`:
   - Facebook: `https://www.facebook.com/tanahbumbumengaji1/`
   - Instagram: `https://www.instagram.com/tanahbumbumengaji/`
   - YouTube: `https://youtube.com/c/TanahBumbuMengaji`
9. Info Donasi Ringkas — teks kebutuhan dakwah + tombol ke /donasi
10. Struktur Organisasi preview — foto+nama Ketua (Anton Trisnanda) + tombol "Lihat Struktur Lengkap" -> /struktur-organisasi
11. CTASection penutup — ajakan follow/donasi/ikut kajian
12. Footer

### `donasi.astro`
- Hero kecil: "Dukung Dakwah Sunnah di Tanah Bumbu"
- `DonationInfoCard` — rekening bank & e-wallet (data dummy, beri komentar TODO untuk diisi klien)
- **Form Konfirmasi Donasi — status "Dalam Pengembangan"**: form BELUM fungsional untuk rilis awal. Tampilkan `DonationConfirmForm` sebagai notice card, bukan form aktif:
  - Badge/label "🚧 Form Sedang Dalam Pengembangan"
  - Teks singkat: konfirmasi donasi sementara dilakukan manual via WhatsApp
  - Tombol CTA besar "Konfirmasi via WhatsApp" -> `https://wa.me/6282254500939?text=Assalamu%27alaikum%2C%20saya%20ingin%20konfirmasi%20donasi...`
  - Field-field form (Nama Donatur, Nominal, Tanggal Transfer, Metode, Upload Bukti Transfer, Catatan) tetap dibuat di komponen tapi dalam keadaan **disabled/non-aktif** (opacity rendah + overlay "Segera Hadir"), supaya struktur form sudah siap dan tinggal diaktifkan saat integrasi backend (GAS) sudah jadi
- FAQ donasi singkat (accordion, 3-4 pertanyaan dummy)

**Catatan backend form (untuk fase berikutnya, belum dikerjakan sekarang)**: karena Astro adalah static site, form konfirmasi donasi (termasuk upload file) nantinya akan di-submit ke **Google Apps Script Web App** (pola yang familiar) yang menyimpan data ke Google Sheets dan file ke Google Drive. Cukup siapkan struktur komponen `DonationConfirmForm` agar mudah diaktifkan nanti (fetch POST dengan `FormData`, handle loading state & pesan sukses/error, tanpa native `<form>` submit) — TAPI untuk sekarang biarkan disabled sesuai poin di atas.

### `struktur-organisasi.astro`
- Hero kecil: "Struktur Organisasi"
- Grid `OrgMemberCard`:
  - Anton Trisnanda — Ketua
  - Randi Saputra — Koordinator Lapangan
  - Firdaus — Operator Media
  - Ikhsan — Anggota
  - Aris Febryansah — Anggota
  - Piter Hadi — Anggota
- Layout: Ketua ditampilkan lebih besar/menonjol di atas, lalu grid anggota di bawah

### `kegiatan.astro`
- Hero kecil: "Kegiatan & Kajian"
- Tab filter (Alpine.js, tanpa reload): "Semua", "Kajian Rutin", "Livestreaming", "Dokumentasi"
- Grid `KajianCard` dengan data dummy lebih banyak (6-8 item)
- `YoutubeEmbed` section untuk kajian/livestream terbaru
- `GalleryGrid` dokumentasi kegiatan (lebih banyak dari beranda, 12 placeholder image)

### `hubungi-kami.astro`
- Hero kecil: "Hubungi Kami"
- `ContactForm` (Nama, Email/No HP, Pesan)
- Tombol besar WhatsApp (link `https://wa.me/6282254500939`)
- Ikon sosmed aktif (link sama seperti beranda)
- Placeholder embed Google Maps (iframe kosong dengan komentar TODO isi lokasi)

## 7. Data Dummy

Buatkan file `src/data/kajian.ts` dan `src/data/organisasi.ts` untuk data yang reusable (jadwal kajian, struktur organisasi) agar mudah diedit nanti tanpa utak-atik komponen.

## 8. SEO & Meta

- Buatkan `BaseLayout.astro` dengan slot untuk title & meta description per halaman
- Title format: `{Judul Halaman} — Tanah Bumbu Mengaji`
- Meta description dakwah-related per halaman
- OG image placeholder

## 9. Catatan Setup Poster Feed (Behold.so)

Ini langkah non-coding yang perlu dilakukan terpisah (bukan tugas OpenCode), tapi perlu diketahui agen agar komponen `PosterFeed.astro` dibuat generic/mudah diisi:

1. Daftar akun gratis di https://behold.so
2. Hubungkan akun Instagram Business "tanahbumbumengaji" ke Behold
3. Buat 1 feed, salin Feed ID / embed script yang diberikan
4. Tempel Feed ID ke `PosterFeed.astro` (agent cukup siapkan slot/props untuk ini, jangan hardcode ID asli karena belum tersedia)
5. Setelah Feed ID terpasang, poster baru yang diupload ke Instagram akan otomatis muncul di web sesuai jadwal sync Behold (biasanya harian di free plan)

## 10. Yang TIDAK perlu dikerjakan dulu

- Jangan bikin backend/API real — cukup siapkan struktur fetch ke GAS dengan placeholder URL
- Jangan cari/generate gambar asli — semua pakai placeholder box dengan label
- Jangan bikin animasi kompleks — cukup transisi hover sederhana

## 11. Output yang diharapkan

Project Astro yang bisa langsung dijalankan `npm run dev`, dengan struktur folder rapi (`components/`, `layouts/`, `pages/`, `data/`), Tailwind config sudah mengandung token warna di atas, dan kelima halaman sudah berisi konten sesuai spesifikasi (dengan data dummy/placeholder), siap untuk diisi konten & gambar asli.