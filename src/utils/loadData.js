// src/utils/loadData.js
export async function loadData(slug = process.env.REACT_APP_RESTAURANT || 'default') {
  try {
    const carta = await import(`../data/${slug}/carta.json`);
    const salsas = await import(`../data/${slug}/salsas.json`).catch(() => ({ default: [] }));
    const entradas = await import(`../data/${slug}/entradas.json`).catch(() => ({ default: [] }));
    const cocina = await import(`../data/${slug}/cocina.json`).catch(() => ({ default: [] }));
    const meta = await import(`../data/${slug}/meta.json`).catch(() => ({ default: {} }));
    return {
      carta: carta.default || carta,
      salsas: salsas.default || salsas,
      entradas: entradas.default || entradas,
      cocina: cocina.default || cocina,
      meta: meta.default || meta
    };
  } catch (err) {
    console.error('Error cargando data para', slug, err);
    // fallback a default si existe
    if (slug !== 'default') return loadData('default');
    throw err;
  }
}