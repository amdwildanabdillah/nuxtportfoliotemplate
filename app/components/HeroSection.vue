<script setup>
const { scrollToSection } = useStackScroll()
const { hero, profile } = usePortfolioConfig()
const waLink = profile.whatsapp ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}` : ''
</script>

<template>
  <header class="min-h-[100svh] w-full flex flex-col justify-center items-center text-center relative px-4 overflow-hidden">

    <!-- Cahaya latar (gradien radial, ringan) -->
    <div class="absolute top-[-8%] left-[-12%] w-[420px] md:w-[640px] h-[420px] md:h-[640px] rounded-full bg-[radial-gradient(circle,rgba(176,132,255,0.9)_0%,transparent_65%)] opacity-30 animate-[pulse_6s_ease-in-out_infinite] z-0"></div>
    <div class="absolute bottom-[-8%] right-[-12%] w-[420px] md:w-[640px] h-[420px] md:h-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.9)_0%,transparent_65%)] opacity-20 animate-[pulse_8s_ease-in-out_infinite] z-0"></div>

    <!-- Grid latar ala editor desain -->
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] z-0"></div>

    <div class="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center mt-8 md:mt-0">

      <!-- Siapa -->
      <span class="text-[9px] md:text-[11px] font-['Clash_Display'] font-semibold text-white/60 uppercase tracking-[0.25em] mb-5 md:mb-6 fade-in-down">
        {{ hero.eyebrow }}
      </span>

      <!-- Kotak seleksi ala editor (konsep asli dipertahankan) -->
      <div class="relative border border-white/15 px-6 md:px-12 py-6 md:py-8 flex flex-col items-center justify-center mb-6 md:mb-7">
        <div class="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#050505] border border-[#b084ff]"></div>
        <div class="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#050505] border border-[#b084ff]"></div>
        <div class="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#050505] border border-[#b084ff]"></div>
        <div class="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#050505] border border-[#b084ff]"></div>

        <h1 class="text-4xl sm:text-5xl md:text-[4rem] leading-[1.3] md:leading-[1.2] font-['Clash_Display'] font-light tracking-wide w-full m-0">
          <span class="block text-white mb-3 md:mb-4">{{ hero.line1 }}</span>
          <span class="inline-block relative">
            <span class="relative z-10 inline-block bg-[#b084ff]/20 border border-[#b084ff]/50 px-4 md:px-5 py-1 md:py-1.5 text-white rounded-[2px] shadow-[0_0_15px_rgba(176,132,255,0.15)]">
              {{ hero.line2 }}
              <span class="absolute right-[10px] md:right-[12px] top-1/2 -translate-y-1/2 h-[65%] w-[1.5px] md:w-[2px] bg-[#b084ff] animate-[pulse_1s_ease-in-out_infinite]"></span>
            </span>
          </span>
        </h1>
      </div>

      <!-- Apa yang dikerjakan (inilah yang dulu hilang dari hero) -->
      <p class="text-[13px] md:text-base text-[#bbb] font-light leading-[1.7] max-w-xl m-0 mb-7 fade-in-up delay-2">
        {{ hero.description }}
      </p>

      <!-- Aksi utama -->
      <div class="flex flex-col sm:flex-row items-center gap-3 fade-in-up delay-3">
        <button type="button" @click="scrollToSection('featured-section')" class="group relative inline-flex items-center justify-center px-8 py-3 bg-[#b084ff] text-[#050505] text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white">
          <span class="font-['Clash_Display']">{{ hero.primaryButton }}</span>
        </button>
        <a v-if="waLink" :href="waLink" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-[#ccc] text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#b084ff] hover:text-white">
          <Icon name="ph:whatsapp-logo" class="text-base" />
          <span class="font-['Clash_Display'] font-medium">{{ hero.secondaryButton }}</span>
        </a>
      </div>

      <span class="mt-8 text-[7.5px] md:text-[10px] font-['Clash_Display'] font-semibold text-[#888] uppercase tracking-[0.15em] fade-in-up delay-4">
        {{ hero.tagline }}
      </span>
    </div>
  </header>
</template>
