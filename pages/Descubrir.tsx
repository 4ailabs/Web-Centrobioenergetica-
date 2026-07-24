import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNews } from '../contexts/AppContext';
import { ArrowLeft, ArrowRight, Clock3, Sparkles, Youtube } from 'lucide-react';
import type { NewsArticle } from '../types';

// Render del contenido de un artículo: párrafos separados por línea en
// blanco; líneas que terminan en ':' como subtítulos; listas 1./- nativas.
const ArticleBody: React.FC<{ content: string }> = ({ content }) => {
  const nodes: React.ReactNode[] = [];
  let key = 0;
  let listItems: string[] = [];
  let listOrdered = false;

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems.map((item, j) => <li key={j}>{item}</li>);
    nodes.push(
      listOrdered ? (
        <ol key={key++} className="list-decimal pl-5 space-y-1.5 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {items}
        </ol>
      ) : (
        <ul key={key++} className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {items}
        </ul>
      )
    );
    listItems = [];
  };

  content.split('\n').map((l) => l.trim()).forEach((line) => {
    if (!line) {
      flushList();
      return;
    }
    if (/^\d+\.\s/.test(line)) {
      if (listItems.length > 0 && !listOrdered) flushList();
      listOrdered = true;
      listItems.push(line.replace(/^\d+\.\s*/, ''));
      return;
    }
    if (/^-\s/.test(line)) {
      if (listItems.length > 0 && listOrdered) flushList();
      listOrdered = false;
      listItems.push(line.replace(/^-\s*/, ''));
      return;
    }
    flushList();
    if (line.endsWith(':') && line.length < 60) {
      nodes.push(
        <h2 key={key++} className="text-[15px] font-semibold text-neutral-800 dark:text-neutral-100 pt-2">
          {line.slice(0, -1)}
        </h2>
      );
    } else {
      nodes.push(
        <p key={key++} className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {line}
        </p>
      );
    }
  });
  flushList();

  return <div className="space-y-4">{nodes}</div>;
};

