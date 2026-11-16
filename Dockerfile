# Nuxt SSG (nuxt generate) -> static-web-server. Build context = repo root.
# Traefik (dari Dokploy) handle routing + TLS, jadi runtime cuma serve static files.
# Versi HTML statis lama diarsipkan di Dockerfile.html-backup.

# ---- Stage 1: builder ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY nuxt-app/package*.json ./
RUN npm ci
COPY nuxt-app/ .
RUN npm run generate

# ---- Stage 2: runtime (static-web-server, ~5MB) ----
FROM joseluisq/static-web-server:2-alpine
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=80
ENV SERVER_ROOT=/public
ENV SERVER_FALLBACK_PAGE=/public/index.html
ENV SERVER_COMPRESSION=true
ENV SERVER_DIRECTORY_LISTING=false
ENV SERVER_LOG_LEVEL=info
COPY --from=builder /app/.output/public /public
EXPOSE 80
