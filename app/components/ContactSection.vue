<script setup>
const currentYear = new Date().getFullYear()
const { profile, contact, watermark } = usePortfolioConfig()
const portfolio = usePortfolio()
const waLink = profile.whatsapp ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}` : ''

// Email: dari config; di mode Supabase bisa diubah lewat /admin/settings
const { data: settings } = await useAsyncData('site-settings', () => portfolio.settings(),
  { default: () => ({ contact_email: profile.email, socials: usePortfolioConfig().socials }) })
const contactEmail = computed(() => settings.value.contact_email)
const socials = computed(() => settings.value.socials)

// Nama ikon sosial (Phosphor): github -> ph:github-logo
const socialIcon = (platform) => `ph:${String(platform).toLowerCase()}-logo`
</script>

<template>
  <section id="contact-section" class="w-full flex flex-col justify-between items-center px-6 md:px-12 py-8 md:py-12 relative overflow-hidden min-h-[100svh]">
    
    <!-- BACKGROUND ACCENTS -->
    <div class="absolute top-[-10%] left-[-10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(176,132,255,0.9)_0%,transparent_65%)] opacity-20 animate-[pulse_6s_ease-in-out_infinite] z-0"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.9)_0%,transparent_65%)] opacity-15 animate-[pulse_8s_ease-in-out_infinite] z-0"></div>
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)] z-0"></div>

    <!-- CTA UTAMA -->
    <div class="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center flex-1 text-center" data-aos="fade-up">
      
      <span class="text-[9px] md:text-[10px] font-medium text-white/60 uppercase tracking-[0.3em] mb-4 md:mb-5">
        {{ contact.eyebrow }}
      </span>
      
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-['Clash_Display'] font-light mb-8 text-white leading-[1.1] tracking-wide">
        {{ contact.headingBefore }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b084ff] to-[#00d2ff]">{{ contact.headingHighlight }}</span>
      </h2>
      
      <!-- WRAPPER BOUNDING BOX CTA -->
      <div v-if="waLink" class="relative group inline-block">
        
        <!-- Anchor Points -->
        <div class="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-[#050505] border border-[#b084ff] group-hover:bg-[#b084ff] transition-colors z-20"></div>
        <div class="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-[#050505] border border-[#b084ff] group-hover:bg-[#b084ff] transition-colors z-20"></div>
        <div class="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-[#050505] border border-[#b084ff] group-hover:bg-[#b084ff] transition-colors z-20"></div>
        <div class="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-[#050505] border border-[#b084ff] group-hover:bg-[#b084ff] transition-colors z-20"></div>
        
        <!-- Tombol Asli -->
        <a :href="waLink" target="_blank" rel="noopener noreferrer" class="relative block overflow-hidden border border-white/20 px-8 md:px-10 py-3 md:py-4 bg-[#050505]/60 backdrop-blur-md cursor-pointer transition-colors">
          
          <div class="absolute inset-0 bg-[#b084ff]/20 scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100 z-0"></div>
          
          <span class="relative z-10 text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center gap-3 transition-colors duration-300">
            {{ contact.ctaLabel }}
            <!-- WhatsApp SVG -->
            <svg class="w-4 h-4 text-[#b084ff] group-hover:text-white transition-all duration-300 group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>
          </span>
        </a>
      </div>
    </div>

    <!-- FOOTER CONTENT -->
    <div class="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-4 z-10 border-t border-white/10 pt-6 md:pt-8 mt-6 md:mt-0" data-aos="fade-in" data-aos-delay="100">
      
      <!-- BAGIAN KIRI: Identitas & Ventures -->
      <div class="flex flex-col gap-5 md:gap-6 text-center md:text-left">
        
        <div class="flex flex-col gap-2">
          <h3 class="text-[12px] md:text-[13px] font-medium tracking-[0.15em] text-white">{{ profile.name.toUpperCase() }}</h3>
          <p class="text-[#888] font-light text-[10px] md:text-[11px] leading-[1.6] max-w-sm mx-auto md:mx-0">
            {{ contact.footerTagline }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[9px] text-[#555] font-medium uppercase tracking-[0.2em]">Email</span>
          <a :href="`mailto:${contactEmail}`" class="group inline-flex items-center justify-center md:justify-start gap-2 text-[#ccc] hover:text-white transition-colors text-[11px] tracking-[0.5px]">
            <Icon name="ph:envelope-simple" class="text-[14px] text-[#b084ff]" />
            <span class="border-b border-white/20 group-hover:border-white pb-px">{{ contactEmail }}</span>
          </a>
        </div>

        <div v-if="contact.ventures.length" class="flex flex-col gap-2">
          <span class="text-[9px] text-[#555] font-medium uppercase tracking-[0.2em]">{{ contact.venturesLabel }}</span>
          <div class="flex flex-row flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2">
            <a v-for="v in contact.ventures" :key="v.url" :href="v.url" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-1.5 font-medium text-[11px] tracking-[0.5px]" :style="{ color: v.color || '#00d2ff' }">
              <Icon name="ph:arrow-up-right" class="text-[14px] group-hover:text-white transition-colors" />
              <span class="border-b border-white/20 group-hover:border-white group-hover:text-white transition-colors pb-px">{{ v.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- BAGIAN KANAN: Social & Copyright -->
      <div class="flex flex-col items-center md:items-end gap-5 justify-between h-full">
        
        <!-- Social Icons -->
        <div class="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-5 text-[#aaa]">
          <a v-for="s in socials" :key="s.url" :href="s.url" target="_blank" rel="noopener noreferrer" class="hover:text-white hover:scale-110 transition-all flex items-center" :title="s.platform" :aria-label="s.platform">
            <Icon :name="socialIcon(s.platform)" class="text-[20px]" />
          </a>
        </div>

        <!-- Copyright -->
        <div class="text-white font-light text-[9px] uppercase tracking-[0.1em] text-center md:text-right mt-1 md:mt-0">
          <p>&copy; {{ currentYear }} {{ profile.name }}.</p>
          <p class="mt-0.5">{{ contact.copyright }}</p>
          <p v-if="watermark.show" class="mt-2 normal-case tracking-[0.05em] text-[#666]">
            {{ watermark.text }}
            <a :href="watermark.url" target="_blank" rel="noopener" class="text-[#999] hover:text-white transition-colors underline underline-offset-2">{{ watermark.label }}</a>
          </p>
        </div>
      </div>

    </div>
  </section>
</template>