export interface BlogPost {
  id: string;
  title: string;
  publishedDate: string;
  category: string;
  tags: string[];
  summary: string;
  contentHtml: string;
  coverImage: string;
  readingTimeMinutes: number;
  originalUrl: string;
  author: string;
  isLiveFromBlogger?: boolean;
}

const FALLBACK_IMAGES = [
  'https://i.imgur.com/s65N47d.jpeg',
  'https://i.imgur.com/tQQRD6x.jpeg',
  'https://i.imgur.com/d8AbAg9.jpeg',
  'https://i.imgur.com/0xAYDbQ.jpeg',
  'https://i.imgur.com/02WkVzL.jpeg',
  'https://i.imgur.com/lglJcJo.jpeg'
];

/**
 * Fallback articles used only while the live feed is loading or if offline.
 */
export const CURATED_BLOG_POSTS: BlogPost[] = [
  {
    id: 'facon-geometria-guardia-criolla',
    title: 'El Facón: Prolongación de la Mano del Gaucho y Geometría de la Guardia',
    publishedDate: 'ARCHIVO HISTÓRICO',
    category: 'Armas Gauchas',
    tags: ['Facón', 'Guardia Criolla', 'Oplotecología'],
    summary:
      'Estudio técnico e histórico sobre el facón rioplatense: tipología de hojas, gavilanes en "S" o en "U", empuñadura tradicional y equilibrio en el duelo criollo.',
    coverImage: 'https://i.imgur.com/s65N47d.jpeg',
    readingTimeMinutes: 5,
    originalUrl: 'https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d',
    author: 'Jorge Prina',
    contentHtml: `
      <p>Para el hombre de nuestras llanuras entre los siglos XVIII y XIX, el facón jamás fue un simple objeto accesorio: era herramienta de trabajo cotidiano, cubierto en el fogón y, llegado el momento de defender la vida o el honor, la prolongación natural de su propio brazo.</p>
      <p>A diferencia de los cuchillos meramente utilitarios como el verijero, el facón de combate presenta una hoja de dimensiones generosas —habitualmente entre los treinta y cuarenta y cinco centímetros, y aún más en el temido caronero— acompañada por una guarda o gavilán en forma de "S" o de "U" cuya función marcial es decisiva: detener el deslizamiento del hierro adversario y permitir el control de la hoja contraria en el cruce.</p>
      <h3>La Empuñadura y el Filo hacia Arriba</h3>
      <p>En la escuela tradicional rioplatense, el facón se empuña con firmeza pero sin rigidez muerta, permitiendo el juego de muñeca para el hachazo, el revés y la estocada. El uso frecuente del filo orientado hacia arriba o en diagonal responde a la biomecánica del quite y a la necesidad de abrir la guardia del oponente desde abajo hacia arriba.</p>
    `
  },
  {
    id: 'arte-del-visteo-tizon-duelo-criollo',
    title: 'El Arte del Visteo: Tizón, Compadreada y Entrenamiento de Reflejos en la Llanura',
    publishedDate: 'ARCHIVO HISTÓRICO',
    category: 'Visteo y Técnica',
    tags: ['Visteo', 'Duelo Criollo', 'Entrenamiento'],
    summary:
      'La tradición del visteo con tizón tiznado, caña o dedo tiznado con hollín de pava como método autóctono de velocidad, vista y distancia.',
    coverImage: 'https://i.imgur.com/0xAYDbQ.jpeg',
    readingTimeMinutes: 4,
    originalUrl: 'https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d',
    author: 'Jorge Prina',
    contentHtml: `
      <p>Vistear consistía en combatir de manera simulada empleando una vara, una caña, un hueso, el cabo del rebenque o incluso un palo quemado en el fogón —el célebre tizón— o el dedo pasado por el hollín de la pava o la grasa del asado. Cada toque certero dejaba una marca negra e inapelable sobre la ropa o el cuerpo del compañero.</p>
      <p>El visteo cumplía tres funciones esenciales en la cultura de campaña: era un juego de camaradería alrededor del fogón, un método de adiestramiento marcial sumamente exigente para educar el ojo y los desplazamientos, y en ocasiones una forma caballeresca de dirimir supremacías sin derramar sangre.</p>
    `
  },
  {
    id: 'el-poncho-escudo-textil-mano-izquierda',
    title: 'El Poncho en el Duelo: Escudo Textil, Cortina de Engaño y Arma de Mano Izquierda',
    publishedDate: 'ARCHIVO HISTÓRICO',
    category: 'Visteo y Técnica',
    tags: ['Poncho', 'Armas Dobles', 'Defensa'],
    summary:
      'El poncho arrollado al antebrazo izquierdo no solo ataja cortes y estocadas: funciona como cortina visual, plomada de golpeo y trampa para envolver el hierro contrario.',
    coverImage: 'https://i.imgur.com/tQQRD6x.jpeg',
    readingTimeMinutes: 5,
    originalUrl: 'https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d',
    author: 'Jorge Prina',
    contentHtml: `
      <p>En la tradición hispanoamericana y muy especialmente en la llanura pampeana y el litoral, el combate con facón rara vez era un duelo de una sola mano. La mano izquierda, adelantada en la guardia clásica, empuñaba el poncho arrollado con una maestría que asombró a viajeros y cronistas extranjeros durante todo el siglo XIX.</p>
      <p>Al envolver el poncho de lana gruesa alrededor del antebrazo izquierdo dejando caer un faldón o fleco medido, el visteador obtenía un escudo flexible capaz de absorber hachazos y desviar estocadas.</p>
    `
  }
];

