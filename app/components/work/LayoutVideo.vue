<script setup>
import { reactive } from 'vue'

defineProps({
  projects: { type: Array, required: true }
})

// EMIT FOR OPEN MODAL
const emit = defineEmits(['open-modal'])

const ytId = (url) => {
  const m = (url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]{11})/)
  return m ? m[1] : ''
}
const driveId = (url) => (url || '').match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || ''

// Embed hanya dibuat saat kartu diklik. Sebelumnya setiap kartu langsung memuat
// satu pemutar YouTube/Drive penuh, itulah yang membuat halaman ini lama.
const getSrc = (url, autoplay = false) => {
  if (!url) return ''
  const d = driveId(url)
  if (d) return `https://drive.google.com/file/d/${d}/preview`
  const y = ytId(url)
  if (y) return `https://www.youtube-nocookie.com/embed/${y}?rel=0${autoplay ? '&autoplay=1' : ''}`
  return url
}

// Gambar mini ringan (16:9) sebagai pengganti pemutar
const thumbFor = (url) => {
  const y = ytId(url)
  if (y) return `https://i.ytimg.com/vi/${y}/mqdefault.jpg`
  const d = driveId(url)
  if (d) return `https://drive.google.com/thumbnail?id=${d}&sz=w640`
  return ''
}

const playing = reactive({})
const play = (id) => { playing[id] = true }
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div v-for="video in projects" :key="video.id" class="bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col group rounded-none hover:border-white/30 transition-colors duration-300 shadow-lg" data-aos="fade-up">
      
      <!-- PEMUTAR: gambar mini dulu, iframe baru dimuat saat diklik -->
      <div class="relative w-full pb-[56.25%] bg-black border-b border-white/10">
        <iframe v-if="playing[video.id]" :src="getSrc(video.cover_url, true)" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen frameborder="0" title="Video preview" class="absolute inset-0 w-full h-full z-10"></iframe>
        <button v-else type="button" :aria-label="`Play video ${video.title}`" class="absolute inset-0 w-full h-full z-10 group/play cursor-pointer" @click="play(video.id)">
          <img v-if="thumbFor(video.cover_url)" :src="thumbFor(video.cover_url)" :alt="video.title" loading="lazy" decoding="async" width="320" height="180" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/play:opacity-100 transition-opacity duration-300" />
          <span class="absolute inset-0 flex items-center justify-center">
            <span class="w-14 h-14 rounded-full bg-[#050505]/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover/play:bg-[#b084ff] group-hover/play:border-[#b084ff] transition-colors duration-300">
              <Icon name="ph:play-fill" class="text-xl ml-0.5" />
            </span>
          </span>
        </button>
      </div>

      <!-- TEXT & BUTTON SECTION -->
      <div class="p-6 md:p-8 flex flex-col flex-1">
        <h3 class="text-2xl font-semibold font-['Clash_Display'] mb-2">{{ video.title }}</h3>
        <p class="text-xs text-[#b084ff] tracking-[0.2em] uppercase mb-8">{{ video.desc_short || 'Visual Story' }}</p>
        
        <!-- OPEN MODAL BUTTON -->
        <button @click="emit('open-modal', video)" class="mt-auto self-start bg-transparent border border-white/20 text-white hover:bg-white hover:text-black px-6 py-2.5 text-[9px] uppercase tracking-widest font-bold transition-colors duration-300 rounded-none cursor-pointer">
          Read Details
        </button>
      </div>

    </div>
  </div>
</template>