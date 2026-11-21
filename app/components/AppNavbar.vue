<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { nav } = useSiteConfig()
const portfolio = usePortfolio()
const activeSection = ref('hero-section')
const isMobileMenuOpen = ref(false)
const portfolioUrl = ref('') 

const fetchSettings = async () => {
  try {
    const s = await portfolio.settings()
    if (s.portfolio_url) portfolioUrl.value = s.portfolio_url
  } catch (err) {
    console.error('Failed to load settings:', err)
  }
}

const { scrollToSection: jumpTo, activeSectionId } = useStackScroll()
const sectionIds = ['hero-section', 'featured-section', 'work-section', 'about-section', 'contact-section']

const scrollToSection = (id) => {
  jumpTo(id)
  isMobileMenuOpen.value = false
}

let ticking = false
const handleScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    const nearBottom = window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 150
    activeSection.value = nearBottom ? 'contact-section' : activeSectionId(sectionIds)
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  fetchSettings()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <nav class="fixed top-0 left-0 z-[1000] w-full bg-[#050505]/30 backdrop-blur-xl border-b border-white/10 px-[5%] py-4 flex justify-between items-center transition-all duration-300">
      
      <!-- Logo -->
      <div class="text-xl tracking-[2px] text-white font-bold" style="font-family: 'Clash Display', sans-serif;">
        {{ nav.logo }}
      </div>
      
      <!-- Desktop Menu -->
      <ul class="hidden md:flex gap-7 list-none m-0 p-0 items-center" style="font-family: 'Clash Display', sans-serif;">
        <!-- Navigasi Internal -->
        <li><a href="#" @click.prevent="scrollToSection('hero-section')" class="text-[#888] font-light text-sm tracking-wide transition-all duration-300 hover:text-white hover:font-medium" :class="{ '!text-white !font-medium': activeSection === 'hero-section' }">Home</a></li>
        <li><a href="#" @click.prevent="scrollToSection('featured-section')" class="text-[#888] font-light text-sm tracking-wide transition-all duration-300 hover:text-white hover:font-medium" :class="{ '!text-white !font-medium': activeSection === 'featured-section' }">Projects</a></li>
        <li><a href="#" @click.prevent="scrollToSection('work-section')" class="text-[#888] font-light text-sm tracking-wide transition-all duration-300 hover:text-white hover:font-medium" :class="{ '!text-white !font-medium': activeSection === 'work-section' }">Work</a></li>
        <li><a href="#" @click.prevent="scrollToSection('about-section')" class="text-[#888] font-light text-sm tracking-wide transition-all duration-300 hover:text-white hover:font-medium" :class="{ '!text-white !font-medium': activeSection === 'about-section' }">About</a></li>
        
        <li v-if="nav.extraLinks.length || portfolioUrl"><div class="w-px h-4 bg-white/20 mx-1"></div></li>
        <li v-for="l in nav.extraLinks" :key="l.url">
          <a :href="l.url" target="_blank" rel="noopener noreferrer" class="text-[#b084ff] font-medium text-sm tracking-wide transition-all duration-300 hover:text-white flex items-center gap-1.5">
            {{ l.label }} <Icon name="ph:arrow-up-right-bold" class="text-[11px]" />
          </a>
        </li>
        <li v-if="portfolioUrl">
          <a :href="portfolioUrl" target="_blank" rel="noopener noreferrer" class="text-[#b084ff] font-medium text-sm tracking-wide transition-all duration-300 hover:text-white flex items-center gap-1.5">
            Deck <Icon name="ph:arrow-up-right-bold" class="text-[11px]" />
          </a>
        </li>
      </ul>
      
      <!-- Connect Button -->
      <div class="hidden md:block" style="font-family: 'Clash Display', sans-serif;">
        <a href="#" @click.prevent="scrollToSection('contact-section')" class="bg-transparent text-white px-6 py-2 border border-white/20 font-medium text-sm transition-all duration-300 hover:bg-[#b084ff] hover:border-[#b084ff]" :class="{ '!bg-[#b084ff] !border-[#b084ff]': activeSection === 'contact-section' }">
          {{ nav.connectLabel }}
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button aria-label="Open Navigation Menu" class="md:hidden text-white text-2xl flex items-center justify-center" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <Icon :name="isMobileMenuOpen ? 'ph:x' : 'ph:list'" />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="fixed top-[65px] left-0 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 z-[999] flex flex-col md:hidden shadow-2xl" style="font-family: 'Clash Display', sans-serif;">
      <!-- Navigasi Internal -->
      <a href="#" @click.prevent="scrollToSection('hero-section')" class="px-6 py-4 text-[#aaa] font-light text-sm border-b border-white/5 transition-all duration-300 hover:text-white hover:font-medium" :class="{ 'text-white bg-white/5 !font-medium': activeSection === 'hero-section' }">Home</a>
      <a href="#" @click.prevent="scrollToSection('featured-section')" class="px-6 py-4 text-[#aaa] font-light text-sm border-b border-white/5 transition-all duration-300 hover:text-white hover:font-medium" :class="{ 'text-white bg-white/5 !font-medium': activeSection === 'featured-section' }">Projects</a>
      <a href="#" @click.prevent="scrollToSection('work-section')" class="px-6 py-4 text-[#aaa] font-light text-sm border-b border-white/5 transition-all duration-300 hover:text-white hover:font-medium" :class="{ 'text-white bg-white/5 !font-medium': activeSection === 'work-section' }">Work</a>
      <a href="#" @click.prevent="scrollToSection('about-section')" class="px-6 py-4 text-[#aaa] font-light text-sm border-b border-white/5 transition-all duration-300 hover:text-white hover:font-medium" :class="{ 'text-white bg-white/5 !font-medium': activeSection === 'about-section' }">About</a>
      
      <div v-if="nav.extraLinks.length || portfolioUrl" class="h-3 bg-white/5 border-b border-white/5"></div>
      <a v-for="l in nav.extraLinks" :key="l.url" :href="l.url" target="_blank" rel="noopener noreferrer" class="px-6 py-4 text-[#b084ff] font-medium text-sm border-b border-white/5 transition-all duration-300 hover:text-white hover:bg-white/10 flex items-center justify-between">
        {{ l.label }} <Icon name="ph:arrow-up-right-bold" />
      </a>
      <a v-if="portfolioUrl" :href="portfolioUrl" target="_blank" rel="noopener noreferrer" class="px-6 py-4 text-[#b084ff] font-medium text-sm border-b border-white/5 transition-all duration-300 hover:text-white hover:bg-white/10 flex items-center justify-between">
        Portfolio Deck <Icon name="ph:arrow-up-right-bold" />
      </a>
    </div>
  </div>
</template>