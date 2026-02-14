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
      <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 px-6 max-w-6xl mx-auto">
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">Curso no encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
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
    <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header con botón de volver */}
      <button
        onClick={() => navigate('/cursos')}
        className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors mb-8 font-medium text-sm"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Volver a Cursos</span>
      </button>

      {/* Player inline o Imagen del curso */}
      <div className="w-full rounded-lg overflow-hidden mb-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        {activeVideo ? (
          // Reproductor de video inline
          <div className="relative">
            {/* Header del video */}
            <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-medium">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs font-medium text-primary-600">Reproduciendo</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                    {activeVideo.title}
                  </h3>
                  {activeVideo.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal line-clamp-2">
                      {activeVideo.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeVideo}
                  className="flex-shrink-0 w-10 h-10 bg-neutral-100 dark:bg-neutral-700 hover:bg-red-600 text-neutral-700 dark:text-neutral-300 hover:text-white rounded-lg flex items-center justify-center transition-colors border border-neutral-200 dark:border-neutral-600"
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
            <div className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  {activeVideo.duration && (
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      <Clock className="w-4 h-4" />
                      {activeVideo.duration}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleVideoCompletion(activeVideo.id)}
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${completedVideos.has(activeVideo.id)
                    ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600 hover:border-primary-600'
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
          <div className="relative h-40 lg:h-52">
            <LazyImage
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay con texto para indicar que pueden seleccionar un video */}
            {hasAccess && course.modules && course.modules.length > 0 && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-4">
                <div className="text-center">
                  <p className="text-white/70 text-xs font-medium mb-1">Selecciona un video</p>
                  <div className="flex items-center justify-center gap-1.5 text-white">
                    <Play className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">
                      {course.modules.reduce((acc, m) => acc + m.videos.length, 0)} videos
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
        <div className="flex items-start gap-3 mb-3">
          <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 flex-grow">{course.title}</h1>
          {isAuthenticated && (user?.enrolledCourses?.includes(courseId || '') || user?.subscriptionStatus === 'active') && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Acceso</span>
            </div>
          )}
        </div>
        <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed max-w-3xl">{course.description}</p>

        <div className="flex flex-wrap gap-3 text-xs lg:text-sm">
          <div className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-400">Lecciones: </span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">{course.lessons}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-400">Nivel: </span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">{course.level}</span>
          </div>
          {course.author && (
            <div className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">Instructor: </span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-50">{course.author}</span>
            </div>
          )}
        </div>
      </div>

      {/* Módulos y Videos */}
      {course.modules && course.modules.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-8 tracking-tight">Contenido del Curso</h2>

          {/* Renderizar todos los módulos secuencialmente */}
          <div className="space-y-8">
            {course.modules.map((module) => (
              <div key={module.id}>
                {/* Header del módulo */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-primary-600 text-white rounded-lg flex items-center justify-center text-xs font-semibold">
                      {module.order}
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight">{module.title}</h3>
                  </div>
                  {module.description && (
                    <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed ml-9">
                      {module.description}
                    </p>
                  )}
                </div>

                {/* Lista de videos del módulo - Vista profesional */}
                <div className="space-y-3">
                  {module.videos.map((video, index) => {
                    const isCompleted = completedVideos.has(video.id);
                    const hasVideo = video.cloudflareStreamId || video.vimeoId;
                    const isLocked = !hasAccess && hasVideo;
                    const isPlaying = activeVideo?.id === video.id;

                    return (
                      <div
                        key={video.id}
                        onClick={() => hasVideo && openVideo(video)}
                        className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                          isPlaying
                            ? 'bg-primary-50 dark:bg-primary-600/10 border-primary-300 dark:border-primary-600/30'
                            : isLocked
                              ? 'opacity-60 cursor-not-allowed border-neutral-200 dark:border-neutral-700'
                              : hasVideo
                                ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600/50 cursor-pointer hover:shadow-md'
                                : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 cursor-default'
                        }`}
                      >
                        {/* Video Number Badge */}
                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-600/20 text-primary-600 rounded-lg flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h4 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-neutral-50 line-clamp-1">
                              {video.title}
                            </h4>
                            {isCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            )}
                          </div>
                          {video.description && (
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                              {video.description}
                            </p>
                          )}
                        </div>

                        {/* Duration & Status */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                          {video.duration && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{video.duration}</span>
                            </div>
                          )}

                          {/* Action Button */}
                          {isLocked ? (
                            <Lock className="w-4 h-4 text-red-500" />
                          ) : hasVideo ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openVideo(video);
                              }}
                              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 shadow-sm"
                              title="Reproducir video"
                            >
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </button>
                          ) : (
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 opacity-60">Próx.</span>
                          )}
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
        <div className="mt-12 p-10 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center border border-neutral-200 dark:border-neutral-700 border-dashed">
          <p className="text-neutral-600 dark:text-neutral-400 font-medium">El contenido del curso estará disponible pronto.</p>
        </div>
      )}

      {/* Información de acceso al curso - Solo para acceso restringido */}
      {!isAuthenticated && (
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Inicia sesión para acceder</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                  Necesitas iniciar sesión para acceder al contenido completo del curso.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && !user?.enrolledCourses?.includes(courseId || '') && user?.subscriptionStatus !== 'active' && (
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Acceso restringido</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                  No tienes acceso a este curso. Contacta al administrador para solicitar acceso o activa tu suscripción.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseDetail;

