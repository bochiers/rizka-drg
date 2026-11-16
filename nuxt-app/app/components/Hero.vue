<template>
  <section id="top" class="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
    <svg class="parallax absolute -top-24 -left-24 w-[520px] h-[520px] opacity-70 pointer-events-none" data-parallax-speed="0.2" data-mouse="0.01" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#A8E6CF" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#A8E6CF" stop-opacity="0" />
        </radialGradient>
      </defs>
      <path fill="url(#g1)" d="M421 92c54 36 100 85 108 143s-22 125-74 174-125 83-192 73-129-61-155-124 1-141 48-193S367 56 421 92z" />
    </svg>
    <svg class="parallax absolute -bottom-32 -right-24 w-[460px] h-[460px] opacity-60 pointer-events-none" data-parallax-speed="0.5" data-mouse="0.02" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="g2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FF8A65" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#FF8A65" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#g2)" />
    </svg>
    <!-- mid layers: faster decorative shapes, one reverse-drifting -->
    <svg class="parallax absolute top-40 right-[15%] w-24 h-24 opacity-80 pointer-events-none hidden md:block" data-parallax-speed="0.8" data-mouse="0.04" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="50,5 95,40 75,95 25,95 5,40" fill="#60A5FA" fill-opacity="0.35" stroke="#60A5FA" stroke-opacity="0.6" stroke-width="1.5" />
    </svg>
    <svg class="parallax absolute bottom-24 left-[12%] w-16 h-16 opacity-80 pointer-events-none hidden md:block" data-parallax-speed="0.75" data-mouse="0.03" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#2B6CB0" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="6 6" />
    </svg>
    <svg class="parallax absolute top-[30%] left-[18%] w-14 h-14 opacity-80 pointer-events-none hidden md:block" data-parallax-speed="-0.35" data-mouse="-0.035" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M50 6c3 22 9 31 30 34-21 3-27 12-30 34-3-22-9-31-30-34 21-3 27-12 30-34z" fill="#E8B94A" fill-opacity="0.18" stroke="#E8B94A" stroke-opacity="0.6" stroke-width="2" stroke-linejoin="round" />
      <circle cx="82" cy="80" r="5" fill="#FF8A65" fill-opacity="0.6" />
    </svg>

    <div class="relative max-w-6xl mx-auto px-6 text-center">
      <span class="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-alt text-primary-dark text-xs md:text-sm font-semibold tracking-wide">
        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
        Klinik Gigi Keluarga Terpercaya
      </span>
      <h1 class="reveal mt-6 font-display text-5xl md:text-7xl font-bold text-ink">
        Senyum Sehat<br />
        <span class="relative inline-block">
          <span class="relative z-10">Dimulai</span>
          <span class="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-accent/60 -z-0 rounded" aria-hidden="true"></span>
        </span>
        dari Sini.
      </h1>
      <p class="reveal mt-6 mx-auto max-w-2xl text-muted text-lg md:text-xl leading-relaxed">
        Rizka Dental Care menghadirkan perawatan gigi modern dengan sentuhan personal, untuk senyum yang sehat dan percaya diri di setiap tahap hidup Anda.
      </p>
      <div class="reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="#appointment" class="btn-primary px-7 py-3.5 rounded-full font-semibold shadow-glow">Buat Jadwal Konsultasi</a>
        <a href="#services" class="btn-ghost px-7 py-3.5 rounded-full font-semibold">Lihat Layanan Kami</a>
      </div>
      <div class="reveal mt-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur border border-hairline shadow-soft">
        <span class="star text-lg" aria-hidden="true">★★★★★</span>
        <span class="text-sm text-muted"><span class="font-semibold text-ink">4.9/5</span> dari 820+ ulasan pasien</span>
      </div>
    </div>
  </section>
</template>
