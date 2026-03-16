import React, { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';
import { MOCK_DATA } from '../data/mockData';
import { Clock, MapPin } from 'lucide-react';

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

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
                setEvents(MOCK_DATA.events);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('es-ES', { month: 'short' }),
            full: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'live': return 'En vivo';
            case 'workshop': return 'Taller';
            case 'support': return 'Soporte';
            default: return type;
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-3"></div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">Cargando agenda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
            {/* Header */}
            <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-8">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
                    Agenda de <span className="text-primary-600">Eventos</span>
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
                    Clases en vivo, talleres intensivos y sesiones de acompañamiento.
                </p>
            </div>

            {/* Events list — clean, editorial */}
            <div className="px-6 lg:px-0 pb-10">
                <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {events.map((event) => {
                        const dateInfo = formatDate(event.date);
                        return (
                            <div key={event.id} className="py-5 first:pt-0 flex gap-4 items-start">
                                {/* Date badge */}
                                <div className="w-12 h-12 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex flex-col items-center justify-center shrink-0">
                                    <span className="text-primary-600 font-semibold text-base leading-none">{dateInfo.day}</span>
                                    <span className="text-neutral-400 text-[10px] mt-0.5 capitalize">{dateInfo.month}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug truncate">
                                            {event.title}
                                        </h3>
                                        <span className="px-2 py-0.5 bg-primary-600/8 dark:bg-primary-600/15 text-primary-600 text-[10px] font-medium rounded shrink-0">
                                            {getTypeLabel(event.type)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed mb-2">
                                        {event.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-[11px] text-neutral-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{dateInfo.time}</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                <span className="truncate max-w-[150px]">{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                {event.link && (
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors shrink-0"
                                    >
                                        Unirse
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Subscribe CTA */}
            <div className="px-6 lg:px-0">
                <div className="bg-primary-600 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="text-center sm:text-left">
                        <h3 className="text-base font-medium text-white mb-1">¿No quieres perderte nada?</h3>
                        <p className="text-primary-100 text-xs">Recibe recordatorios de eventos en tu correo.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="flex-grow sm:w-48 px-4 py-2.5 rounded-lg bg-white/15 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/40 text-sm"
                        />
                        <button className="px-4 py-2.5 bg-white text-primary-600 rounded-lg font-medium text-sm hover:bg-primary-50 transition-colors shrink-0">
                            Suscribirse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
