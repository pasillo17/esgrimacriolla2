import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Clock,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import {
  BlogPost,
  CURATED_BLOG_POSTS,
  fetchBloggerPosts,
} from '../services/bloggerService';

interface BibliotecaBlogProps {
  onBack: () => void;
  initialPostId?: string | null;
}

/**
 * Biblioteca Histórica & Archivo de Artículos del Maestro Jorge Prina
 */
const BibliotecaBlog: React.FC<BibliotecaBlogProps> = ({
  onBack,
  initialPostId = null,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(CURATED_BLOG_POSTS);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostId, setActivePostId] = useState<string | null>(initialPostId);

  useEffect(() => {
    setActivePostId(initialPostId);
  }, [initialPostId]);

  useEffect(() => {
    let mounted = true;
    setIsLoadingFeed(true);
    fetchBloggerPosts().then(({ posts: fetched }) => {
      if (mounted) {
        if (fetched.length > 0) {
          setPosts(fetched);
        }
        setIsLoadingFeed(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePostId]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category))).filter(Boolean);
    return ['Todos', ...unique.slice(0, 8)];
  }, [posts]);

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) || null,
    [posts, activePostId]
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat =
        selectedCategory === 'Todos' || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const hay = `${post.title} ${post.summary} ${post.tags.join(' ')} ${post.category}`.toLowerCase();
      return matchesCat && hay.includes(q);
    });
  }, [posts, selectedCategory, searchQuery]);

  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return posts.filter((p) => p.id !== activePost.id).slice(0, 3);
  }, [posts, activePost]);

  const showFeaturedLead =
    selectedCategory === 'Todos' && !searchQuery.trim() && filteredPosts.length > 1;
  const featuredPost = showFeaturedLead ? filteredPosts[0] : null;
  const gridPosts = showFeaturedLead ? filteredPosts.slice(1) : filteredPosts;

  // --- LECTURA CÓMODA DE ARTÍCULO ---
  if (activePost) {
    return (
      <div className="min-h-screen bg-void text-stone-200 selection:bg-gold selection:text-void paper-texture pt-20 md:pt-28 pb-24 overflow-x-hidden relative">
        <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Barra superior de lectura */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 md:mb-8 pb-4 border-b border-gold/15">
            <button
              type="button"
              onClick={() => setActivePostId(null)}
              className="min-h-[44px] group inline-flex items-center gap-2 text-stone-200 hover:text-gold transition-colors cursor-pointer font-display text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-gold" />
              <span>Volver a la Biblioteca</span>
            </button>

            <a
              href={activePost.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-gold hover:text-stone-100 transition-colors font-sans text-sm font-medium"
            >
              <span>Publicación original</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Artículo */}
          <article className="bg-card-depth border border-gold/15 p-6 sm:p-10 md:p-12 rounded-lg mb-12 shadow-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-sans text-stone-300 mb-3">
              <span className="text-gold font-semibold">{activePost.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activePost.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold/80" />
                {activePost.readingTimeMinutes} min de lectura
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight leading-tight mb-4">
              {activePost.title}
            </h1>

            <p className="text-sm text-stone-300 font-sans mb-7 pb-6 border-b border-gold/15">
              Escrito por <span className="text-stone-100 font-semibold">{activePost.author}</span> · Archivo de Esgrima Criolla
            </p>

            {/* Imagen de portada */}
            <div className="relative w-full aspect-video mb-8 overflow-hidden bg-black border border-gold/15 rounded-md">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cuerpo de lectura */}
            <div
              className="font-sans text-stone-200 text-base sm:text-[1.0625rem] leading-relaxed sm:leading-[1.85] space-y-5
                [&>h3]:font-display [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:text-gold [&>h3]:pt-5 [&>h3]:pb-1 [&>h3]:font-bold [&>h3]:tracking-tight
                [&>blockquote]:my-7 [&>blockquote]:px-5 [&>blockquote]:py-4 [&>blockquote]:border-y [&>blockquote]:border-gold/25 [&>blockquote]:text-stone-100 [&>blockquote]:text-base [&>blockquote]:sm:text-lg [&>blockquote]:font-medium"
              dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
            />

            <div className="mt-10 pt-6 border-t border-gold/15 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-300">
              <span>Archivo histórico recuperado del blog original</span>
              <a
                href={activePost.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline inline-flex items-center gap-1.5 font-semibold"
              >
                <span>Ver entrada en Blogger</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* Más artículos para seguir leyendo */}
          {relatedPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
                  Seguir leyendo
                </h4>
                <button
                  type="button"
                  onClick={() => setActivePostId(null)}
                  className="text-gold font-display text-sm font-semibold hover:underline cursor-pointer"
                >
                  Ver todos ({posts.length})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedPosts.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setActivePostId(rel.id)}
                    className="text-left bg-card-depth border border-gold/15 p-5 rounded-md cursor-pointer hover:border-gold/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs text-gold font-medium block mb-1.5">
                        {rel.category} · {rel.publishedDate}
                      </span>
                      <h5 className="font-display text-base font-bold text-stone-100 group-hover:text-gold transition-colors mb-3 leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                    <span className="text-xs font-semibold text-gold inline-flex items-center gap-1">
                      Leer artículo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL DE LA BIBLIOTECA ---
  return (
    <div className="min-h-screen bg-void text-stone-200 selection:bg-gold selection:text-void paper-texture pt-20 md:pt-28 pb-24 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Cabecera amena con historia del archivo */}
        <RevealOnScroll>
          <div className="mb-10 md:mb-12">
            <button
              type="button"
              onClick={onBack}
              className="mb-6 min-h-[44px] group inline-flex items-center gap-2 text-stone-300 hover:text-gold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-gold group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-display font-semibold">
                Volver al inicio
              </span>
            </button>

            <div className="max-w-3xl mb-7">
              <p className="text-xs sm:text-sm text-gold uppercase tracking-[0.14em] font-semibold mb-2">
                Archivo Histórico y Cultural
              </p>
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-stone-100 tracking-tight leading-[1.08] mb-3">
                Biblioteca de Esgrima Criolla
              </h1>
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
                Un espacio de lectura para conocer las raíces, la historia y el pensamiento detrás de nuestra disciplina.
              </p>
            </div>

            {/* Nota editorial sobre el origen del blog de Jorge Prina */}
            <div className="bg-card-depth border border-gold/25 rounded-lg p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <p className="font-display text-sm font-semibold text-gold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>De aquel primer blog a nuestra nueva casa</span>
                  </p>
                  <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed">
                    Esta biblioteca nació hace muchos años en un blog personal donde el <strong className="text-stone-100 font-semibold">Maestro Jorge Prina</strong> empezó a escribir y publicar artículos para difundir la Esgrima Criolla, compartir sus investigaciones y mantener viva la cultura del facón cuando casi no existía material al alcance del público.
                  </p>
                  <p className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed">
                    Para que todo ese legado no se pierda y sea más fácil de recorrer, reunimos y trajimos aquellos escritos a esta nueva página: un archivo abierto, ordenado y pensado para leer con calma.
                  </p>
                </div>

                <div className="lg:border-l lg:border-gold/15 lg:pl-6 flex flex-row lg:flex-col items-center lg:items-start justify-between gap-3 shrink-0">
                  <div>
                    <p className="font-display text-2xl font-bold text-stone-100 tabular-nums">
                      {posts.length}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-300">
                      Artículos recuperados
                    </p>
                  </div>
                  <a
                    href="https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gold hover:underline whitespace-nowrap"
                  >
                    <span>Ver blog original</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Barra limpia de búsqueda y categorías */}
        <div className="mb-10 flex flex-col gap-4 pb-6 border-b border-gold/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema (ej. facón, poncho, visteo)..."
                className="w-full min-h-[46px] pl-10 pr-4 py-2.5 bg-card-depth border border-gold/25 rounded-md text-stone-100 placeholder-stone-400 font-sans text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <span className="text-xs sm:text-sm text-stone-300 font-sans">
              {isLoadingFeed
                ? 'Actualizando archivo...'
                : `Mostrando ${filteredPosts.length} ${filteredPosts.length === 1 ? 'artículo' : 'artículos'}`}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap sm:flex-wrap no-scrollbar pb-1 sm:pb-0">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[38px] px-3.5 py-1.5 font-display text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gold text-void'
                      : 'bg-card-depth text-stone-200 border border-gold/20 hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estado vacío */}
        {filteredPosts.length === 0 ? (
          <div className="bg-card-depth border border-gold/15 max-w-xl mx-auto p-10 text-center my-10 rounded-lg">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-100 mb-2">
              No encontramos artículos con esa búsqueda
            </h3>
            <p className="font-sans text-stone-300 text-sm sm:text-base mb-6">
              Probá con otra palabra o volvé a ver toda la colección.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="min-h-[44px] px-6 py-2.5 bg-gold text-void font-display text-sm font-bold rounded-md cursor-pointer"
            >
              Ver todos los artículos
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Artículo Destacado (para entrar leyendo con ganas) */}
            {featuredPost && (
              <article
                onClick={() => setActivePostId(featuredPost.id)}
                className="bg-card-depth border border-gold/25 hover:border-gold/55 rounded-lg overflow-hidden cursor-pointer group transition-all shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[300px] bg-black overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-sans text-stone-300 mb-3">
                      <span className="text-gold font-semibold">Lectura recomendada</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{featuredPost.category}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{featuredPost.readingTimeMinutes} min</span>
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100 group-hover:text-gold transition-colors leading-snug mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                      {featuredPost.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-stone-300">
                      {featuredPost.author} · {featuredPost.publishedDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-gold font-display text-sm font-semibold group-hover:translate-x-0.5 transition-transform">
                      Leer artículo <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* Grilla limpia y aireada del resto de artículos */}
            {gridPosts.length > 0 && (
              <div>
                {showFeaturedLead && (
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-100 mb-6">
                    Más artículos de la Biblioteca
                  </h2>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                  {gridPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => setActivePostId(post.id)}
                      className="bg-card-depth border border-gold/15 rounded-lg overflow-hidden group cursor-pointer hover:border-gold/50 transition-all duration-300 flex flex-col h-full shadow-xl"
                    >
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-black border-b border-gold/10">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs font-sans text-stone-300 mb-2.5">
                          <span className="text-gold font-semibold">{post.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.publishedDate}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingTimeMinutes} min</span>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100 mb-2.5 group-hover:text-gold transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="font-sans text-stone-300 text-sm leading-relaxed line-clamp-3 mb-5 flex-grow">
                          {post.summary}
                        </p>

                        <div className="pt-4 border-t border-gold/10 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-gold font-display text-sm font-semibold group-hover:text-stone-100 transition-colors">
                            Leer artículo
                          </span>
                          <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaBlog;
