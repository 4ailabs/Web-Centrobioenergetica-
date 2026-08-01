import React, { useMemo, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useNews, useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, ArrowRight, Clock3, Youtube, Play, Pause, Headphones } from 'lucide-react';
import { courseHref } from '../data/catalog';
import type { NewsArticle } from '../types';

const CONTENT_TYPE_LABEL: Record<string, string> = {
  articulo: 'Artículos',
  audio: 'Audios',
  video: 'Videos',
  guia: 'Guías',
};

// Mini reproductor de audio de marca (sin controles nativos del navegador)
const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.pause();
    else el.play();
  };

  return (
    <div className="flex items-center gap-3 mt-3">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar audio' : 'Reproducir audio'}
        className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shrink-0 transition-colors"
      >
        {playing ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={progress}
        aria-label="Posición del audio"
        onChange={(e) => {
          const el = audioRef.current;
          if (el) el.currentTime = Number(e.target.value);
        }}
        className="flex-1 h-1 accent-[var(--primary)] cursor-pointer"
      />
      <span className="text-[11px] text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
        {fmt(progress)} / {fmt(duration)}
      </span>
    </div>
  );
};

// Tarjeta de audio: se escucha ahí mismo, sin salir del feed
const AudioCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
    <div className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400">
        <Headphones className="w-3.5 h-3.5" /> {article.category}
      </span>
      {article.audioDuration && (
        <span className="inline-flex items-center gap-1 text-[10px] text-neutral-600 dark:text-neutral-400 shrink-0">
          <Clock3 className="w-3 h-3" /> {article.audioDuration}
        </span>
      )}
    </div>
    <h3 className="font-editorial text-lg text-neutral-800 dark:text-neutral-100 leading-snug mt-1.5 mb-1.5">
      {article.title}
    </h3>
    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[13px] line-clamp-2">
      {article.description}
    </p>
    {article.audioUrl && <AudioPlayer src={article.audioUrl} />}
  </div>
);

