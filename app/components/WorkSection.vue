<script setup>
const { work: cfg } = usePortfolioConfig()
const portfolio = usePortfolio()

// ==============================================================
// 🛠️ KAMUS TEKS CUSTOM (Lowercase & Tanpa Titik)
// ==============================================================
const customTitles = {
  'development': 'development',
  'videography': 'video<br>graphy',
  'photography': 'photo<br>graphy'
}

// ==============================================================
// 🛠️ ARRAY SVG KHUSUS DEVELOPMENT (Size HP disusutkan jadi h-3)
// ==============================================================
const devIcons = [
  // Vite
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="IconifyId19fe678a8969af392" x1="6" x2="235" y1="33" y2="344" gradientTransform="translate(0 .937)scale(.3122)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#41d1ff"/><stop offset="1" stop-color="#bd34fe"/></linearGradient><linearGradient id="IconifyId19fe678a8969af393" x1="194.651" x2="236.076" y1="8.818" y2="292.989" gradientTransform="translate(0 .937)scale(.3122)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffea83"/><stop offset=".083" stop-color="#ffdd35"/><stop offset="1" stop-color="#ffa800"/></linearGradient></defs><path fill="url(#IconifyId19fe678a8969af392)" d="M124.766 19.52L67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.1 3.1 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594m0 0"/><path fill="url(#IconifyId19fe678a8969af393)" d="M91.46 1.43L48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968l34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43m0 0"/></svg>`,
  // React
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#00bcd4" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4s-12-2.59-12-4s4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6s14-2.686 14-6s-6.268-6-14-6"/><path fill="#00bcd4" d="M16 14a2 2 0 1 0 2 2a2 2 0 0 0-2-2"/><path fill="#00bcd4" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493c3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124c-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#00bcd4" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393c-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>`,
  // Vue
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#41b883" d="M1.791 3.851L12 21.471L22.209 3.936V3.85H18.24l-6.18 10.616L5.906 3.851z"/><path fill="#35495e" d="m5.907 3.851l6.152 10.617L18.24 3.851h-3.723L12.084 8.03L9.66 3.85z"/></svg>`,
  // Tailwind
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0"/></svg>`,
  // Flutter
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#3fb6d3" d="M12.3 64.2L76.3 0h39.4L32.1 83.6zm64 63.8h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"/><path fill="#27aacd" d="m81.6 93.9l-20-20l-19.4 19.6l19.4 19.6z"/><path fill="#19599a" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z"/><linearGradient id="IconifyId19fe60353c0ce67311" x1="59.365" x2="86.825" y1="116.36" y2="99.399" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1b4e94"/><stop offset=".63" stop-color="#1a5497"/><stop offset="1" stop-color="#195a9b"/></linearGradient><path fill="url(#IconifyId19fe60353c0ce67311)" d="m61.6 113.1l30.8-8.4l-10.8-10.8z"/></svg>`,
  // Dart
  '<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#4fc3f7" d="M16.83 2a1.3 1.3 0 0 0-.916.377l-.013.01L7.323 7.34l8.556 8.55v.005l10.283 10.277l1.96-3.529l-7.068-16.96l-3.299-3.297A1.3 1.3 0 0 0 16.828 2Z"/><path fill="#01579b" d="m7.343 7.32l-4.955 8.565l-.01.013a1.297 1.297 0 0 0 .004 1.835l.005.005l4.106 4.107l16.064 6.314l3.632-2.015l-.098-.098l-.025.002L15.995 15.97h-.012z"/><path fill="#01579b" d="m7.321 7.324l8.753 8.755h.013L26.16 26.156l3.835-.73L30 14.089l-4.049-3.965a6.5 6.5 0 0 0-3.618-1.612l.002-.043L7.323 7.325Z"/><path fill="#64b5f6" d="m7.332 7.335l8.758 8.75v.013l10.079 10.071L25.436 30H14.09l-3.967-4.048a6.5 6.5 0 0 1-1.611-3.618l-.045.004Z"/></svg>',
  // Supabase
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="IconifyId19fe6039509678e602" x1="53.974" x2="94.163" y1="54.974" y2="71.829" gradientTransform="translate(29.387 60.096)scale(1.1436)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#249361"/><stop offset="1" stop-color="#3ecf8e"/></linearGradient><linearGradient id="IconifyId19fe6039509678e603" x1="36.156" x2="54.484" y1="30.578" y2="65.081" gradientTransform="translate(29.387 60.096)scale(1.1436)" gradientUnits="userSpaceOnUse"><stop offset="0"/><stop offset="1" stop-opacity="0"/></linearGradient></defs><path fill="url(#IconifyId19fe6039509678e602)" d="M102.24 186.21c-3.267 4.117-9.904 1.862-9.977-3.397l-1.156-76.906h51.715c9.365 0 14.587 10.817 8.763 18.149z" transform="translate(-27.722 -60.338)"/><path fill="url(#IconifyId19fe6039509678e603)" fill-opacity=".2" d="M102.24 186.21c-3.267 4.117-9.904 1.862-9.977-3.397l-1.156-76.906h51.715c9.365 0 14.587 10.817 8.763 18.149z" transform="translate(-27.722 -60.338)"/><path fill="#3ecf8e" d="M53.484 2.128c3.267-4.117 9.905-1.862 9.977 3.396l.508 76.907H12.902c-9.365 0-14.587-10.817-8.764-18.149z"/></svg>`,
  // Firebase
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" viewBox="0 0 256 322" xmlns="http://www.w3.org/2000/svg"><path fill="#FF9100" d="M80.18 312.295c13.455 5.414 28.05 8.628 43.376 9.163a127.5 127.5 0 0 0 58.098-11.71c-21.145-8.307-40.294-20.455-56.638-35.56c-10.594 16.963-26.263 30.36-44.835 38.107"/><path fill="#FFC400" d="M125.013 274.193c-37.307-34.504-59.939-84.444-58.026-139.218c.062-1.78.156-3.557.266-5.334a96.63 96.63 0 0 0-50.456.528C6.838 147.614.828 167.63.079 189.069C-1.853 244.403 31.632 292.75 80.178 312.3c18.572-7.747 34.24-21.13 44.835-38.107"/><path fill="#FF9100" d="M125.015 274.191c8.674-13.88 13.933-30.154 14.545-47.687c1.61-46.12-29.394-85.794-72.306-96.865c-.11 1.777-.203 3.555-.265 5.334c-1.913 54.775 20.719 104.714 58.026 139.218"/><path fill="#DD2C00" d="M134.761 0c-24.44 19.58-43.738 45.396-55.414 75.136a180.5 180.5 0 0 0-12.113 54.515c42.912 11.07 73.917 50.745 72.306 96.865c-.612 17.532-5.887 33.79-14.545 47.687a180.7 180.7 0 0 0 56.637 35.56c42.441-19.618 72.553-61.833 74.297-111.764c1.129-32.351-11.3-61.184-28.864-85.521C208.517 86.738 134.76 0 134.76 0"/></svg>`,
  // Postgres
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="#000" stroke-width="2.1" d="M21.9 22.8c.2-1.3.112-1.5 1.1-1.3l.2.02c.8.03 1.8-.1 2.3-.4c1.3-.6 2-1.6.763-1.3c-2.8.582-3-.4-3-.4c3-4.4 4.2-10.1 3.1-11.4c-2.9-3.8-8-2-8.1-1.9l-.03.005a10 10 0 0 0-1.9-.196c-1.3-.02-2.2.3-3 .893c0 0-9.1-3.7-8.7 4.7c.1 1.8 2.6 13.6 5.5 10c1.1-1.3 2.1-2.4 2.1-2.4c.5.3 1.1.521 1.8.458l.1-.043c-.01.162-.01.3.2.5c-.8.852-.5 1-2.1 1.3c-1.5.318-.6.884-.04 1c.717.2 2.4.433 3.5-1.1l-.04.179c.3.2.3 1.7.3 2.8s.1 2 .329 2.628c.215.6.5 2.1 2.5 1.6c1.7-.4 3-.9 3.1-5.7"/><path fill="#336791" d="M26.3 19.861c-2.8.583-3-.4-3-.4c3-4.4 4.2-10.1 3.1-11.4c-2.9-3.8-8-2-8.1-1.9l-.03.005a10 10 0 0 0-1.9-.196c-1.3-.02-2.2.335-3 .893c0 0-9.1-3.7-8.7 4.7c.1 1.8 2.6 13.6 5.5 10.018a55 55 0 0 1 2.1-2.402c.5.3 1.1.5 1.8.458l.1-.043c-.02.162-.01.3.2.5c-.8.852-.5 1-2.1 1.3c-1.5.318-.6.884-.04 1c.717.2 2.4.433 3.5-1.1l-.04.179c.299.2.5 1.6.473 2.8c-.04 1.2-.1 2 .177 2.6c.236.6.5 2.1 2.5 1.6c1.7-.4 2.5-1.3 2.7-2.8c.1-1.1.3-.9.3-1.9l.2-.467c.2-1.5.028-2 1.1-1.8l.2.022c.8.03 1.8-.1 2.3-.4c1.3-.6 2-1.6.762-1.3Z"/><g fill="none" stroke="#fff" stroke-linecap="round" stroke-width=".7"><path stroke-linejoin="bevel" d="M23.3 19.5s.2 1 3 .3c1.2-.2.5.7-.8 1.3c-1 .5-3.3.6-3.3 0c-.1-1.7 1.2-1.2 1-1.6c0-.4-.6-.8-1-1.8c-.3-.8-4.6-7 1.2-6.1c.2 0-1.5-5.6-7-5.7c-5.4 0-5.3 6.7-5.3 6.7"/><path stroke-linejoin="round" d="M15.9 20.7c-.1 2.8 0 5.6.2 6.3s.9 2 2.9 1.6q2.4-.5 2.6-2.6l.6-5M13.5 6.9S4.4 3 4.8 11.5c0 1.8 2.6 13.6 5.5 10l2-2.3m6-13.1c-.3 0 5.1-2 8.1 2c1.1 1.3-.1 7-3.1 11.4m-9 .5c-.7.9-.5 1-2 1.4c-1.6.3-.7.8 0 1s2.3.4 3.4-1.2c.4-.4 0-1.2-.5-1.4q-.3-.2-.9.2m0 0q-.1-.7.4-1.8c.4-1 1.3-2 .6-5.4c-.6-2.5-4.2-.5-4.2-.2q.2.8 0 3.3c-.3 2.1 1.3 3.9 3.1 3.7m9.2-8l-.2 2.4c0 1.4.7 3-.4 4.6"/></g><g fill="#fff" stroke="#fff"><path stroke-width=".2" d="M13.4 12.6q0 .3.5.4q.7 0 .6-.3q0-.1-.5-.2z"/><path stroke-width=".1" d="M22.4 12.4s-.2.4-.5.4q-.5 0-.6-.3l.5-.3q.5 0 .6.2Z"/></g></svg>`,
  // Node.js
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#83cd29" d="M16 30a2.15 2.15 0 0 1-1.076-.288L11.5 27.685c-.511-.286-.262-.387-.093-.446a6.8 6.8 0 0 0 1.549-.7a.26.26 0 0 1 .255.019l2.631 1.563a.34.34 0 0 0 .318 0l10.26-5.922a.32.32 0 0 0 .157-.278V10.075a.33.33 0 0 0-.159-.283l-10.26-5.917a.32.32 0 0 0-.317 0L5.587 9.794a.33.33 0 0 0-.162.281v11.841a.32.32 0 0 0 .161.274L8.4 23.814c1.525.762 2.459-.136 2.459-1.038V11.085a.3.3 0 0 1 .3-.3h1.3a.3.3 0 0 1 .3.3v11.692c0 2.035-1.108 3.2-3.038 3.2a4.4 4.4 0 0 1-2.363-.642l-2.697-1.547a2.17 2.17 0 0 1-1.076-1.872V10.075A2.16 2.16 0 0 1 4.661 8.2l10.261-5.924a2.25 2.25 0 0 1 2.156 0L27.338 8.2a2.17 2.17 0 0 1 1.077 1.87v11.846a2.17 2.17 0 0 1-1.077 1.872l-10.26 5.924A2.15 2.15 0 0 1 16 30"/><path fill="#83cd29" d="M14.054 17.953a.3.3 0 0 1 .3-.3h1.327a.3.3 0 0 1 .295.251c.2 1.351.8 2.032 3.513 2.032c2.161 0 3.082-.489 3.082-1.636c0-.661-.261-1.152-3.62-1.481c-2.808-.278-4.544-.9-4.544-3.144c0-2.07 1.745-3.305 4.67-3.305c3.287 0 4.914 1.141 5.12 3.589a.3.3 0 0 1-.295.323h-1.336a.3.3 0 0 1-.288-.232c-.319-1.421-1.1-1.875-3.2-1.875c-2.36 0-2.634.822-2.634 1.438c0 .746.324.964 3.51 1.385c3.153.417 4.651 1.007 4.651 3.223c0 2.236-1.864 3.516-5.115 3.516c-4.495.006-5.436-2.055-5.436-3.784"/></svg>`,
  // GitHub
  `<svg class="h-3 sm:h-3.5 md:h-4 w-auto transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffffff" d="M8 .198a8 8 0 0 0-2.529 15.591c.4.074.547-.174.547-.385c0-.191-.008-.821-.011-1.489c-2.226.484-2.695-.944-2.695-.944c-.364-.925-.888-1.171-.888-1.171c-.726-.497.055-.486.055-.486c.803.056 1.226.824 1.226.824c.714 1.223 1.872.869 2.328.665c.072-.517.279-.87.508-1.07c-1.777-.202-3.645-.888-3.645-3.954c0-.873.313-1.587.824-2.147c-.083-.202-.357-1.015.077-2.117c0 0 .672-.215 2.201.82A7.7 7.7 0 0 1 8 4.066c.68.003 1.365.092 2.004.269c1.527-1.035 2.198-.82 2.198-.82c.435 1.102.162 1.916.079 2.117c.513.56.823 1.274.823 2.147c0 3.073-1.872 3.749-3.653 3.947c.287.248.543.735.543 1.481c0 1.07-.009 1.932-.009 2.195c0 .213.144.462.55.384A8 8 0 0 0 8.001.196z"/></svg>`,
]

