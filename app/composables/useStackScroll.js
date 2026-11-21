// Posisi gulir untuk panel bertumpuk di beranda. Tiap panel (.stack-panel) berada
// di aliran normal, jadi posisi awalnya = jumlah tinggi panel sebelumnya. Cara ini
// tidak bergantung pada kelipatan tinggi layar, jadi aman saat panel ditambah/dibuang.
export const useStackScroll = () => {
  const panelFor = (id) => document.getElementById(id)?.closest('.stack-panel') ?? null

  const panelY = (panel) => {
    let y = 0
    for (let s = panel.previousElementSibling; s; s = s.previousElementSibling) y += s.offsetHeight
    return y
  }

  const scrollToSection = (id) => {
    const panel = panelFor(id)
    const top = id === 'contact-section'
      ? document.documentElement.scrollHeight
      : (panel ? panelY(panel) : 0)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Bagian yang sedang "dipegang" pembaca: yang awalnya sudah lewat setengah layar
  const activeSectionId = (ids) => {
    const y = window.scrollY + window.innerHeight * 0.5
    let active = ids[0]
    for (const id of ids) {
      const panel = panelFor(id)
      if (panel && panelY(panel) <= y) active = id
    }
    return active
  }

  return { scrollToSection, activeSectionId }
}