// "Profundiza en el curso": conecta cada pieza abierta con la formación
const RelatedCourses: React.FC<{ ids?: number[] }> = ({ ids }) => {
  const courses = useCourses();
  const navigate = useNavigate();
  const { user } = useAuth();
  const related = (ids ?? []).map((id) => courses.find((c) => c.id === id)).filter(Boolean);
  if (related.length === 0) return null;
  return (
    <div className="mt-10 space-y-3">
      {related.map((course) => {
        if (!course) return null;
        const hasAccess = !!user && (
          user.isAdmin ||
          user.subscriptionStatus === 'active' ||
          !!user.enrolledCourses?.includes(course.id.toString())
        );
        return (
          <button
            key={course.id}
            onClick={() => navigate(courseHref(course, hasAccess))}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-primary-50/80 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/60 hover:border-primary-300 dark:hover:border-primary-600 transition-colors text-left group"
          >
            {course.imageUrl && (
              <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-700">
                <img src={course.imageUrl} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400">
                Profundiza en el curso
              </span>
              <p className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 mt-0.5 line-clamp-1 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                {course.title}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{course.level} · {course.author}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-primary-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        );
      })}
    </div>
  );
};

// Render del contenido de un artículo. Convenciones del texto:
//   línea que termina en ':' (y corta) → subtítulo de sección (serif)
//   línea que empieza con '> '        → cita destacada (pull-quote)
//   '1. ' / '- '                       → listas ordenadas / de viñetas
//   línea en blanco                    → separa párrafos
const ArticleBody: React.FC<{ content: string }> = ({ content }) => {
  const nodes: React.ReactNode[] = [];
  let key = 0;
  let listItems: string[] = [];
  let listOrdered = false;

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems.map((item, j) => <li key={j} className="pl-1.5">{item}</li>);
    nodes.push(
      listOrdered ? (
        <ol key={key++} className="list-decimal pl-6 space-y-2 text-[16px] leading-relaxed text-neutral-700 dark:text-neutral-300 marker:text-primary-500 marker:font-medium">
          {items}
        </ol>
      ) : (
        <ul key={key++} className="list-disc pl-6 space-y-2 text-[16px] leading-relaxed text-neutral-700 dark:text-neutral-300 marker:text-primary-400">
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
    if (line.startsWith('> ')) {
      nodes.push(
        <blockquote key={key++} className="my-8 border-l-2 border-primary-500 pl-5">
          <p className="font-editorial text-xl lg:text-2xl italic leading-snug text-neutral-800 dark:text-neutral-100 [text-wrap:balance]">
            {line.slice(2)}
          </p>
        </blockquote>
      );
    } else if (line.endsWith(':') && line.length < 60) {
      nodes.push(
        <h2 key={key++} className="font-editorial text-xl lg:text-2xl text-neutral-800 dark:text-neutral-100 leading-snug pt-6 [text-wrap:balance]">
          {line.slice(0, -1)}
        </h2>
      );
    } else {
      nodes.push(
        <p key={key++} className="text-[16px] leading-[1.75] text-neutral-700 dark:text-neutral-300">
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
          <span className="inline-flex items-center gap-1 text-[10px] text-neutral-600 dark:text-neutral-400 shrink-0">
            <Clock3 className="w-3 h-3" /> {article.readTime.replace(' de lectura', '')}
          </span>
        )}
      </div>
      <h3 className={`font-editorial text-neutral-800 dark:text-neutral-100 leading-snug mt-1.5 mb-2 group-hover:text-primary-600 transition-colors ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
        {article.title}
      </h3>
      <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-[13px] ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
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
    <aside className="my-8 border-y border-neutral-200 dark:border-neutral-700 py-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-500 mb-4">
        Claves del artículo
      </p>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
        {highlights.map((highlight, i) => (
          <li key={highlight} className="flex gap-3">
            <span className="font-editorial text-lg leading-none text-primary-600 dark:text-primary-400 tabular-nums pt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {highlight}
            </span>
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
  const [contentType, setContentType] = useState<string>('Todo');

  const categories = useMemo(() => ['Todo', ...Array.from(new Set(news.map((n) => n.category)))], [news]);
  const contentTypes = useMemo(
    () => ['Todo', ...Array.from(new Set(news.map((n) => n.contentType ?? 'articulo')))],
    [news]
  );
  const filtered = useMemo(
    () =>
      news
        .filter((n) => category === 'Todo' || n.category === category)
        .filter((n) => contentType === 'Todo' || (n.contentType ?? 'articulo') === contentType),
    [news, category, contentType]
  );

  // ── Vista de lectura ──
  const article = articleId ? news.find((n) => n.id === parseInt(articleId, 10)) : undefined;
  if (articleId) {
    if (!article) {
      return (
        <div className="w-full pt-[72px] lg:pt-0 px-6 lg:px-0 py-12">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Artículo no encontrado.</p>
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
          <Link to="/descubrir" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors text-sm">
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
          <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-600 dark:text-neutral-400 mb-6">
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
          {article.contentType === 'audio' && article.audioUrl && <AudioPlayer src={article.audioUrl} />}
          <RelatedCourses ids={article.relatedCourseIds} />
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 leading-relaxed">
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
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-400 mb-3">
              Contenido del instituto
            </span>
            <h1 className="font-editorial text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
              Descubrir
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
              Guías breves para entender un tema, probar una práctica y tomar decisiones cotidianas con más información.
            </p>
          </div>
          <div className="flex gap-5 text-xs text-neutral-600 dark:text-neutral-500 shrink-0">
            <span><strong className="block text-lg font-editorial text-neutral-700 dark:text-neutral-200">{news.length}</strong>lecturas</span>
            <span><strong className="block text-lg font-editorial text-neutral-700 dark:text-neutral-200">{categories.length - 1}</strong>temas</span>
          </div>
        </div>
      </div>

      {/* Filtros: formato (solo si hay más de uno) + categoría */}
      <div className="px-6 lg:px-0 pb-6 space-y-3">
        {contentTypes.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((t) => (
              <button
                key={t}
                onClick={() => setContentType(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  contentType === t
                    ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800'
                    : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
                }`}
              >
                {t === 'Todo' ? 'Todos los formatos' : CONTENT_TYPE_LABEL[t] ?? t}
              </button>
            ))}
          </div>
        )}
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
          {(featured.contentType ?? 'articulo') === 'audio' ? (
            <AudioCard article={featured} />
          ) : (
            <ArticleCard article={featured} featured />
          )}
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((a) =>
              (a.contentType ?? 'articulo') === 'audio' ? (
                <AudioCard key={a.id} article={a} />
              ) : (
                <ArticleCard key={a.id} article={a} />
              )
            )}
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
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Visita Wellvibe Media, nuestro canal de contenido abierto.</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Descubrir;
