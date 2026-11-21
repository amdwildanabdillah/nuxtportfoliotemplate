<script setup>
const { site, profile, socials, hero } = usePortfolioConfig()
const portfolio = usePortfolio()
const featured = portfolio.featured
// Dimuat di server supaya project unggulan sudah ada di HTML pertama
await useAsyncData('featured-dev', featured, { default: () => [] })
// Experience: ditampilkan bila diaktifkan di config dan ada isinya
const { experience } = usePortfolioConfig()
const { data: expItems } = await useAsyncData('experiences', portfolio.experiences, { default: () => [] })
const showExperience = computed(() => experience.show && expItems.value.length > 0)

useHead({
  link: [{ rel: 'canonical', href: site.url }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: profile.name,
        url: site.url,
        image: site.url + site.ogImage,
        jobTitle: profile.jobTitle,
        sameAs: socials.map(s => s.url),
      },
    }),
  }],
})
</script>

<template>
  <div>
    <!-- Efek Glow -->
    <div class="ambient-glow glow-purple fixed pointer-events-none z-[100]"></div>
    <div class="ambient-glow glow-cyan fixed pointer-events-none z-[100]"></div>

    <AppNavbar />

    <!-- Panel bertumpuk: tiap panel menempel, panel berikutnya naik menutupinya (CSS murni, lihat app.vue) -->
    <main class="stack-root relative bg-[#050505]">
      <div class="stack-panel z-10"><HeroSection /></div>
      <div class="stack-panel z-20 md:shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"><FeaturedProjects /></div>
      <div class="stack-panel z-30 md:shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"><WorkSection /></div>
      <div v-if="showExperience" class="stack-panel stack-flow z-[35] md:shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"><ExperienceSection /></div>
      <div class="stack-panel z-40 md:shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"><AboutSection /></div>
      <div class="stack-panel stack-last z-50 md:shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"><ContactSection /></div>
    </main>

  </div>
</template>
