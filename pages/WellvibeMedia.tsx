import React from 'react';
import { YoutubeIcon, ArrowRightIcon, SparklesIcon } from '../components/Icons';
import { Play, Share2, Info, ExternalLink } from 'lucide-react';

const WellvibeMedia: React.FC = () => {
    const featuredVideo = {
        id: 'fGV8kZdrHXk',
        title: 'La emoción detrás de todas tus emociones | Método del Estado Central',
        description: 'Explora la profundidad de la psicología somática y el Método del Estado Central para transformar tus reacciones emocionales en paz y bienestar.',
        duration: '1:15:30',
        category: 'En Vivo'
    };

    const videos = [
        {
            id: 'Q0zJ_vZEupc',
            title: 'LIBIDO: EL TERMÓMETRO DE TU SALUD METABÓLICA',
            thumbnail: 'https://img.youtube.com/vi/Q0zJ_vZEupc/maxresdefault.jpg',
            duration: '58:45',
            category: 'Wellvibe Live'
        },
        {
            id: '93R9WEyw9Js',
            title: 'El Calendario Secreto de Tu Cuerpo: Por Qué Te Enfermas',
            thumbnail: 'https://img.youtube.com/vi/93R9WEyw9Js/maxresdefault.jpg',
            duration: '1:05:20',
            category: 'En Vivo'
        },
        {
            id: '-JADCesWEog',
            title: 'Los 7 Principios de la Trascendencia: Qué entender AHORA',
            thumbnail: 'https://img.youtube.com/vi/-JADCesWEog/maxresdefault.jpg',
            duration: '1:12:15',
            category: 'Educativo'
        },
        {
            id: 'IfbE_5Xbsl8',
            title: 'El botón de pausa de tu ansiedad: Nervio Vago',
            thumbnail: 'https://img.youtube.com/vi/IfbE_5Xbsl8/maxresdefault.jpg',
            duration: '45:30',
            category: 'Wellvibe Live'
        },
        {
            id: 'W9KhVq-grzU',
            title: '5 Desayunos para BAJAR el Azúcar en Sangre',
            thumbnail: 'https://img.youtube.com/vi/W9KhVq-grzU/maxresdefault.jpg',
            duration: '1:02:10',
            category: 'Nutrición'
        },
        {
            id: 'xMr-_e5qokQ',
            title: 'HÍGADO LIMPIO, VIDA PLENA: Detoxificación Hepática',
            thumbnail: 'https://img.youtube.com/vi/xMr-_e5qokQ/maxresdefault.jpg',
            duration: '1:20:45',
            category: 'En Vivo'
        },
    ];

    return (
        <div className="w-full lg:mt-20 mt-16 space-y-12 pb-20">
            {/* Header Section */}
            <header className="px-4 relative overflow-hidden bg-[var(--panel-bg)] rounded-3xl py-12 border border-[var(--border-color)] shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                            <YoutubeIcon className="w-6 h-6" />
                        </div>
                        <span className="text-red-600 font-black uppercase tracking-widest text-[10px]">Wellvibe Media TV</span>
                    </div>
                    <h1 className="text-3xl lg:text-6xl font-black text-[var(--text-main)] tracking-tight mb-4 uppercase">
                        Wellvibe <span className="text-red-600">En Vivo</span>
                    </h1>
                    <p className="text-base lg:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-medium">
                        Revive nuestras sesiones en directo, talleres y masterclasses diseñadas para elevar tu inteligencia energética.
                    </p>
                </div>
            </header>

            {/* Featured Video */}
            <section className="px-4">
                <div className="bg-[var(--panel-bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-xl relative group">
                    <div className="grid lg:grid-cols-2">
                        <div className="aspect-video bg-black relative">
                            {/* YouTube Embed Placeholder */}
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${featuredVideo.id}?rel=0&showinfo=0&autoplay=0`}
                                title={featuredVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-8 lg:p-16 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Destacado</span>
                                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{featuredVideo.duration} • {featuredVideo.category}</span>
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-black text-[var(--text-main)] mb-6 uppercase leading-tight tracking-tight">
                                {featuredVideo.title}
                            </h2>
                            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed font-medium">
                                {featuredVideo.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95">
                                    <Play className="w-4 h-4 fill-current" /> Ver ahora
                                </button>
                                <button className="flex items-center gap-2 px-8 py-4 bg-[var(--bg-main)] text-[var(--text-main)] rounded-2xl font-black uppercase tracking-widest text-xs border border-[var(--border-color)] hover:border-red-600 transition-all active:scale-95">
                                    <Share2 className="w-4 h-4" /> Compartir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Grid Section */}
            <section className="px-4">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black text-primary-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-8 h-px bg-primary-600/20"></span>
                        Transmisiones Pasadas
                    </h3>
                    <a href="https://youtube.com/@wellvibe-media" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-[var(--text-muted)] hover:text-red-600 uppercase tracking-widest flex items-center gap-2 transition-colors">
                        Ver en YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <div
                            key={video.id}
                            className="group bg-[var(--panel-bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-300">
                                        <Play className="w-8 h-8 fill-current" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 rounded-lg text-[10px] font-black text-white uppercase tracking-widest z-10">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="p-8">
                                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3 block">{video.category}</span>
                                <h4 className="text-xl font-black text-[var(--text-main)] mb-6 uppercase tracking-tight group-hover:text-red-600 transition-colors line-clamp-2 leading-tight min-h-[3rem]">
                                    {video.title}
                                </h4>
                                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]/30">
                                    <button className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-widest flex items-center gap-2 group/btn">
                                        Ver ahora
                                        <ArrowRightIcon className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform text-red-600" />
                                    </button>
                                    <div className="flex items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <YoutubeIcon className="w-3 h-3 text-red-600" />
                                        <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">Live</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subscribe Section */}
            <section className="px-4">
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-red-200/50">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10 shrink-0">
                        <SparklesIcon className="w-12 h-12 mx-auto mb-6 text-white/30" />
                        <h2 className="text-3xl lg:text-5xl font-black mb-6 uppercase tracking-tight">Únete a nuestra comunidad</h2>
                        <p className="text-red-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Suscríbete a nuestro canal de YouTube y activa las notificaciones para no perderte ningún estreno de Wellvibe Media.
                        </p>
                        <a
                            href="https://youtube.com/@wellvibe-media?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-red-600 rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest"
                        >
                            <YoutubeIcon className="w-6 h-6" />
                            Suscribirse Ahora
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WellvibeMedia;
