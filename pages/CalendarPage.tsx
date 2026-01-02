
import React, { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';
import { CalendarIcon, SparklesIcon, ArrowRightIcon } from '../components/Icons';
import { MOCK_DATA } from '../data/mockData';

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.length > 0 ? data : MOCK_DATA.events);
                } else {
                    setEvents(MOCK_DATA.events);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents(MOCK_DATA.events);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'live': return 'bg-red-100 text-red-600';
            case 'workshop': return 'bg-purple-100 text-purple-600';
            case 'support': return 'bg-blue-100 text-blue-600';
            default: return 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-color)]';
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
            full: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-[var(--border-color)] rounded-full mb-4"></div>
                    <p className="text-[var(--text-muted)] font-medium">Cargando agenda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:mt-20 mt-16 space-y-12">
            <div className="px-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl lg:text-5xl font-black text-[var(--text-main)] tracking-tight mb-4 uppercase">
                        Agenda <span className="text-primary-600">Eventos</span>
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] max-w-2xl">
                        Sigue de cerca las clases en vivo, talleres intensivos y sesiones de acompañamiento.
                    </p>
                </div>
                <div className="flex bg-[var(--bg-main)] p-1 rounded-xl border border-[var(--border-color)]">
                    <button
                        onClick={() => setView('grid')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'grid' ? 'bg-primary-600 text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                    >
                        Vista Cuadrícula
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'list' ? 'bg-primary-600 text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                    >
                        Vista Lista
                    </button>
                </div>
            </div>

            <section className="px-4">
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => {
                            const dateInfo = formatDate(event.date);
                            return (
                                <div key={event.id} className="group bg-[var(--panel-bg)] rounded-3xl p-6 border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 bg-[var(--bg-main)] rounded-2xl flex flex-col items-center justify-center border border-[var(--border-color)] group-hover:border-primary-200 transition-colors">
                                            <span className="text-primary-600 font-black text-xl leading-none">{dateInfo.day}</span>
                                            <span className="text-[var(--text-muted)] font-bold text-[10px] mt-1 tracking-widest">{dateInfo.month}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeBadge(event.type)}`}>
                                            {event.type}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{event.title}</h3>
                                    <p className="text-[var(--text-muted)] text-sm mb-6 line-clamp-2 leading-relaxed">{event.description}</p>

                                    <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                                        <div className="flex items-center text-[var(--text-muted)] text-xs font-medium">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {dateInfo.time}
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {event.location}
                                            </div>
                                        )}
                                    </div>

                                    {event.link && (
                                        <a
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 w-full py-3 bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-600 hover:text-white transition-all group-hover:shadow-lg active:scale-95"
                                        >
                                            Unirse al evento
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-[var(--panel-bg)] rounded-[2.5rem] overflow-hidden border border-[var(--border-color)] shadow-sm">
                        {events.map((event, index) => {
                            const dateInfo = formatDate(event.date);
                            return (
                                <div key={event.id} className={`p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 ${index !== events.length - 1 ? 'border-b border-[var(--border-color)]' : ''} hover:bg-[var(--bg-main)] transition-colors group`}>
                                    <div className="w-20 h-20 bg-[var(--bg-main)] rounded-2xl flex flex-col items-center justify-center border border-[var(--border-color)] shadow-sm shrink-0">
                                        <span className="text-primary-600 font-black text-2xl leading-none">{dateInfo.day}</span>
                                        <span className="text-[var(--text-muted)] font-bold text-xs mt-1 tracking-widest">{dateInfo.month}</span>
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                                            <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeBadge(event.type)}`}>
                                                {event.type}
                                            </span>
                                            <span className="text-[var(--text-muted)] text-xs font-semibold">{dateInfo.full} • {dateInfo.time}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{event.title}</h3>
                                        <p className="text-[var(--text-muted)] text-sm max-w-2xl">{event.description}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-4">
                                        {event.location && (
                                            <div className="hidden lg:flex items-center text-[var(--text-muted)] text-xs bg-[var(--bg-main)] px-4 py-2 rounded-lg border border-[var(--border-color)] font-medium">
                                                <svg className="w-3 h-3 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                {event.location}
                                            </div>
                                        )}
                                        {event.link && (
                                            <a
                                                href={event.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-[var(--text-main)] text-[var(--bg-main)] rounded-xl font-bold hover:bg-primary-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                                            >
                                                Acceder
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Newsletter / CTA for Calendar */}
            <section className="px-4 pb-12">
                <div className="bg-primary-600 rounded-[2.5rem] p-4 lg:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <SparklesIcon className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿No quieres perderte nada?</h2>
                        <p className="text-primary-100 text-lg mb-8">
                            Suscríbete para recibir recordatorios de los eventos y las noticias más relevantes directamente en tu correo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="px-8 py-4 bg-[var(--text-main)] text-[var(--bg-main)] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-primary-600 transition-all active:scale-95 shadow-xl">
                                Suscribirme
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CalendarPage;
