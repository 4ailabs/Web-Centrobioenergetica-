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
      <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
        <p className="text-gray-500">Curso no encontrado</p>
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
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      {/* Header con botón de volver */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mb-6"
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
        <h1 className="text-2xl lg:text-4xl font-bold text-black mb-4">{course.title}</h1>
        <p className="text-base lg:text-lg text-gray-600 mb-6">{course.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm lg:text-base">
          <div className="bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-gray-600">Lecciones: </span>
            <span className="font-bold text-black">{course.lessons}</span>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-gray-600">Nivel: </span>
            <span className="font-bold text-black">{course.level}</span>
          </div>
          {course.author && (
            <div className="bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-gray-600">Instructor: </span>
              <span className="font-bold text-black">{course.author}</span>
            </div>
          )}
        </div>
      </div>

      {/* Módulos y Videos */}
      {course.modules && course.modules.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl lg:text-2xl font-bold text-black mb-6">Contenido del Curso</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de módulos */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-4 lg:p-6 space-y-3">
                <h3 className="text-lg font-bold text-black mb-4">Módulos</h3>
                {course.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      selectedModule === module.id
                        ? 'bg-black text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-semibold mb-1">{module.title}</div>
                    <div className={`text-xs ${
                      selectedModule === module.id ? 'text-gray-300' : 'text-gray-500'
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
                  <h3 className="text-xl font-bold text-black mb-4">{currentModule.title}</h3>
                  {currentModule.description && (
                    <p className="text-gray-600 mb-6">{currentModule.description}</p>
                  )}
                  
                  <div className="space-y-4">
                    {currentModule.videos.map((video, index) => (
                      <div
                        key={video.id}
                        className="bg-gray-50 rounded-xl p-4 lg:p-6 border border-gray-200 hover:border-black transition-colors"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-black mb-2">{video.title}</h4>
                            {video.description && (
                              <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                            )}
                            {video.duration && (
                              <p className="text-xs text-gray-500">Duración: {video.duration}</p>
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
                              <div className="mt-4 p-4 bg-gray-200 rounded-lg text-center text-gray-500 text-sm">
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
                <p className="text-gray-500">Selecciona un módulo para ver los videos</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl text-center">
          <p className="text-gray-600">El contenido del curso estará disponible pronto.</p>
        </div>
      )}

      {/* Botón de acceso */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            // Aquí puedes agregar lógica para acceder al curso
            alert('Funcionalidad de acceso al curso próximamente');
          }}
          className="w-full lg:w-auto px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
        >
          Acceder al Curso
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;

