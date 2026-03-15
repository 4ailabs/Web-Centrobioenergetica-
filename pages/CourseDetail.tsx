import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import type { CourseVideo } from '../types';
import { ArrowLeftIcon } from '../components/Icons';
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
      <div className="w-full pt-[72px] lg:pt-0 px-6 lg:px-0">
        <p className="text-neutral-500 mb-4">Curso no encontrado</p>
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

  const openVideo = (video: CourseVideo) => {
    if (!hasAccess) {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        alert('No tienes acceso a este curso. Contacta al administrador.');
      }
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

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
      {/* Back */}
      <div className="px-6 lg:px-0 pt-6 pb-4">
        <button onClick={() => navigate('/cursos')} className="flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver a Cursos
        </button>
      </div>

      {/* Video Player or Course Image */}
      <div className="px-6 lg:px-0 pb-6">
        {activeVideo ? (
          <div>
            {/* Video — full width, no card wrapper */}
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

            {/* Video info — below, not inside a card */}
            <div className="flex items-start justify-between gap-4 pt-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 mb-1">
                  {activeVideo.title}
                </h3>
                {activeVideo.duration && (
                  <span className="text-xs text-neutral-400">{activeVideo.duration}</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVideoCompletion(activeVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${completedVideos.has(activeVideo.id)
                    ? 'bg-green-50 dark:bg-green-500/10 text-green-600 border border-green-200 dark:border-green-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-primary-600'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {completedVideos.has(activeVideo.id) ? 'Visto' : 'Marcar visto'}
                </button>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden aspect-[2.2/1] relative bg-neutral-100 dark:bg-neutral-800">
            <LazyImage src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Course info */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex items-start gap-3 mb-2">
          <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 flex-grow tracking-tight">{course.title}</h1>
          {hasAccess && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg shrink-0">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span className="text-[11px] font-medium text-green-700 dark:text-green-400">Acceso</span>
            </div>
          )}
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 max-w-2xl">{course.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
          <span>{course.lessons} lecciones</span>
          {course.author && <><span>·</span><span>{course.author}</span></>}
        </div>
      </div>

      {/* Modules & Videos */}
      {course.modules && course.modules.length > 0 ? (
        <div className="px-6 lg:px-0">
          <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-5">Contenido del Curso</h2>

          <div className="space-y-6">
            {course.modules.map((module) => (
              <div key={module.id} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {/* Module header */}
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-700 flex items-center gap-2.5">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-md flex items-center justify-center text-[11px] font-semibold shrink-0">
                    {module.order}
                  </div>
                  <h3 className="text-[13.5px] font-medium text-neutral-700 dark:text-neutral-200">{module.title}</h3>
                </div>

                {/* Videos */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
                  {module.videos.map((video, index) => {
                    const isCompleted = completedVideos.has(video.id);
                    const hasVideo = video.cloudflareStreamId || video.vimeoId;
                    const isLocked = !hasAccess && hasVideo;
                    const isPlaying = activeVideo?.id === video.id;

                    return (
                      <div
                        key={video.id}
                        onClick={() => hasVideo && openVideo(video)}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          isPlaying
                            ? 'bg-primary-50 dark:bg-primary-600/10'
                            : isLocked
                              ? 'opacity-50 cursor-not-allowed'
                              : hasVideo
                                ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/30'
                                : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium shrink-0 ${
                          isPlaying ? 'bg-primary-600 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500'
                        }`}>
                          {isPlaying ? <Play className="w-3 h-3 fill-current" /> : index + 1}
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-neutral-700 dark:text-neutral-300 truncate">{video.title}</span>
                            {isCompleted && <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {video.duration && (
                            <span className="text-[11px] text-neutral-400 whitespace-nowrap">{video.duration}</span>
                          )}
                          {isLocked && <Lock className="w-3.5 h-3.5 text-neutral-400" />}
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
        <div className="px-6 lg:px-0">
          <div className="py-12 text-center bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-500">El contenido del curso estará disponible pronto.</p>
          </div>
        </div>
      )}

      {/* Access messages */}
      {!isAuthenticated && (
        <div className="px-6 lg:px-0 mt-8">
          <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/10 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-sm text-amber-800 dark:text-amber-200">Inicia sesión para acceder al contenido.</span>
            </div>
            <button onClick={() => navigate('/login')} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-medium shrink-0">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && !hasAccess && (
        <div className="px-6 lg:px-0 mt-8">
          <div className="flex items-center justify-between gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-neutral-500 shrink-0" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">No tienes acceso. Contacta al administrador.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
