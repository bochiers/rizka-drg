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
