import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import type { CourseVideo } from '../types';
import { ArrowLeftIcon } from '../components/Icons';
import LazyImage from '../components/LazyImage';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';
import { Play, CheckCircle2, Clock, X, Lock, AlertCircle } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useCourses();
  const { user, isAuthenticated } = useAuth();

  const course = courses.find(c => c.id === parseInt(courseId || '0'));

  if (!course) {
    return (
      <div className="w-full lg:mt-20 mt-16 px-4">
        <p className="text-[var(--text-muted)]">Curso no encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(null);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set());

  // Verificar si el usuario tiene acceso al curso
  const hasAccess = isAuthenticated && (
    user?.enrolledCourses?.includes(courseId || '') ||
    user?.subscriptionStatus === 'active'
  );

  const openVideo = (video: CourseVideo) => {
    // Verificar acceso antes de abrir el video
    if (!hasAccess) {
      if (!isAuthenticated) {
        alert('Debes iniciar sesión para ver los videos');
        navigate('/login');
      } else {
        alert('No tienes acceso a este curso. Contacta al administrador.');
      }
      return;
    }
    setActiveVideo(video);
    // Scroll suave hacia el reproductor
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  const toggleVideoCompletion = (videoId: number) => {
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full lg:mt-20 mt-16 px-4">
      {/* Header con botón de volver */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-[var(--text-muted)] hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="text-sm lg:text-base font-medium">Volver a Cursos</span>
      </button>

      {/* Player inline o Imagen del curso */}
      <div className="w-full rounded-2xl overflow-hidden mb-8 bg-[var(--panel-bg)] border border-[var(--border-color)]">
        {activeVideo ? (
          // Reproductor de video inline
          <div className="relative">
            {/* Header del video */}
            <div className="bg-[var(--panel-bg)] border-b border-[var(--border-color)] p-4 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center font-black text-sm">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs font-black text-primary-600 uppercase tracking-widest">Reproduciendo</span>
                  </div>
                  <h3 className="text-lg lg:text-2xl font-black text-[var(--text-main)] uppercase tracking-tight mb-1">
                    {activeVideo.title}
                  </h3>
                  {activeVideo.description && (
                    <p className="text-sm text-[var(--text-muted)] font-medium line-clamp-2">
                      {activeVideo.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeVideo}
                  className="flex-shrink-0 w-10 h-10 bg-[var(--bg-main)] hover:bg-red-600 text-[var(--text-main)] hover:text-white rounded-xl flex items-center justify-center transition-colors border border-[var(--border-color)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video player */}
            <div className="relative w-full bg-black" style={{ aspectRatio: '16/9', minHeight: '600px' }}>
              {activeVideo.cloudflareStreamId ? (
                <iframe
                  src={getStreamEmbedUrl(activeVideo.cloudflareStreamId, undefined, {
                    controls: true,
                    autoplay: true,
                  })}
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

            {/* Footer con acciones */}
            <div className="bg-[var(--panel-bg)] border-t border-[var(--border-color)] p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  {activeVideo.duration && (
                    <div className="flex items-center gap-2 text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
                      <Clock className="w-4 h-4" />
                      {activeVideo.duration}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleVideoCompletion(activeVideo.id)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-colors ${completedVideos.has(activeVideo.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] hover:border-primary-600'
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedVideos.has(activeVideo.id) ? 'Completado' : 'Marcar como visto'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Imagen del curso (estado por defecto)
          <div className="relative h-64 lg:h-96">
            <LazyImage
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay con texto para indicar que pueden seleccionar un video */}
            {hasAccess && course.modules && course.modules.length > 0 && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="text-white/80 text-sm font-medium mb-2">Selecciona un video para comenzar</p>
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Play className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      {course.modules.reduce((acc, m) => acc + m.videos.length, 0)} videos disponibles
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Información principal del curso */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-4xl font-black text-[var(--text-main)] mb-4 uppercase">{course.title}</h1>
        <p className="text-base lg:text-lg text-[var(--text-muted)] mb-6">{course.description}</p>

        <div className="flex flex-wrap gap-4 text-sm lg:text-base">
          <div className="bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/20">
            <span className="text-[var(--text-muted)]">Lecciones: </span>
            <span className="font-bold text-[var(--text-main)]">{course.lessons}</span>
          </div>
          <div className="bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/20">
            <span className="text-[var(--text-muted)]">Nivel: </span>
            <span className="font-bold text-[var(--text-main)]">{course.level}</span>
          </div>
          {course.author && (
            <div className="bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/20">
              <span className="text-[var(--text-muted)]">Instructor: </span>
              <span className="font-bold text-[var(--text-main)]">{course.author}</span>
            </div>
          )}
        </div>
      </div>

      {/* Módulos y Videos */}
      {course.modules && course.modules.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl lg:text-2xl font-black text-[var(--text-main)] mb-8 uppercase tracking-tight">Contenido del Curso</h2>

          {/* Renderizar todos los módulos secuencialmente */}
          <div className="space-y-12">
            {course.modules.map((module) => (
              <div key={module.id}>
                {/* Header del módulo */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center font-black text-sm">
                      {module.order}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-[var(--text-main)] uppercase tracking-tight">{module.title}</h3>
                  </div>
                  {module.description && (
                    <p className="text-sm lg:text-base text-[var(--text-muted)] font-medium leading-relaxed ml-11">
                      {module.description}
                    </p>
                  )}
                </div>

                {/* Grid de videos del módulo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {module.videos.map((video, index) => {
                    const isCompleted = completedVideos.has(video.id);
                    const hasVideo = video.cloudflareStreamId || video.vimeoId;
                    const isLocked = !hasAccess && hasVideo;
                    const isPlaying = activeVideo?.id === video.id;
                    // Usar videodelivery.net para thumbnails (funciona sin Account ID)
                    const thumbnailUrl = video.cloudflareStreamId
                      ? `https://videodelivery.net/${video.cloudflareStreamId}/thumbnails/thumbnail.jpg?time=1s&height=600`
                      : null;

                    return (
                      <div
                        key={video.id}
                        onClick={() => hasVideo && openVideo(video)}
                        className={`group relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300 ${
                          isPlaying
                            ? 'ring-2 ring-primary-600 ring-offset-2 ring-offset-[var(--bg-main)]'
                            : isLocked
                              ? 'opacity-60 cursor-not-allowed'
                              : hasVideo
                                ? 'cursor-pointer hover:scale-105'
                                : 'cursor-default'
                        }`}
                      >
                        {/* Thumbnail / Placeholder */}
                        <div className="relative w-full bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/9', minHeight: '280px' }}>
                          {thumbnailUrl && hasVideo ? (
                            <>
                              <img
                                src={thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  // Fallback to gradient if thumbnail fails
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/15 via-primary-600/5 to-transparent">
                              <div className="text-center">
                                <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center bg-gradient-to-br from-primary-500/30 to-primary-600/20 backdrop-blur-md border border-primary-500/30">
                                  {isLocked ? (
                                    <Lock className="w-12 h-12 text-red-500" />
                                  ) : (
                                    <Play className="w-12 h-12 text-primary-600 fill-current" />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Overlay con botón de play */}
                          {hasVideo && !isLocked && (
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-10 h-10 fill-current ml-1" />
                              </div>
                            </div>
                          )}

                          {/* Badge de número circular */}
                          <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg z-10 border-2 border-white/20">
                            {index + 1}
                          </div>

                          {/* Badge de duración */}
                          {video.duration && (
                            <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-xs font-black text-white uppercase tracking-widest z-10 flex items-center gap-2 border border-white/10">
                              <Clock className="w-3.5 h-3.5" />
                              {video.duration}
                            </div>
                          )}

                          {/* Badge de reproduciendo */}
                          {isPlaying && (
                            <div className="absolute top-4 right-4 px-4 py-2 bg-primary-600 text-white rounded-full flex items-center gap-2 shadow-lg z-10 border border-primary-500/50 animate-pulse">
                              <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                              </div>
                              <span className="text-xs font-black uppercase tracking-widest">EN VIVO</span>
                            </div>
                          )}

                          {/* Badge de completado */}
                          {isCompleted && !isPlaying && (
                            <div className="absolute top-4 right-4 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg z-10">
                              <CheckCircle2 className="w-7 h-7" />
                            </div>
                          )}
                        </div>

                        {/* Contenido */}
                        <div className="p-6 flex flex-col flex-grow bg-[var(--panel-bg)] border border-t-0 border-[var(--border-color)]">
                          <div className="flex-grow">
                            <h4 className="text-lg lg:text-xl font-black text-[var(--text-main)] mb-2 uppercase tracking-tight line-clamp-2 leading-tight">
                              {video.title}
                            </h4>
                            {video.description && (
                              <p className="text-xs lg:text-sm text-[var(--text-muted)] font-medium leading-relaxed line-clamp-2">
                                {video.description}
                              </p>
                            )}
                          </div>

                          {/* Footer Actions */}
                          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[var(--border-color)]/30">
                            {isLocked ? (
                              <div className="flex-1 flex items-center justify-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest">
                                <Lock className="w-4 h-4" />
                                Bloqueado
                              </div>
                            ) : hasVideo ? (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openVideo(video);
                                  }}
                                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  Ver
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleVideoCompletion(video.id);
                                  }}
                                  className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-200 ${
                                    isCompleted
                                      ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                                      : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-primary-600/50'
                                  }`}
                                >
                                  {isCompleted ? '✓' : '○'}
                                </button>
                              </>
                            ) : (
                              <div className="flex-1 text-center text-xs font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">
                                Próximamente
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-12 p-10 bg-[var(--bg-main)] rounded-[2.5rem] text-center border border-[var(--border-color)] border-dashed">
          <p className="text-[var(--text-muted)] font-black uppercase tracking-widest">El contenido del curso estará disponible pronto.</p>
        </div>
      )}

      {/* Información de acceso al curso */}
      <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
        {!isAuthenticated ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--text-main)] mb-2 uppercase tracking-tight">Inicia sesión para acceder</h3>
                <p className="text-sm text-[var(--text-muted)] font-medium">
                  Necesitas iniciar sesión para acceder al contenido completo del curso.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-[var(--text-main)] text-[var(--bg-main)] rounded-xl font-black text-sm hover:bg-primary-600 hover:text-white transition-colors uppercase tracking-wide"
            >
              Iniciar Sesión
            </button>
          </div>
        ) : !user?.enrolledCourses?.includes(courseId || '') && user?.subscriptionStatus !== 'active' ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--text-main)] mb-2 uppercase tracking-tight">Acceso restringido</h3>
                <p className="text-sm text-[var(--text-muted)] font-medium">
                  No tienes acceso a este curso. Contacta al administrador para solicitar acceso o activa tu suscripción.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-[var(--text-main)] text-[var(--bg-main)] rounded-xl font-black text-sm hover:bg-primary-600 hover:text-white transition-colors uppercase tracking-wide"
            >
              Ir al Dashboard
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--text-main)] mb-2 uppercase tracking-tight">Tienes acceso completo</h3>
                <p className="text-sm text-[var(--text-muted)] font-medium">
                  Puedes ver todos los videos del curso. Haz clic en cualquier video para comenzar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CourseDetail;

