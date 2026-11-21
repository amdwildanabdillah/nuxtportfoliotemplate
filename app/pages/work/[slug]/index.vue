<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import LayoutCards from '~/components/work/LayoutCards.vue'
import LayoutVideo from '~/components/work/LayoutVideo.vue'
import LayoutGallery from '~/components/work/LayoutGallery.vue'
import ProjectModal from '~/components/work/ProjectModal.vue'

const { site, profile } = usePortfolioConfig()
const portfolio = usePortfolio()
const route = useRoute()
const slug = computed(() => route.params.slug)

// --- MESIN PINTAR MEDIA (YT, MP4, WEBM) ---
const getVideoInfo = (url) => {
  if (!url) return { type: 'unknown', url: '' }
  // Kalau YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
    const id = (match && match[2].length === 11) ? match[2] : url
    return { 
      type: 'youtube', 
      id: id, 
      embedUrl: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=0`,
      thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    }
  }
  // Kalau File Video Mentah
  if (url.endsWith('.webm') || url.endsWith('.mp4')) return { type: 'video', url: url }
  // Fallback Link Biasa
  return { type: 'link', url: url }
}


const SITE = site.url

const isScrolled = ref(false)

// Data diambil di server (SSR): daftar karya sudah ada di HTML pertama,
// terbaca Google, dan halaman terasa jauh lebih cepat.
const loadCategoryData = async () => {
  const res = await portfolio.categoryWithProjects(slug.value)
  const list = res.projects.map(p => {
    const media = [...(p.project_media || [])].sort((a, b) => a.sort_order - b.sort_order)
    const vInfo = getVideoInfo(p.cover_url)
    return { ...p, gallery: media.map(m => m.media_url), videoInfo: vInfo,
      thumbnail: vInfo.type === 'youtube' ? vInfo.thumbnail : p.cover_url }
  })
  // Susunan acak ala Pinterest khusus foto
  if (layoutOf(res.currentCategory) === 'gallery') list.sort(() => Math.random() - 0.5)
  return { ...res, projects: list }
}

const { data: pageData, pending } = await useAsyncData(
  () => `work-${slug.value}`,
  loadCategoryData,
  { watch: [slug] }
)

if (!pageData.value?.currentCategory) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

const categories = computed(() => pageData.value?.categories || [])
const currentCategory = computed(() => pageData.value?.currentCategory || {})
const projects = computed(() => pageData.value?.projects || [])
const isLoading = computed(() => pending.value && !pageData.value)

const defaultDescs = {
  cards: 'A curated selection of projects and case studies.',
  video: 'Moving images and sound, one story at a time.',
  gallery: 'Single frames that say more than words can.',
}
const categoryDesc = computed(() =>
  currentCategory.value?.description || defaultDescs[layoutOf(currentCategory.value)] || 'A curated collection of works.')

const handleScroll = () => { isScrolled.value = window.scrollY > 60 }


useSeoMeta({
  title: () => `${currentCategory.value.name} | ${profile.name}`,
  description: () => categoryDesc.value,
  ogTitle: () => `${currentCategory.value.name} | ${profile.name}`,
  ogDescription: () => categoryDesc.value,
  ogUrl: () => `${SITE}/work/${slug.value}`,
  ogImage: `${SITE}${site.ogImage}`,
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: () => `${SITE}/work/${slug.value}` }] })

// Modal Logic
const activeProject = ref(null)
const currentImageIndex = ref(0)
const openModal = (project) => {
  // Kategori 'cards' punya halaman detail sendiri (URL tetap, bisa dibagikan dan diindeks)
  if (layoutOf(currentCategory.value) === 'cards' && project.slug) {
    return navigateTo(`/work/${slug.value}/${project.slug}`)
  }
  activeProject.value = project; currentImageIndex.value = 0; document.body.style.overflow = 'hidden'
}
const closeModal = () => { activeProject.value = null; document.body.style.overflow = 'auto' }
const nextImage = () => { if (activeProject.value?.gallery.length > 0) currentImageIndex.value = (currentImageIndex.value + 1) % activeProject.value.gallery.length }
const prevImage = () => { if (activeProject.value?.gallery.length > 0) currentImageIndex.value = (currentImageIndex.value - 1 + activeProject.value.gallery.length) % activeProject.value.gallery.length }
const setImage = (index) => { currentImageIndex.value = index }

const handleKeydown = (e) => {
  if (!activeProject.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  // Tautan lama / dari beranda (?p=<id>): buka detail proyek yang dimaksud
  const wanted = route.query.p
  if (wanted) {
    const target = projects.value.find(x => String(x.id) === String(wanted))
    if (target) openModal(target)
  }
})
onUnmounted(() => { 
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white relative overflow-x-hidden">
    
    <div class="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
    <div class="fixed top-0 right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(176,132,255,0.9)_0%,transparent_65%)] opacity-10 pointer-events-none rounded-none z-0"></div>

    <header class="fixed top-0 left-0 w-full z-[1000] transition-all duration-300" :class="isScrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl' : 'bg-transparent border-b border-transparent py-8 md:py-12'">
      <div class="w-full max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center transition-all duration-300 gap-4">
        
        <div class="flex items-center gap-4 md:gap-5">
          <NuxtLink to="/#work-section" class="inline-flex items-center gap-2 text-[#aaa] hover:text-white transition-colors duration-300 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-light group cursor-pointer shrink-0">
            <Icon name="ph:arrow-left" class="text-lg group-hover:-translate-x-1 transition-transform" /> 
            <span class="hidden sm:inline">Back to Home</span><span class="sm:hidden">Back</span>
          </NuxtLink>

          <div :class="isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none hidden'" class="flex items-center gap-4 md:gap-5 transition-all duration-300">
            <div class="w-px h-4 bg-white/20 hidden md:block"></div>
            <span class="text-white font-['Clash_Display'] text-base md:text-lg tracking-wide hidden md:block truncate">{{ currentCategory.name || 'Category' }}</span>
          </div>
        </div>

        <div class="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar">
          <NuxtLink v-for="cat in categories" :key="cat.id" :to="`/work/${cat.slug}`" class="px-4 py-2 text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border rounded-none cursor-pointer whitespace-nowrap" :class="slug === cat.slug ? 'border-[#b084ff] text-[#b084ff]' : 'border-white/10 text-[#666] hover:border-white/40 hover:text-white bg-transparent'">
            {{ cat.name }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="w-full max-w-6xl mx-auto z-10 relative px-6 md:px-12 pb-32 pt-36 md:pt-44">
      <div class="mb-16 md:mb-20 border-b border-white/10 pb-10 md:pb-12" data-aos="fade-up">
        <h1 class="text-5xl md:text-[5.5rem] font-['Clash_Display'] font-light text-white tracking-wide mb-4 transition-all duration-300">
          {{ isLoading ? 'Loading...' : (currentCategory.name || 'Category') }}.
        </h1>
        <p class="text-[#aaa] text-sm md:text-base font-light max-w-lg leading-relaxed transition-all duration-300">{{ categoryDesc }}</p>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <span class="text-[#b084ff] text-xs tracking-[0.2em] uppercase animate-pulse">Loading...</span>
      </div>

      <div v-else-if="projects.length > 0">
        <!-- LEMPAR PROPS KE MASING-MASING KOMPONEN -->
        <LayoutCards v-if="layoutOf(currentCategory) === 'cards'" :projects="projects" @open-modal="openModal" />
        <LayoutVideo v-else-if="layoutOf(currentCategory) === 'video'" :projects="projects" @open-modal="openModal" />
        <LayoutGallery v-else-if="layoutOf(currentCategory) === 'gallery'" :projects="projects" @open-modal="openModal" />
      </div>

      <div v-else class="text-[#888] text-center py-20 text-sm font-light">Nothing here yet.</div>
    </main>

    <Transition name="fade">
      <ProjectModal 
        v-if="activeProject" 
        :active-project="activeProject" 
        :current-image-index="currentImageIndex" 
        @close="closeModal" 
        @next="nextImage" 
        @prev="prevImage"
        @set-image="setImage"
      />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>