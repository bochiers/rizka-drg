<script setup lang="ts">
const services = [
  {
    title: 'Scaling Gigi',
    desc: 'Pembersihan karang gigi menyeluruh untuk napas segar dan gusi sehat.',
    iconBg: 'bg-primary/10 text-primary-dark',
    path: 'M12 3v3M8 7l-2 2M16 7l2 2M4 13h3M17 13h3M7 20c-2 0-3-2-3-4a7 7 0 0114 0c0 2-1 4-3 4-1.5 0-2-2-4-2s-2.5 2-4 2z',
  },
  {
    title: 'Veneer Gigi',
    desc: 'Lapisan tipis estetik untuk senyum yang lebih rapi dan putih alami.',
    iconBg: 'bg-accent/15 text-accent',
    path: 'M12 2l1.8 4.5L18 8l-3.5 3 1 5-3.5-2.5L8.5 16l1-5L6 8l4.2-1.5z',
  },
  {
    title: 'Behel (Kawat Gigi)',
    desc: 'Perawatan ortodontik untuk merapikan susunan gigi secara bertahap dan aman.',
    iconBg: 'bg-secondary/15 text-secondary',
    path: 'M3 12h18M7 8v8M12 6v12M17 8v8',
  },
  {
    title: 'Whitening Gigi',
    desc: 'Pemutihan gigi profesional untuk hasil cerah yang tahan lama.',
    iconBg: 'bg-primary/10 text-primary-dark',
    path: 'M12 3l1.6 3.6L17 8l-3.4 1.4L12 13l-1.6-3.6L7 8l3.4-1.4zM18 14l.8 1.8 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8zM6 15l.6 1.4L8 17l-1.4.6L6 19l-.6-1.4L4 17l1.4-.6z',
  },
  {
    title: 'Implan Gigi',
    desc: 'Solusi permanen pengganti gigi hilang dengan hasil menyerupai gigi asli.',
    iconBg: 'bg-accent/15 text-accent',
    path: 'M12 2v6M9 8h6M10 8l-1 10a3 3 0 006 0l-1-10',
  },
  {
    title: 'Gigi Anak (Pediatric)',
    desc: 'Perawatan gigi khusus anak dengan pendekatan lembut dan menyenangkan.',
    iconBg: 'bg-secondary/15 text-secondary',
    path: null, // uses custom child icon below
  },
]
</script>

<template>
  <section id="services" class="py-20 md:py-28">
    <div class="max-w-6xl mx-auto px-6">
      <div class="reveal text-center max-w-2xl mx-auto">
        <span class="text-sm font-semibold text-primary-dark tracking-wide uppercase">Layanan Kami</span>
        <h2 class="mt-3 font-display text-4xl md:text-5xl font-bold text-ink">Layanan Lengkap untuk Setiap Kebutuhan</h2>
        <p class="mt-4 text-muted text-lg">Dari perawatan rutin hingga estetik, semua kami tangani dengan standar klinis terbaik.</p>
      </div>
      <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(svc, i) in services"
          :key="svc.title"
          :style="{ '--d': `${(i % 3) * 90}ms` }"
          class="reveal svc-card rounded-lg bg-white border border-hairline p-7 shadow-soft"
        >
          <div :class="['w-12 h-12 rounded-md flex items-center justify-center', svc.iconBg]" aria-hidden="true">
            <svg v-if="svc.path" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path :d="svc.path" /></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><circle cx="12" cy="9" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <h3 class="mt-5 font-display text-xl font-semibold text-ink">{{ svc.title }}</h3>
          <p class="mt-2 text-sm text-muted leading-relaxed">{{ svc.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
