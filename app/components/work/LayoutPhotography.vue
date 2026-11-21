<script setup>
defineProps({
  projects: { type: Array, required: true }
})
const emit = defineEmits(['open-modal'])
</script>

<template>
  <div class="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
    <div v-for="photo in projects" :key="photo.id" @click="emit('open-modal', photo)" class="break-inside-avoid relative group cursor-pointer border border-white/10 bg-white/5 overflow-hidden rounded-none" data-aos="fade-up">
      <div class="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6 md:p-8">
        <h3 class="text-xl text-white font-['Clash_Display'] mb-1">{{ photo.title }}</h3>
        <p v-if="photo.desc_short" class="text-xs text-[#aaa] italic mt-1">"{{ photo.desc_short }}"</p>
      </div>
      
      <!-- NUXT IMAGE LIB -->
      <NuxtImg :src="photo.thumbnail" :alt="photo.title || 'Photography'" loading="lazy" sizes="sm:100vw md:50vw lg:400px" class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
      
    </div>
  </div>
</template>