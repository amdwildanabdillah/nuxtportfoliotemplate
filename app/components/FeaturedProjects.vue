<script setup>
// Proyek unggulan: 3 proyek Development teratas (urutan sort_order dari admin).
const { featured: cfg } = usePortfolioConfig()
const { data: projects } = await useAsyncData('featured-dev', usePortfolio().featured, { default: () => [] })

const stack = (p) => (Array.isArray(p.tech_stack) ? p.tech_stack : String(p.tech_stack || '').split(','))
  .map((t) => String(t).trim()).filter(Boolean).slice(0, 4)
</script>

<template>
  <section id="featured-section" class="w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-8 py-20 md:py-24 relative overflow-hidden">
    <div class="w-full max-w-6xl mx-auto z-10">

      <!-- Judul + tautan semua proyek -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10" data-aos="fade-up">
        <div>
          <span class="block text-[9px] md:text-[11px] font-['Clash_Display'] font-semibold text-[#b084ff] uppercase tracking-[0.25em] mb-3">{{ cfg.eyebrow }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-['Clash_Display'] font-light leading-tight text-white tracking-wide m-0">
            {{ cfg.titleBefore }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b084ff] to-[#00d2ff]">{{ cfg.titleHighlight }}</span>
          </h2>
        </div>
        <NuxtLink to="/work/development" class="group inline-flex items-center gap-2 text-[#aaa] hover:text-white transition-colors text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-light shrink-0">
          {{ cfg.linkLabel }}
          <Icon name="ph:arrow-up-right" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </NuxtLink>
      </div>

      <!-- Kartu proyek -->
      <div v-if="projects.length" class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <NuxtLink
          v-for="(p, i) in projects"
          :key="p.id"
          :to="p.slug ? `/work/development/${p.slug}` : `/work/development?p=${p.id}`"
          class="group relative flex flex-col bg-white/5 border border-white/10 hover:border-[#b084ff]/50 transition-colors duration-500 overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-[#0b0b0b]">
            <NuxtImg
              v-if="p.cover_url"
              :src="p.cover_url"
              :alt="p.title"
              width="640"
              sizes="sm:100vw md:400px"
              loading="lazy"
              class="w-full h-full object-cover md:grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <span v-if="p.sub_categories?.name" class="absolute top-3 left-3 bg-[#050505]/70 backdrop-blur-md border border-white/10 text-white/80 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1">
              {{ p.sub_categories.name }}
            </span>
          </div>

          <div class="flex flex-col gap-3 p-4 md:p-5 flex-1">
            <h3 class="font-['Clash_Display'] font-light text-white text-xl md:text-2xl leading-tight tracking-wide m-0">{{ p.title }}</h3>
            <p v-if="p.desc_short" class="text-[12px] md:text-[13px] text-[#aaa] leading-[1.7] m-0 line-clamp-2">{{ p.desc_short }}</p>
            <ul v-if="stack(p).length" class="flex flex-wrap gap-1.5 mt-auto pt-1 list-none p-0 m-0">
              <li v-for="t in stack(p)" :key="t" class="border border-white/10 text-[#999] text-[9px] md:text-[10px] uppercase tracking-[0.12em] px-2 py-1">{{ t }}</li>
            </ul>
          </div>
        </NuxtLink>
      </div>

      <!-- Cadangan bila data belum termuat -->
      <div v-else class="border border-white/10 bg-white/5 p-8 text-center text-[#aaa] text-sm">
        {{ cfg.emptyText }}
        <NuxtLink to="/work/development" class="text-[#b084ff] underline underline-offset-4">View all</NuxtLink>
      </div>
    </div>
  </section>
</template>
