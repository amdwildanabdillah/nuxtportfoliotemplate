<script setup>
// SEO global: semua nilainya diambil dari site.config.ts
const { site } = usePortfolioConfig()
const img = site.ogImage.startsWith('http') ? site.ogImage : site.url + site.ogImage

useSeoMeta({
  title: site.title,
  description: site.description,
  ogType: 'website',
  ogUrl: site.url + '/',
  ogTitle: site.title,
  ogDescription: site.description,
  ogImage: img,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: img,
})
</script>

<template>
  <NuxtLoadingIndicator color="#b084ff" height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* 1. VARIABLES & ESSENTIALS */
:root {
    --bg-color: #050505;
    --primary-color: #b084ff;
}
html { scroll-padding-top: 72px; }
/* Catatan: tidak memakai scroll-behavior: smooth global. Nuxt ikut aturan itu saat
   pindah halaman, sehingga halaman baru "meluncur" dari posisi scroll lama. Lompatan
   halus untuk navbar dilakukan lewat JavaScript (useStackScroll). */
body { 
    background-color: var(--bg-color); 
    color: #ffffff; 
    font-family: 'General Sans', sans-serif; 
    overflow-x: hidden; 
    min-height: 100vh; 
}

/* 2. EFEK LATAR
   Cahaya latar memakai gradien radial, bukan filter blur raksasa: tampilannya
   hampir sama, tetapi tidak membebani GPU di HP dan PC menengah ke bawah. */
.ambient-glow { position: fixed; width: 900px; height: 900px; border-radius: 50%; z-index: -1; opacity: 0.6; pointer-events: none; }
.glow-purple { top: -300px; left: -250px; background: radial-gradient(circle, rgba(120, 58, 255, 0.4) 0%, transparent 68%); }
.glow-cyan { bottom: -300px; right: -250px; background: radial-gradient(circle, rgba(0, 255, 209, 0.3) 0%, transparent 68%); }

.text-gradient { background: linear-gradient(to right, #ffffff, var(--primary-color)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; display: inline-block; }

/* Animasi masuk di layar pertama (CSS murni, jalan sebelum JavaScript siap) */
.fade-in-up { opacity: 0; animation: fadeInUp 1s forwards; }
.fade-in-down { opacity: 0; animation: fadeInDown 1s forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
.delay-1 { animation-delay: 0.2s; } .delay-2 { animation-delay: 0.4s; } .delay-3 { animation-delay: 0.6s; } .delay-4 { animation-delay: 0.8s; }

/* 3. MUNCUL SAAT DIGULIR (menggantikan AOS; dipicu plugins/reveal.client.js) */
[data-aos-state] {
  transition:
    opacity var(--aos-duration, 1100ms) cubic-bezier(0.25, 0.8, 0.25, 1),
    transform var(--aos-duration, 1100ms) cubic-bezier(0.25, 0.8, 0.25, 1),
    filter var(--aos-duration, 1100ms) cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-delay: var(--aos-delay, 0ms);
}
[data-aos-state="out"] { opacity: 0; filter: blur(14px); will-change: opacity, transform, filter; }
[data-aos="fade-up"][data-aos-state="out"] { transform: translate3d(0, 48px, 0); }
[data-aos="fade-down"][data-aos-state="out"] { transform: translate3d(0, -48px, 0); }
[data-aos="fade-right"][data-aos-state="out"] { transform: translate3d(-48px, 0, 0); }
[data-aos="zoom-in"][data-aos-state="out"] { transform: scale(0.9); }
:where([data-aos-state="in"]) { opacity: 1; transform: none; filter: none; }

/* 4. PANEL BERTUMPUK
   Di layar lebar dan cukup tinggi, tiap panel menempel di atas (sticky) dan
   panel berikutnya naik menutupinya. Di HP atau layar pendek (laptop dengan
   dock/toolbar), panel mengalir biasa supaya isinya tidak terpotong. */
.stack-panel { position: relative; min-height: 100svh; background: #050505; transform-origin: top; }
@media (min-width: 768px) and (min-height: 720px) {
  .stack-panel { position: sticky; top: 0; height: 100svh; overflow: hidden; }
  .stack-panel.stack-last { height: auto; overflow: visible; }
}
/* Panel yang ditutup mengecil dan memudar (dulu GSAP ScrollTrigger). Memakai
   scroll-driven animation CSS; browser yang belum mendukung hanya melewatkan efek ini. */
@keyframes stack-away { to { transform: scale(0.6); opacity: 0.8; } }
@media (min-width: 768px) and (min-height: 720px) {
  @supports (animation-timeline: view()) {
    .stack-root { timeline-scope: --st2, --st3, --st4, --st5; }
    .stack-panel:nth-child(2) { view-timeline: --st2 block; }
    .stack-panel:nth-child(3) { view-timeline: --st3 block; }
    .stack-panel:nth-child(4) { view-timeline: --st4 block; }
    .stack-panel:nth-child(5) { view-timeline: --st5 block; }
    .stack-panel:nth-child(1):not(.stack-last) { animation: stack-away linear both; animation-timeline: --st2; animation-range: entry 0% entry 100%; }
    .stack-panel:nth-child(2):not(.stack-last) { animation: stack-away linear both; animation-timeline: --st3; animation-range: entry 0% entry 100%; }
    .stack-panel:nth-child(3):not(.stack-last) { animation: stack-away linear both; animation-timeline: --st4; animation-range: entry 0% entry 100%; }
    .stack-panel:nth-child(4):not(.stack-last) { animation: stack-away linear both; animation-timeline: --st5; animation-range: entry 0% entry 100%; }
  }
}
</style>
