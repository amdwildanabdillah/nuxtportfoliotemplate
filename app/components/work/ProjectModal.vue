<script setup>
import { ref } from 'vue'
// Mengambil fungsi dari app/utils/techIcons.js
import { getTechDetails } from '~/utils/techIcons'

const props = defineProps({
  activeProject: { type: Object, required: true },
  currentImageIndex: { type: Number, default: 0 }
})

const emit = defineEmits(['close', 'prev', 'next', 'set-image'])

const getSrc = (type, url) => {
  if (!url) return ''
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match && match[1]) return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  if (type === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/)
    const videoId = match ? match[1] : url
    return `https://www.youtube.com/embed/${videoId}`
  }
  return url
}
</script>

<template>
  <div class="fixed inset-0 bg-[#050505]/95 z-[9999] flex items-center justify-center p-4 md:p-8" @click.self="emit('close')">
    <div class="w-full max-w-7xl bg-[#0a0a0a] border border-white/10 flex flex-col md:flex-row max-h-[90vh] overflow-hidden relative shadow-2xl rounded-none md:items-stretch">
      
      <!-- ADDITIONAL: aria-label="Tutup modal" -->
      <button aria-label="Tutup modal" @click="emit('close')" class="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-[#b084ff] bg-[#050505] border border-white/10 p-2 md:p-3 transition-all duration-300 z-50 rounded-none">
        <Icon name="ph:x" class="text-xl" />
      </button>

      <!-- LEFT COLUMN (GALLERY AREA) -->
      <div class="w-full md:w-[60%] border-b md:border-b-0 md:border-r border-white/10 flex flex-col flex-shrink-0 overflow-y-auto hide-scrollbar">
        <div class="relative w-full aspect-video bg-[#111] flex shrink-0 items-center justify-center group/slider">
          <template v-if="activeProject.cover_type === 'youtube' || activeProject.cover_type === 'drive'">
              <!-- ADDITIONAL: loading="lazy" dan title="Video demonstration" -->
              <iframe 
                :src="getSrc(activeProject.cover_type, activeProject.cover_url)" 
                allowfullscreen 
                frameborder="0" 
                loading="lazy"
                title="Video demonstration"
                class="w-full h-full border-none"
              ></iframe>
            </template>
            <template v-else>
              <!-- ADDITIONAL: :alt="activeProject.title" -->
              <img 
                :src="activeProject.gallery.length > 0 ? activeProject.gallery[currentImageIndex] : activeProject.cover_url" 
                alt="Project cover image"
                class="w-full h-full object-cover" 
              />
            </template>
          
          <div v-if="activeProject.gallery.length > 1" class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <!-- ADDITIONAL: aria-label="Gambar sebelumnya" -->
            <button aria-label="Gambar sebelumnya" @click="emit('prev')" class="bg-[#050505] hover:bg-[#b084ff] text-white p-3 transition-colors border border-white/10 rounded-none">
              <Icon name="ph:caret-left" class="text-xl" />
            </button>
            <!-- ADDITIONAL: aria-label="Gambar selanjutnya" -->
            <button aria-label="Gambar selanjutnya" @click="emit('next')" class="bg-[#050505] hover:bg-[#b084ff] text-white p-3 transition-colors border border-white/10 rounded-none">
              <Icon name="ph:caret-right" class="text-xl" />
            </button>
          </div>
        </div>

        <div v-if="activeProject.gallery.length > 1" class="p-6 flex gap-2 overflow-x-auto hide-scrollbar">
          <!-- ADDITIONAL: alt="Gallery thumbnail" -->
          <img v-for="(img, idx) in activeProject.gallery" :key="idx" :src="img" 
               @click="emit('set-image', idx)"
               alt="Gallery thumbnail"
               class="h-16 w-24 object-cover cursor-pointer transition-all duration-300 border-2 rounded-none shrink-0"
               :class="idx === currentImageIndex ? 'border-[#b084ff] opacity-100' : 'border-transparent opacity-40 hover:opacity-100'" />
        </div>
      </div>

      <!-- RIGHT COLUMN (TEXT DETAILS) -->
      <div class="w-full md:w-[40%] p-8 md:p-12 md:pt-16 flex flex-col overflow-y-auto hide-scrollbar relative">
        <h2 class="text-3xl md:text-5xl font-['Clash_Display'] font-normal mb-8">{{ activeProject.title }}</h2>
        
        <p v-if="activeProject.desc_long" class="text-[#aaa] font-light leading-relaxed mb-8 whitespace-pre-line text-sm">{{ activeProject.desc_long }}</p>
        <p v-else-if="activeProject.desc_short" class="text-[#aaa] font-light leading-relaxed mb-8 text-sm">{{ activeProject.desc_short }}</p>

        <!-- Bagian Actions & Tech Stack didorong ke bawah natural -->
        <div class="border-t border-white/10 pt-8 mt-auto flex flex-col gap-8">
          
          <div v-if="activeProject.live_url || activeProject.github_url" class="w-full">
            <span class="block text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Actions</span>
            <div class="flex flex-wrap gap-4">
              <a v-if="activeProject.live_url" :href="activeProject.live_url" target="_blank" class="inline-flex items-center gap-2 bg-[#b084ff] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors rounded-none border border-[#b084ff] hover:border-white">
                Visit Live Site <Icon name="ph:arrow-up-right" class="text-base" />
              </a>
              <a v-if="activeProject.github_url" :href="activeProject.github_url" target="_blank" class="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:border-white transition-colors rounded-none">
                <Icon name="ph:github-logo" class="text-lg" /> Repository
              </a>
            </div>
          </div>

          <div v-if="activeProject.tech_stack && activeProject.tech_stack.length > 0" class="w-full">
            <span class="block text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Tech Stack</span>
            <div class="flex flex-wrap gap-3">
              <div 
                v-for="t in activeProject.tech_stack" 
                :key="t" 
                class="bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] flex items-center gap-2 rounded-none" 
              >
                 <!-- SVG RENDER FROM DATASET IF USE SVG -->
                 <div v-if="getTechDetails(t).type === 'svg'" v-html="getTechDetails(t).content" class="flex items-center justify-center"></div>
                 
                 <span class="text-white">{{ t }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Ilangin wujud scrollbar tapi fungsinya tetep normal */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>