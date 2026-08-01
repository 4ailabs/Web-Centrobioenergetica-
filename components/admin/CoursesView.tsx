import React, { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Clock, MessageCircle, UserPlus, CheckCircle2 } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';
import { ACTIVE_COURSE_IDS, COURSE_META, ESTADO_LABEL, ESTADO_TONO } from '../../data/catalog';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface Usuario {
    id: string;
    name?: string;
    email: string;
    enrolledCourses?: string[];
    actividadPorCurso?: Record<string, { vistos: number; completados: number }>;
}

interface CoursesViewProps {
    usuarios: Usuario[];
    loading: boolean;
    onInscribir: (cursoId: string) => void;
}

const cursos = MOCK_DATA.courses.filter((c) => ACTIVE_COURSE_IDS.includes(c.id));

function nombreCorto(titulo: string) {
    return titulo.split('—')[0].split(':')[0].trim();
}

function totalVideos(cursoId: string): number {
    const curso = MOCK_DATA.courses.find((c) => c.id.toString() === cursoId);
    return curso?.modules?.reduce((n, m) => n + (m.videos?.length || 0), 0) || 0;
}

const CoursesView: React.FC<CoursesViewProps> = ({ usuarios, loading, onInscribir }) => {
    const [abierto, setAbierto] = useState<string | null>(null);

    const resumen = useMemo(() => {
        return cursos.map((curso) => {
            const id = curso.id.toString();
            const inscritos = usuarios.filter((u) => u.enrolledCourses?.includes(id));
            const sinEmpezar = inscritos.filter((u) => !(u.actividadPorCurso?.[id]?.vistos));
            return { curso, id, inscritos, sinEmpezar };
        });
    }, [usuarios]);

    if (loading) {
        return <div className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">Cargando…</div>;
    }

    // ── Detalle de un curso ──
    if (abierto) {
        const datos = resumen.find((r) => r.id === abierto);
        if (!datos) return null;
        const videos = totalVideos(abierto);

        return (
            <div>
                <button
                    onClick={() => setAbierto(null)}
                    className="flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-primary-600 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" /> Todos los cursos
                </button>

                <div className="flex items-start justify-between gap-3 flex-wrap mb-5">
                    <div>
                        <h2 className="text-[19px] font-semibold text-neutral-800 dark:text-neutral-100">
                            {nombreCorto(datos.curso.title)}
                        </h2>
                        <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {datos.inscritos.length} {datos.inscritos.length === 1 ? 'alumno' : 'alumnos'}
                            {datos.sinEmpezar.length > 0 && ` · ${datos.sinEmpezar.length} sin empezar`}
                        </p>
                    </div>
                    <Button onClick={() => onInscribir(abierto)}>
                        <UserPlus className="w-4 h-4" /> Inscribir alumno
                    </Button>
                </div>

                {datos.inscritos.length === 0 ? (
                    <div className="py-12 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                        <p className="text-[14px] font-medium text-neutral-700 dark:text-neutral-200">Nadie inscrito todavía</p>
                        <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-1 mb-4">
                            Cuando des acceso a alguien, aparecerá aquí.
                        </p>
                        <Button onClick={() => onInscribir(abierto)}>Inscribir al primero</Button>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {datos.inscritos.map((u) => {
                            const act = u.actividadPorCurso?.[abierto];
                            const vistos = act?.vistos || 0;
                            const pct = videos > 0 ? Math.round((vistos / videos) * 100) : 0;
                            const sinEmpezar = vistos === 0;
                            const mensaje = `Hola ${(u.name || '').split(' ')[0] || ''}, veo que todavía no has empezado ${nombreCorto(datos.curso.title)}. ¿Te ayudo a entrar?`;

                            return (
                                <div key={u.id} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 flex items-center gap-3 flex-wrap">
                                    <div className="flex-1 min-w-[170px]">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-100">
                                                {u.name || 'Sin nombre'}
                                            </span>
                                            {sinEmpezar && (
                                                <Badge tono="atencion" icono={<Clock className="w-2.5 h-2.5" />}>Sin empezar</Badge>
                                            )}
                                            {videos > 0 && vistos >= videos && (
                                                <Badge tono="logrado" icono={<CheckCircle2 className="w-2.5 h-2.5" />}>Completado</Badge>
                                            )}
                                        </div>
                                        <p className="text-[12.5px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{u.email}</p>
                                        {videos > 0 && !sinEmpezar && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="h-1.5 w-24 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                                                    <div className="h-full bg-salvia-500 rounded-full" style={{ width: `${pct}%` }} />
                                                </div>
                                                <span className="text-[11.5px] text-neutral-500 dark:text-neutral-400 tabular-nums">
                                                    {vistos} de {videos}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {sinEmpezar && (
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-salvia-500 hover:bg-salvia-600 text-white text-[12.5px] font-medium transition-colors shrink-0 min-h-[36px]"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5" /> Escribirle
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    // ── Rejilla de cursos ──
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resumen.map(({ curso, id, inscritos, sinEmpezar }) => {
                const meta = COURSE_META[curso.id];
                return (
                    <button
                        key={id}
                        onClick={() => setAbierto(id)}
                        className="text-left bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 hover:border-primary-600 transition-colors"
                    >
                        {meta && (
                            <Badge tono={ESTADO_TONO[meta.estado]}>{ESTADO_LABEL[meta.estado]}</Badge>
                        )}
                        <h3 className="text-[14.5px] font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mt-2">
                            {nombreCorto(curso.title)}
                        </h3>
                        <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {totalVideos(id)} {totalVideos(id) === 1 ? 'capítulo' : 'capítulos'}
                        </p>
                        <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                            <span className="text-[20px] font-semibold text-neutral-800 dark:text-neutral-100 tabular-nums leading-none">
                                {inscritos.length}
                            </span>
                            <span className="text-[12px] text-neutral-500 dark:text-neutral-400">
                                {inscritos.length === 1 ? 'alumno' : 'alumnos'}
                                {sinEmpezar.length > 0 && (
                                    <span className="text-amber-700 dark:text-amber-400"> · {sinEmpezar.length} sin empezar</span>
                                )}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default CoursesView;
