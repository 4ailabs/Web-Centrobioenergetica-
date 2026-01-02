import React, { useState, useEffect, useMemo } from 'react';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';
import { SparklesIcon, FilterIcon, SearchIcon, MailIcon } from '../components/Icons';
import { Heart, Lightbulb, Zap } from 'lucide-react';
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

      <header className="px-4 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-[var(--text-main)] uppercase tracking-tight mb-4">
            Centro <span className="text-primary-600">Noticias</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Explora las últimas novedades en bionergética, eventos del instituto e investigaciones científicas.
          </p>
        </div>

        <div className="w-full lg:w-80 group relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-primary-600" />
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all shadow-sm"
          />
        </div>
      </header>

      {featuredArticle && activeCategory === 'Todas' && !searchQuery && (
        <section className="px-4 animate-fade-in">
          <div className="group relative bg-[var(--panel-bg)] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--border-color)]">
            <div className="flex flex-col lg:flex-row min-h-[450px]">
              <div className="lg:w-3/5 relative overflow-hidden">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-full shadow-xl">
                    <SparklesIcon className="w-3 h-3 text-yellow-400" />
                    DESTACADO
                  </span>
                </div>
              </div>
              <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                  {featuredArticle.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-main)] mb-6 leading-tight group-hover:text-primary-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed line-clamp-4">
                  {featuredArticle.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-[var(--border-color)] gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold">
                      {featuredArticle.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-main)]">{featuredArticle.author}</p>
                      <p className="text-xs text-[var(--text-muted)]">Hace 2 días</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary-600 transition-all active:scale-95"
                  >
                    Leer ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-4 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex items-center space-x-3 min-w-max">
          <div className="p-2 bg-[var(--panel-bg)] rounded-lg mr-2 border border-[var(--border-color)]">
            <FilterIcon className="w-5 h-5 text-primary-600" />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200/20'
                : 'bg-[var(--panel-bg)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-primary-400 hover:text-primary-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
                  <div className="animate-slide-in-up bg-slate-900 rounded-3xl p-8 flex flex-col justify-center text-white relative overflow-hidden xl:col-span-1 border border-slate-800" style={{ animationDelay: '250ms' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full"></div>
                    <MailIcon className="w-10 h-10 text-primary-500 mb-6" />
                    <h4 className="text-2xl font-bold mb-3">Únete a la comunidad</h4>
                    <p className="text-slate-400 text-sm mb-6">Recibe los mejores consejos y actualizaciones semanales.</p>
                    <input
                      type="email"
                      placeholder="Tu email"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                    />
                    <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-500 transition-colors shadow-lg shadow-primary-900/20">
                      Suscribirme
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 text-lg">No se encontraron noticias con estos criterios.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary-600 font-bold hover:underline"
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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedArticle(null)}
          ></div>

          <div className="relative bg-[var(--bg-main)] w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-[var(--border-color)] animate-slide-in-up">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-[var(--bg-main)]/80 backdrop-blur rounded-full hover:bg-red-500 hover:text-white transition-all border border-[var(--border-color)]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto flex-grow p-0">
              <div className="h-64 lg:h-96 relative border-b border-slate-50">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--panel-bg)] to-transparent"></div>
              </div>

              <div className="px-8 lg:px-16 pb-8 -mt-12 relative z-10">
                <span className="inline-block px-4 py-1 bg-primary-600/10 text-primary-600 text-[10px] font-black rounded-full mb-6 uppercase tracking-widest border border-primary-600/20">
                  {selectedArticle.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[var(--text-main)] uppercase tracking-tight mb-4">{selectedArticle.title}</h2>

                <div className="flex items-center gap-4 mb-8 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[var(--bg-main)] rounded-full flex items-center justify-center text-primary-600 font-black text-[10px] border border-[var(--border-color)]">
                      {selectedArticle.author[0]}
                    </div>
                    <span className="font-black text-[var(--text-main)] uppercase tracking-widest text-[10px]">{selectedArticle.author}</span>
                  </div>
                  <span className="opacity-30">•</span>
                  <span className="font-bold text-[10px] uppercase tracking-widest">12 de mayo, 2026</span>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-[var(--text-muted)] leading-relaxed text-lg whitespace-pre-line font-medium">
                  {selectedArticle.content || selectedArticle.description}
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
                  <p className="text-sm font-black text-[var(--text-main)] uppercase tracking-widest mb-6 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-primary-600" />
                    ¿Qué te pareció esta noticia?
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { key: 'love', icon: <Heart className="w-5 h-5 text-red-500" />, label: 'Me encanta' },
                      { key: 'useful', icon: <Lightbulb className="w-5 h-5 text-amber-500" />, label: 'Es útil' },
                      { key: 'wow', icon: <Zap className="w-5 h-5 text-blue-500" />, label: 'Increíble' }
                    ].map((react) => (
                      <button
                        key={react.key}
                        disabled={isReacting !== null}
                        onClick={() => handleReaction(selectedArticle.id, react.key)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all active:scale-95 ${(selectedArticle.reactions as Record<string, number>)?.[react.key]
                          ? 'bg-primary-500/10 border-primary-500/50 text-primary-600 shadow-sm'
                          : 'bg-[var(--panel-bg)] border-[var(--border-color)] hover:border-primary-500/50 text-[var(--text-muted)]'
                          }`}
                      >
                        <span>{react.icon}</span>
                        <span className="font-bold text-sm">{(selectedArticle.reactions as Record<string, number>)?.[react.key] || 0}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cursos Relacionados */}
              {selectedArticle.relatedCourseIds && selectedArticle.relatedCourseIds.length > 0 && (
                <div className="bg-primary-500/5 border-t border-[var(--border-color)] px-8 lg:px-16 py-12">
                  <h4 className="text-xl font-bold text-[var(--text-main)] mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--bg-main)] rounded-lg flex items-center justify-center shadow-sm border border-[var(--border-color)]">
                      <FilterIcon className="w-4 h-4 text-primary-600" />
                    </div>
                    Cursos recomendados
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articlesContext.filter(c => selectedArticle.relatedCourseIds?.includes(c.id)).map(course => (
                      <div
                        key={course.id}
                        className="flex items-center gap-4 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)] hover:border-primary-500/50 transition-all cursor-pointer group/course shadow-sm"
                        onClick={() => window.location.href = `/course/${course.id}`}
                      >
                        <div className="w-16 h-16 bg-slate-500/10 rounded-xl overflow-hidden shrink-0">
                          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover/course:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h5 className="font-bold text-[var(--text-main)] line-clamp-1 text-sm group-hover/course:text-primary-600 transition-colors">{course.title}</h5>
                          <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">{course.author}</p>
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