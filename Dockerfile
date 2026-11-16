# Nuxt SSG (nuxt generate) -> static nginx. Build context = repo root.
# Versi HTML statis lama diarsipkan di Dockerfile.html-backup.

# ---- Stage 1: builder ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY nuxt-app/package*.json ./
RUN npm ci
COPY nuxt-app/ .
RUN npm run generate

# ---- Stage 2: runtime ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.output/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