const ArticleCard: React.FC<{ article: NewsArticle; featured?: boolean }> = ({ article, featured }) => (
  <Link
    to={`/descubrir/${article.id}`}
    className={`group block bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary-200 dark:hover:border-primary-800 transition-all hover:-translate-y-0.5 ${featured ? 'sm:flex' : ''}`}
  >
    <div className={`overflow-hidden bg-neutral-100 dark:bg-neutral-700 ${featured ? 'aspect-[16/9] sm:aspect-auto sm:w-1/2 sm:min-h-[240px]' : 'aspect-[16/10]'}`}>
      <img
        src={article.imageUrl}
        alt={article.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
    <div className={featured ? 'p-6 sm:w-1/2 flex flex-col justify-center' : 'p-5'}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400">
          {article.category}
        </span>
        {article.readTime && (
          <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 shrink-0">
            <Clock3 className="w-3 h-3" /> {article.readTime.replace(' de lectura', '')}
          </span>
        )}
      </div>
      <h3 className={`font-editorial text-neutral-800 dark:text-neutral-100 leading-snug mt-1.5 mb-2 group-hover:text-primary-600 transition-colors ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
        {article.title}
      </h3>
      <p className={`text-neutral-500 dark:text-neutral-400 leading-relaxed text-[13px] ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
        {article.description}
      </p>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-400 mt-3 group-hover:gap-2 transition-all">
        Abrir guía <ArrowRight className="w-3 h-3" />
      </span>
    </div>
  </Link>
);

const ArticleHighlights: React.FC<{ highlights?: string[] }> = ({ highlights }) => {
  if (!highlights?.length) return null;
  return (
    <aside className="rounded-2xl bg-primary-50/80 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/60 p-5 my-8">
      <div className="flex items-center gap-2 text-primary-800 dark:text-primary-300 mb-3">
        <Sparkles className="w-4 h-4" />
        <h2 className="text-sm font-semibold">En breve</h2>
      </div>
      <ul className="grid gap-2 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <li key={highlight} className="text-[13px] leading-relaxed text-primary-900/75 dark:text-primary-100/80 pl-3 border-l border-primary-300 dark:border-primary-700">
            {highlight}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const Descubrir: React.FC = () => {
  const news = useNews();
  const { articleId } = useParams<{ articleId?: string }>();
  const [category, setCategory] = useState<string>('Todo');

  const categories = useMemo(() => ['Todo', ...Array.from(new Set(news.map((n) => n.category)))], [news]);
  const filtered = useMemo(
    () => (category === 'Todo' ? news : news.filter((n) => n.category === category)),
    [news, category]
  );

  // ── Vista de lectura ──
  const article = articleId ? news.find((n) => n.id === parseInt(articleId, 10)) : undefined;
  if (articleId) {
    if (!article) {
      return (
        <div className="w-full pt-[72px] lg:pt-0 px-6 lg:px-0 py-12">
          <p className="text-sm text-neutral-500 mb-4">Artículo no encontrado.</p>
          <Link to="/descubrir" className="text-sm font-medium text-primary-700 dark:text-primary-400">
            Volver a Descubrir
          </Link>
        </div>
      );
    }
    const related = [
      ...news.filter((n) => n.id !== article.id && n.category === article.category),
      ...news.filter((n) => n.id !== article.id && n.category !== article.category),
    ].slice(0, 2);
    return (
      <div className="w-full pt-[72px] lg:pt-0 pb-16">
        <div className="px-6 lg:px-0 pt-6 pb-6">
          <Link to="/descubrir" className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Descubrir
          </Link>
        </div>

        <article className="px-6 lg:px-0 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400">
            {article.category}
          </span>
          <h1 className="font-editorial text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-100 leading-tight mt-2 mb-3 [text-wrap:balance]">
            {article.title}
          </h1>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400 mb-6">
            {article.author && <span>{article.author}</span>}
            {article.readTime && (
              <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />{article.readTime}</span>
            )}
            {article.reviewedAt && <span>Revisado el {article.reviewedAt}</span>}
          </div>
          <div className="rounded-xl overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-800 mb-8">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
          <ArticleHighlights highlights={article.highlights} />
          {article.content && <ArticleBody content={article.content} />}
          <p className="text-xs text-neutral-400 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 leading-relaxed">
            Contenido educativo del Instituto Centrobioenergética. No sustituye una valoración profesional ni una recomendación personalizada.
          </p>
        </article>

        {related.length > 0 && (
          <div className="px-6 lg:px-0 mt-10">
            <h2 className="font-editorial text-xl text-neutral-800 dark:text-neutral-100 mb-4">Sigue leyendo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Feed ──
  const [featured, ...rest] = filtered;
  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Una pausa para volver a ti
            </span>
            <h1 className="font-editorial text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
              Descubrir
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
              Guías breves para entender un tema, probar una práctica y tomar decisiones cotidianas con más información.
            </p>
          </div>
          <div className="flex gap-5 text-xs text-neutral-400 dark:text-neutral-500 shrink-0">
            <span><strong className="block text-lg font-editorial text-neutral-700 dark:text-neutral-200">{news.length}</strong>lecturas</span>
            <span><strong className="block text-lg font-editorial text-neutral-700 dark:text-neutral-200">{categories.length - 1}</strong>temas</span>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="px-6 lg:px-0 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div className="px-6 lg:px-0 pb-5">
          <ArticleCard article={featured} featured />
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}

      {/* Cross-link a Wellvibe */}
      <div className="px-6 lg:px-0">
        <Link
          to="/wellvibe-media"
          className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-600/10 text-primary-600 flex items-center justify-center shrink-0">
              <Youtube className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100">¿Prefieres video?</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Visita Wellvibe Media, nuestro canal de contenido abierto.</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Descubrir;