function inferCategory(labels: string[], title: string): string {
  if (labels.length > 0 && labels[0].trim()) {
    return labels[0].trim();
  }
  const combined = `${labels.join(' ')} ${title}`.toLowerCase();
  if (
    combined.includes('facón') ||
    combined.includes('facon') ||
    combined.includes('arma') ||
    combined.includes('rebenque') ||
    combined.includes('daga') ||
    combined.includes('cuchillo') ||
    combined.includes('caronero')
  ) {
    return 'Armas Gauchas';
  }
  if (
    combined.includes('visteo') ||
    combined.includes('técnica') ||
    combined.includes('tecnica') ||
    combined.includes('poncho') ||
    combined.includes('guardia') ||
    combined.includes('combate')
  ) {
    return 'Visteo y Técnica';
  }
  if (
    combined.includes('historia') ||
    combined.includes('duelo') ||
    combined.includes('siglo') ||
    combined.includes('gaucho')
  ) {
    return 'Historia y Duelos';
  }
  return 'Cultura y Tradición';
}

function sanitizeBloggerHtml(rawHtml: string): {
  cleanHtml: string;
  plainSummary: string;
  firstImage: string | null;
} {
  if (typeof window === 'undefined' || !rawHtml) {
    return { cleanHtml: rawHtml, plainSummary: '', firstImage: null };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  let firstImage: string | null = null;
  const imgs = doc.querySelectorAll('img');
  imgs.forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (
      !firstImage &&
      src &&
      !src.includes('icon') &&
      !src.includes('tracker') &&
      !src.includes('1x1')
    ) {
      firstImage = src.replace(/\/s\d+(-c)?\//, '/s1200/');
    }
    img.removeAttribute('style');
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.className =
      'my-6 mx-auto max-h-[480px] w-auto object-contain border border-gold/20 p-1.5 bg-void/80 shadow-xl rounded-sm';
  });

  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach((el) => {
    el.removeAttribute('style');
    el.removeAttribute('color');
    el.removeAttribute('face');
    el.removeAttribute('size');
    el.removeAttribute('bgcolor');
    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
      el.className = 'text-gold underline hover:text-stone-100 transition-colors';
    }
  });

  const textContent = (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  const plainSummary =
    textContent.length > 210 ? `${textContent.slice(0, 207).trim()}...` : textContent;

  return {
    cleanHtml: doc.body.innerHTML,
    plainSummary,
    firstImage
  };
}

