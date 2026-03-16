import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CalendarEvent } from '../types';
import { MOCK_DATA } from '../data/mockData';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }),
            month: date.toLocaleDateString('es-ES', { month: 'long' }),
            monthKey: date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            year: date.getFullYear(),
        };
    };

    // Group events by month
    const groupedEvents = useMemo(() => {
        const groups: { month: string; events: CalendarEvent[] }[] = [];
        let currentMonth = '';
        events.forEach((event) => {
            const { monthKey } = formatDate(event.date);
            if (monthKey !== currentMonth) {
                currentMonth = monthKey;
                groups.push({ month: monthKey, events: [event] });
            } else {
                groups[groups.length - 1].events.push(event);
            }
        });
        return groups;
    }, [events]);

    // Map event titles to routes
    const getEventRoute = (title: string) => {
        if (title.includes('Mascota')) return '/taller-mascotas';
        if (title.includes('Reset')) return '/reset-hormonal';
        if (title.includes('Actos')) return '/actos-que-mueven';
        return null;
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-3"></div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs">Cargando agenda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
            {/* Header */}
            <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-10">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
                    Agenda de <span className="text-primary-600">Eventos</span>
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
                    Talleres, cursos y sesiones programadas para los próximos meses.
                </p>
            </div>

            {/* Timeline */}
            <div className="px-6 lg:px-0 pb-12">
                {groupedEvents.map((group, groupIndex) => (
                    <div key={group.month} className="mb-10 last:mb-0">
                        {/* Month header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
                            <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider capitalize shrink-0">
                                {group.month}
                            </span>
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
                        </div>

                        {/* Events in this month */}
                        <div className="space-y-4">
                            {group.events.map((event, eventIndex) => {
                                const dateInfo = formatDate(event.date);
                                const route = getEventRoute(event.title);
                                const isFirst = groupIndex === 0 && eventIndex === 0;

                                return (
                                    <div
                                        key={event.id}
                                        onClick={() => route && navigate(route)}
                                        className={`group flex gap-5 items-start ${route ? 'cursor-pointer' : ''} ${
                                            isFirst
                                                ? 'bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 hover:border-primary-600/30 dark:hover:border-primary-600/20 transition-colors'
                                                : 'py-1'
                                        }`}
                                    >
                                        {/* Date column */}
                                        <div className="w-14 shrink-0 text-center">
                                            <div className={`text-2xl font-semibold leading-none mb-1 ${isFirst ? 'text-primary-600' : 'text-neutral-700 dark:text-neutral-200'}`}>
                                                {dateInfo.day}
                                            </div>
                                            <div className="text-[10px] text-neutral-400 capitalize">{dateInfo.weekday}</div>
                                        </div>

                                        {/* Timeline dot + line */}
                                        <div className="flex flex-col items-center shrink-0 pt-1.5">
                                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isFirst ? 'bg-primary-600 ring-4 ring-primary-600/10' : 'bg-neutral-300 dark:bg-neutral-600'}`}></div>
                                            <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-700 mt-1.5 min-h-[40px]"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 pb-6">
                                            <h3 className={`font-medium leading-snug mb-1 ${route ? 'group-hover:text-primary-600 transition-colors' : ''} ${isFirst ? 'text-[15px] text-neutral-800 dark:text-neutral-100' : 'text-[14px] text-neutral-700 dark:text-neutral-200'}`}>
                                                {event.title}
                                            </h3>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
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
                                                        <span>{event.location}</span>
                                                    </div>
                                                )}
                                                {route && (
                                                    <span className="flex items-center gap-0.5 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                                        Ver programa <ArrowRight className="w-3 h-3" />
                                                    </span>
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

            {/* CTA */}
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
