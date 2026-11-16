# DEPLOY-TROUBLESHOOT: Rizka Dental Care di Dokploy

Repo: https://github.com/bochiers/rizka-drg (branch `main`, satu file `index.html`)

## 0. Ringkasan

Error `lookup ghcr.io on 8.8.4.4:53: i/o timeout` terjadi karena dua hal yang bertumpuk:

1. Build Type di Dokploy = **Nixpacks**, padahal repo sudah punya `Dockerfile`.
2. Host Dokploy tidak bisa me-resolve `ghcr.io` (DNS ke 8.8.4.4 timeout).

Yang sudah saya verifikasi dari source code (bukan asumsi):

- Nixpacks meng-hardcode base image `ghcr.io/railwayapp/nixpacks:ubuntu-1745885067`
  (`src/nixpacks/images.rs`). Tidak ada opsi `nixpacks.toml` atau env var untuk
  menggantinya. **Jadi `nixpacks.toml` tidak bisa memperbaiki masalah ini.** Selama
  Build Type = Nixpacks dan `ghcr.io` tidak terjangkau, build pasti gagal.
- Dokploy punya Build Type `static` (enum: `dockerfile`, `heroku_buildpacks`,
  `paketo_buildpacks`, `nixpacks`, `static`, `railpack`). Tipe ini TIDAK bebas Docker.
  Ia membuat Dockerfile otomatis: `FROM nginx:alpine` + `COPY <publishDirectory> .`.
  Jadi dependensinya sama dengan Dockerfile kita: image `nginx` dari Docker Hub.
- Karena build sampai tahap pull base image, `git clone` dari github.com berhasil.
  Berarti resolusi DNS hanya gagal/flaky untuk sebagian domain, atau hanya untuk ghcr.io.

Tidak ada jalur yang 100% tanpa jaringan. Jalur terbaik adalah yang hanya butuh
**satu** registry (Docker Hub, `nginx:alpine`) dan **nol** perubahan kode.

## 1. Opsi dari sisi kode

| # | Opsi | Perlu ghcr.io? | Perlu Docker Hub? | Perubahan kode |
|---|------|----------------|-------------------|----------------|
| A | Build Type **Dockerfile** (sudah ada di repo) | Tidak | Ya (`nginx:1.27-alpine`) | Tidak ada |
| B | Build Type **Static** | Tidak | Ya (`nginx:alpine`) | Opsional (lihat catatan keamanan) |
| C | **Compose** + `build: .` | Tidak | Ya | Ubah `docker-compose.yml` |
| D | Compose + image pre-built | Tergantung registry | Ya jika di Docker Hub | CI + file compose |
| E | Nixpacks + `nixpacks.toml` | **Ya (tidak bisa dihindari)** | Tidak | Tidak membantu |
| F | Railpack | Belum terverifikasi | Belum terverifikasi | Tidak disarankan |

Catatan per opsi:

- **B, catatan keamanan:** Dokploy menulis ulang `.dockerignore` miliknya sendiri
  (`.git`, `.env`, `Dockerfile`, `.dockerignore`), sehingga `.dockerignore` repo diabaikan.
  Dengan Publish Directory `.`, file `README.md`, `DESIGN.md`, dan `docker-compose.yml`
  ikut masuk web root dan bisa diakses publik. Jika memakai Static, pindahkan situs ke
  `public/index.html` dan isi Publish Directory = `public`.
- **D:** Pre-built image tidak menghapus kebutuhan jaringan. Host tetap harus pull
  image-nya. GHCR tidak bisa dipakai (host tidak bisa me-resolve `ghcr.io`). Docker Hub
  bisa, tetapi butuh akun, CI, dan token. Terlalu banyak bagian bergerak untuk satu file HTML.
- **E:** Kalaupun ghcr.io terjangkau, Nixpacks mendeteksi `index.html` lewat provider
  `staticfile` dan memasang nginx via Nix, jadi tetap berat. `nixpacks.toml` tidak diperlukan.

## 2. Rekomendasi (urut dari yang paling sedikit titik gagalnya)

1. **Build Type = Dockerfile** (opsi A). Tanpa perubahan kode. Hanya `nginx:1.27-alpine`
   yang dipakai, dan hanya `index.html` yang masuk image (tidak ada kebocoran file lain).
