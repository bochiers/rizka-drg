<script setup lang="ts">
const submitted = ref(false)

function handleSubmit() {
  // ponytail: static-site form, no backend — swap to real submit endpoint if lead capture needed.
  submitted.value = true
}
</script>

<template>
  <section id="appointment" class="relative overflow-hidden py-20 md:py-28 bg-white">
    <svg class="parallax absolute -top-24 -right-24 w-[520px] h-[520px] opacity-70 pointer-events-none" data-parallax-speed="0.4" data-entry-blob viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="g3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FF8A65" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#FF8A65" stop-opacity="0" />
        </radialGradient>
      </defs>
      <path fill="url(#g3)" d="M380 95c58 32 115 76 128 134s-16 128-67 183-125 92-194 82-130-66-154-131 5-141 55-193 180-107 232-75z" />
    </svg>
    <svg class="parallax absolute -bottom-32 -left-32 w-[460px] h-[460px] opacity-60 pointer-events-none" data-parallax-speed="0.25" data-entry-blob viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="200" cy="200" r="200" fill="#A8E6CF" fill-opacity="0.3" />
    </svg>

    <div class="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
      <div class="reveal">
        <span class="text-sm font-semibold text-primary-dark tracking-wide uppercase">Buat Janji</span>
        <h2 class="mt-3 font-display text-4xl md:text-5xl font-bold text-ink">Siap untuk Senyum Lebih Sehat?</h2>
        <p class="mt-4 text-lg text-muted leading-relaxed">Jadwalkan konsultasi Anda hari ini dan rasakan perbedaannya.</p>

        <div class="mt-8 space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-md bg-primary/10 text-primary-dark flex items-center justify-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </div>
            <div>
              <div class="font-semibold text-ink">Jam Praktek</div>
              <div class="text-sm text-muted">Senin–Sabtu: 09.00–20.00 | Minggu: 10.00–16.00</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-md bg-primary/10 text-primary-dark flex items-center justify-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0122 16.9z" /></svg>
            </div>
            <div>
              <div class="font-semibold text-ink">Telepon &amp; WhatsApp</div>
              <div class="text-sm text-muted">+62 812-3456-7890</div>
            </div>
          </div>
        </div>
      </div>

      <form
        v-if="!submitted"
        class="reveal relative rounded-xl bg-white border border-hairline shadow-soft p-6 md:p-8 space-y-4"
        aria-label="Formulir buat jadwal konsultasi"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label class="text-sm font-medium text-ink" for="f-name">Nama Lengkap</label>
          <input id="f-name" type="text" required placeholder="Nama Anda" class="mt-1.5 w-full rounded-md border border-hairline bg-bg px-4 py-3 text-sm transition" />
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-ink" for="f-phone">Nomor WhatsApp</label>
            <input id="f-phone" type="tel" required placeholder="0812..." class="mt-1.5 w-full rounded-md border border-hairline bg-bg px-4 py-3 text-sm transition" />
          </div>
          <div>
            <label class="text-sm font-medium text-ink" for="f-date">Tanggal Preferensi</label>
            <input id="f-date" type="date" class="mt-1.5 w-full rounded-md border border-hairline bg-bg px-4 py-3 text-sm transition" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-ink" for="f-service">Layanan</label>
          <select id="f-service" class="mt-1.5 w-full rounded-md border border-hairline bg-bg px-4 py-3 text-sm transition">
            <option>Konsultasi Umum</option>
            <option>Scaling Gigi</option>
            <option>Veneer Gigi</option>
            <option>Behel (Kawat Gigi)</option>
            <option>Whitening Gigi</option>
            <option>Implan Gigi</option>
            <option>Gigi Anak (Pediatric)</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium text-ink" for="f-msg">Pesan (opsional)</label>
          <textarea id="f-msg" rows="3" placeholder="Ceritakan keluhan atau pertanyaan Anda..." class="mt-1.5 w-full rounded-md border border-hairline bg-bg px-4 py-3 text-sm transition"></textarea>
        </div>
        <button type="submit" class="btn-primary w-full px-6 py-3.5 rounded-full font-semibold shadow-glow">Booking Sekarang</button>
        <p class="text-xs text-muted text-center">Data Anda aman dan hanya digunakan untuk konfirmasi janji.</p>
      </form>

      <div v-else class="reveal rounded-xl bg-primary/10 border border-primary/20 p-8 text-center" role="status">
        <p class="font-display text-xl font-semibold text-ink">Terima kasih!</p>
        <p class="mt-2 text-muted">Tim kami akan menghubungi Anda via WhatsApp dalam 1 jam kerja.</p>
      </div>
    </div>
  </section>
</template>
