/**
 * ============================================================
 *  SITE CONFIG  —  satu-satunya file yang perlu kamu edit
 *  The ONLY file you need to edit to make this site yours.
 * ============================================================
 *
 *  Cara pakai (singkat):
 *  1. Ganti semua teks di bawah ini dengan milikmu.
 *  2. Taruh gambar di folder /public, lalu tulis path-nya (contoh: '/foto-saya.webp').
 *  3. Jalankan `npm run dev` untuk melihat hasilnya.
 *
 *  Panduan lengkap ada di README.md
 */

export default {
  // ──────────────────────────────────────────────────────────
  // 1. MODE DATA  (pilih salah satu)
  //
  //   'local'    → semua isi (project, kategori, kontak) dibaca dari file ini.
  //                Tidak perlu database / akun apa pun. Paling gampang.
  //
  //   'supabase' → project dikelola lewat halaman /admin dan disimpan di
  //                database Supabase (gratis). Perlu setup sekali, ikuti README.
  // ──────────────────────────────────────────────────────────
  mode: 'local' as 'local' | 'supabase',

  // ──────────────────────────────────────────────────────────
  // 2. INFO SITUS (untuk Google, WhatsApp, Discord, dll.)
  // ──────────────────────────────────────────────────────────
  site: {
    url: 'https://example.com', // alamat websitemu (tanpa garis miring di akhir)
    title: 'Your Name - Creative Portfolio',
    description: 'Web developer and visual storyteller based in Your City.',
    language: 'en', // 'id' untuk Indonesia, 'en' untuk Inggris
    ogImage: '/og-image.png', // gambar preview saat link dibagikan (ukuran 1200x630)
    themeColor: '#050505',
    googleAnalyticsId: '', // contoh: 'G-XXXXXXXXXX' — kosongkan kalau tidak pakai
  },

  // ──────────────────────────────────────────────────────────
  // 3. PROFIL
  // ──────────────────────────────────────────────────────────
  profile: {
    name: 'Your Name',
    location: 'Your City',
    jobTitle: 'Web Developer & Creative',
    email: 'hello@example.com',
    whatsapp: '', // format internasional tanpa + atau spasi, contoh: '6281234567890'. Kosong = tombol WA disembunyikan
  },

  // ──────────────────────────────────────────────────────────
  // 4. NAVBAR
  // ──────────────────────────────────────────────────────────
  nav: {
    logo: 'YOURNAME.',
    connectLabel: 'Connect',
    // Link tambahan di navbar (CV, deck, dll.). Hapus isinya kalau tidak perlu.
    extraLinks: [
      // { label: 'Resume', url: 'https://example.com/cv.pdf' },
    ] as { label: string; url: string }[],
  },

  // ──────────────────────────────────────────────────────────
  // 5. HERO (bagian paling atas)
  // ──────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Your Name · Your City',
    line1: 'Visuals by Heart.',
    line2: 'Logic by Code.', // baris kedua yang diberi highlight
    description: 'I build websites and apps, then capture their story through photo and video.',
    primaryButton: 'See Projects', // menggulir ke bagian project
    secondaryButton: 'Let\'s Talk', // membuka WhatsApp (butuh profile.whatsapp)
    tagline: 'Web Developer | Photographer | Videographer',
  },

  // ──────────────────────────────────────────────────────────
  // 6. BAGIAN-BAGIAN HALAMAN
  // ──────────────────────────────────────────────────────────
  featured: {
    eyebrow: 'Selected Work',
    titleBefore: 'Built &',
    titleHighlight: 'shipped.',
    linkLabel: 'All development projects',
    emptyText: 'No featured projects yet.',
    maxItems: 3,
  },

  work: {
    titleBefore: 'Visual',
    titleHighlight: 'Narratives.',
    worksLabel: 'works', // tulisan di samping jumlah karya, mis. "5 works"
  },

  about: {
    badge: 'Who Am I?',
    headingBefore: 'Storyteller',
    headingHighlight: '& Developer.',
    photo: '/placeholder/profile.webp', // ganti dengan fotomu (rasio 4:5 paling pas)
    // Tiap item = satu paragraf
    paragraphs: [
      'Hi, I\'m Your Name. Write a short introduction about yourself here: what you do, what you care about, and what drives your work.',
      'Add a second paragraph about your studio, your company, or how you like to work with clients.',
    ],
    // Ikon teknologi. `key` harus salah satu dari daftar di README (bagian "Daftar ikon teknologi").
    techGroups: [
      { label: 'Dev', tools: [
        { key: 'vue', name: 'Vue' }, { key: 'nuxt', name: 'Nuxt' }, { key: 'react', name: 'React' },
        { key: 'next', name: 'Next.js' }, { key: 'tailwind', name: 'Tailwind CSS' }, { key: 'supabase', name: 'Supabase' },
      ] },
      { label: 'Tools', tools: [
        { key: 'git', name: 'Git' }, { key: 'github', name: 'GitHub' },
        { key: 'vscode', name: 'VS Code' }, { key: 'vercel', name: 'Vercel' },
      ] },
      { label: 'Design', tools: [
        { key: 'figma', name: 'Figma' }, { key: 'photoshop', name: 'Photoshop' }, { key: 'lightroom', name: 'Lightroom' },
      ] },
    ] as { label: string; tools: { key: string; name: string }[] }[],
  },

  contact: {
    eyebrow: 'Let\'s Collaborate',
    headingBefore: 'ready to make something',
    headingHighlight: 'amazing?',
    ctaLabel: 'START A PROJECT',
    footerTagline: 'Bridging the gap between people and digital experience through visuals and code.',
    venturesLabel: 'My Ventures', // kosongkan `ventures` kalau tidak perlu
    ventures: [
      // { label: 'My Studio', url: 'https://example.com', color: '#00d2ff' },
    ] as { label: string; url: string; color?: string }[],
    copyright: 'All rights reserved.',
  },

  // Ikon sosial media di footer. `platform` = nama ikon (github, instagram, linkedin, youtube,
  // behance, discord, x, tiktok, facebook, telegram, whatsapp, dribbble, twitch, spotify, medium)
  socials: [
    { platform: 'github', url: 'https://github.com/your-username' },
    { platform: 'instagram', url: 'https://instagram.com/your-username' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/your-username' },
    // { platform: 'youtube', url: 'https://youtube.com/@your-username' },
  ] as { platform: string; url: string }[],

  // ──────────────────────────────────────────────────────────
  // 7. KATEGORI KARYA
  //    Tiga tata letak tersedia: 'development', 'videography', 'photography'.
  //    Kategori pertama tampil besar di beranda. Boleh kamu ubah nama / gambar / urutannya.
  // ──────────────────────────────────────────────────────────
  categories: [
    { slug: 'development', name: 'Development', layout: 'development', image: '/placeholder/cover-1.webp',
      description: 'Translating complex ideas into functional, clean, and seamless digital solutions.' },
    { slug: 'videography', name: 'Videography', layout: 'videography', image: '/placeholder/cover-2.webp',
      description: 'A blend of moving images and audio to bring raw emotion into every narrative.' },
    { slug: 'photography', name: 'Photography', layout: 'photography', image: '/placeholder/cover-3.webp',
      description: 'A single frame, enough to convey feelings and stories that words can\'t capture.' },
  ] as { slug: string; name: string; layout: 'development' | 'videography' | 'photography'; image: string; description?: string }[],

  // ──────────────────────────────────────────────────────────
  // 8. PROJECT  (hanya dipakai di mode 'local')
  //    Salin satu blok { ... } untuk menambah project baru.
  //
  //    category   : harus sama dengan `slug` salah satu kategori di atas
  //    cover      : gambar (path di /public atau URL penuh). Untuk video: link YouTube.
  //    coverType  : 'image' | 'youtube'   (videography biasanya 'youtube')
  //    gallery    : daftar gambar tambahan (opsional)
  //    featured   : true = tampil di bagian "Selected Work" di beranda
  // ──────────────────────────────────────────────────────────
  projects: [
    {
      title: 'Sample Web App',
      slug: 'sample-web-app',
      category: 'development',
      subCategory: 'Web App',
      cover: '/placeholder/cover-1.webp',
      coverType: 'image',
      short: 'A short one or two sentence summary shown on the project card.',
      long: 'A longer description for the project page.\nExplain the problem, your approach, and the result. Line breaks are kept.',
      techStack: ['Nuxt', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/your-username/your-repo',
      client: 'Client or Company Name',
      featured: true,
      gallery: [] as string[],
    },
    {
      title: 'Sample Mobile App',
      slug: 'sample-mobile-app',
      category: 'development',
      subCategory: 'Mobile App',
      cover: '/placeholder/cover-2.webp',
      coverType: 'image',
      short: 'Another example project. Replace it with your own work.',
      long: '',
      techStack: ['Flutter', 'Firebase'],
      liveUrl: '',
      githubUrl: '',
      client: '',
      featured: true,
      gallery: [] as string[],
    },
    {
      title: 'Sample Landing Page',
      slug: 'sample-landing-page',
      category: 'development',
      subCategory: 'Website',
      cover: '/placeholder/cover-3.webp',
      coverType: 'image',
      short: 'A third example so the featured row looks complete.',
      long: '',
      techStack: ['Vue', 'Tailwind CSS'],
      liveUrl: '',
      githubUrl: '',
      client: '',
      featured: true,
      gallery: [] as string[],
    },
    {
      title: 'Sample Video',
      slug: 'sample-video',
      category: 'videography',
      subCategory: 'Cinematic',
      cover: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // ganti dengan link YouTube-mu
      coverType: 'youtube',
      short: 'Paste a YouTube link as the cover to show a video project.',
      long: '',
      techStack: [] as string[],
      liveUrl: '',
      githubUrl: '',
      client: '',
      featured: false,
      gallery: [] as string[],
    },
    {
      title: 'Sample Photo',
      slug: 'sample-photo',
      category: 'photography',
      subCategory: 'Portrait',
      cover: '/placeholder/cover-3.webp',
      coverType: 'image',
      short: 'Photography projects use a masonry grid.',
      long: '',
      techStack: [] as string[],
      liveUrl: '',
      githubUrl: '',
      client: '',
      featured: false,
      gallery: [] as string[],
    },
  ],

  // ──────────────────────────────────────────────────────────
  // 9. FOOTER WATERMARK
  //    Terima kasih kalau kamu membiarkan ini menyala :)
  //    Lisensi MIT mengizinkanmu menghapusnya — set `show: false`.
  // ──────────────────────────────────────────────────────────
  watermark: {
    show: true,
    text: 'Template by',
    label: 'Wildan · Vixel Creative',
    url: 'https://vixelcreative.codes',
  },
}
