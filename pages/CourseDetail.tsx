import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import type { CourseVideo } from '../types';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';
import { Play, CheckCircle2, X, Lock, AlertCircle, ArrowLeft, BookOpen } from 'lucide-react';

// Rosetón del Instituto — isotipo SVG inline
const Rosetor: React.FC<{ size?: number; opacity?: number; className?: string }> = ({
  size = 120, opacity = 1, className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 160"
    width={size}
    height={size}
    className={className}
    style={{ opacity }}
  >
    <g transform="translate(80,80)">
      <circle cx="0"     cy="-50"   r="8" fill="#B5604A"/>
      <circle cx="25"    cy="-43.3" r="8" fill="#8FA87A"/>
      <circle cx="43.3"  cy="-25"   r="8" fill="#B5604A"/>
      <circle cx="50"    cy="0"     r="8" fill="#8FA87A"/>
      <circle cx="43.3"  cy="25"    r="8" fill="#B5604A"/>
      <circle cx="25"    cy="43.3"  r="8" fill="#8FA87A"/>
      <circle cx="0"     cy="50"    r="8" fill="#B5604A"/>
      <circle cx="-25"   cy="43.3"  r="8" fill="#8FA87A"/>
      <circle cx="-43.3" cy="25"    r="8" fill="#B5604A"/>
      <circle cx="-50"   cy="0"     r="8" fill="#8FA87A"/>
      <circle cx="-43.3" cy="-25"   r="8" fill="#B5604A"/>
      <circle cx="-25"   cy="-43.3" r="8" fill="#8FA87A"/>
      <circle cx="0" cy="0" r="5" fill="#E8A857" opacity="0.5"/>
      <circle cx="0" cy="0" r="3" fill="#E8A857"/>
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

  if (!course) {
    return (
      <div className="w-full pt-[72px] lg:pt-0 px-6 lg:px-0 py-12">
        <p className="text-neutral-500 mb-4 text-sm">Curso no encontrado</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
          Volver al inicio
        </button>
      </div>
    );
  }

  const hasAccess = isAuthenticated && (
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
      else alert('No tienes acceso a este curso. Contacta al administrador.');
      return;
    }
    setActiveVideo(video);
  };

  const toggleVideoCompletion = (videoId: number) => {
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) newSet.delete(videoId);
      else newSet.add(videoId);
      return newSet;
    });
  };

  const Playlist = () => (
    <div className="space-y-5">
      {course.modules?.map((module) => (
        <div key={module.id}>
          <div className="flex items-center gap-2.5 mb-2.5 px-1">
            <span className="w-5 h-5 rounded bg-primary-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
              {module.order}
            </span>
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide truncate">
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
                  {/* Index / play indicator */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors text-[11px] font-semibold ${
                    isPlaying
                      ? 'bg-primary-600 text-white'
                      : isCompleted
                        ? 'bg-salvia-100 dark:bg-salvia-400/20 text-salvia-500'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                  }`}>
                    {isPlaying
                      ? <Play className="w-3 h-3 fill-current" />
                      : isCompleted
                        ? <CheckCircle2 className="w-3.5 h-3.5" />
                        : index + 1
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-[12px] leading-snug block truncate ${
                      isPlaying ? 'text-primary-600 font-semibold' : 'text-neutral-700 dark:text-neutral-200'
                    }`}>
                      {video.title}
                    </span>
                    {video.duration && (
                      <span className="text-[10px] text-neutral-400">{video.duration}</span>
                    )}
                  </div>

                  <div className="shrink-0">
                    {isLocked
                      ? <Lock className="w-3 h-3 text-neutral-300" />
                      : hasVideo && !isPlaying
                        ? <Play className="w-3 h-3 text-neutral-300 group-hover:text-primary-600 fill-current transition-colors" />
                        : null
                    }
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
    <div className="w-full pt-[72px] lg:pt-0 pb-20 overflow-x-hidden">

      {/* ── HERO BANNER ── visible only when no video is playing */}
      {!activeVideo && (
        <div className="relative mb-6 overflow-hidden" style={{ minHeight: 240 }}>
          {/* Background image */}
          {course.imageUrl && (
            <div className="absolute inset-0">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
            </div>
          )}
          {!course.imageUrl && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-700" />
          )}

          {/* Rosetón decorativo — flotando a la derecha */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 lg:right-16 pointer-events-none select-none"
               style={{ animation: 'spin 40s linear infinite' }}>
            <Rosetor size={160} opacity={0.18} />
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 lg:right-16 pointer-events-none select-none">
            <Rosetor size={160} opacity={0.06} className="scale-150" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 lg:px-8 py-8 lg:py-10 flex flex-col justify-between h-full" style={{ minHeight: 240 }}>
            {/* Back button */}
            <button
              onClick={() => navigate('/cursos')}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs mb-6 w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cursos
            </button>

            <div className="flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Access badge */}
                {hasAccess && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-salvia-400/20 text-salvia-300 text-[10px] font-semibold uppercase tracking-wide mb-3">
                    <CheckCircle2 className="w-3 h-3" /> Tienes acceso
                  </span>
                )}

                {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-semibold text-white leading-tight mb-2 tracking-tight">
                  {course.title}
                </h1>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed max-w-xl line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/50">
                  {course.author && (
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
                      {course.author}
                    </span>
                  )}
                  {course.lessons > 0 && (
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.lessons} lecciones
                    </span>
                  )}
                  {course.level && (
                    <span className="px-2 py-0.5 rounded border border-white/20 text-white/50">
                      {course.level}
                    </span>
                  )}
                </div>
              </div>

              {/* Play button — right side */}
              {hasAccess && totalVideos > 0 && (
                <button
                  onClick={() => {
                    const firstVideo = course.modules?.flatMap(m => m.videos).find(v => v.cloudflareStreamId || v.vimeoId);
                    if (firstVideo) openVideo(firstVideo);
                  }}
                  className="flex flex-col items-center gap-1.5 shrink-0 group/play"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover/play:bg-white/20 group-hover/play:scale-105 transition-all">
                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                  </div>
                  <span className="text-[10px] text-white/40 whitespace-nowrap">Comenzar</span>
                </button>
              )}
            </div>

            {/* Progress bar — bottom of hero */}
            {hasAccess && totalVideos > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/40">Progreso</span>
                  <span className="text-[10px] text-white/40">{completedCount}/{totalVideos} vistos</span>
                </div>
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-salvia-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── VIDEO PLAYER — visible when playing ── */}
      {activeVideo && (
        <div className="px-6 lg:px-0 mb-5">
          {/* Back to course */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/cursos')}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-primary-600 transition-colors text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cursos
            </button>
            <span className="text-[11px] text-neutral-400">{completedCount}/{totalVideos} vistos</span>
          </div>

          {/* Player */}
          <div className="rounded-2xl overflow-hidden bg-black aspect-video relative shadow-2xl">
            {activeVideo.cloudflareStreamId ? (
              <iframe
                src={getStreamEmbedUrl(activeVideo.cloudflareStreamId, undefined, { controls: true, autoplay: true })}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : activeVideo.vimeoId ? (
              <iframe
                src={`https://player.vimeo.com/video/${activeVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>

          {/* Video controls bar */}
          <div className="flex items-center justify-between gap-3 pt-3 px-1">
            <div className="flex items-center gap-3 min-w-0">
              {/* Rosetón pequeño */}
              <Rosetor size={28} />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 truncate">{activeVideo.title}</p>
                <p className="text-[10px] text-neutral-400">{course.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleVideoCompletion(activeVideo.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                  completedVideos.has(activeVideo.id)
                    ? 'bg-salvia-50 dark:bg-salvia-400/10 text-salvia-600 dark:text-salvia-400'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {completedVideos.has(activeVideo.id) ? 'Visto' : 'Marcar visto'}
              </button>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-red-500 transition-colors"
                title="Cerrar video"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PLAYLIST ── */}
      <div className="px-6 lg:px-0">
        <div className={`flex flex-col ${activeVideo ? 'lg:flex-row' : ''} gap-5`}>

          {/* Playlist */}
          {course.modules && course.modules.length > 0 && (
            <div className={activeVideo ? 'lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-4 lg:self-start' : 'w-full max-w-2xl'}>
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Contenido del curso</h2>
                {hasAccess && totalVideos > 0 && !activeVideo && (
                  <span className="text-[10px] text-neutral-400">{completedCount}/{totalVideos} vistos</span>
                )}
              </div>
              <Playlist />
            </div>
          )}

          {/* Empty state when playing and no sidebar content needed */}
          {activeVideo && course.modules && course.modules.length === 0 && (
            <div className="flex-1" />
          )}
        </div>
      </div>

      {/* ── ACCESS MESSAGES ── */}
      {!isAuthenticated && (
        <div className="px-6 lg:px-0 mt-6">
          <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/10 rounded-xl">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs text-amber-800 dark:text-amber-200">Inicia sesión para acceder al contenido.</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-[11px] font-medium shrink-0 hover:bg-primary-700 transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && !hasAccess && (
        <div className="px-6 lg:px-0 mt-6">
          <div className="flex items-center gap-3 p-4 bg-neutral-100/60 dark:bg-neutral-800/40 rounded-xl">
            <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">No tienes acceso a este curso. Contacta al administrador.</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;