2. **Build Type = Static** (opsi B), jika Dockerfile tidak mau dipakai. Pindahkan ke `public/`.
3. **Compose + `build: .`** (opsi C). Lebih banyak konfigurasi (jaringan, label Traefik).
4. Pre-built image (opsi D). Hanya jika build di host benar-benar tidak mungkin.

Apa pun pilihannya, **perbaiki DNS host dulu (bagian 5)**. Tanpa itu, pull `nginx`
dari Docker Hub juga berisiko timeout dengan cara yang sama.

## 3. File yang diubah/ditambah

Untuk rekomendasi #1: **tidak ada**. `Dockerfile` saat ini sudah benar:

```dockerfile
FROM nginx:1.27-alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Opsional (hanya bila memilih Static, opsi #2):

```text
rizka-compro/
└── public/
    └── index.html      # pindahkan dari root: git mv index.html public/index.html
```

Jika memindahkan, sesuaikan Dockerfile agar opsi #1 tetap berfungsi:

```dockerfile
COPY public/index.html /usr/share/nginx/html/index.html
```

Opsional (hanya bila memilih Compose, opsi #3). Simpan sebagai `docker-compose.dokploy.yml`
(file `docker-compose.yml` lama dibiarkan untuk dev lokal). Port host dan `container_name`
dihapus agar tidak bentrok dengan Traefik. Domain diatur lewat tab Domains Dokploy
(service `web`, port 80), tanpa label manual:

```yaml
services:
  web:
    build: .
    restart: unless-stopped
    expose:
      - "80"
```

Tidak perlu: `nixpacks.toml`, `Staticfile`, atau `railpack.json`.

## 4. Isian UI Dokploy (rekomendasi #1: Dockerfile)

Application > tab **General**:

| Bagian | Field | Nilai |
|--------|-------|-------|
| Provider (Git/GitHub) | Repository | `rizka-drg` (owner `bochiers`), atau Git URL `https://github.com/bochiers/rizka-drg.git` |
| Provider | Branch | `main` |
| Provider | Build Path | `/` |
| **Build Type** | Build Type | **Dockerfile** (bukan Nixpacks) |
| Build Type | Dockerfile Path | `Dockerfile` |
| Build Type | Docker Context Path | `.` |
| Build Type | Docker Build Stage | (kosongkan) |

Klik **Save** setelah mengganti Build Type, lalu **Deploy**. Mengganti tipe tanpa Save
membuat deploy tetap memakai Nixpacks.

Application > tab **Domains** > Add Domain:

| Field | Nilai |
|-------|-------|
| Host | domain Anda, misal `rizka.contoh.com` (A record sudah menunjuk ke IP server) |
| Path | `/` |
| Container Port | `80` |
| HTTPS | on |
| Certificate | Let's Encrypt |

Application > tab **Advanced > Ports**: kosongkan. Port host tidak diperlukan, Traefik
mengakses container lewat jaringan internal.

Jika memilih Static: Build Type = **Static**, Publish Directory = `public`,
Is Static SPA = off, Container Port tetap `80`.

## 5. Perbaikan DNS di host Dokploy (butuh shell)

Pull image dilakukan oleh `dockerd` di host, memakai resolver **host**, bukan
`daemon.json` `"dns"` (itu hanya untuk isi container). Karena itu perbaiki resolver host:

```bash
# systemd-resolved (Ubuntu/Debian modern):
sudo resolvectl dns $(ip route show default | awk '{print $5; exit}') 1.1.1.1 9.9.9.9 && sudo systemctl restart docker
```

Verifikasi sebelum deploy ulang:

```bash
getent hosts ghcr.io registry-1.docker.io   # keduanya harus mengembalikan IP
docker pull nginx:1.27-alpine               # pre-pull, deploy berikutnya memakai cache
```

Jika `resolvectl` tidak ada, edit `/etc/resolv.conf` (atau `/etc/systemd/resolved.conf`
`DNS=1.1.1.1 9.9.9.9`). Jika tetap timeout, kemungkinan firewall provider memblokir
UDP/53 keluar ke 8.8.4.4. Coba resolver lain (1.1.1.1, 9.9.9.9) atau resolver bawaan
provider VPS. Untuk isi container saat build (`RUN` step), set juga
`/etc/docker/daemon.json` `{"dns":["1.1.1.1","9.9.9.9"]}`. Tidak diperlukan untuk
Dockerfile kita karena tidak ada `RUN` yang mengunduh sesuatu.

