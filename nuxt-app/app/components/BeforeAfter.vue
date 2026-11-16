<script setup lang="ts">
const pairs = [
  {
    before: { src: 'https://images.unsplash.com/photo-1595003500447-88d5e0ac60a1?w=800&q=80', alt: 'Sebelum whitening' },
    after: { src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80', alt: 'Sesudah whitening' },
    caption: 'Whitening in-office — warna A3 → B1.',
  },
  {
    before: { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80', alt: 'Sebelum veneer' },
    after: { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80', alt: 'Sesudah veneer' },
    caption: 'Veneer 6 gigi depan — chipping & diastema terkoreksi.',
  },
  {
    before: { src: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80', alt: 'Sebelum scaling' },
    after: { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80', alt: 'Sesudah scaling' },
    caption: 'Scaling berat + polishing — bebas kalkulus & noda.',
  },
  {
    before: { src: 'https://images.unsplash.com/photo-1561578264-48e35b99ff01?w=800&q=80', alt: 'Sebelum behel' },
    after: { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80', alt: 'Sesudah behel' },
    caption: 'Behel self-ligating 14 bulan — crowding selesai.',
  },
]
</script>

<template>
  <section id="gallery" class="py-20 md:py-28 bg-surface-alt/50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="reveal text-center max-w-2xl mx-auto">
        <span class="text-sm font-semibold text-primary-dark tracking-wide uppercase">Before / After</span>
        <h2 class="mt-3 font-display text-4xl md:text-5xl font-bold text-ink">Hasil Nyata, Bukan Sekadar Promosi</h2>
        <p class="mt-4 text-muted text-lg">Lihat transformasi senyum pasien kami setelah menjalani perawatan di Rizka Dental Care.</p>
      </div>
      <div class="mt-14 grid md:grid-cols-2 gap-8">
        <figure v-for="(pair, i) in pairs" :key="pair.caption" class="reveal ba-card" :style="{ '--d': `${(i % 2) * 100}ms` }">
          <div class="grid grid-cols-2 rounded-xl overflow-hidden shadow-soft bg-white">
            <div class="relative">
              <NuxtImg :src="pair.before.src" :alt="pair.before.alt" class="ba-img" loading="lazy" width="800" height="600" />
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-ink/80 text-white">Sebelum</span>
            </div>
            <div class="relative">
              <NuxtImg :src="pair.after.src" :alt="pair.after.alt" class="ba-img" loading="lazy" width="800" height="600" />
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-white">Sesudah</span>
            </div>
          </div>
          <figcaption class="mt-3 text-sm text-muted">{{ pair.caption }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
