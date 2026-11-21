// Satu pintu untuk semua data portofolio. Komponen cukup memanggil fungsi di sini;
// asal datanya ditentukan oleh `mode` di site.config.ts:
//   'local'    → dibaca dari site.config.ts
//   'supabase' → dibaca dari database Supabase
// Panggil usePortfolio() di bagian <script setup> (bukan di dalam fungsi async).
import siteConfig from '~~/site.config'
import { buildLocalData } from '~/utils/localData'

export const useSiteConfig = () => siteConfig

export const usePortfolio = () => {
  const isSupabase = siteConfig.mode === 'supabase'
  const supabase = isSupabase ? useSupabaseClient() : null
  const local = isSupabase ? null : buildLocalData(siteConfig)

  const byOrder = (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)

  // Daftar kategori + jumlah karya aktif di tiap kategori
  const categories = async () => {
    if (!isSupabase) {
      return local.categories.map(c => ({
        ...c, total: local.projects.filter(p => p.main_category_id === c.id).length,
      }))
    }
    const [{ data, error }, { data: rows }] = await Promise.all([
      supabase.from('main_categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('projects').select('main_category_id').eq('is_archived', false),
    ])
    if (error) throw error
    const counts = {}
    ;(rows || []).forEach(r => { counts[r.main_category_id] = (counts[r.main_category_id] || 0) + 1 })
    return (data || []).map(c => ({ ...c, total: counts[c.id] || 0 }))
  }

  // Satu kategori beserta project-nya (halaman /work/[slug])
  const categoryWithProjects = async (slug) => {
    if (!isSupabase) {
      const cats = local.categories
      const current = cats.find(c => c.slug === slug) || null
      const list = current
        ? local.projects.filter(p => p.main_category_id === current.id).sort(byOrder)
        : []
      return { categories: cats, currentCategory: current, projects: list }
    }
    const { data: catData, error: catErr } = await supabase
      .from('main_categories').select('*').order('sort_order', { ascending: true })
    if (catErr) throw catErr
    const cats = catData || []
    const current = cats.find(c => c.slug === slug) || null
    if (!current) return { categories: cats, currentCategory: null, projects: [] }

    const cols = current.layout_type === 'development'
      ? 'id, slug, title, desc_short, cover_url, cover_type, tech_stack, sort_order, sub_categories(name)'
      : '*, project_media(media_url, sort_order), sub_categories(name)'
    const { data, error } = await supabase
      .from('projects').select(cols)
      .eq('main_category_id', current.id).eq('is_archived', false)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) throw error
    return { categories: cats, currentCategory: current, projects: data || [] }
  }

  // Satu project (halaman detail)
  const project = async (catSlug, projectSlug) => {
    if (!isSupabase) {
      const cat = local.categories.find(c => c.slug === catSlug)
      const proj = local.projects.find(p => p.slug === projectSlug)
      if (!cat || !proj || proj.main_category_id !== cat.id) return null
      return { cat, project: { ...proj, gallery: proj.project_media.map(m => m.media_url) } }
    }
    const [{ data: cat }, { data: proj }] = await Promise.all([
      supabase.from('main_categories').select('id, name, slug').eq('slug', catSlug).maybeSingle(),
      supabase.from('projects')
        .select('*, project_media(media_url, sort_order), sub_categories(name)')
        .eq('slug', projectSlug).eq('is_archived', false).maybeSingle(),
    ])
    if (!cat || !proj || proj.main_category_id !== cat.id) return null
    const gallery = (proj.project_media || []).sort(byOrder).map(m => m.media_url)
    return { cat, project: { ...proj, gallery } }
  }

  // Project unggulan di beranda (kategori development)
  const featured = async () => {
    const max = siteConfig.featured?.maxItems || 3
    if (!isSupabase) {
      const dev = local.projects.filter(p => p.main_category_id === 'development' || p.main_category_id === local.categories.find(c => c.layout_type === 'development')?.id)
      const picked = dev.filter(p => p.is_featured)
      return (picked.length ? picked : dev).sort(byOrder).slice(0, max)
    }
    try {
      const { data: cat } = await supabase.from('main_categories').select('id').eq('slug', 'development').maybeSingle()
      if (!cat) return []
      const cols = 'id, slug, title, cover_url, desc_short, tech_stack, sub_categories(name)'
      const base = () => supabase.from('projects').select(cols)
        .eq('main_category_id', cat.id).eq('is_archived', false)
      const picked = await base().eq('is_featured', true)
        .order('sort_order', { ascending: true }).order('created_at', { ascending: false }).limit(max)
      if (!picked.error && picked.data?.length) return picked.data
      const { data, error } = await base()
        .order('sort_order', { ascending: true }).order('created_at', { ascending: false }).limit(max)
      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Failed to load featured projects:', err)
      return []
    }
  }

  // Email kontak & link tambahan (di mode supabase bisa diubah lewat /admin/settings)
  const settings = async () => {
    const base = { contact_email: siteConfig.profile.email, portfolio_url: '', socials: siteConfig.socials }
    if (!isSupabase) return base
    try {
      const { data } = await supabase.from('site_settings')
        .select('contact_email, portfolio_url').eq('id', 1).maybeSingle()
      const { data: links } = await supabase.from('social_links')
        .select('platform, url').eq('is_active', true).order('sort_order', { ascending: true })
      return {
        contact_email: data?.contact_email || base.contact_email,
        portfolio_url: data?.portfolio_url || '',
        socials: links?.length ? links : base.socials,
      }
    } catch {
      return base
    }
  }

  return { isSupabase, categories, categoryWithProjects, project, featured, settings }
}
