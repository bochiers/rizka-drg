// ponytail: directive-free approach — one shared IO watches every .reveal el, mirrors the original vanilla JS.
export function useScrollReveal() {
  onMounted(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(el => io.observe(el))
  })
}
