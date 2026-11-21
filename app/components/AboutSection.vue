<script setup>
const { about, profile } = usePortfolioConfig()
const techGroups = about.techGroups
</script>

<template>
  <section id="about-section" class="min-h-[100svh] w-full flex flex-col justify-center items-center px-6 md:px-12 pt-20 pb-12 relative overflow-hidden">
    
    <!-- BACKGROUND ACCENTS -->
    <div class="absolute right-[-5%] top-[20%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(176,132,255,0.9)_0%,transparent_65%)] opacity-15 pointer-events-none z-0"></div>
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0"></div>

    <!-- MAIN CONTAINER -->
    <div class="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 relative z-10">
      
      <!-- ================= KIRI: TEKS & SVG ICONS ================= -->
      <div class="flex-1 flex flex-col justify-center text-left order-2 md:order-1 w-full">
        
        <!-- Badge -->
        <div class="mb-4" data-aos="fade-right" data-aos-duration="800">
          <span class="inline-block border border-[#b084ff]/40 text-[#b084ff] px-3 py-1 text-[8px] md:text-[9px] font-light uppercase tracking-[0.2em]">
            {{ about.badge }}
          </span>
        </div>
        
        <!-- Heading -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-['Clash_Display'] font-light mb-4 md:mb-5 leading-tight text-white tracking-wide whitespace-nowrap" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
          {{ about.headingBefore }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b084ff] to-[#00d2ff]">{{ about.headingHighlight }}</span>
        </h2>
        
        <!-- Paragraf -->
        <p class="text-[12px] md:text-[13px] text-[#aaa] font-normal leading-[1.8] mb-8 max-w-lg" data-aos="fade-right" data-aos-duration="800" data-aos-delay="200" style="font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;">
          <template v-for="(para, i) in about.paragraphs" :key="i"><br v-if="i" /><br v-if="i" />{{ para }}</template>
        </p>
        
        <!-- Ikon tech: data-driven, sumber SVG sama dengan halaman project (utils/techIcons) -->
        <div class="flex flex-col gap-4 mt-2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
          <div v-for="group in techGroups" :key="group.label" class="flex items-center gap-4">
            <span class="text-[9px] text-[#666] uppercase tracking-[0.2em] w-[60px] shrink-0">{{ group.label }}</span>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div v-for="tool in group.tools" :key="tool.key" class="relative group flex justify-center items-center [&_svg]:h-5">
                <span v-html="getTechDetails(tool.key).content" class="flex items-center"></span>
                <span class="absolute -top-8 bg-[#050505] border border-white/10 text-white text-[9px] tracking-[0.1em] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">{{ tool.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= KANAN: FOTO ================= -->
      <div class="w-full flex justify-center md:justify-end order-1 md:order-2 mb-6 md:mb-0" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
        
        <!-- Wrapper Foto ukurannya dikurasi biar nggak makan tempat -->
        <div class="relative w-full max-w-[240px] md:max-w-[280px] aspect-[4/5] bg-white/5 border border-white/5">
          
          <!-- SELECTION BOX (Garis ungu) -->
          <div class="absolute inset-0 border border-[#b084ff]/60 pointer-events-none z-30">
            <!-- 4 Resize Handles -->
            <div class="absolute -top-1 -left-1 w-2 h-2 bg-[#050505] border border-[#b084ff]"></div>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-[#050505] border border-[#b084ff]"></div>
            <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-[#050505] border border-[#b084ff]"></div>
            <div class="absolute -bottom-1 -right-1 w-2 h-2 bg-[#050505] border border-[#b084ff]"></div>
          </div>

          <!-- Foto Asli -->
          <NuxtImg :src="about.photo" :alt="profile.name" width="560" height="560" sizes="sm:90vw md:520px" format="webp" loading="lazy" class="w-full h-full object-cover relative z-20" />
          
          <!-- FLOATING NAME TAG (Centered Horizontal) -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#050505]/90 backdrop-blur-md border border-white/10 px-4 py-1.5 flex items-center gap-2 w-max">
              <div class="w-1.5 h-1.5 rounded-full bg-[#b084ff] animate-pulse"></div>
              <h3 class="text-[8px] md:text-[9px] font-['Clash_Display'] font-normal text-white tracking-[0.2em] uppercase m-0">{{ profile.name }}</h3>
          </div>
          
        </div>
      </div>

    </div>
  </section>
</template>