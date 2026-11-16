# 🦷 Rizka Dental Care — Landing Page

Landing page company profile untuk **Rizka Dental Care**, klinik gigi keluarga di Jakarta Selatan yang dipimpin **drg. Rizka Radihas Putri, Sp.KG**. Situs satu halaman ini memperkenalkan dokter, layanan (scaling, whitening, veneer, behel, implan, perawatan anak), hasil before/after, dan testimoni pasien, lalu mengarahkan pengunjung ke form janji temu. Dibangun sebagai static site murni dengan sentuhan parallax yang halus, tanpa framework dan tanpa build step, lalu dikemas dalam container Nginx untuk deployment.

---

## Preview

> 📸 **Screenshot belum tersedia.** Tambahkan tangkapan layar di `docs/preview.png` (misalnya hero dan galeri before/after), lalu tampilkan di sini:
>
> ```markdown
> ![Preview Rizka Dental Care](docs/preview.png)
> ```

---

## Tech Stack

- **HTML5 semantic** (`header`, `section`, `article`, `figure`, `dl`, `footer`)
- **TailwindCSS via CDN** (`cdn.tailwindcss.com`) dengan `tailwind.config` inline di `<head>`
- **Google Fonts:** Fraunces (display) + Plus Jakarta Sans (body)
- **Vanilla JavaScript** (no framework, no build step)
- **Parallax engine:** scroll + mouse + lerp + reverse layer, menghormati `prefers-reduced-motion`
- **IntersectionObserver** untuk scroll reveal
- **OpenStreetMap iframe** untuk map embed
- **Nginx (alpine)** sebagai production server dalam container

---

## Features

- **Parallax multi-layer** di Hero (scroll, mouse-follow, dan layer berlawanan arah), plus entry parallax di section About dan Appointment
- **Scroll progress bar** tipis di bagian atas layar
- **Nav blur on scroll**, navbar berubah menjadi glass setelah scroll > 50px
- **Scroll reveal** (fade + translate-up) pada tiap section
- **Mobile responsive** lengkap dengan hamburger menu
- **Accessible:** atribut ARIA, label form yang terhubung, dan dukungan `prefers-reduced-motion`
- **Before/after gallery** dengan 4 kasus perawatan
- **Services grid** berisi 6 layanan inti
- **Form janji temu** dengan pilihan layanan
- **Peta lokasi** OpenStreetMap di footer

---

## Project Structure

```text
rizka-compro/
├── index.html          # Seluruh halaman: markup, style, dan script
├── DESIGN.md           # Spesifikasi desain (brand, palet, copy, parallax)
├── Dockerfile          # Image nginx:1.27-alpine untuk production
├── .dockerignore       # File yang tidak ikut masuk build context
├── nginx.conf          # Konfigurasi Nginx (gzip, cache, security headers, /healthz)
├── docker-compose.yml  # Opsional: menjalankan container lewat compose
└── README.md           # Dokumen ini
```

---

## Getting Started

Tidak ada dependency yang perlu di-install. Semua library dimuat lewat CDN, jadi **butuh koneksi internet** saat membuka halaman.

### Opsi A: Buka langsung

```bash
open index.html
```

### Opsi B: Dengan server lokal

```bash
python3 -m http.server 8080
```

Lalu buka <http://localhost:8080>.

---

## Docker

Untuk menguji image production di mesin lokal:

```bash
docker build -t rizka-dental .
docker run --rm -p 8080:80 rizka-dental
```

Buka <http://localhost:8080>. Endpoint health check tersedia di <http://localhost:8080/healthz> dan akan membalas `ok`.

Alternatif dengan Docker Compose:

```bash
docker compose up --build
```

> Image saat ini hanya menyalin `index.html` dan `nginx.conf`. Jika Anda menambahkan folder aset lokal (misalnya `images/`), tambahkan baris `COPY` yang sesuai di `Dockerfile`, dan pastikan folder tersebut tidak masuk `.dockerignore`.

