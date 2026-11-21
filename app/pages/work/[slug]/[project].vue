<script setup>
import { getTechDetails } from '~/utils/techIcons'

const { site, profile, nav } = usePortfolioConfig()
const portfolio = usePortfolio()
const route = useRoute()
const SITE = site.url
const catSlug = computed(() => route.params.slug)
const projectSlug = computed(() => route.params.project)

// Diambil di server: isi project ada di HTML pertama dan punya meta sendiri
const { data } = await useAsyncData(
  () => `project-${catSlug.value}-${projectSlug.value}`,
  () => portfolio.project(catSlug.value, projectSlug.value),
  { watch: [catSlug, projectSlug] }
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project tidak ditemukan', fatal: true })
}

const cat = computed(() => data.value?.cat || {})
const project = computed(() => data.value?.project || {})
const url = computed(() => `${SITE}/work/${catSlug.value}/${projectSlug.value}`)
const summary = computed(() => project.value.desc_short || `Project ${cat.value.name} by ${profile.name}.`)
const isImageCover = computed(() => !['youtube', 'drive'].includes(project.value.cover_type))
const extraImages = computed(() => (project.value.gallery || []).filter(u => u !== project.value.cover_url))
const isVideoFile = (u) => /\.(mp4|webm)(\?|$)/i.test(u || '')

const embedSrc = computed(() => {
  const u = project.value.cover_url || ''
  const d = u.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1]
  if (d) return `https://drive.google.com/file/d/${d}/preview`
  const y = u.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]{11})/)?.[1]
  return y ? `https://www.youtube-nocookie.com/embed/${y}?rel=0` : ''
})

useSeoMeta({
  title: () => `${project.value.title} | ${profile.name}`,
  description: () => summary.value,
  ogTitle: () => project.value.title,
  ogDescription: () => summary.value,
  ogUrl: () => url.value,
  ogImage: () => (isImageCover.value && project.value.cover_url) || `${SITE}${site.ogImage}`,
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: () => url.value }],
  script: [{
    type: 'application/ld+json',
    children: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.value.title,
      description: summary.value,
      url: url.value,
      image: isImageCover.value ? project.value.cover_url : undefined,
      keywords: (project.value.tech_stack || []).join(', '),
      author: { '@type': 'Person', name: profile.name, url: SITE },
      dateCreated: project.value.created_at,
    }),
  }],
})

const isScrolled = ref(false)
const onScroll = () => { isScrolled.value = window.scrollY > 60 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white relative overflow-x-hidden">
    <div class="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
    <div class="fixed top-0 right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(176,132,255,0.9)_0%,transparent_65%)] opacity-10 pointer-events-none z-0"></div>

    <header class="fixed top-0 left-0 w-full z-[1000] transition-all duration-300" :class="isScrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl' : 'bg-transparent border-b border-transparent py-8 md:py-12'">
      <div class="w-full max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center gap-4">
        <NuxtLink :to="`/work/${catSlug}`" class="inline-flex items-center gap-2 text-[#aaa] hover:text-white transition-colors text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-light group shrink-0">
          <Icon name="ph:arrow-left" class="text-lg group-hover:-translate-x-1 transition-transform" />
          <span>{{ cat.name }}</span>
        </NuxtLink>
        <NuxtLink to="/" class="text-white font-bold tracking-[2px] text-lg" style="font-family: 'Clash Display', sans-serif;">{{ nav.logo }}</NuxtLink>
      </div>
    </header>

    <main class="w-full max-w-5xl mx-auto z-10 relative px-6 md:px-12 pb-32 pt-36 md:pt-44">
      <article>
        <!-- Judul -->
        <div class="mb-10 md:mb-14" data-aos="fade-up">
          <span class="text-[#b084ff] text-[10px] font-bold tracking-widest uppercase">{{ project.sub_categories?.name || cat.name }}</span>
          <h1 class="text-4xl md:text-6xl font-['Clash_Display'] font-light tracking-wide leading-tight my-4">{{ project.title }}</h1>
          <p v-if="project.desc_short" class="text-[#aaa] text-sm md:text-base font-light max-w-2xl leading-relaxed">{{ project.desc_short }}</p>

          <div v-if="project.live_url || project.github_url" class="flex flex-wrap gap-3 mt-8">
            <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-[#b084ff] text-[#050505] px-7 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors">
              Visit Live Site <Icon name="ph:arrow-up-right" class="text-base" />
            </a>
            <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:border-[#b084ff] transition-colors">
              <Icon name="ph:github-logo" class="text-lg" /> Repository
            </a>
          </div>
        </div>

        <!-- Cover -->
        <div class="relative border border-white/10 bg-[#0a0a0a] overflow-hidden mb-12 md:mb-16">
          <div class="h-8 bg-[#111] border-b border-white/10 flex items-center px-4 gap-2">
            <div class="w-2.5 h-2.5 bg-[#ff5f56]"></div><div class="w-2.5 h-2.5 bg-[#ffbd2e]"></div><div class="w-2.5 h-2.5 bg-[#27c93f]"></div>
          </div>
          <NuxtImg v-if="isImageCover && project.cover_url" :src="project.cover_url" :alt="project.title" width="1200" sizes="sm:100vw md:1000px" fetchpriority="high" class="w-full h-auto" />
          <div v-else-if="embedSrc" class="relative w-full pb-[56.25%]">
            <iframe :src="embedSrc" loading="lazy" allowfullscreen title="Demo project" class="absolute inset-0 w-full h-full border-none"></iframe>
          </div>
        </div>

        <div class="grid md:grid-cols-[1fr_260px] gap-10 md:gap-16">
          <!-- Cerita project -->
          <div>
            <h2 class="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Tentang project</h2>
            <p v-if="project.desc_long" class="text-[#bbb] font-light leading-[1.9] text-sm md:text-[15px] whitespace-pre-line">{{ project.desc_long }}</p>
            <p v-else class="text-[#888] font-light text-sm">{{ summary }}</p>
          </div>

          <!-- Tech stack + klien -->
          <aside class="flex flex-col gap-8">
            <div v-if="project.tech_stack?.length">
              <h2 class="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Tech Stack</h2>
              <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                <li v-for="t in project.tech_stack" :key="t" class="bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] flex items-center gap-2">
                  <span v-if="getTechDetails(t).type === 'svg'" v-html="getTechDetails(t).content" class="flex items-center"></span>
                  <span class="text-white">{{ t }}</span>
                </li>
              </ul>
            </div>
            <div v-if="project.client_name">
              <h2 class="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-3">Klien</h2>
              <p class="text-white text-sm m-0">{{ project.client_name }}</p>
            </div>
          </aside>
        </div>

        <!-- Galeri -->
        <section v-if="extraImages.length" class="mt-16 md:mt-24">
          <h2 class="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-6">Galeri</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <template v-for="(img, i) in extraImages" :key="img">
              <video v-if="isVideoFile(img)" :src="img" controls playsinline preload="metadata" class="w-full h-auto border border-white/10 bg-black sm:col-span-2"></video>
              <NuxtImg v-else :src="img" :alt="`${project.title} — gambar ${i + 1}`" width="800" sizes="sm:100vw md:500px" loading="lazy" class="w-full h-auto border border-white/10" />
            </template>
          </div>
        </section>

        <div class="mt-20 pt-8 border-t border-white/10">
          <NuxtLink :to="`/work/${catSlug}`" class="inline-flex items-center gap-2 text-[#aaa] hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em]">
            <Icon name="ph:arrow-left" class="text-lg" /> Semua project {{ cat.name }}
          </NuxtLink>
        </div>
      </article>
    </main>
  </div>
</template>
