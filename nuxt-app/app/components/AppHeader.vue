<script setup lang="ts">
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = (window.scrollY || window.pageYOffset) > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { href: '#about', label: 'Tentang' },
  { href: '#services', label: 'Layanan' },
  { href: '#gallery', label: 'Galeri' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#contact', label: 'Kontak' },
]
</script>

<template>
  <header
    id="nav"
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white/60 backdrop-blur"
    :class="{ 'nav-scrolled': scrolled }"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#top" class="flex items-center gap-2 font-display text-xl font-bold text-ink">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-md bg-primary text-white shadow-glow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M7 2c-2 0-3 1.8-3 4 0 1.6.6 3 .6 5 0 1.4-.6 2.5-.6 4 0 3.3 1.3 7 3 7 1.5 0 2-2.5 3-5 .5-1.2 1.2-1.7 2-1.7s1.5.5 2 1.7c1 2.5 1.5 5 3 5 1.7 0 3-3.7 3-7 0-1.5-.6-2.6-.6-4 0-2 .6-3.4.6-5 0-2.2-1-4-3-4-2.4 0-3 1.7-5 1.7S9.4 2 7 2z" /></svg>
        </span>
        Rizka Dental
      </a>
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-muted" aria-label="Navigasi utama">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link hover:text-primary-dark">{{ link.label }}</a>
      </nav>
      <a href="#appointment" class="hidden sm:inline-flex btn-primary px-4 py-2 rounded-full text-sm font-semibold">Buat Janji</a>
      <button
        class="md:hidden p-2 text-ink"
        aria-label="Buka menu navigasi"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
    </div>
    <div v-show="menuOpen" id="mobile-menu" class="md:hidden border-t border-hairline bg-white/95 backdrop-blur-xl">
      <div class="px-6 py-4 flex flex-col gap-3 text-sm font-medium">
        <a v-for="link in links" :key="link.href" :href="link.href" class="py-1" @click="menuOpen = false">{{ link.label }}</a>
        <a href="#appointment" class="btn-primary text-center px-4 py-2 rounded-full font-semibold" @click="menuOpen = false">Buat Janji</a>
      </div>
    </div>
  </header>
</template>
