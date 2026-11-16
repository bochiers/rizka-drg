// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/google-fonts'],
  googleFonts: {
    // self-hosted at build time -> no render-blocking request to fonts.googleapis.com at runtime
    families: {
      Fraunces: { wght: [500, 600, 700], opsz: '9..144' },
      'Plus Jakarta Sans': [400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
    preconnect: true,
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'Rizka Dental Care — Senyum Sehat, Percaya Diri Setiap Hari',
      meta: [
        { name: 'description', content: 'Klinik gigi premium di Jakarta. Scaling, pemutihan, veneer, behel, implan, perawatan anak. Konsultasi hangat oleh drg. Rizka Radihas Putri.' },
      ],
      link: [
        { rel: 'icon', href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='78' font-size='88'%3E%F0%9F%A6%B7%3C/text%3E%3C/svg%3E" },
      ],
    },
  },
  image: {
    // ponytail: static preset has no server for IPX optimization; passthrough plain <img>, add a CDN provider if resizing matters later.
    provider: 'none',
    domains: ['images.unsplash.com', 'i.pravatar.cc'],
  },
  nitro: {
    preset: 'static',
  },
})