---

## Deploy ke Dokploy

1. Login ke Dokploy panel.
2. Pilih **New Application**, lalu pilih tipe **Docker / Dockerfile**.
3. **Source:** Git provider, dengan detail berikut:

   | Field | Nilai |
   |---|---|
   | Repository | `https://github.com/bochiers/rizka-drg.git` |
   | Branch | `main` |

4. **Build Type:** Dockerfile, dengan path `./Dockerfile`.
5. **Port:** `80`.
6. **Domain:** atur melalui menu Domains di Dokploy (HTTPS/SSL dapat diaktifkan dari sana).
7. Klik **Deploy**.

Setiap push ke branch `main` dapat memicu redeploy bila auto-deploy diaktifkan di Dokploy.

---

## Customization

Semua kustomisasi dilakukan di `index.html`.

### Warna

Palet didefinisikan di blok `tailwind.config` pada `<head>`:

```js
colors: {
  primary: { DEFAULT: '#0EA5A4', dark: '#0B7E7D' },
  secondary: '#60A5FA',
  accent: '#F4A28C',
  bg: '#F7FBFB',
  ink: '#0F172A',
  muted: '#475569',
}
```

Beberapa nilai HEX juga ditulis langsung di blok `<style>` (misalnya `.btn-primary`, `#scrollProgress`) dan di gradient SVG parallax. Setelah mengganti warna utama, cari dan ganti `#0EA5A4` serta `#0B7E7D` di seluruh file supaya konsisten.

### Copy (teks)

Teks ditulis langsung di markup, dalam Bahasa Indonesia. Gunakan "Anda" (bukan "kamu") agar sesuai voice brand di `DESIGN.md`. Lokasi yang umum diubah:

| Konten | Section |
|---|---|
| Headline & subhead | `#top` |
| Profil & statistik dokter | `#about` |
| Daftar layanan | `#services` (dan `<select>` di `#appointment`) |
| Jam praktek, telepon, WhatsApp | `#appointment` |
| Alamat, email, sosial media | `#contact` (footer) |

### Gambar

Ganti atribut `src` pada tag `<img>`:

```html
<img src="images/dokter.jpg" alt="Potret drg. Rizka Radihas Putri" loading="lazy" />
```

Gambar saat ini masih placeholder: foto dokter dari Unsplash, avatar dari `pravatar.cc`, dan before/after dari `picsum.photos` (gambar acak, bukan hasil perawatan nyata). Ganti dengan foto asli klinik, dengan persetujuan pasien untuk foto before/after.

### Parallax

Atur kecepatan layer lewat atribut `data-*`. Nilai negatif membuat layer bergerak berlawanan arah scroll:

```html
<svg class="parallax" data-parallax-speed="0.2" data-mouse="0.01" aria-hidden="true">...</svg>
```

### Peta

Ubah parameter `bbox` pada `<iframe>` OpenStreetMap di footer agar menunjuk ke lokasi klinik yang tepat.

### Hal yang perlu dituntaskan sebelum go-live

- Form janji temu belum terhubung ke backend: submit saat ini hanya menampilkan `alert()`. Hubungkan ke WhatsApp deep link, Formspree, atau API sendiri.
- Link sosial media di footer masih `href="#"`.
- Data kontak, statistik, dan testimoni masih berupa contoh dan perlu diverifikasi dengan pihak klinik.
- `DESIGN.md` belum sepenuhnya sinkron dengan `index.html` (misalnya warna primer biru vs teal, serta alamat dan email). Anggap `index.html` sebagai sumber kebenaran.
- Tailwind Play CDN tidak ideal untuk produksi; pertimbangkan Tailwind CLI bila performa menjadi prioritas.

---

## Credit

Dibuat untuk Rizka Dental Care.

© 2026 Rizka Dental Care. Semua hak dilindungi.
