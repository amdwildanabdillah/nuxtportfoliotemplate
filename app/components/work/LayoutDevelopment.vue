<script setup>
// Mengambil fungsi dari app/utils/techIcons.js
import { getTechDetails } from '~/utils/techIcons'

defineProps({
  projects: { type: Array, required: true },
  categoryName: { type: String, default: 'Development' }
})
const emit = defineEmits(['open-modal'])
</script>

<template>
  <div class="flex flex-col gap-24 md:gap-32">
    <div v-for="(item, index) in projects" :key="item.id" class="flex flex-col md:flex-row items-center gap-10 md:gap-16" :class="{ 'md:flex-row-reverse': index % 2 !== 0 }">
      
      <!-- Mockup Cover -->
      <div class="flex-1 w-full relative border border-white/10 overflow-hidden group cursor-pointer rounded-none bg-[#0a0a0a]" @click="emit('open-modal', item)" data-aos="fade-up">
         <div class="h-8 bg-[#111] border-b border-white/10 flex items-center px-4 gap-2">
           <div class="w-2.5 h-2.5 bg-[#ff5f56] rounded-none"></div>
           <div class="w-2.5 h-2.5 bg-[#ffbd2e] rounded-none"></div>
           <div class="w-2.5 h-2.5 bg-[#27c93f] rounded-none"></div>
         </div>
         
         <!-- NUXT IMAGE LIB -->
         <NuxtImg :src="item.cover_url" :alt="item.title" loading="lazy" sizes="sm:100vw md:50vw lg:800px" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
         
         <div class="absolute inset-0 bg-[#050505]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
           <span class="border border-white/30 bg-[#050505] px-6 py-2 text-white text-[10px] tracking-[0.2em] uppercase rounded-none">View Details</span>
         </div>
      </div>
      
      <!-- Text & Tech Stack -->
      <div class="flex-1 w-full text-left" data-aos="fade-up" data-aos-delay="100">
         <span class="text-[#b084ff] text-[10px] font-bold tracking-widest uppercase">
          <!-- Panggil relasinya: item.nama_tabel.nama_kolom -->
          {{ item.sub_categories?.name || categoryName }}
        </span>
         <h2 class="text-4xl md:text-5xl font-['Clash_Display'] my-4">{{ item.title }}</h2>
         <p class="text-[#aaa] mb-8 leading-relaxed">{{ item.desc_short || 'Digital solution crafted with precision.' }}</p>
         
         <div class="flex flex-wrap gap-3 mb-8">
            <div 
              v-for="t in item.tech_stack" 
              :key="t" 
              class="bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] flex items-center gap-2 transition-all hover:bg-white/10 cursor-default rounded-none"
            >
               <!-- SVG RENDER FROM DATASET SVG -->
               <div v-if="getTechDetails(t).type === 'svg'" v-html="getTechDetails(t).content" class="flex items-center justify-center"></div>
               
               <span class="text-white">{{ t }}</span>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>