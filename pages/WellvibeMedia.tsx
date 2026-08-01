import React, { useState } from 'react';
import { YoutubeIcon } from '../components/Icons';
import { Play, ExternalLink, X, ArrowRight } from 'lucide-react';

const WellvibeMedia: React.FC = () => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    const featuredVideo = {
        id: 'fGV8kZdrHXk',
        title: 'La emoción detrás de todas tus emociones',
        subtitle: 'Método del Estado Central',
        description: 'Explora la profundidad de la psicología somática y el Método del Estado Central para transformar tus reacciones emocionales en paz y bienestar.',
        duration: '1:15:30',
        category: 'En Vivo'
    };

    const videos = [
        { id: 'Q0zJ_vZEupc', title: 'Libido: El termómetro de tu salud metabólica', thumbnail: 'https://img.youtube.com/vi/Q0zJ_vZEupc/maxresdefault.jpg', duration: '58:45', category: 'Wellvibe Live' },
        { id: '93R9WEyw9Js', title: 'El calendario secreto de tu cuerpo', thumbnail: 'https://img.youtube.com/vi/93R9WEyw9Js/maxresdefault.jpg', duration: '1:05:20', category: 'En Vivo' },
        { id: '-JADCesWEog', title: 'Los 7 principios de la trascendencia', thumbnail: 'https://img.youtube.com/vi/-JADCesWEog/maxresdefault.jpg', duration: '1:12:15', category: 'Educativo' },
        { id: 'IfbE_5Xbsl8', title: 'El botón de pausa de tu ansiedad: Nervio vago', thumbnail: 'https://img.youtube.com/vi/IfbE_5Xbsl8/maxresdefault.jpg', duration: '45:30', category: 'Wellvibe Live' },
        { id: 'W9KhVq-grzU', title: '5 desayunos para bajar el azúcar en sangre', thumbnail: 'https://img.youtube.com/vi/W9KhVq-grzU/maxresdefault.jpg', duration: '1:02:10', category: 'Nutrición' },
        { id: 'xMr-_e5qokQ', title: 'Hígado limpio, vida plena: Detoxificación', thumbnail: 'https://img.youtube.com/vi/xMr-_e5qokQ/maxresdefault.jpg', duration: '1:20:45', category: 'En Vivo' },
    ];

    const openVideo = (id: string) => setActiveVideoId(id);
    const closeVideo = () => setActiveVideoId(null);

    return (
        <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
            {/* Header */}
            <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-8">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
                    Wellvibe <span className="text-primary-600">Media</span>
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                    Transmisiones, talleres y masterclasses para tu transformación personal.
                </p>
            </div>

            {/* Featured Video — horizontal card */}
            <div className="px-6 lg:px-0 pb-10">
                <div
                    onClick={() => openVideo(featuredVideo.id)}
                    className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                >
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/2 aspect-video sm:aspect-auto sm:min-h-[220px] bg-black relative overflow-hidden">
                            <iframe
                                className="w-full h-full pointer-events-none"
                                src={`https://www.youtube.com/embed/${featuredVideo.id}?rel=0&showinfo=0&autoplay=0`}
                                title={featuredVideo.title}
                                frameBorder="0"
                                allow="encrypted-media"
                            ></iframe>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                </div>
                            </div>
                        </div>
                        <div className="sm:w-1/2 p-5 lg:p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-primary-600 text-white text-[10px] font-medium rounded-full">Destacado</span>
                                <span className="text-[11px] text-neutral-600 dark:text-neutral-400">{featuredVideo.duration} · {featuredVideo.category}</span>
                            </div>
                            <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mb-1 group-hover:text-primary-600 transition-colors">
                                {featuredVideo.title}
                            </h2>
                            <p className="text-xs text-primary-600 mb-2">{featuredVideo.subtitle}</p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                {featuredVideo.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="px-6 lg:px-0 pb-10">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Sesiones pasadas</h2>
                    <a
                        href="https://youtube.com/@wellvibe-media"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        Ir a YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => openVideo(video.id)}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 aspect-video mb-3">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-[11px] text-white font-medium">
                                    {video.duration}
                                </div>
                            </div>
                            <h3 className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                                {video.title}
                            </h3>
                            <span className="text-[11px] text-neutral-600 dark:text-neutral-400">{video.category}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subscribe */}
            <div className="px-6 lg:px-0">
                <div className="bg-salvia-400 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="text-center sm:text-left">
                        <h3 className="text-base font-medium text-white mb-1">Únete a la comunidad</h3>
                        <p className="text-white/70 text-xs">Suscríbete a YouTube para no perderte ningún estreno.</p>
                    </div>
                    <a
                        href="https://youtube.com/@wellvibe-media?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-salvia-500 rounded-lg font-medium text-sm hover:shadow-sm transition-all shrink-0"
                    >
                        <YoutubeIcon className="w-4 h-4" />
                        Suscribirse
                    </a>
                </div>
            </div>

            {/* Video Modal */}
            {activeVideoId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 animate-fade-in">
                    <div className="absolute inset-0 bg-black/90" onClick={closeVideo}></div>
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden">
                        <button
                            onClick={closeVideo}
                            className="absolute top-3 right-3 z-50 p-2 bg-neutral-800/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                            title="YouTube Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WellvibeMedia;
