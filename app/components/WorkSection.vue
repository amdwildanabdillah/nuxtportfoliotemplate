<script setup>
const { work: cfg } = usePortfolioConfig()
const portfolio = usePortfolio()

// Ikon kecil per tata letak kategori
const layoutIcon = { cards: 'ph:squares-four', video: 'ph:film-strip', gallery: 'ph:camera' }

// Diambil di server: kartu kategori sudah ada di HTML pertama (tanpa spinner).
const { data: categories } = await useAsyncData('work-categories', async () => {
  try {
    return await portfolio.categories()
  } catch (error) {
    console.error('Failed to load categories:', error)
    return []
  }
}, { default: () => [] })

// Tepat 3 kategori = tata letak "bento" (kartu pertama besar). Selain itu = kisi rata.
const isBento = computed(() => categories.value.length === 3)
const gridClass = computed(() => {
  if (isBento.value) return 'grid-cols-2 md:grid-cols-3 md:grid-rows-2 md:h-[min(52svh,460px)]'
  const n = categories.value.length
  if (n === 1) return 'grid-cols-1 max-w-2xl'
  if (n === 2) return 'grid-cols-1 sm:grid-cols-2'
  return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
})
const cardClass = (index) => {
  if (isBento.value) {
    return index === 0
      ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto'
      : 'col-span-1 aspect-square md:aspect-auto'
  }
  return 'aspect-[16/10]'
}
const fallbackImg = (index) => `/placeholder/cover-${(index % 3) + 1}.webp`
</script>

<template>
  <section id="work-section" class="w-full flex flex-col justify-center items-center px-4 md:px-8 py-20 md:py-24 relative overflow-hidden min-h-[100svh]">

    <!-- HEADER & MARQUEE -->
    <div class="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 mb-8 md:mb-12 z-10" data-aos="fade-up">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-['Clash_Display'] font-light leading-tight text-white tracking-wide shrink-0 m-0">
        {{ cfg.titleBefore }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b084ff] to-[#00d2ff]">{{ cfg.titleHighlight }}</span>
      </h2>
      <div class="w-full md:flex-1 overflow-hidden flex bg-transparent py-2 z-10 mask-gradient" data-aos="fade-in" data-aos-delay="100">
        <div class="marquee-track flex whitespace-nowrap items-center text-[#666] font-light text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
          <div v-for="i in 3" :key="i" class="flex gap-8 px-4 items-center">
            <template v-for="(cat, idx) in categories" :key="cat.id">
              <span class="hover:text-white transition-colors cursor-default"
                    :class="{ 'hover:text-[#b084ff]': idx === 0, 'hover:text-[#00d2ff]': idx === 1 }">
                {{ cat.name }}
              </span>
              <span class="text-[#333]">/</span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- KARTU KATEGORI -->
    <div class="w-full max-w-6xl mx-auto grid gap-3 md:gap-4 z-10" :class="gridClass">
      <NuxtLink
        v-for="(cat, index) in categories"
        :key="cat.id"
        :to="`/work/${cat.slug}`"
        class="bg-white/5 border border-white/10 group cursor-pointer relative overflow-hidden rounded-none"
        :class="cardClass(index)"
        data-aos="fade-up"
        :data-aos-delay="200 + (index * 100)"
      >
        <div class="absolute inset-0 bg-[#050505]/60 group-hover:bg-[#050505]/30 transition-colors duration-500 z-20 flex flex-col items-center justify-center p-4 md:p-6 text-center">
          <div class="flex flex-col items-center justify-center gap-2 md:gap-3 group-hover:scale-[1.02] md:group-hover:scale-105 transition-transform duration-500 w-full">
            <Icon :name="layoutIcon[layoutOf(cat)]" class="text-2xl md:text-3xl text-white/40 group-hover:text-white transition-colors duration-500" />
            <h3 class="font-['Clash_Display'] font-light text-white tracking-wide leading-[1.1]"
                :class="isBento && index === 0 ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'">
              {{ (cat.name || '').toLowerCase() }}
            </h3>
            <span v-if="cat.total" class="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/50">{{ cat.total }} {{ cfg.worksLabel }}</span>
          </div>
        </div>

        <div class="absolute inset-0 pointer-events-none z-10">
          <NuxtImg :src="cat.bento_image_url || fallbackImg(index)" width="900" sizes="sm:100vw md:600px"
                   loading="lazy" decoding="async" class="w-full h-full object-cover grayscale-0 md:grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                   :alt="cat.name" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.mask-gradient {
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.marquee-track {
  width: max-content;
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>
