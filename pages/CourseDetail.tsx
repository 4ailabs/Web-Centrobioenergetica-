import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import type { CourseVideo } from '../types';
import { ArrowLeftIcon } from '../components/Icons';
import LazyImage from '../components/LazyImage';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';
import { Play, CheckCircle2, Clock, X, Lock } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useCourses();

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

  const openVideo = (video: CourseVideo) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'auto';
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

      {/* Imagen del curso */}
      <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden mb-8">
        <LazyImage
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {module.videos.map((video, index) => {
                      const isCompleted = completedVideos.has(video.id);
                      const hasVideo = video.cloudflareStreamId || video.vimeoId;
                      const thumbnailUrl = video.cloudflareStreamId
                        ? `https://customer-${import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || 'placeholder'}.cloudflarestream.com/${video.cloudflareStreamId}/thumbnails/thumbnail.jpg?time=1s&height=600`
                        : null;

                      return (
                        <div
                          key={video.id}
                          onClick={() => hasVideo && openVideo(video)}
                          className={`group relative bg-[var(--panel-bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-primary-600 transition-colors ${
                            hasVideo ? 'cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          {/* Thumbnail / Placeholder */}
                          <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent">
                            {thumbnailUrl && hasVideo ? (
                              <img
                                src={thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to gradient if thumbnail fails
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/10 via-primary-600/5 to-transparent">
                                <div className="text-center">
                                  <div className="w-20 h-20 mx-auto mb-3 bg-primary-600/20 rounded-2xl flex items-center justify-center">
                                    {hasVideo ? (
                                      <Play className="w-10 h-10 text-primary-600" />
                                    ) : (
                                      <Lock className="w-10 h-10 text-[var(--text-muted)]" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Overlay con botón de play */}
                            {hasVideo && (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center">
                                  <Play className="w-8 h-8 fill-current ml-1" />
                                </div>
                              </div>
                            )}

                            {/* Badge de número */}
                            <div className="absolute top-4 left-4 w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg z-10">
                              {index + 1}
                            </div>

                            {/* Badge de duración */}
                            {video.duration && (
                              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-[10px] font-black text-white uppercase tracking-widest z-10 flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {video.duration}
                              </div>
                            )}

                            {/* Badge de completado */}
                            {isCompleted && (
                              <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg z-10">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                            )}
                          </div>

                          {/* Contenido */}
                          <div className="p-6">
                            <h4 className="text-lg lg:text-xl font-black text-[var(--text-main)] mb-3 uppercase tracking-tight line-clamp-2 leading-tight min-h-[3rem]">
                              {video.title}
                            </h4>
                            {video.description && (
                              <p className="text-sm text-[var(--text-muted)] mb-4 font-medium leading-relaxed line-clamp-2">
                                {video.description}
                              </p>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]/30">
                              {hasVideo ? (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openVideo(video);
                                    }}
                                    className="text-[10px] font-black text-primary-600 uppercase tracking-widest flex items-center gap-2"
                                  >
                                    Ver ahora
                                    <Play className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleVideoCompletion(video.id);
                                    }}
                                    className={`text-[10px] font-black uppercase tracking-widest ${
                                      isCompleted
                                        ? 'text-green-500'
                                        : 'text-[var(--text-muted)] opacity-60 hover:opacity-100'
                                    }`}
                                  >
                                    {isCompleted ? 'Completado' : 'Marcar'}
                                  </button>
                                </>
                              ) : (
                                <div className="w-full text-center text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">
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

      {/* Botón de acceso */}
      <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
        <button
          onClick={() => {
            // Aquí puedes agregar lógica para acceder al curso
            alert('Funcionalidad de acceso al curso próximamente');
          }}
          className="w-full lg:w-auto px-10 py-5 bg-[var(--text-main)] text-[var(--bg-main)] rounded-2xl font-black text-lg hover:bg-primary-600 hover:text-white transition-all active:scale-95 shadow-xl shadow-slate-900/10 uppercase"
        >
          Acceder al Curso
        </button>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={closeVideo}></div>
          <div className="relative w-full max-w-6xl bg-[var(--panel-bg)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)]">
            {/* Header del modal */}
            <div className="relative z-50 bg-[var(--panel-bg)]/95 backdrop-blur-sm border-b border-[var(--border-color)] p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl lg:text-2xl font-black text-[var(--text-main)] uppercase tracking-tight mb-2">
                    {activeVideo.title}
                  </h3>
                  {activeVideo.description && (
                    <p className="text-sm text-[var(--text-muted)] font-medium">
                      {activeVideo.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeVideo}
                  className="flex-shrink-0 w-10 h-10 bg-[var(--bg-main)] hover:bg-red-600 text-[var(--text-main)] hover:text-white rounded-xl flex items-center justify-center transition-colors border border-[var(--border-color)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Video player */}
            <div className="relative aspect-video bg-black">
              {activeVideo.cloudflareStreamId ? (
                <iframe
                  src={getStreamEmbedUrl(activeVideo.cloudflareStreamId, undefined, {
                    controls: true,
                    autoplay: true,
                  })}
                  className="w-full h-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : activeVideo.vimeoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${activeVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>

            {/* Footer con acciones */}
            <div className="relative z-50 bg-[var(--panel-bg)]/95 backdrop-blur-sm border-t border-[var(--border-color)] p-6">
              <div className="flex items-center justify-between">
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
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-colors ${
                    completedVideos.has(activeVideo.id)
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
        </div>
      )}
    </div>
  );
};

export default CourseDetail;

