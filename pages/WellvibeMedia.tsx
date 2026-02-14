import React, { useState } from 'react';
import { YoutubeIcon, ArrowRightIcon } from '../components/Icons';
import { Play, ExternalLink, X } from 'lucide-react';

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
        {
            id: 'Q0zJ_vZEupc',
            title: 'Libido: El termómetro de tu salud metabólica',
            thumbnail: 'https://img.youtube.com/vi/Q0zJ_vZEupc/maxresdefault.jpg',
            duration: '58:45',
            category: 'Wellvibe Live'
        },
        {
            id: '93R9WEyw9Js',
            title: 'El calendario secreto de tu cuerpo',
            thumbnail: 'https://img.youtube.com/vi/93R9WEyw9Js/maxresdefault.jpg',
            duration: '1:05:20',
            category: 'En Vivo'
        },
        {
            id: '-JADCesWEog',
            title: 'Los 7 principios de la trascendencia',
            thumbnail: 'https://img.youtube.com/vi/-JADCesWEog/maxresdefault.jpg',
            duration: '1:12:15',
            category: 'Educativo'
        },
        {
            id: 'IfbE_5Xbsl8',
            title: 'El botón de pausa de tu ansiedad: Nervio vago',
            thumbnail: 'https://img.youtube.com/vi/IfbE_5Xbsl8/maxresdefault.jpg',
            duration: '45:30',
            category: 'Wellvibe Live'
        },
        {
            id: 'W9KhVq-grzU',
            title: '5 desayunos para bajar el azúcar en sangre',
            thumbnail: 'https://img.youtube.com/vi/W9KhVq-grzU/maxresdefault.jpg',
            duration: '1:02:10',
            category: 'Nutrición'
        },
        {
            id: 'xMr-_e5qokQ',
            title: 'Hígado limpio, vida plena: Detoxificación',
            thumbnail: 'https://img.youtube.com/vi/xMr-_e5qokQ/maxresdefault.jpg',
            duration: '1:20:45',
            category: 'En Vivo'
        },
    ];

    const openVideo = (id: string) => {
        setActiveVideoId(id);
        document.body.style.overflow = 'hidden';
    };

    const closeVideo = () => {
        setActiveVideoId(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 space-y-20 pb-20">
            {/* Header Section - Refined Minimalism */}
            <header className="px-6 max-w-6xl mx-auto w-full">
                <div className="space-y-6">
                    <div className="inline-flex">
                        <span className="px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-600/8 dark:bg-primary-600/10 rounded-full">
                            Wellvibe Media
                        </span>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
                            Sesiones en <br />
                            <span className="text-primary-600">directo</span>
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed">
                            Accede a nuestras transmisiones, talleres y masterclasses diseñadas para elevar tu inteligencia energética y transformación personal.
                        </p>
                    </div>
                </div>
            </header>

            {/* Featured Video - Clean & Elegant */}
            <section className="px-6 max-w-6xl mx-auto w-full">
                <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                    <div className="grid lg:grid-cols-2">
                        {/* Video Container */}
                        <div className="aspect-video bg-black relative">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${featuredVideo.id}?rel=0&showinfo=0&autoplay=0`}
                                title={featuredVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Content Container */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                            {/* Metadata */}
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                                    Destacado
                                </span>
                                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                                    {featuredVideo.duration} • {featuredVideo.category}
                                </span>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 leading-tight">
                                    {featuredVideo.title}
                                </h2>
                                <p className="text-sm text-primary-600 font-medium">
                                    {featuredVideo.subtitle}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed font-normal">
                                {featuredVideo.description}
                            </p>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => openVideo(featuredVideo.id)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all active:scale-95 shadow-md hover:shadow-lg"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    Ver sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Grid Section */}
            <section className="px-6 max-w-6xl mx-auto w-full">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-sm font-medium text-primary-600 mb-2">Transmisiones</h2>
                        <h3 className="text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
                            Sesiones pasadas
                        </h3>
                    </div>
                    <a
                        href="https://youtube.com/@wellvibe-media"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                        Ir a YouTube
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <div
                            key={video.id}
                            className="group bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full"
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => openVideo(video.id)}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg">
                                        <Play className="w-5 h-5 fill-current ml-0.5" />
                                    </div>
                                </div>
                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-neutral-900/80 dark:bg-neutral-950/80 rounded-md text-xs font-medium text-white">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow space-y-4">
                                {/* Category */}
                                <span className="text-xs font-medium text-primary-600">
                                    {video.category}
                                </span>

                                {/* Title */}
                                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 leading-tight line-clamp-2">
                                    {video.title}
                                </h4>

                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-primary-600">
                                            Ver sesión
                                        </span>
                                        <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subscribe Section - Subtle Gradient */}
            <section className="px-6 max-w-6xl mx-auto w-full">
                <div className="relative bg-gradient-to-br from-primary-600/10 via-primary-600/5 to-transparent dark:from-primary-600/20 dark:via-primary-600/10 dark:to-transparent rounded-lg border border-primary-200 dark:border-primary-600/30 p-12 lg:p-16 text-center overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                        <h2 className="text-3xl lg:text-5xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight">
                            Únete a nuestra comunidad
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                            Suscríbete a nuestro canal de YouTube y activa las notificaciones para no perderte ningún estreno de Wellvibe Media.
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://youtube.com/@wellvibe-media?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all active:scale-95 shadow-md hover:shadow-lg"
                            >
                                <YoutubeIcon className="w-5 h-5" />
                                Suscribirse
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Player Modal */}
            {activeVideoId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 animate-fade-in">
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                        onClick={closeVideo}
                    ></div>
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-neutral-700 group">
                        <button
                            onClick={closeVideo}
                            className="absolute top-4 right-4 z-50 w-10 h-10 bg-neutral-700 hover:bg-primary-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6" />
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
