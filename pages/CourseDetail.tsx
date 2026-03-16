import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import type { CourseVideo } from '../types';
import LazyImage from '../components/LazyImage';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';
import { Play, CheckCircle2, Clock, X, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useCourses();
  const { user, isAuthenticated } = useAuth();

  const course = courses.find(c => c.id === parseInt(courseId || '0'));

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

  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(null);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set());

  const hasAccess = isAuthenticated && (
    user?.enrolledCourses?.includes(courseId || '') ||
    user?.subscriptionStatus === 'active'
  );

  const totalVideos = useMemo(() =>
    course.modules?.reduce((acc, m) => acc + m.videos.length, 0) || 0
  , [course]);

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

  // Playlist component — reused in both layouts
  const Playlist = () => (
    <div className="space-y-4">
      {course.modules?.map((module) => (
        <div key={module.id}>
          {/* Module header */}
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-5 h-5 bg-primary-600 text-white rounded flex items-center justify-center text-[10px] font-semibold shrink-0">
              {module.order}
            </div>
            <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-300 truncate">{module.title}</span>
          </div>

          {/* Videos */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-700">
            {module.videos.map((video, index) => {
              const isCompleted = completedVideos.has(video.id);
              const hasVideo = video.cloudflareStreamId || video.vimeoId;
              const isLocked = !hasAccess && hasVideo;
              const isPlaying = activeVideo?.id === video.id;

              return (
                <div
                  key={video.id}
                  onClick={() => hasVideo && openVideo(video)}
                  className={`group flex items-center gap-2.5 px-3 py-2.5 transition-colors ${
                    isPlaying
                      ? 'bg-primary-50 dark:bg-primary-600/10'
                      : isLocked
                        ? 'opacity-40 cursor-not-allowed'
                        : hasVideo
                          ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/30'
                          : ''
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium shrink-0 ${
                    isPlaying ? 'bg-primary-600 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                  }`}>
                    {isPlaying ? <Play className="w-2.5 h-2.5 fill-current" /> : index + 1}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[12px] truncate ${isPlaying ? 'text-primary-600 font-medium' : 'text-neutral-700 dark:text-neutral-300'}`}>
                        {video.title}
                      </span>
                      {isCompleted && <CheckCircle2 className="w-3 h-3 text-salvia-400 shrink-0" />}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {video.duration && <span className="text-[10px] text-neutral-400 whitespace-nowrap">{video.duration}</span>}
                    {isLocked ? (
                      <Lock className="w-3 h-3 text-neutral-400" />
                    ) : hasVideo && !isPlaying ? (
                      <Play className="w-3 h-3 text-neutral-400 group-hover:text-primary-600 fill-current transition-colors" />
                    ) : null}
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
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
      {/* Back + Title bar */}
      <div className="px-6 lg:px-0 pt-6 pb-4 flex items-center justify-between">
        <button onClick={() => navigate('/cursos')} className="flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        {hasAccess && totalVideos > 0 && (
          <span className="text-[11px] text-neutral-400">
            {completedVideos.size}/{totalVideos} vistos
          </span>
        )}
      </div>

      {/* Desktop: Video + Playlist side by side / Mobile: stacked */}
      <div className="px-6 lg:px-0 pb-6 flex flex-col lg:flex-row gap-5">
        {/* Main area — video or image */}
        <div className="flex-1 min-w-0">
          {activeVideo ? (
            <div>
              <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
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

              {/* Video info */}
              <div className="flex items-start justify-between gap-3 pt-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">{activeVideo.title}</h3>
                  {activeVideo.duration && <span className="text-[11px] text-neutral-400">{activeVideo.duration}</span>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleVideoCompletion(activeVideo.id)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${completedVideos.has(activeVideo.id)
                      ? 'bg-salvia-50 dark:bg-salvia-400/10 text-salvia-500'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {completedVideos.has(activeVideo.id) ? 'Visto' : 'Marcar'}
                  </button>
                  <button onClick={() => setActiveVideo(null)} className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`rounded-xl overflow-hidden aspect-video relative bg-neutral-100 dark:bg-neutral-800 ${hasAccess && totalVideos > 0 ? 'cursor-pointer group/hero' : ''}`}
                onClick={() => {
                  if (hasAccess && course.modules) {
                    const firstVideo = course.modules.flatMap(m => m.videos).find(v => v.cloudflareStreamId || v.vimeoId);
                    if (firstVideo) openVideo(firstVideo);
                  }
                }}
              >
                <LazyImage src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                {hasAccess && totalVideos > 0 && (
                  <div className="absolute inset-0 bg-black/20 group-hover/hero:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md group-hover/hero:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-neutral-800 ml-0.5 fill-current" />
                      </div>
                      <span className="text-white text-xs font-medium">Reproducir · {totalVideos} videos</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Course info — only when no video playing */}
              <div className="pt-4">
                <div className="flex items-start gap-2 mb-2">
                  <h1 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight flex-grow">{course.title}</h1>
                  {hasAccess && (
                    <span className="px-2 py-0.5 bg-salvia-50 dark:bg-salvia-400/10 text-salvia-500 text-[10px] font-medium rounded shrink-0">Acceso</span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 max-w-lg">{course.description}</p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <span>{course.lessons} lecciones</span>
                  {course.author && <><span>·</span><span>{course.author}</span></>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Playlist panel — sidebar on desktop, below on mobile */}
        {course.modules && course.modules.length > 0 && (
          <div className="lg:w-72 xl:w-80 shrink-0">
            <div className="lg:sticky lg:top-4">
              <h2 className="text-[12px] font-medium text-neutral-500 dark:text-neutral-400 mb-3 px-1">Contenido</h2>
              <Playlist />
            </div>
          </div>
        )}
      </div>

      {/* Access messages */}
      {!isAuthenticated && (
        <div className="px-6 lg:px-0 mt-4">
          <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/10 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs text-amber-800 dark:text-amber-200">Inicia sesión para acceder al contenido.</span>
            </div>
            <button onClick={() => navigate('/login')} className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-[11px] font-medium shrink-0">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && !hasAccess && (
        <div className="px-6 lg:px-0 mt-4">
          <div className="flex items-center gap-3 p-4 bg-neutral-100/60 dark:bg-neutral-800/40 rounded-xl">
            <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">No tienes acceso a este curso. Contacta al administrador.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
