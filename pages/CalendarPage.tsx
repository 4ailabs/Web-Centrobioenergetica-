
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
            case 'live': return 'bg-primary-600/10 text-primary-600 dark:bg-primary-600/15';
            case 'workshop': return 'bg-primary-600/10 text-primary-600 dark:bg-primary-600/15';
            case 'support': return 'bg-primary-600/10 text-primary-600 dark:bg-primary-600/15';
            default: return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400';
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('es-ES', { month: 'short' }),
            full: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-4"></div>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium">Cargando agenda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-12 px-6 py-12 lg:py-20">
            {/* Page Header */}
            <div className="max-w-6xl mx-auto space-y-8">
                <div>
                    <h1 className="text-5xl lg:text-7xl font-semibold text-neutral-800 dark:text-neutral-50 tracking-tight leading-tight mb-6">
                        Agenda de <span className="text-primary-600">Eventos</span>
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed">
                        Sigue de cerca las clases en vivo, talleres intensivos y sesiones de acompañamiento.
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-neutral-200 dark:border-neutral-700 w-fit">
                    <button
                        onClick={() => setView('grid')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'grid' ? 'bg-primary-600 text-white shadow-md' : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-50'}`}
                    >
                        Cuadrícula
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-primary-600 text-white shadow-md' : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-50'}`}
                    >
                        Lista
                    </button>
                </div>
            </div>

            {/* Events Container */}
            <section className="max-w-6xl mx-auto w-full">
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => {
                            const dateInfo = formatDate(event.date);
                            return (
                                <div key={event.id} className="group relative bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-8 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5">
                                    {/* Date Badge */}
                                    <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-600 mb-6">
                                        <span className="text-primary-600 font-semibold text-lg leading-none">{dateInfo.day}</span>
                                        <span className="text-neutral-600 dark:text-neutral-400 font-medium text-xs mt-1">{dateInfo.month}</span>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getTypeBadge(event.type)}`}>
                                            {event.type}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {event.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 line-clamp-2 font-normal leading-relaxed">
                                        {event.description}
                                    </p>

                                    {/* Event Details */}
                                    <div className="space-y-2 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm font-normal">
                                            <svg className="w-4 h-4 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{dateInfo.time}</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm font-normal">
                                                <svg className="w-4 h-4 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    {event.link && (
                                        <a
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 w-full py-3 bg-primary-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary-700 transition-all active:scale-95 shadow-md hover:shadow-sm"
                                        >
                                            Unirse
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => {
                            const dateInfo = formatDate(event.date);
                            return (
                                <div key={event.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0">
                                    {/* Date Badge */}
                                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-600 shrink-0">
                                        <span className="text-primary-600 font-semibold text-lg leading-none">{dateInfo.day}</span>
                                        <span className="text-neutral-600 dark:text-neutral-400 font-medium text-xs mt-1">{dateInfo.month}</span>
                                    </div>

                                    {/* Event Content */}
                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 group-hover:text-primary-600 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-normal">
                                                    {event.description}
                                                </p>
                                            </div>

                                            {/* Meta Information */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-neutral-600 dark:text-neutral-400 text-sm font-normal shrink-0">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getTypeBadge(event.type)}`}>
                                                        {event.type}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{dateInfo.time}</span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        <span className="line-clamp-1">{event.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    {event.link && (
                                        <a
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all active:scale-95 shadow-md hover:shadow-sm shrink-0"
                                        >
                                            Unirse
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Newsletter / CTA for Calendar */}
            <section className="max-w-6xl mx-auto w-full">
                <div className="bg-primary-600 dark:bg-primary-700 rounded-lg p-8 lg:p-12 text-center text-white relative overflow-hidden border border-primary-500 dark:border-primary-600">
                    {/* Subtle decorative element */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-semibold">¿No quieres perderte nada?</h2>
                        <p className="text-primary-100 text-lg font-normal leading-relaxed">
                            Suscríbete para recibir recordatorios de los eventos y las noticias más relevantes directamente en tu correo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="flex-grow px-6 py-3 rounded-lg bg-white/15 border border-white/25 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 font-normal text-sm"
                            />
                            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-all active:scale-95 shadow-sm hover:shadow-sm shrink-0">
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CalendarPage;
