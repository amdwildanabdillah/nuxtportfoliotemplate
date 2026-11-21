<script setup>
const { profile } = usePortfolioConfig()
const props = defineProps({ error: { type: Object, required: true } })

const code = computed(() => String(props.error?.statusCode || 500))
const is404 = computed(() => code.value === '404')
const label = computed(() => (is404.value ? 'Frame not found.' : 'Render failed.'))
const message = computed(() => (is404.value
  ? 'The link you opened does not exist, or the project has moved.'
  : 'Something went wrong on our side. Please try again shortly.'))

useSeoMeta({ title: () => `${code.value} | ${profile.name}`, robots: 'noindex' })

const goTo = (path) => clearError({ redirect: path })
const links = [
  { label: 'Home', path: '/' },
  { label: 'Development', path: '/work/development' },
  { label: 'Videography', path: '/work/videography' },
  { label: 'Photography', path: '/work/photography' },
]
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center px-6">
    <!-- grid + cahaya -->
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_55%,transparent_100%)]"></div>
    <div class="absolute top-[-15%] left-[-10%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(176,132,255,0.9)_0%,transparent_65%)] opacity-25"></div>
    <div class="absolute bottom-[-15%] right-[-10%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.9)_0%,transparent_65%)] opacity-20"></div>

    <main class="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">

      <!-- Angka raksasa: kode error jadi "layer" yang sedang dipilih di editor -->
      <div class="relative px-8 md:px-16 py-4 md:py-6 mb-6 border border-[#b084ff]/60">
        <div class="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#050505] border border-[#b084ff]"></div>
        <div class="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#050505] border border-[#b084ff]"></div>
        <div class="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#050505] border border-[#b084ff]"></div>
        <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#050505] border border-[#b084ff]"></div>
        <span class="absolute -top-6 left-0 text-[9px] tracking-[0.25em] uppercase text-[#b084ff]" style="font-family: 'Clash Display', sans-serif;">layer_{{ code }}</span>

        <h1 class="m-0 leading-none select-none text-[7rem] sm:text-[10rem] md:text-[14rem] font-light tracking-tight bg-gradient-to-br from-white via-[#b084ff] to-[#00d2ff] bg-clip-text text-transparent" style="font-family: 'Clash Display', sans-serif;">
          {{ code }}
        </h1>
      </div>

      <!-- Kalimat dengan sorotan + kursor, sama seperti hero -->
      <p class="text-2xl md:text-4xl font-light tracking-wide mb-4" style="font-family: 'Clash Display', sans-serif;">
        <span class="relative inline-block bg-[#b084ff]/20 border border-[#b084ff]/50 px-4 py-1 rounded-[2px] shadow-[0_0_15px_rgba(176,132,255,0.15)]">
          {{ label }}
          <span class="absolute right-[10px] top-1/2 -translate-y-1/2 h-[65%] w-[2px] bg-[#b084ff] animate-[pulse_1s_ease-in-out_infinite]"></span>
        </span>
      </p>

      <p class="text-[#aaa] text-sm md:text-base font-light leading-relaxed max-w-md mb-10">{{ message }}</p>

      <!-- Jalan pintas -->
      <nav aria-label="Halaman yang tersedia" class="flex flex-wrap items-center justify-center gap-3">
        <button
          v-for="(l, i) in links"
          :key="l.path"
          type="button"
          class="px-6 py-3 text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
          :class="i === 0 ? 'bg-[#b084ff] text-[#050505] font-medium hover:bg-white' : 'border border-white/20 text-[#ccc] hover:border-[#b084ff] hover:text-white'"
          style="font-family: 'Clash Display', sans-serif;"
          @click="goTo(l.path)"
        >{{ l.label }}</button>
      </nav>
    </main>
  </div>
</template>
