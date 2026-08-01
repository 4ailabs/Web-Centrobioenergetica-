import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import type { CourseVideo } from '../types';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';
import { API_BASE } from '../lib/api';
import { Play, CheckCircle2, X, Lock, AlertCircle, ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { COLOR } from '../lib/tokens';

const Roseton: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width={size} height={size}>
    <g transform="translate(80,80)">
      <circle cx="0"     cy="-50"   r="8" fill={COLOR.terracota}/>
      <circle cx="25"    cy="-43.3" r="8" fill={COLOR.salvia}/>
      <circle cx="43.3"  cy="-25"   r="8" fill={COLOR.terracota}/>
      <circle cx="50"    cy="0"     r="8" fill={COLOR.salvia}/>
      <circle cx="43.3"  cy="25"    r="8" fill={COLOR.terracota}/>
      <circle cx="25"    cy="43.3"  r="8" fill={COLOR.salvia}/>
      <circle cx="0"     cy="50"    r="8" fill={COLOR.terracota}/>
      <circle cx="-25"   cy="43.3"  r="8" fill={COLOR.salvia}/>
      <circle cx="-43.3" cy="25"    r="8" fill={COLOR.terracota}/>
      <circle cx="-50"   cy="0"     r="8" fill={COLOR.salvia}/>
      <circle cx="-43.3" cy="-25"   r="8" fill={COLOR.terracota}/>
      <circle cx="-25"   cy="-43.3" r="8" fill={COLOR.salvia}/>
      <circle cx="0" cy="0" r="5" fill={COLOR.ambar} opacity="0.5"/>
      <circle cx="0" cy="0" r="3" fill={COLOR.ambar}/>
    </g>
  </svg>
);

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useCourses();
  const { user, isAuthenticated } = useAuth();

  const course = courses.find(c => c.id === parseInt(courseId || '0'));

  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(null);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set());
  const [lastVideoId, setLastVideoId] = useState<number | null>(null);
  const [streamSrc, setStreamSrc] = useState<string | null>(null);

  const authHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  };

  // Hidrata el progreso guardado del alumno (antes vivía solo en memoria
  // y se perdía al recargar la página).
  const courseIdNum = course?.id;
  useEffect(() => {
    if (!courseIdNum || !localStorage.getItem('token')) return;
    let cancelled = false;
    fetch(`${API_BASE}/api/progress?courseId=${courseIdNum}`, { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { completedVideoIds?: number[]; lastVideoId?: number | null }) => {
        if (cancelled) return;
        if (Array.isArray(d.completedVideoIds)) setCompletedVideos(new Set(d.completedVideoIds));
        if (typeof d.lastVideoId === 'number') setLastVideoId(d.lastVideoId);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [courseIdNum]);

  const saveProgress = (videoId: number, completed?: boolean) => {
    if (!courseIdNum || !localStorage.getItem('token')) return;
    const moduleId = course?.modules?.find((m) => m.videos.some((v) => v.id === videoId))?.id;
    fetch(`${API_BASE}/api/progress`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ courseId: courseIdNum, videoId, moduleId, ...(typeof completed === 'boolean' ? { completed } : {}) }),
    }).catch(() => {});
  };

  // Pide a la API un token firmado de reproducción para el video activo.
  // Si el endpoint falla, cae a la URL sin firmar (deja de funcionar solo
  // cuando el video tiene activado "Require Signed URLs" en Cloudflare).
  const activeStreamUid = activeVideo?.cloudflareStreamId;
  useEffect(() => {
    if (!activeStreamUid) {
      setStreamSrc(null);
      return;
    }
    let cancelled = false;
    setStreamSrc(null);
    const fallback = getStreamEmbedUrl(activeStreamUid, undefined, { controls: true, autoplay: true });
    const sessionToken = localStorage.getItem('token');
    fetch(`/api/stream-token?uid=${encodeURIComponent(activeStreamUid)}`, {
      headers: sessionToken ? { Authorization: `Bearer ${sessionToken}` } : undefined,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: { token?: string }) => {
        if (cancelled) return;
        setStreamSrc(d.token ? getStreamEmbedUrl(d.token, undefined, { controls: true, autoplay: true }) : fallback);
      })
      .catch(() => {
        if (!cancelled) setStreamSrc(fallback);
      });
    return () => {
      cancelled = true;
    };
  }, [activeStreamUid]);

  if (!course) {
    return (
      <div className="w-full pt-[72px] lg:pt-0 px-6 lg:px-0 py-12">
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">Curso no encontrado</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
          Volver al inicio
        </button>
      </div>
    );
  }

  const hasAccess = isAuthenticated && (
    user?.isAdmin ||
    user?.enrolledCourses?.includes(courseId || '') ||
    user?.subscriptionStatus === 'active'
  );

  const totalVideos = useMemo(() =>
    course.modules?.reduce((acc, m) => acc + m.videos.length, 0) || 0
  , [course]);

  const completedCount = completedVideos.size;
  const progressPct = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;

  const openVideo = (video: CourseVideo) => {
    if (!hasAccess) {
      if (!isAuthenticated) navigate('/login');
      return;
    }
    setActiveVideo(video);
    setLastVideoId(video.id);
    saveProgress(video.id);
  };

  const toggleVideoCompletion = (videoId: number) => {
    const willComplete = !completedVideos.has(videoId);
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) newSet.delete(videoId);
      else newSet.add(videoId);
      return newSet;
    });
    saveProgress(videoId, willComplete);
  };

  const lastVideo = useMemo(() => {
    if (lastVideoId == null) return null;
    return course.modules?.flatMap(m => m.videos).find(v => v.id === lastVideoId) ?? null;
  }, [course, lastVideoId]);

  const Playlist = () => (
    <div className="space-y-5">
      {course.modules?.map((module) => (
        <div key={module.id}>
          <div className="flex items-center gap-2.5 mb-2.5 px-1">
            <span className="w-5 h-5 rounded bg-primary-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
              {module.order}
            </span>
            <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-300 truncate">
              {module.title}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-700/60">
            {module.videos.map((video, index) => {
              const isCompleted = completedVideos.has(video.id);
              const hasVideo = video.cloudflareStreamId || video.vimeoId;
              const isLocked = !hasAccess && hasVideo;
              const isPlaying = activeVideo?.id === video.id;

              return (
                <div
                  key={video.id}
                  onClick={() => hasVideo && openVideo(video)}
                  className={`group flex items-center gap-3 px-3.5 py-3 transition-all ${
                    isPlaying
                      ? 'bg-primary-50 dark:bg-primary-600/10'
                      : isLocked
                        ? 'opacity-40 cursor-not-allowed'
                        : hasVideo
                          ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/30'
                          : 'cursor-default opacity-60'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-semibold ${
                    isPlaying
                      ? 'bg-primary-600 text-white'
                      : isCompleted
                        ? 'bg-salvia-100 dark:bg-salvia-400/20 text-salvia-500'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {isPlaying
                      ? <Play className="w-3 h-3 fill-current" />
                      : isCompleted
                        ? <CheckCircle2 className="w-3.5 h-3.5" />
                        : index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-[12px] leading-snug block truncate ${
                      isPlaying ? 'text-primary-600 font-semibold' : 'text-neutral-700 dark:text-neutral-200'
                    }`}>
                      {video.title}
                    </span>
                    {video.duration && (
                      <span className="text-[10px] text-neutral-600 dark:text-neutral-400">{video.duration}</span>
                    )}
                  </div>

                  <div className="shrink-0">
                    {isLocked
                      ? <Lock className="w-3 h-3 text-neutral-300" />
                      : hasVideo && !isPlaying
                        ? <Play className="w-3 h-3 text-neutral-300 group-hover:text-primary-600 fill-current transition-colors" />
                        : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-20">

      {/* ── BACK NAV ── */}
      <div className="px-6 lg:px-0 pt-6 pb-4">
        <button
          onClick={() => navigate('/cursos')}
          className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Cursos
        </button>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="px-6 lg:px-0 flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">

        {/* LEFT: banner + player + info */}
        <div className="flex-1 min-w-0">

          {/* Banner / Player */}
          {activeVideo ? (
            /* VIDEO PLAYER */
            <div>
              <div className="rounded-xl overflow-hidden bg-black aspect-video relative shadow-lg">
                {activeVideo.cloudflareStreamId ? (
                  streamSrc ? (
                    <iframe
                      src={streamSrc}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-neutral-600 border-t-white animate-spin" />
                    </div>
                  )
                ) : activeVideo.vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${activeVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : null}
              </div>

              {/* Video controls */}
              <div className="flex items-center justify-between gap-3 pt-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Roseton size={22} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 truncate">{activeVideo.title}</p>
                    {activeVideo.duration && <p className="text-[10px] text-neutral-600 dark:text-neutral-400">{activeVideo.duration}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleVideoCompletion(activeVideo.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                      completedVideos.has(activeVideo.id)
                        ? 'bg-salvia-50 dark:bg-salvia-400/10 text-salvia-600 dark:text-salvia-400'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-primary-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {completedVideos.has(activeVideo.id) ? 'Visto' : 'Marcar visto'}
                  </button>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* COURSE BANNER */
            <div>
              {/* Image banner — clean, no overlay */}
              <div
                className={`rounded-xl overflow-hidden aspect-video relative bg-neutral-100 dark:bg-neutral-800 ${hasAccess && totalVideos > 0 ? 'cursor-pointer group/hero' : ''}`}
                onClick={() => {
                  if (hasAccess && course.modules) {
                    const firstVideo = course.modules.flatMap(m => m.videos).find(v => v.cloudflareStreamId || v.vimeoId);
                    if (firstVideo) openVideo(firstVideo);
                  }
                }}
              >
                {course.imageUrl && (
                  <img src={course.imageUrl} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                )}
                {/* Only a soft bottom fade for play button legibility */}
                {hasAccess && totalVideos > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg scale-90 group-hover/hero:scale-100 transition-transform">
                      <Play className="w-5 h-5 text-neutral-800 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Course info — below image, clean */}
              <div className="pt-4 pb-2">
                <div className="flex items-start gap-3">
                  <Roseton size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight leading-snug">
                        {course.title}
                      </h1>
                      {hasAccess && (
                        <span className="px-2 py-0.5 bg-salvia-50 dark:bg-salvia-400/10 text-salvia-600 dark:text-salvia-400 text-[10px] font-medium rounded shrink-0">
                          Acceso
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2 max-w-lg">
                      {course.description}
                    </p>
                    <div className="flex items-center flex-wrap gap-3 text-[11px] text-neutral-600 dark:text-neutral-400">
                      {course.author && <span>{course.author}</span>}
                      {course.lessons > 0 && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {course.lessons} lecciones
                        </span>
                      )}
                      {course.level && <span>{course.level}</span>}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {hasAccess && totalVideos > 0 && (
                  <div className="mt-4 pl-11">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-neutral-600 dark:text-neutral-400">Progreso</span>
                      <span className="text-[10px] text-neutral-600 dark:text-neutral-400">{completedCount}/{totalVideos} vistos</span>
                    </div>
                    <div className="h-1 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Continuar donde te quedaste */}
                {hasAccess && lastVideo && (
                  <div className="mt-4 pl-11">
                    <button
                      onClick={() => openVideo(lastVideo)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Continuar con: {lastVideo.title}
                    </button>
                  </div>
                )}

                {/* BV4 — enlace al material del curso (solo alumnos con acceso) */}
                {hasAccess && course.id === 103 && (
                  <div className="mt-4 pl-11">
                    <a
                      href="https://bioenergetica-v4.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Acceder al material del curso
                    </a>
                  </div>
                )}

                {/* Test Hormonal banner — solo para alumnos de Reset Hormonal */}
                {hasAccess && course.id === 104 && (
                  <div
                    onClick={() => navigate('/test-hormonal')}
                    className="mt-4 pl-11 cursor-pointer"
                  >
                    <div
                      className="rounded-xl overflow-hidden transition-all hover:shadow-md"
                      style={{ background: '#F2EDE8', border: '1px solid #E0D6CC' }}
                    >
                      <div className="px-5 py-4 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: COLOR.terracotaOscuro }}>Test gratuito</span>
                          <h3 className="text-[14px] font-medium mt-0.5" style={{ color: '#3D3B37' }}>Descubre tu perfil hormonal</h3>
                          <p className="text-[11px] mt-1 leading-relaxed" style={{ color: '#6B6963' }}>22 preguntas basadas en la escala MRS. Identifica tu fase, la severidad de tus síntomas y tus ejes de riesgo.</p>
                        </div>
                        <div className="shrink-0">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLOR.terracotaOscuro }}>
                            <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Access messages */}
          {!isAuthenticated && (
            <div className="mt-4">
              <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/10 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs text-amber-800 dark:text-amber-200">Inicia sesión para acceder al contenido.</span>
                </div>
                <button onClick={() => navigate('/login')} className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-[11px] font-medium shrink-0 hover:bg-primary-700 transition-colors">
                  Iniciar sesión
                </button>
              </div>
            </div>
          )}
          {isAuthenticated && !hasAccess && (
            <div className="mt-4">
              <div className="flex items-center gap-3 p-4 bg-neutral-100/60 dark:bg-neutral-800/40 rounded-xl">
                <Lock className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">No tienes acceso a este curso. Contacta al administrador.</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Playlist sidebar */}
        {course.modules && course.modules.length > 0 && (
          <div className="lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">Contenido</h2>
              {hasAccess && totalVideos > 0 && (
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400">{completedCount}/{totalVideos}</span>
              )}
            </div>
            <Playlist />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