function formatSpanishDate(isoString?: string): string {
  if (!isoString) return 'ARCHIVO HISTÓRICO';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'ARCHIVO HISTÓRICO';
  const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

interface RawBloggerEntry {
  id?: { $t?: string };
  title?: { $t?: string };
  published?: { $t?: string };
  content?: { $t?: string };
  summary?: { $t?: string };
  category?: Array<{ term?: string }>;
  link?: Array<{ rel?: string; href?: string }>;
  media$thumbnail?: { url?: string };
  author?: Array<{ name?: { $t?: string } }>;
}

interface RawBloggerFeedResponse {
  feed?: {
    openSearch$totalResults?: { $t?: string };
    entry?: RawBloggerEntry[];
  };
}

function fetchBloggerBatch(startIndex: number, maxResults = 150): Promise<{
  entries: RawBloggerEntry[];
  totalResults: number;
}> {
  return new Promise((resolve) => {
    const callbackName = `__esgrimaCriollaBloggerBatch_${startIndex}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const script = document.createElement('script');
    let settled = false;

    const cleanup = () => {
      try {
        delete (window as unknown as Record<string, unknown>)[callbackName];
      } catch {
        (window as unknown as Record<string, unknown>)[callbackName] = undefined;
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve({ entries: [], totalResults: 0 });
    }, 6500);

    (window as unknown as Record<string, unknown>)[callbackName] = (data: RawBloggerFeedResponse) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      cleanup();

      const entries = data?.feed?.entry || [];
      const totalResults = parseInt(data?.feed?.openSearch$totalResults?.$t || '0', 10) || entries.length;
      resolve({ entries, totalResults });
    };

    script.src = `https://esgrimacriolla.blogspot.com/feeds/posts/default?alt=json-in-script&start-index=${startIndex}&max-results=${maxResults}&callback=${callbackName}`;
    script.async = true;
    script.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      cleanup();
      resolve({ entries: [], totalResults: 0 });
    };

    document.body.appendChild(script);
  });
}

let cachedLivePosts: BlogPost[] | null = null;

/**
 * Fetches ALL real articles from esgrimacriolla.blogspot.com across pages via Blogger JSONP.
 */
export async function fetchBloggerPosts(): Promise<{
  posts: BlogPost[];
  isLiveConnected: boolean;
}> {
  if (cachedLivePosts && cachedLivePosts.length > 0) {
    return { posts: cachedLivePosts, isLiveConnected: true };
  }

  try {
    const firstBatch = await fetchBloggerBatch(1, 150);
    if (!firstBatch.entries.length) {
      return { posts: CURATED_BLOG_POSTS, isLiveConnected: false };
    }

    let allEntries: RawBloggerEntry[] = [...firstBatch.entries];
    const total = firstBatch.totalResults;

    // If the blog has more than 150 posts, fetch the remaining pages automatically
    let nextStart = allEntries.length + 1;
    while (nextStart <= total && nextStart <= 450) {
      const nextBatch = await fetchBloggerBatch(nextStart, 150);
      if (!nextBatch.entries.length) break;
      allEntries = [...allEntries, ...nextBatch.entries];
      nextStart += nextBatch.entries.length;
    }

    const livePosts: BlogPost[] = allEntries.map((entry, idx) => {
      const rawTitle =
        entry.title?.$t?.trim() || `Publicación N° ${idx + 1}`;
      const rawHtml = entry.content?.$t || entry.summary?.$t || '';
      const { cleanHtml, plainSummary, firstImage } = sanitizeBloggerHtml(rawHtml);

      const labels = (entry.category || [])
        .map((c) => c.term || '')
        .filter(Boolean);

      const alternateLink =
        (entry.link || []).find((l) => l.rel === 'alternate')?.href ||
        'https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d';

      const thumbUrl = entry.media$thumbnail?.url
        ? entry.media$thumbnail.url.replace(/\/s\d+(-c)?\//, '/s1200/')
        : null;

      const coverImage =
        firstImage || thumbUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

      const wordCount = plainSummary.split(/\s+/).length * 3;
      const readingTimeMinutes = Math.max(
        2,
        Math.min(15, Math.round(wordCount / 140) || 4)
      );

      return {
        id: entry.id?.$t || `blogger-post-${idx}`,
        title: rawTitle,
        publishedDate: formatSpanishDate(entry.published?.$t),
        category: inferCategory(labels, rawTitle),
        tags: labels.length > 0 ? labels : ['Esgrima Criolla'],
        summary:
          plainSummary ||
          'Artículo publicado en el blog oficial de Esgrima Criolla.',
        contentHtml: cleanHtml || `<p>${plainSummary}</p>`,
        coverImage,
        readingTimeMinutes,
        originalUrl: alternateLink,
        author: entry.author?.[0]?.name?.$t || 'Jorge Prina',
        isLiveFromBlogger: true
      };
    });

    cachedLivePosts = livePosts;
    return { posts: livePosts, isLiveConnected: true };
  } catch {
    return { posts: CURATED_BLOG_POSTS, isLiveConnected: false };
  }
}