// Diambil di server: kartu kategori sudah ada di HTML pertama (tanpa spinner).
const { data: categories } = await useAsyncData('work-categories', async () => {
  try {
    return await portfolio.categories()
  } catch (error) {
    console.error('Failed to load categories:', error)
    return []
  }
}, { default: () => [] })
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

    <!-- BENTO CONTAINER DINAMIS -->
    <!-- Bento 3x2: Development memakai 2x2 (kotak besar), dua kategori lain 1x1 -->
    <div class="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4 z-10 md:h-[min(52svh,460px)]">
      
      <NuxtLink 
        v-for="(cat, index) in categories" 
        :key="cat.id" 
        :to="`/work/${cat.slug}`" 
        class="bg-white/5 border border-white/10 group cursor-pointer relative overflow-hidden rounded-none"
        :class="[
           index === 0 
             ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto'
             : 'col-span-1 aspect-square md:aspect-auto'
        ]"
        data-aos="fade-up" 
        :data-aos-delay="200 + (index * 100)"
      >
        <!-- Overlay Utama -->
        <div class="absolute inset-0 bg-[#050505]/60 md:bg-[#050505]/60 group-hover:bg-[#050505]/30 transition-colors duration-500 z-20 flex flex-col items-center justify-center p-4 md:p-6 text-center">
           
           <!-- KONTEN KHUSUS DEVELOPMENT (INDEX 0) -->
           <div v-if="index === 0" class="flex flex-col items-center justify-center gap-4 md:gap-6 group-hover:scale-[1.02] md:group-hover:scale-105 transition-transform duration-500 w-full">
               
               <h3 class="font-['Clash_Display'] font-light text-white tracking-wide leading-[1.1] text-4xl md:text-6xl"
                   v-html="customTitles[cat.slug] || (cat.name || '').toLowerCase()">
               </h3>
               <span v-if="cat.total" class="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/50">{{ cat.total }} {{ cfg.worksLabel }}</span>

               <!-- Tech Stack Glass Box -->
               <div class="w-fit max-w-[95%] md:max-w-[90%] bg-[#050505]/40 border border-white/10 backdrop-blur-md px-3 py-2 md:px-5 md:py-2.5 flex flex-wrap justify-center items-center gap-2 md:gap-4 shadow-[0_0_20px_rgba(176,132,255,0.1)] group-hover:border-white/20 transition-all duration-500">
                 <template v-for="(iconSvg, i) in devIcons" :key="i">
                   <span v-html="iconSvg" class="opacity-100 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500"></span>
                 </template>
               </div>

           </div>

           <!-- KONTEN UNTUK PHOTO/VIDEO (INDEX 1 & 2) DENGAN CUSTOM SVG -->
           <div v-else class="flex flex-col items-center justify-center gap-2 md:gap-3 group-hover:scale-[1.02] md:group-hover:scale-105 transition-transform duration-500 w-full">
               
               <!-- Custom SVG Video (Clapper) -->
               <svg v-if="cat.slug === 'videography'" class="h-6 md:h-8 w-auto text-white/40 group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15L10 18v-6l5.5 3zm-.964-6l-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z"/>
               </svg>

               <!-- Custom SVG Photo (Carousel Rounded) -->
               <svg v-if="cat.slug === 'photography'" class="h-6 md:h-8 w-auto text-white/40 group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M16 3H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M2 7v10c0 1.103.897 2 2 2V5c-1.103 0-2 .897-2 2m18-2v14c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2"/>
               </svg>

               <h3 class="font-['Clash_Display'] font-light text-white tracking-wide leading-[1.1] text-2xl md:text-3xl"
                   v-html="customTitles[cat.slug] || (cat.name || '').toLowerCase()">
               </h3>
               <span v-if="cat.total" class="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/50">{{ cat.total }} {{ cfg.worksLabel }}</span>

           </div>
           
        </div>

        <!-- Gambar Bento dari Supabase -->
        <div class="absolute inset-0 pointer-events-none z-10">
          <NuxtImg :src="cat.bento_image_url || (index === 0 ? 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=1000&auto=format&fit=crop' : index === 1 ? 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop')" width="900" sizes="sm:100vw md:700px" 
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