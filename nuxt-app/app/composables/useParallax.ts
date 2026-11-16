// ponytail: attribute-driven port of the vanilla engine in /index.html (scroll + mouse + entry, lerped).
// Layers opt in with data-parallax-speed (+ optional data-mouse, data-entry-blob). Scroll progress bar lives in app.vue.
interface Layer {
  el: HTMLElement
  section: HTMLElement | null
  speed: number
  mouse: number
  entry: number
  isHero: boolean
  x: number
  y: number
  tx: number
  ty: number
}

export function useParallax() {
  let cleanup: (() => void) | undefined

  onMounted(() => {
    const LERP = 0.08
    const EPS = 0.05
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

    const layers: Layer[] = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax-speed]')).map((el) => {
      const section = el.closest('section') as HTMLElement | null
      return {
        el,
        section,
        speed: parseFloat(el.dataset.parallaxSpeed || '0') || 0,
        mouse: parseFloat(el.dataset.mouse || '0') || 0,
        entry: el.hasAttribute('data-entry-blob') ? 80 : 0,
        isHero: section?.id === 'top',
        x: 0, y: 0, tx: 0, ty: 0,
      }
    })
    if (!layers.length) return

    const metrics = new Map<HTMLElement, { top: number, h: number }>()
    let vh = window.innerHeight
    let vw = window.innerWidth
    let docMax = 1
    let mx = 0, my = 0, cmx = 0, cmy = 0
    let raf = 0
    let reduced = mq.matches
    let snap = true

    function measure() {
      vh = window.innerHeight
      vw = window.innerWidth
      docMax = Math.max(1, document.documentElement.scrollHeight - vh)
      const sy = window.scrollY
      metrics.clear()
      for (const l of layers) {
        if (!l.section || metrics.has(l.section)) continue
        const r = l.section.getBoundingClientRect()
        metrics.set(l.section, { top: r.top + sy, h: r.height })
      }
      kick()
    }

    function frame() {
      raf = 0
      const sy = window.scrollY
      let moving = false

      if (!reduced) {
        cmx = lerp(cmx, mx, LERP)
        cmy = lerp(cmy, my, LERP)
        if (Math.abs(mx - cmx) > EPS || Math.abs(my - cmy) > EPS) moving = true

        for (const l of layers) {
          const m = l.section && metrics.get(l.section)
          if (!m) continue
          let ty = 0
          let tx = 0
          if (l.isHero) {
            ty = (sy - m.top) * l.speed + cmy * l.mouse
            tx = cmx * l.mouse
          }
          else {
            const rel = clamp(sy + vh / 2 - (m.top + m.h / 2), -vh * 0.6, vh * 0.6)
            if (l.entry) {
              // entry: slides in from +entry px until the section is 60% into view, then drifts at `speed`
              const p = clamp((sy + vh - m.top) / (vh * 0.6), 0, 1)
              const rel1 = vh * 0.1 - m.h / 2
              const drift = clamp((sy + vh / 2 - (m.top + m.h / 2)) - rel1, -vh * 0.6, vh * 0.6)
              ty = l.entry * (1 - p) + drift * l.speed * p
            }
            else {
              ty = rel * l.speed
            }
          }
          l.tx = tx
          l.ty = ty
          if (snap) { l.x = tx; l.y = ty }
          else { l.x = lerp(l.x, tx, LERP); l.y = lerp(l.y, ty, LERP) }
          if (Math.abs(l.tx - l.x) > EPS || Math.abs(l.ty - l.y) > EPS) moving = true
          else { l.x = l.tx; l.y = l.ty }
          l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`
        }
      }
      snap = false
      if (moving) raf = requestAnimationFrame(frame)
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame) }

    function onMouse(e: MouseEvent) { mx = e.clientX - vw / 2; my = e.clientY - vh / 2; kick() }
    function onLeave() { mx = 0; my = 0; kick() }
    function applyMotionPref() {
      reduced = mq.matches
      if (reduced) {
        for (const l of layers) { l.x = l.y = l.tx = l.ty = 0; l.el.style.transform = '' }
        cmx = cmy = 0
      }
      kick()
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('load', measure)
    mq.addEventListener('change', applyMotionPref)
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null
    ro?.observe(document.body)

    measure()
    applyMotionPref()

    cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      mq.removeEventListener('change', applyMotionPref)
      ro?.disconnect()
    }
  })

  onUnmounted(() => cleanup?.())
}
