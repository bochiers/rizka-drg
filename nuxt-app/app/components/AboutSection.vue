<template>
  <section id="about" class="relative overflow-hidden py-20 md:py-28 bg-white">
    <svg class="parallax absolute inset-x-0 bottom-0 w-full h-64 opacity-60 pointer-events-none" data-parallax-speed="0.3" data-entry-blob viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <path fill="#60A5FA" fill-opacity="0.18" d="M0,160L60,170C120,180,240,200,360,197C480,193,600,165,720,165C840,165,960,193,1080,197C1200,200,1320,180,1380,170L1440,160L1440,320L0,320Z" />
    </svg>
    <div class="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
      <div class="reveal order-2 md:order-1">
        <span class="text-sm font-semibold text-primary-dark tracking-wide uppercase">Kenali Dokter Kami</span>
        <h2 class="mt-3 font-display text-4xl md:text-5xl font-bold text-ink">Perawatan dari Tangan yang Tepat</h2>
        <p class="mt-5 text-lg text-muted leading-relaxed">
          drg. Rizka Radihas Putri hadir dengan lebih dari 10 tahun pengalaman menangani perawatan gigi untuk seluruh keluarga.
        </p>
        <p class="mt-4 text-muted leading-relaxed">
          Dengan pendekatan yang hangat dan teknologi terkini, setiap pasien mendapat perhatian dan perawatan terbaik sesuai kebutuhannya.
        </p>
        <dl class="mt-8 grid grid-cols-3 gap-4">
          <div class="rounded-lg bg-surface-alt p-4 text-center">
            <dt class="font-display text-3xl font-bold text-primary-dark">10+</dt>
            <dd class="mt-1 text-xs text-muted">Tahun Pengalaman</dd>
          </div>
          <div class="rounded-lg bg-surface-alt p-4 text-center">
            <dt class="font-display text-3xl font-bold text-primary-dark">500+</dt>
            <dd class="mt-1 text-xs text-muted">Pasien Puas</dd>
          </div>
          <div class="rounded-lg bg-surface-alt p-4 text-center">
            <dt class="font-display text-3xl font-bold text-primary-dark">4.9/5</dt>
            <dd class="mt-1 text-xs text-muted">Rating Google</dd>
          </div>
        </dl>
        <ul class="mt-6 flex flex-wrap gap-2 text-xs">
          <li class="px-3 py-1.5 rounded-full bg-white border border-hairline text-muted">Lulusan FKG Universitas Indonesia</li>
          <li class="px-3 py-1.5 rounded-full bg-white border border-hairline text-muted">STR Aktif</li>
          <li class="px-3 py-1.5 rounded-full bg-white border border-hairline text-muted">10+ Tahun Pengalaman</li>
          <li class="px-3 py-1.5 rounded-full bg-white border border-hairline text-muted">500+ Pasien Puas</li>
        </ul>
      </div>
      <div class="reveal order-1 md:order-2 relative">
        <div class="relative mx-auto max-w-sm">
          <div class="absolute -inset-4 bg-gradient-to-br from-primary-light/40 to-accent/30 rounded-xl blur-2xl" aria-hidden="true"></div>
          <NuxtImg
            src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
            alt="Potret drg. Rizka Radihas Putri"
            class="relative rounded-xl shadow-soft w-full object-cover aspect-[4/5]"
            loading="lazy"
            width="800"
            height="1000"
          />
          <div class="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-soft p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
            </div>
            <div>
              <div class="text-xs text-muted">Terverifikasi</div>
              <div class="text-sm font-semibold text-ink">Konsil Kedokteran</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
