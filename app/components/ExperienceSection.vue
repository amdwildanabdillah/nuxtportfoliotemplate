<script setup>
// Data: site.config.ts (mode local) atau tabel `experiences` (mode supabase). Lihat usePortfolio().experiences
const { experience: cfg } = usePortfolioConfig()
const { data: items } = await useAsyncData('experiences', usePortfolio().experiences, { default: () => [] })

const groups = computed(() => EXPERIENCE_KINDS
  .map(k => ({ ...k, label: cfg.kinds?.[k.value] || k.label, rows: items.value.filter(e => e.kind === k.value) }))
  .filter(g => g.rows.length))

const pad = (n) => String(n).padStart(2, '0')

// Tautan yang menunjuk ke gambar dibuka sebagai pop-up (bukan tab baru)
const isImg = (u) => !!u && /\.(png|jpe?g|webp|gif|avif)(\?|#|$)/i.test(u) || /\/storage\/v1\/object\/public\//i.test(u || '')
const box = ref(null)
const openProof = (ev, url, title) => {
  if (!isImg(url)) return
  ev.preventDefault()
  box.value = { src: url, title }
}
const closeBox = () => { box.value = null }
const onKey = (e) => { if (e.key === 'Escape') closeBox() }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
watch(box, (v) => { if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '' })
</script>

<template>
  <section id="experience-section" class="w-full relative overflow-hidden px-4 md:px-8 py-20 md:py-28">
    <!-- latar -->
    <div class="absolute left-[-8%] top-[10%] w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.9)_0%,transparent_65%)] opacity-10 pointer-events-none z-0"></div>
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0"></div>

    <div class="relative z-10 w-full max-w-6xl mx-auto">
      <!-- Judul -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14" data-aos="fade-up">
        <div>
          <span class="block text-[9px] md:text-[11px] font-['Clash_Display'] font-semibold text-[#b084ff] uppercase tracking-[0.25em] mb-3">{{ cfg.eyebrow }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-['Clash_Display'] font-light leading-tight text-white tracking-wide m-0">
            {{ cfg.titleBefore }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b084ff] to-[#00d2ff]">{{ cfg.titleHighlight }}</span>
          </h2>
        </div>
        <a v-if="cfg.resumeUrl" :href="cfg.resumeUrl" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-[#aaa] hover:text-white transition-colors text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-light shrink-0">
          {{ cfg.resumeLabel }}
          <Icon name="ph:arrow-up-right" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <!-- Kelompok -->
      <div v-for="g in groups" :key="g.value" class="mb-12 last:mb-0 md:mb-16">
        <h3 class="m-0 mb-4 text-[10px] md:text-[11px] font-['Clash_Display'] font-semibold text-white/50 uppercase tracking-[0.3em]" data-aos="fade-right">{{ g.label }}</h3>

        <ol class="m-0 list-none border-b border-white/10 p-0">
          <li v-for="(e, i) in g.rows" :key="e.id" class="grid grid-cols-12 gap-x-4 gap-y-2 border-t border-white/10 py-6 md:py-7" data-aos="fade-up">
            <span class="col-span-2 md:col-span-1 text-[10px] tracking-[0.2em] text-white/30 font-['Clash_Display']">{{ pad(i + 1) }}</span>
            <span class="col-span-10 md:col-span-3 text-[10px] md:text-[11px] tracking-[0.2em] text-[#b084ff] font-['Clash_Display'] font-medium">{{ formatPeriod(e, cfg.nowLabel) }}</span>

            <div class="col-span-12 md:col-span-8 flex items-start gap-4">
              <!-- Logo / monogram -->
              <span class="mt-0.5 flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center overflow-hidden border border-white/15 bg-white/5" aria-hidden="true">
                <NuxtImg v-if="experienceLogo(e).type === 'img'" :src="experienceLogo(e).src" alt="" width="96" loading="lazy" class="h-full w-full object-contain p-1.5" />
                <span v-else class="flex h-full w-full items-center justify-center bg-[#b084ff]/15 text-[13px] text-[#b084ff] font-['Clash_Display'] font-semibold tracking-wide">{{ experienceLogo(e).text }}</span>
              </span>

              <div class="min-w-0 flex-1">
                <h4 class="m-0 text-xl md:text-2xl font-['Clash_Display'] font-light text-white leading-tight tracking-wide">{{ e.title }}</h4>
                <p v-if="e.organization || e.location" class="m-0 mt-2 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#888]">
                  {{ e.organization }}<template v-if="e.location"> &middot; {{ e.location }}</template>
                </p>
                <p v-if="e.description" class="m-0 mt-3 max-w-2xl text-[12px] md:text-[13px] font-light leading-[1.8] text-[#aaa] whitespace-pre-line">{{ e.description }}</p>

                <!-- Bukti: gambar sertifikat dan/atau tautan -->
                <div v-if="e.image_url || e.link_url" class="mt-4 flex flex-wrap items-center gap-4">
                  <a v-if="e.image_url" :href="e.image_url" target="_blank" rel="noopener noreferrer" @click="openProof($event, e.image_url, e.title)" class="group block overflow-hidden border border-white/15 bg-white/5" :aria-label="`View image: ${e.title}`">
                    <NuxtImg :src="e.image_url" :alt="e.title" width="240" loading="lazy" class="block h-20 md:h-24 w-auto max-w-[200px] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </a>
                  <a v-if="e.link_url" :href="e.link_url" target="_blank" rel="noopener noreferrer" @click="openProof($event, e.link_url, e.title)" class="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#b084ff] hover:text-white transition-colors">
                    {{ e.kind === 'certificate' ? 'Verify' : 'Open link' }} <Icon name="ph:arrow-up-right-bold" />
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="box" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/95 p-4 backdrop-blur-sm md:p-10" role="dialog" aria-modal="true" :aria-label="box.title" @click.self="closeBox">
        <button type="button" aria-label="Close" class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/25 bg-[#050505]/80 text-white transition-colors hover:bg-[#b084ff] md:right-8 md:top-8" @click="closeBox"><Icon name="ph:x" class="text-xl" /></button>
        <figure class="m-0 flex max-h-full max-w-5xl flex-col items-center gap-3">
          <img :src="box.src" :alt="box.title" class="max-h-[80svh] w-auto max-w-full border border-white/20 bg-white object-contain" />
          <figcaption class="text-[10px] tracking-[0.2em] uppercase text-white/70">{{ box.title }}</figcaption>
        </figure>
      </div>
    </Teleport>
  </section>
</template>
