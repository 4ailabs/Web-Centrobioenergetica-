import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import type { Course } from '../types';
import { ArrowLeftIcon } from '../components/Icons';
import LazyImage from '../components/LazyImage';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';

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

  const [selectedModule, setSelectedModule] = useState<number | null>(
    course.modules && course.modules.length > 0 ? course.modules[0].id : null
  );

  const currentModule = course.modules?.find(m => m.id === selectedModule);

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
          <h2 className="text-xl lg:text-2xl font-black text-[var(--text-main)] mb-6 uppercase tracking-tight">Contenido del Curso</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de módulos */}
            <div className="lg:col-span-1">
              <div className="bg-slate-500/5 rounded-2xl p-4 lg:p-6 space-y-3 border border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 uppercase tracking-tight">Módulos</h3>
                {course.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${selectedModule === module.id
                      ? 'bg-primary-600 text-white shadow-lg border-primary-500'
                      : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-primary-400'
                      }`}
                  >
                    <div className="font-bold mb-1 uppercase text-xs tracking-wider">{module.title}</div>
                    <div className={`text-[10px] uppercase font-black ${selectedModule === module.id ? 'text-primary-100' : 'text-[var(--text-muted)] opacity-60'
                      }`}>
                      {module.videos.length} {module.videos.length === 1 ? 'video' : 'videos'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Videos del módulo seleccionado */}
            <div className="lg:col-span-2">
              {currentModule ? (
                <div>
                  <h3 className="text-xl font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">{currentModule.title}</h3>
                  {currentModule.description && (
                    <p className="text-sm text-[var(--text-muted)] mb-8 font-medium leading-relaxed">{currentModule.description}</p>
                  )}

                  <div className="space-y-4">
                    {currentModule.videos.map((video, index) => (
                      <div
                        key={video.id}
                        className="bg-[var(--bg-main)] rounded-2xl p-5 lg:p-7 border border-[var(--border-color)] hover:border-primary-600 transition-all group/video shadow-sm hover:shadow-xl"
                      >
                        <div className="flex items-start space-x-5">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-primary-600/20 group-hover/video:scale-110 transition-transform">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-black text-[var(--text-main)] mb-2 uppercase tracking-tight text-lg group-hover/video:text-primary-600 transition-colors">{video.title}</h4>
                            {video.description && (
                              <p className="text-sm text-[var(--text-muted)] mb-4 font-medium leading-relaxed">{video.description}</p>
                            )}
                            {video.duration && (
                              <div className="flex items-center gap-2 text-[10px] font-black text-primary-600 uppercase tracking-widest bg-primary-600/10 w-fit px-3 py-1 rounded-full border border-primary-600/10">
                                <span>Duración: {video.duration}</span>
                              </div>
                            )}
                            {video.cloudflareStreamId ? (
                              <div className="mt-4">
                                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                                  <iframe
                                    src={getStreamEmbedUrl(video.cloudflareStreamId, undefined, {
                                      controls: true,
                                      autoplay: false,
                                    })}
                                    className="w-full h-full"
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            ) : video.vimeoId ? (
                              <div className="mt-4">
                                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                                  <iframe
                                    src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0`}
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="mt-6 p-6 bg-[var(--bg-main)] rounded-2xl text-center text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest border border-[var(--border-color)] border-dashed">
                                Video próximamente disponible
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-[var(--bg-main)] rounded-[2.5rem] border border-[var(--border-color)] border-dashed">
                  <p className="text-[var(--text-muted)] font-black uppercase tracking-widest">Selecciona un módulo para comenzar</p>
                </div>
              )}
            </div>
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
    </div>
  );
};

export default CourseDetail;