## 6. Checklist cepat

1. Perbaiki DNS host, `docker pull nginx:1.27-alpine` berhasil.
2. Dokploy: Build Type = Dockerfile, Save.
3. Domains: Container Port 80, HTTPS on, Let's Encrypt.
4. Deploy, lalu cek tab Deployments untuk log build.
5. `curl -I https://domain-anda/` mengembalikan `200`.

Belum diuji: Docker daemon di mesin saya tidak berjalan, jadi build image belum dijalankan
secara lokal. Klaim tentang Dokploy dan Nixpacks berasal dari source code dan dokumentasi
resmi masing-masing, bukan dari server Anda.

---

## 7. Nuxt SSG deploy di Dokploy

Repo punya dua app: `index.html` statis (arsip: `Dockerfile.html-backup`,
`docker-compose.html-backup.yml`) dan versi Nuxt di `nuxt-app/` (static generate,
`nitro.preset = 'static'`). `Dockerfile` + `docker-compose.yml` di root sekarang
mengarah ke versi **Nuxt**. Bagian 0-6 di atas masih berlaku untuk DNS host dan isian UI Dokploy.

### 7.1 Flow build 2-stage

```text
repo root (context ".")
 ├─ Stage 1 builder  node:20-alpine
 │    COPY nuxt-app/package*.json  -> npm ci
 │    COPY nuxt-app/ .             -> npm run generate   => /app/.output/public
 └─ Stage 2 runtime  nginx:alpine
      COPY nginx.conf              -> /etc/nginx/conf.d/default.conf
      COPY --from=builder /app/.output/public -> /usr/share/nginx/html
      EXPOSE 80, CMD nginx -g "daemon off;"
```

Image akhir hanya berisi nginx + file statis. Node dan `node_modules` tidak ikut.
`.dockerignore` membuang `node_modules`, `.output`, `.nuxt` (root dan `nuxt-app/`) supaya
build lokal yang basi tidak menimpa hasil build di container.

### 7.2 Port mapping

| Lokasi | Port | Catatan |
|--------|------|---------|
| Container (nginx) | 80 | `EXPOSE 80`, `listen 80` di `nginx.conf` |
| Compose lokal | `80:80` | akses `http://localhost/` |
| Dokploy + Traefik | 80 (internal) | Traefik mengakses lewat `loadbalancer.server.port=80` |

Di Dokploy, kalau port host 80 sudah dipakai Traefik, `ports: "80:80"` akan bentrok
(`port is already allocated`). Hapus blok `ports` untuk deploy lewat Traefik (pakai
`expose: ["80"]`), atau ganti `8080:80` untuk tes lokal.

### 7.3 Traefik labels (docker-compose.yml)

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.rizka-dental.rule=Host(`${DOMAIN:-rizka.example.com}`)"
  - "traefik.http.routers.rizka-dental.entrypoints=web"
  - "traefik.http.services.rizka-dental.loadbalancer.server.port=80"
