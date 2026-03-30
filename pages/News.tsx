import React, { useState, useEffect, useMemo } from 'react';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';
import { SparklesIcon, FilterIcon, SearchIcon, MailIcon } from '../components/Icons';
import PageHeader from '../components/ui/PageHeader';
import { API_BASE } from '../lib/api';
import { Heart, Lightbulb, Zap, X, Share2 } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';
import { useCourses } from '../contexts/AppContext';

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
        const response = await fetch(`${API_BASE}/api/news`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.length > 0 ? data : MOCK_DATA.news);
        } else {
          setArticles(MOCK_DATA.news);
        }
      } catch (error) {
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
      const response = await fetch(`${API_BASE}/api/news/${articleId}/react`, {
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

  const categories = useMemo(() => ['Todas', ...new Set(articles.map(a => a.category))], [articles]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeCategory !== 'Todas') result = result.filter(a => a.category === activeCategory);
    if (searchQuery) result = result.filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return result;
  }, [articles, activeCategory, searchQuery]);

  const featuredArticle = articles[0];
  const remainingArticles = filteredArticles.filter(a => a.id !== (activeCategory === 'Todas' && !searchQuery ? (featuredArticle?.id || -1) : -1));

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-4"></div>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 px-6 py-12 lg:py-20">
      <PageHeader
        icon={<Zap className="w-6 h-6" />}
        tag="Bienestar Integral"
        title="Noticias"
        description="Contenido de medicina alternativa, hábitos saludables y herramientas prácticas para tu bienestar diario."
      >
        <div className="w-full lg:w-96 group relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 transition-colors group-focus-within:text-primary-600" />
          <input
            type="text"
            placeholder="Buscar temas de bienestar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all text-sm"
          />
        </div>
      </PageHeader>

      {/* Featured article */}
      {featuredArticle && activeCategory === 'Todas' && !searchQuery && (
        <section className="max-w-6xl mx-auto animate-fade-in">
          <div
            className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
            onClick={() => setSelectedArticle(featuredArticle)}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-3/5 relative overflow-hidden h-64 lg:h-auto">
                <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-xs font-medium text-primary-600 mb-3">{featuredArticle.category}</span>
                <h2 className="text-2xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 leading-relaxed line-clamp-3">
                  {featuredArticle.description}
                </p>
                <span className="text-sm font-medium text-primary-600">Leer artículo →</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="max-w-6xl mx-auto overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                ? 'bg-primary-600 text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article, index) => (
              <div
                key={article.id}
                className="animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedArticle(article)}
              >
                <NewsCard article={article} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-500 dark:text-neutral-400">No se encontraron noticias con estos criterios.</p>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="mt-4 text-primary-600 font-medium text-sm hover:underline">
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Article modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-8">
          <div className="absolute inset-0 bg-black/80 animate-fade-in" onClick={() => setSelectedArticle(null)}></div>

          <div className="relative bg-white dark:bg-neutral-800 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-lg overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-700 animate-fade-in">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-grow">
              <div className="h-64 lg:h-80 relative">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-800 via-transparent to-transparent"></div>
              </div>

              <div className="px-8 lg:px-16 pb-16 -mt-16 relative z-10">
                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-lg mb-4">
                  {selectedArticle.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-800 dark:text-neutral-100 mb-6 leading-tight tracking-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center gap-4 mb-8 py-4 border-y border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>5 min lectura</span>
                  <span>·</span>
                  <span>Bienestar</span>
                </div>

                <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line text-base">
                  {selectedArticle.content || selectedArticle.description}
                </div>

                {/* Reactions */}
                <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">¿Qué te pareció?</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: 'love', icon: <Heart className="w-4 h-4 text-red-500" />, label: 'Me encanta' },
                      { key: 'useful', icon: <Lightbulb className="w-4 h-4 text-amber-500" />, label: 'Es útil' },
                      { key: 'wow', icon: <Zap className="w-4 h-4 text-blue-500" />, label: 'Increíble' }
                    ].map((react) => (
                      <button
                        key={react.key}
                        disabled={isReacting !== null}
                        onClick={() => handleReaction(selectedArticle.id, react.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${(selectedArticle.reactions as Record<string, number>)?.[react.key]
                          ? 'bg-primary-50 dark:bg-primary-600/10 border-primary-300 dark:border-primary-600/30 text-primary-600'
                          : 'bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:border-primary-300'
                        }`}
                      >
                        {react.icon}
                        <span className="text-sm font-medium">{(selectedArticle.reactions as Record<string, number>)?.[react.key] || 0}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
