FROM joseluisq/static-web-server:2-alpine

ENV SERVER_HOST=:: \
    SERVER_PORT=80 \
    SERVER_ROOT=/public \
    SERVER_COMPRESSION=true \
    SERVER_COMPRESSION_LEVEL=default \
    SERVER_SECURITY_HEADERS=true \
    SERVER_HEALTH=true \
    SERVER_CACHE_CONTROL_HEADERS=true \
    SERVER_LOG_LEVEL=info

COPY index.html /public/index.html

EXPOSE 80