```

- Set env `DOMAIN` di Dokploy (tab Environment) ke domain asli.
- HTTPS: uncomment 3 baris `-secure` di compose (entrypoint `websecure`, certresolver
  `letsencrypt`). Nama certresolver harus sama dengan yang ada di Traefik Dokploy
  (cek `/etc/dokploy/traefik/traefik.yml`). Cara paling sedikit risikonya: pakai tab
  **Domains** Dokploy (HTTPS on, Let's Encrypt) dan buang label manual.
- Router dan service Traefik harus unik per app. Ganti `rizka-dental` kalau ada app lain.
- Container harus ada di network yang sama dengan Traefik (`dokploy-network`). Mode Compose
  Dokploy menambahkannya otomatis. Kalau 502/504, cek network ini dulu.

### 7.4 Isian Dokploy

- **Application**: Build Type = Dockerfile, Dockerfile Path = `Dockerfile`, Docker Context
  Path = `.`, Container Port = 80.
- **Compose**: Compose Path `docker-compose.yml`, service `web`.

### 7.5 Env vars

Build ini static, tidak ada server Node saat runtime, jadi tidak ada env var wajib.
`NUXT_PUBLIC_*` harus tersedia **saat build** (ARG di builder atau Build Args Dokploy),
bukan saat runtime, karena sudah jadi file statis.

### 7.6 Troubleshoot error umum

**a. `COPY --from=builder /app/.output/public` gagal: `not found` / missing `.output`**

- Penyebab: `npm run generate` tidak menghasilkan `.output/public`, atau path salah.
- Cek: `nuxt-app/nuxt.config.ts` harus `nitro.preset: 'static'` dan script `generate` ada
  di `package.json`. Output Nuxt 3/4 selalu `.output/public`.
- Cek log tahap builder (`npm run generate`). Error di tahap itu biasanya jadi akar masalah,
  dan pesan COPY hanya gejala.
- `npm ci` gagal `package-lock.json not found` / out of sync: commit `nuxt-app/package-lock.json`
  yang cocok dengan `package.json`.
- Jangan COPY `.output` dari host. `.dockerignore` sengaja membuangnya.
- Build kehabisan memori (exit 137, `Killed`): naikkan RAM/swap host.
- Tes lokal: `docker build --target builder -t t . && docker run --rm t ls .output/public`.

**b. Nginx 404 / SPA fallback tidak jalan**

- Gejala: buka `/` normal, refresh di `/path` 404.
- Cek `nginx.conf` ikut ter-copy: `docker exec <c> cat /etc/nginx/conf.d/default.conf`
  harus berisi `try_files $uri $uri/ /index.html;`.
- Kalau isinya default nginx, `COPY nginx.conf` hilang atau `nginx.conf` kena `.dockerignore`.
- Tes config: `docker exec <c> nginx -t`.
- Halaman kosong tapi 200: `/usr/share/nginx/html` kosong. `docker exec <c> ls /usr/share/nginx/html`.
- 404 untuk `/_nuxt/*.js`: itu tanda asset hash lama dicari browser yang masih cache HTML lama.
  `location /_nuxt/` sengaja `=404` supaya tidak diganti `index.html`. Hard refresh, dan
  pastikan `index.html` tidak di-cache (lihat c).
- Nuxt `generate` membuat `/path/index.html` per route, jadi `$uri/` sudah cukup untuk
  route yang di-prerender. Fallback `/index.html` untuk route yang tidak di-prerender.

**c. Cache busting**

- `/_nuxt/*`: nama file berisi hash konten, di-set `Cache-Control: public, immutable` 1 tahun.
  Aman karena build baru = nama file baru.
- `index.html`: `no-cache` supaya browser selalu revalidate dan mengambil referensi hash terbaru.
- Cek: `curl -sI http://localhost/_nuxt/<file>.js | grep -i cache-control` dan
  `curl -sI http://localhost/ | grep -i cache-control`.
- Kalau user masih lihat versi lama: cek CDN/Cloudflare (purge), dan pastikan Dokploy
  benar-benar rebuild (Deploy, bukan Restart). Restart memakai image lama.
- Asset di `public/` (bukan `_nuxt`) tidak di-hash. Kalau diubah dengan nama sama, ganti
  nama file atau tambah query `?v=`.

**d. Lain-lain**

- `port is already allocated` di 80: lihat 7.2.
- 502/504 dari Traefik: container belum healthy, network salah, atau port label bukan 80.
  `docker ps` harus menunjukkan `healthy`. Healthcheck memakai `wget --spider http://localhost/`;
  di `nginx:alpine` `wget` (busybox) tersedia.
- Router tidak ketemu (404 dari Traefik): `Host(...)` tidak sama dengan domain, atau `DOMAIN` belum di-set.
- Pull image timeout (`node:20-alpine` / `nginx:alpine`): masalah DNS host, lihat bagian 5.

### 7.7 Checklist cepat

1. DNS host beres (bagian 5). Build butuh pull `node:20-alpine` dan `nginx:alpine`.
2. `nuxt-app/package-lock.json` ter-commit.
3. Set `DOMAIN` di Dokploy. Putuskan pakai `ports` atau tidak (lihat 7.2).
4. Deploy, cek log tahap `npm run generate`.
5. `curl -I https://domain-anda/` mengembalikan `200`.

Belum diuji: `docker build` belum dijalankan untuk konfigurasi ini (menunggu `nuxt-app/` siap).
