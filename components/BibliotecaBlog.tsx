import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import {
  BlogPost,
  CURATED_BLOG_POSTS,
  fetchBloggerPosts,
} from '../services/bloggerService';

interface BlogTeaserSectionProps {
  onOpenLibrary: (initialPostId?: string) => void;
}

/**
 * Home Page Section: Minimalist preview of esgrimacriolla.blogspot.com
 */
export const BlogTeaserSection: React.FC<BlogTeaserSectionProps> = ({
  onOpenLibrary,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(CURATED_BLOG_POSTS);

  useEffect(() => {
    let mounted = true;
    fetchBloggerPosts().then(({ posts: fetched }) => {
      if (mounted && fetched.length > 0) {
        setPosts(fetched);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const featuredThree = posts.slice(0, 3);

  return (
    <section
      id="biblioteca-preview"
      className="py-24 md:py-32 bg-void border-t border-gold/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll direction="down">
          <div className="flex flex-col items-center text-center mb-14 md:mb-20">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-stone-100 tracking-[0.2em] uppercase mb-4 text-glow-white">
              Biblioteca & <span className="text-gold text-glow-gold">Blog</span>
            </h2>

            <div className="flex items-center justify-center gap-4 w-full mb-5">
              <div className="h-px bg-gold/30 w-10 md:w-16"></div>
              <p className="text-[0.55rem] md:text-[0.65rem] text-gold tracking-[0.4em] uppercase font-bold text-center text-glow-gold">
                Archivo Histórico · esgrimacriolla.blogspot.com
              </p>
              <div className="h-px bg-gold/30 w-10 md:w-16"></div>
            </div>

            <p className="font-serif italic text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Investigaciones históricas, estudio de armas gauchas y artículos publicados en el blog oficial de Esgrima Criolla.
            </p>
          </div>
        </RevealOnScroll>

        {/* 3 Featured Blog Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {featuredThree.map((post, idx) => (
            <RevealOnScroll
              key={post.id}
              delay={idx * 120}
              direction={idx % 2 === 0 ? 'left' : 'right'}
            >
              <article
                onClick={() => onOpenLibrary(post.id)}
                className="bg-card-depth border border-gold/15 rounded-sm overflow-hidden group cursor-pointer hover:border-gold/50 transition-all duration-500 flex flex-col h-full shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-black border-b border-gold/10">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.2] contrast-110 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[0.6rem] font-display tracking-[0.22em] text-gold/80 uppercase mb-3">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-400">{post.publishedDate}</span>
                  </div>

                  <h3 className="font-display text-lg md:text-xl text-stone-100 uppercase tracking-[0.12em] mb-4 group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="font-serif italic text-stone-400 text-xs md:text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.summary}
                  </p>

                  <div className="pt-4 border-t border-gold/10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-gold font-display text-xs uppercase tracking-[0.28em] font-bold group-hover:text-stone-100 transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      Leer Artículo
                    </span>
                    <span className="material-icons-outlined text-gold text-sm group-hover:translate-x-1 transition-transform">
                      east
                    </span>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* Button to see all articles */}
        <RevealOnScroll delay={200}>
          <div className="flex items-center justify-center">
            <button
              onClick={() => onOpenLibrary()}
              className="px-10 py-5 bg-gold text-void font-display font-black text-xs md:text-sm uppercase tracking-[0.28em] hover:bg-stone-100 transition-all shadow-[0_0_35px_rgba(197,160,101,0.3)] rounded-sm cursor-pointer flex items-center justify-center gap-3"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              VER TODOS LOS ARTÍCULOS DEL BLOG ({posts.length})
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

interface BibliotecaBlogProps {
  onBack: () => void;
  initialPostId?: string | null;
}

/**
 * Full Dedicated View: All Articles from esgrimacriolla.blogspot.com + Clean Minimalist Reader
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
    return posts.filter((p) => p.id !== activePost.id).slice(0, 6);
  }, [posts, activePost]);

  // --- CLEAN ARTICLE READER VIEW ---
  if (activePost) {
    return (
      <div className="min-h-screen bg-void text-stone-300 selection:bg-gold selection:text-void paper-texture pt-28 pb-28 overflow-x-hidden relative">
        <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Top Navigation Bar inside Reader */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-gold/15">
            <button
              onClick={() => setActivePostId(null)}
              className="group inline-flex items-center gap-2.5 text-stone-400 hover:text-gold transition-colors cursor-pointer font-display text-xs uppercase tracking-[0.22em] font-bold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-gold" />
              <span>Volver a Todos los Artículos</span>
            </button>

            <a
              href={activePost.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-stone-100 transition-colors font-display text-xs uppercase tracking-[0.22em] font-bold"
            >
              <span>Ver en Blogspot Original</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Article Container */}
          <article className="bg-card-depth border border-gold/15 p-6 sm:p-10 md:p-14 rounded-sm mb-14 shadow-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-display tracking-[0.22em] text-gold uppercase mb-4">
              <span>{activePost.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">{activePost.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">{activePost.readingTimeMinutes} MIN DE LECTURA</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl text-stone-100 uppercase tracking-[0.1em] leading-tight mb-6 font-bold text-glow-white">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-display tracking-[0.25em] text-stone-400 uppercase mb-8 pb-6 border-b border-gold/10">
              <span>POR {activePost.author}</span>
              <span aria-hidden="true">·</span>
              <span>ESGRIMA CRIOLLA</span>
            </div>

            {/* Cover Image */}
            <div className="relative w-full aspect-video mb-10 overflow-hidden bg-black border border-gold/15 rounded-sm">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Editorial Reading Column */}
            <div
              className="max-w-2xl mx-auto font-serif text-stone-200 text-base md:text-lg leading-relaxed md:leading-loose space-y-6
                [&>h3]:font-display [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:text-gold [&>h3]:uppercase [&>h3]:tracking-[0.15em] [&>h3]:pt-6 [&>h3]:pb-2 [&>h3]:font-bold
                [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:border-y [&>blockquote]:border-gold/20 [&>blockquote]:text-gold [&>blockquote]:italic [&>blockquote]:text-center [&>blockquote]:text-lg"
              dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
            />

            {/* Footer Link to Original Entry */}
            <div className="mt-12 pt-6 border-t border-gold/15 flex flex-wrap items-center justify-between gap-4 text-xs font-display tracking-[0.25em] text-stone-400 uppercase">
              <span>FUENTE: ESGRIMACRIOLLA.BLOGSPOT.COM</span>
              <a
                href={activePost.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline inline-flex items-center gap-1.5 font-bold"
              >
                <span>Abrir Entrada Original en Blogger</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* More Articles from the Blog */}
          {relatedPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-display text-xl md:text-2xl text-stone-100 uppercase tracking-[0.18em]">
                  Más Artículos del Blog
                </h4>
                <button
                  onClick={() => setActivePostId(null)}
                  className="text-gold font-display text-xs uppercase tracking-[0.25em] hover:underline cursor-pointer font-bold"
                >
                  Ver Todos ({posts.length})
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setActivePostId(rel.id)}
                    className="bg-card-depth border border-gold/15 p-5 rounded-sm cursor-pointer hover:border-gold/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-display text-[0.55rem] tracking-[0.25em] text-gold/80 uppercase font-bold block mb-2">
                        {rel.publishedDate}
                      </span>
                      <h5 className="font-display text-base text-stone-100 uppercase tracking-[0.1em] group-hover:text-gold transition-colors mb-3">
                        {rel.title}
                      </h5>
                    </div>
                    <span className="font-display text-[0.6rem] uppercase tracking-[0.25em] text-gold/80 group-hover:text-stone-100 inline-flex items-center gap-1.5 font-bold">
                      Leer Artículo <span className="material-icons-outlined text-xs">east</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- FULL BLOG ARCHIVE CATALOG VIEW (ALL ARTICLES) ---
  return (
    <div className="min-h-screen bg-void text-stone-300 selection:bg-gold selection:text-void paper-texture pt-28 pb-24 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-12 md:mb-16 text-center mx-auto">
            <button
              onClick={onBack}
              className="mb-8 group flex items-center gap-2 text-stone-400 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="material-icons-outlined text-sm group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-xs font-display font-bold uppercase tracking-[0.25em]">
                Volver al Inicio
              </span>
            </button>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-stone-100 tracking-[0.2em] uppercase mb-4 text-center w-full text-glow-white">
              Biblioteca & Blog
            </h1>

            <div className="flex items-center justify-center gap-4 w-full mb-6">
              <div className="h-px bg-gold/30 w-10 md:w-16"></div>
              <p className="text-[0.55rem] md:text-[0.65rem] text-gold tracking-[0.4em] uppercase font-bold text-center text-glow-gold">
                Archivo Oficial · esgrimacriolla.blogspot.com
              </p>
              <div className="h-px bg-gold/30 w-10 md:w-16"></div>
            </div>

            {/* Search + Category Filter Bar */}
            <div className="w-full max-w-5xl bg-card-depth border border-gold/15 p-5 sm:p-6 rounded-sm flex flex-col gap-5 shadow-2xl mt-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar en todos los artículos del blog (ej. facón, visteo, poncho, rebenque)..."
                    className="w-full pl-11 pr-4 py-3 bg-void border border-gold/20 rounded-sm text-stone-100 placeholder-stone-500 font-serif text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <a
                  href="https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-void border border-gold/30 hover:border-gold text-gold hover:bg-gold/10 font-display text-xs uppercase tracking-[0.22em] font-bold rounded-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Abrir Blogspot Original</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gold/10">
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3.5 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.2em] font-bold rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'bg-gold text-void'
                            : 'bg-void text-stone-400 border border-gold/15 hover:border-gold/40 hover:text-gold'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                <span className="font-display text-[0.58rem] tracking-[0.25em] text-stone-400 uppercase">
                  {isLoadingFeed
                    ? 'CARGANDO ARCHIVO DEL BLOG...'
                    : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'ARTÍCULO' : 'ARTÍCULOS'}`}
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="bg-card-depth border border-gold/15 max-w-2xl mx-auto p-10 text-center my-12 rounded-sm">
            <h3 className="font-display text-2xl text-stone-100 uppercase tracking-[0.15em] mb-3">
              No se encontraron artículos con esa búsqueda
            </h3>
            <p className="font-serif italic text-stone-400 text-sm mb-6">
              Probá con otro término o restablecé los filtros para ver todos los artículos del blog.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="px-6 py-3 bg-gold text-void font-display text-xs uppercase tracking-[0.25em] font-black rounded-sm cursor-pointer"
            >
              Ver Todos los Artículos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActivePostId(post.id)}
                className="bg-card-depth border border-gold/15 rounded-sm overflow-hidden group cursor-pointer hover:border-gold/50 transition-all duration-500 flex flex-col h-full shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-black border-b border-gold/10">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.2] contrast-110 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[0.6rem] font-display tracking-[0.22em] text-gold/80 uppercase mb-3">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-400">{post.publishedDate}</span>
                  </div>

                  <h3 className="font-display text-lg md:text-xl text-stone-100 uppercase tracking-[0.12em] mb-4 group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="font-serif italic text-stone-400 text-xs md:text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.summary}
                  </p>

                  <div className="pt-4 border-t border-gold/10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-gold font-display text-xs uppercase tracking-[0.28em] font-bold group-hover:text-stone-100 transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      Leer Artículo
                    </span>
                    <span className="material-icons-outlined text-gold text-sm group-hover:translate-x-1 transition-transform">
                      east
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaBlog;
