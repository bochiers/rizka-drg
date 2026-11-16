<script setup lang="ts">
const items = [
  {
    quote: 'Pelayanannya ramah banget, dan hasil whitening-nya melebihi ekspektasi saya. Sekarang lebih berani senyum lebar!',
    name: 'Dinda P.',
    role: 'Pasien Whitening',
    avatar: 'https://i.pravatar.cc/80?u=dinda',
  },
  {
    quote: 'Anak saya yang tadinya takut ke dokter gigi, sekarang malah excited setiap kontrol. Terima kasih drg. Rizka dan tim!',
    name: 'Bapak Hendra S.',
    role: 'Orang Tua Pasien',
    avatar: 'https://i.pravatar.cc/80?u=hendra',
  },
  {
    quote: 'Proses pemasangan implan gigi saya berjalan lancar, minim rasa sakit, dan hasilnya sangat natural. Sangat direkomendasikan.',
    name: 'Siti Maryam',
    role: 'Pasien Implan',
    avatar: 'https://i.pravatar.cc/80?u=siti',
  },
]
</script>

<template>
  <section id="testimonials" class="py-20 md:py-28">
    <div class="max-w-6xl mx-auto px-6">
      <div class="reveal text-center max-w-2xl mx-auto">
        <span class="text-sm font-semibold text-primary-dark tracking-wide uppercase">Testimoni Pasien</span>
        <h2 class="mt-3 font-display text-4xl md:text-5xl font-bold text-ink">Kata Mereka Tentang Kami</h2>
        <p class="mt-4 text-muted text-lg">Kepercayaan pasien adalah prioritas utama kami.</p>
      </div>
      <div class="mt-14 grid md:grid-cols-3 gap-6">
        <figure v-for="(item, i) in items" :key="item.name" :style="{ '--d': `${i * 90}ms` }" class="reveal quote-card rounded-lg bg-white border border-hairline p-7 shadow-soft">
          <div class="star text-lg" aria-hidden="true">★★★★★</div>
          <blockquote class="mt-4 text-muted leading-relaxed">&ldquo;{{ item.quote }}&rdquo;</blockquote>
          <figcaption class="mt-5 flex items-center gap-3">
            <NuxtImg :src="item.avatar" :alt="`Foto ${item.name}`" class="w-11 h-11 rounded-full object-cover" loading="lazy" width="80" height="80" />
            <div>
              <div class="font-semibold text-ink text-sm">{{ item.name }}</div>
              <div class="text-xs text-muted">{{ item.role }}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
