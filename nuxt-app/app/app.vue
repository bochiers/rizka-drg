<script setup lang="ts">
const progress = ref(0)

function onScroll() {
  const docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  progress.value = Math.min(1, Math.max(0, window.scrollY / docMax))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="antialiased">
    <div
      id="scroll-progress"
      role="progressbar"
      aria-label="Progres halaman"
      :aria-valuenow="Math.round(progress * 100)"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="{ transform: `scaleX(${progress})` }"
    ></div>
    <AppHeader />
    <NuxtPage />
  </div>
</template>
