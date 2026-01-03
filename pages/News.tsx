import React, { useState, useEffect, useMemo } from 'react';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';
import { SparklesIcon, FilterIcon, SearchIcon, MailIcon } from '../components/Icons';
import PageHeader from '../components/ui/PageHeader';
import { Heart, Lightbulb, Zap, X, Share2 } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';
import { useCourses } from '../contexts/AppContext';

const ReadingProgressBar: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div className="h-full bg-primary-600 transition-all duration-100" style={{ width: `${width}%` }}></div>
    </div>
  );
};

const News: React.FC = () => {
  const articlesContext = useCourses();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isReacting, setIsReacting] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/news');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.length > 0 ? data : MOCK_DATA.news);
        } else {
          setArticles(MOCK_DATA.news);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setArticles(MOCK_DATA.news);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleReaction = async (articleId: number, reaction: string) => {
    setIsReacting(articleId);
    try {
      const response = await fetch(`http://localhost:3001/api/news/${articleId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction })
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles(articles.map(a => a.id === articleId ? updatedArticle : a));
        if (selectedArticle?.id === articleId) setSelectedArticle(updatedArticle);
      } else {
        setArticles(articles.map(a => {
          if (a.id === articleId) {
            const reactions = { ...(a.reactions as Record<string, number> || {}) };
            reactions[reaction] = (reactions[reaction] || 0) + 1;
            const updated = { ...a, reactions };
            if (selectedArticle?.id === articleId) setSelectedArticle(updated);
            return updated;
          }
          return a;
        }));
      }
    } catch (err) {
      console.error('Error reacting:', err);
    } finally {
      setIsReacting(null);
    }
  };

  const categories = useMemo(() => {
    const cats = ['Todas', ...new Set(articles.map(a => a.category))];
    return cats;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeCategory !== 'Todas') {
      result = result.filter(a => a.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [articles, activeCategory, searchQuery]);

  const featuredArticle = articles[0];
  const remainingArticles = filteredArticles.filter(a => a.id !== (activeCategory === 'Todas' && !searchQuery ? (featuredArticle?.id || -1) : -1));

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
          <p className="text-slate-400 font-medium">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:mt-20 mt-16 space-y-12">
      <ReadingProgressBar />

      <PageHeader
        icon={<Zap className="w-6 h-6" />}
        tag="Magazine Digital"
        title="Noticias"
        description="Explora las fronteras de la bionergética, investigaciones científicas y novedades exclusivas del instituto."
      >
        <div className="w-full lg:w-96 group relative">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5 transition-colors group-focus-within:text-primary-600" />
          <input
            type="text"
            placeholder="Buscar investigaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-[var(--panel-bg)] border border-[var(--border-color)] text-[var(--text-main)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-600/5 focus:border-primary-600 transition-all font-medium text-sm shadow-sm"
          />
        </div>
      </PageHeader>

      {featuredArticle && activeCategory === 'Todas' && !searchQuery && (
        <section className="px-4 animate-fade-in">
          <div className="group relative rounded-[3.5rem] overflow-hidden transition-all duration-700">
            <div className="flex flex-col lg:flex-row min-h-[550px]">
              <div className="lg:w-3/5 relative overflow-hidden rounded-[3rem]">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute top-8 left-8">
                  <span className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-[10px] font-black rounded-full shadow-2xl tracking-[0.2em]">
                    <SparklesIcon className="w-3 h-3 text-yellow-300" />
                    NOTICIA DEL DÍA
                  </span>
                </div>
              </div>
              <div className="lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-600/5 blur-3xl rounded-full"></div>
                <span className="text-primary-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-primary-600/30"></span>
                  {featuredArticle.category}
                </span>
                <h2 className="text-3xl lg:text-5xl font-black text-[var(--text-main)] mb-6 leading-[1.1] tracking-tight group-hover:text-primary-600 transition-colors uppercase">
                  {featuredArticle.title}
                </h2>
                <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed line-clamp-4 font-medium">
                  {featuredArticle.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-8 border-t border-[var(--border-color)]/50 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600/10 rounded-2xl flex items-center justify-center text-primary-600 font-black text-xs border border-primary-600/20 shadow-inner">
                      {featuredArticle.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest">{featuredArticle.author}</p>
                      <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">Editor en Jefe</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="w-full sm:w-auto px-10 py-4 bg-[var(--text-main)] text-[var(--bg-main)] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    Leer Historia
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-4 overflow-x-auto pb-6 hide-scrollbar">
        <div className="flex items-center gap-4 min-w-max p-1 bg-[var(--panel-bg)] rounded-3xl border border-[var(--border-color)] w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20'
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-primary-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article, index) => (
              <React.Fragment key={article.id}>
                <div
                  className="animate-slide-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedArticle(article)}
                >
                  <NewsCard article={article} />
                </div>
                {index === 1 && !searchQuery && activeCategory === 'Todas' && (
                  <div className="animate-slide-in-up bg-[var(--panel-bg)] rounded-[2.5rem] p-12 flex flex-col justify-center text-[var(--text-main)] relative overflow-hidden xl:col-span-1 border border-[var(--border-color)] shadow-sm" style={{ animationDelay: '250ms' }}>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/5 blur-[80px] rounded-full"></div>
                    <div className="w-16 h-16 bg-primary-600/10 rounded-2xl flex items-center justify-center mb-8 border border-primary-600/20">
                      <MailIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="text-2xl font-black mb-4 uppercase tracking-tight leading-none">Únete a la <span className="text-primary-600">Comunidad</span></h4>
                    <p className="text-[var(--text-muted)] text-sm mb-8 font-medium leading-relaxed">Recibe investigaciones exclusivas y novedades científicas cada semana.</p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Tu mejor email..."
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl px-6 py-4 text-xs focus:outline-none focus:ring-4 focus:ring-primary-600/5 focus:border-primary-600 transition-all font-medium"
                      />
                      <button className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 active:scale-95">
                        Suscribirse Ahora
                      </button>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-[var(--panel-bg)] rounded-[2.5rem] border border-dashed border-[var(--border-color)]">
              <p className="text-[var(--text-muted)] text-lg font-medium">No se encontraron noticias con estos criterios.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-primary-600 font-black uppercase tracking-widest text-[10px] hover:underline"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {selectedArticle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-8">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedArticle(null)}
          ></div>

          <div className="relative bg-[var(--bg-main)] w-full max-w-5xl max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/5 animate-slide-in-up">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-8 right-8 z-50 p-3 bg-black/50 text-white backdrop-blur-md rounded-full hover:bg-red-600 transition-all border border-white/10 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto flex-grow p-0 scrollbar-thin scrollbar-thumb-primary-600">
              <div className="h-[40vh] lg:h-[50vh] relative">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/20 to-transparent"></div>
              </div>

              <div className="px-8 lg:px-24 pb-20 -mt-24 relative z-10 text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="inline-block px-5 py-2 bg-primary-600 text-white text-[10px] font-black rounded-full mb-8 uppercase tracking-[0.2em] shadow-xl">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-4xl lg:text-6xl font-black text-[var(--text-main)] uppercase tracking-tight mb-8 leading-[1.1]">{selectedArticle.title}</h2>

                  <div className="flex flex-col lg:flex-row items-center gap-8 mb-12 py-6 border-y border-[var(--border-color)] w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-600/10 rounded-2xl flex items-center justify-center text-primary-600 font-black text-xs border border-primary-600/20">
                        {selectedArticle.author[0]}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest leading-none mb-1">{selectedArticle.author}</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">Hace 2 días</p>
                      </div>
                    </div>
                    <div className="hidden lg:block w-px h-8 bg-[var(--border-color)]"></div>
                    <div className="flex items-center gap-6">
                      <span className="font-black text-[10px] uppercase tracking-widest text-primary-600 bg-primary-600/5 px-3 py-1 rounded-lg">5 min lectura</span>
                      <span className="font-black text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Científico</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-xl prose-slate dark:prose-invert max-w-none text-[var(--text-muted)] leading-relaxed whitespace-pre-line font-medium text-lg lg:text-xl">
                  {selectedArticle.content || selectedArticle.description}
                </div>

                <div className="mt-20 pt-12 border-t border-[var(--border-color)]">
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div>
                      <h5 className="text-xs font-black text-[var(--text-main)] uppercase tracking-[0.3em] mb-4 text-center lg:text-left flex items-center gap-3">
                        <SparklesIcon className="w-4 h-4 text-primary-600" />
                        ¿Qué te pareció la investigación?
                      </h5>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        {[
                          { key: 'love', icon: <Heart className="w-5 h-5 text-red-500" />, label: 'Me encanta' },
                          { key: 'useful', icon: <Lightbulb className="w-5 h-5 text-amber-500" />, label: 'Es útil' },
                          { key: 'wow', icon: <Zap className="w-5 h-5 text-blue-500" />, label: 'Increíble' }
                        ].map((react) => (
                          <button
                            key={react.key}
                            disabled={isReacting !== null}
                            onClick={() => handleReaction(selectedArticle.id, react.key)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all active:scale-95 ${(selectedArticle.reactions as Record<string, number>)?.[react.key]
                              ? 'bg-primary-500/10 border-primary-500/50 text-primary-600 shadow-sm'
                              : 'bg-[var(--panel-bg)] border-[var(--border-color)] hover:border-primary-500/50 text-[var(--text-muted)] hover:text-primary-600'
                              }`}
                          >
                            <span>{react.icon}</span>
                            <span className="font-black text-sm">{(selectedArticle.reactions as Record<string, number>)?.[react.key] || 0}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compartir */}
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Compartir:</span>
                      <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-xl bg-[var(--panel-bg)] border border-[var(--border-color)] flex items-center justify-center hover:border-primary-600 transition-colors cursor-pointer">
                            <Share2 className="w-4 h-4 text-[var(--text-muted)]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cursos Relacionados */}
              {selectedArticle.relatedCourseIds && selectedArticle.relatedCourseIds.length > 0 && (
                <div className="bg-primary-600/5 border-t border-[var(--border-color)] px-8 lg:px-24 py-16">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-[var(--bg-main)] rounded-2xl flex items-center justify-center shadow-sm border border-[var(--border-color)]">
                      <FilterIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight">Formación Recomendada</h4>
                      <p className="text-[10px] text-primary-600 font-black uppercase tracking-widest">Basado en esta noticia</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articlesContext.filter(c => selectedArticle.relatedCourseIds?.includes(c.id)).map(course => (
                      <div
                        key={course.id}
                        className="flex items-center gap-6 p-6 bg-[var(--bg-main)] rounded-[2rem] border border-[var(--border-color)] hover:border-primary-600 hover:shadow-xl transition-all cursor-pointer group/course shadow-sm"
                        onClick={() => window.location.href = `/course/${course.id}`}
                      >
                        <div className="w-24 h-24 bg-slate-500/10 rounded-2xl overflow-hidden shrink-0">
                          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover/course:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-black text-[var(--text-main)] line-clamp-2 text-base group-hover/course:text-primary-600 transition-colors uppercase leading-tight">{course.title}</h5>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                            <p className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em]">{course.author}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;