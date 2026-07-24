import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { AboutUsIcon, AppsIcon, CoursesIcon } from '../components/Icons';
import { ArrowRight, MapPin, Play } from 'lucide-react';
import { API_BASE } from '../lib/api';
import { handleCourseClick } from '../utils/framerIntegration';
import { MOCK_DATA } from '../data/mockData';
import { ACTIVE_COURSE_IDS, COURSE_META, ESTADO_LABEL, ESTADO_BADGE_CLASS, courseHref } from '../data/catalog';
import type { Course } from '../types';

interface DashboardProps {
  onNavigateToCourses?: () => void;
  onNavigateToNews?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToApps?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToAbout, onNavigateToApps }) => {
  const allCourses = useCourses();
  const navigate = useNavigate();
  const { user } = useAuth();

  const courses = allCourses.filter(c => ACTIVE_COURSE_IDS.includes(c.id));

  const goToCourse = (course: Course) => {
    const isEnrolled = !!user?.enrolledCourses?.includes(course.id.toString());
    navigate(courseHref(course, isEnrolled));
    handleCourseClick(course.id, course.title);
  };

  // "Continuar donde te quedaste": el último video visto según la API de progreso
  const [continueTarget, setContinueTarget] = useState<{ course: Course; videoTitle: string } | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      setContinueTarget(null);
      return;
    }
    let cancelled = false;
    fetch(`${API_BASE}/api/progress`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { lastWatched?: { courseId: number | null; videoId: number | null } | null }) => {
        if (cancelled || !d.lastWatched?.courseId) return;
        const lastCourse = allCourses.find((c) => c.id === d.lastWatched!.courseId);
        const lastVideo = lastCourse?.modules?.flatMap((m) => m.videos).find((v) => v.id === d.lastWatched!.videoId);
        if (lastCourse) setContinueTarget({ course: lastCourse, videoTitle: lastVideo?.title ?? '' });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, allCourses]);

  const upcomingEvents = useMemo(() => {
    const now = Date.now();
    return MOCK_DATA.events
      .filter(e => new Date(e.date).getTime() >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4);
  }, []);

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">

      {/* ── CONTINUAR (solo alumnos con progreso) ── */}
      {continueTarget && (
        <div className="px-6 lg:px-0 pt-4">
          <button
            onClick={() => navigate(`/course/${continueTarget.course.id}`)}
            className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition-colors text-left group"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Continúa donde te quedaste</p>
              <p className="text-sm font-medium mt-0.5 truncate">
                {continueTarget.course.title}
                {continueTarget.videoTitle ? ` — ${continueTarget.videoTitle}` : ''}
              </p>
            </div>
            <Play className="w-4 h-4 fill-current shrink-0 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <div className="px-6 lg:px-0 pt-4 lg:pt-6 pb-4">
        <div className="relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-[440px] flex items-end">
          <img
            src="/images/imagenes_instituto/clases.webp"
            alt="Clase presencial del Instituto Centrobioenergética"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221D18]/90 via-[#221D18]/40 to-[#221D18]/5" />
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-3">
              Instituto Centrobioenergética
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] text-white mb-3 [text-wrap:balance]">
              Escuela de práctica en salud complementaria y bienestar integral
            </h1>
            <p className="text-sm sm:text-[15px] text-white/80 mb-6 max-w-lg leading-relaxed">
              Formación aplicable desde el primer día, con el Dr. Miguel Ojeda Rios.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => navigate('/cursos')}
                className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
              >
                Explorar cursos
              </button>
              <button
                onClick={() => navigate('/sobre-nosotros')}
                className="px-5 py-2.5 rounded-xl border border-white/40 hover:border-white/70 text-white text-sm font-medium transition-colors"
              >
                Conocer el instituto
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { n: '2,800+', label: 'Terapeutas formados' },
            { n: '26', label: 'Cursos especializados' },
            { n: 'MX · Online', label: 'Presencial y a distancia' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-center">
              <p className="font-editorial text-lg sm:text-2xl text-neutral-800 dark:text-neutral-100 tabular-nums leading-tight">{s.n}</p>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── AHORA EN EL INSTITUTO ── */}
      <div className="px-6 lg:px-0 pt-6 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-editorial text-xl lg:text-2xl text-neutral-800 dark:text-neutral-100">Ahora en el instituto</h2>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* En curso — Regulación Bioeléctrica */}
      <div className="px-6 lg:px-0 pb-5">
        <div
          onClick={() => navigate('/regulacion-bioelectrica')}
          className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[200px]">
              <img src="/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp" alt="Mapa bioeléctrico del cuerpo — Regulación Bioeléctrica" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="sm:w-1/2 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${ESTADO_BADGE_CLASS['en-curso']}`}>En curso</span>
                <span className="text-[11px] text-neutral-400">Curso · 4 Sábados</span>
              </div>
              <h3 className="font-editorial text-lg lg:text-xl text-neutral-800 dark:text-neutral-100 leading-snug mb-0.5">
                El Cuerpo <span className="text-salvia-600 dark:text-salvia-400">Eléctrico</span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">Tu cuerpo es un mapa eléctrico. Aprende a leerlo.</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 line-clamp-1">
                Próximo módulo: 8 de agosto · Presencial u Online
              </p>
              <span className="text-[11px] text-neutral-400">Dr. Miguel Ojeda Rios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beca — Bioenergética Transgeneracional */}
      <div className="px-6 lg:px-0 pb-8">
        <div
          onClick={() => navigate('/bioenergetica-transgeneracional')}
          className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 p-5 flex flex-col justify-center order-2 sm:order-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary-600 text-white text-[10px] font-medium rounded-full">Beca por invitación</span>
                <span className="text-[11px] text-neutral-400">4 sesiones · viernes</span>
              </div>
              <h3 className="font-editorial text-lg lg:text-xl text-neutral-800 dark:text-neutral-100 leading-snug mb-0.5">
                Bioenergética <span className="text-primary-600">Transgeneracional</span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">Construye el mapa de tu árbol familiar y aprende a leer en él lo que no es tuyo.</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 line-clamp-1">
                Formulario de aceptación · Cupo limitado
              </p>
              <span className="text-[11px] text-neutral-400">Dr. Miguel Ojeda Rios</span>
            </div>
            <div className="sm:w-1/2 overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[200px] order-1 sm:order-2 flex items-center justify-center bg-[#362F29]">
              <svg width="72" height="72" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <circle cx="10" cy="8" r="3.5" stroke="#8FA87A" strokeWidth="1.4" />
                <circle cx="34" cy="8" r="3.5" stroke="#8FA87A" strokeWidth="1.4" />
                <circle cx="22" cy="24" r="4.2" fill="#8FA87A" opacity="0.18" stroke="#8FA87A" strokeWidth="1.4" />
                <path d="M10 11.5 V17 H34 V11.5" stroke="#8FA87A" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M22 17 V19.8" stroke="#8FA87A" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M22 28.2 V33" stroke="#8FA87A" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="22" cy="37.5" r="3" fill="#8FA87A" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── CATÁLOGO ── */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-editorial text-xl lg:text-2xl text-neutral-800 dark:text-neutral-100">Explora el catálogo</h2>
          <button onClick={() => navigate('/cursos')} className="flex items-center gap-1 text-xs text-primary-700 dark:text-primary-400 hover:text-primary-600 transition-colors font-medium">
            Ver todos <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-4">
          {courses.map((course) => {
            const meta = COURSE_META[course.id];
            return (
              <div
                key={course.id}
                onClick={() => goToCourse(course)}
                className="group cursor-pointer flex gap-4 items-start hover:bg-white dark:hover:bg-neutral-800 rounded-xl p-2 -mx-2 transition-colors"
              >
                <div className="w-28 h-20 sm:w-36 sm:h-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {course.imageUrl && (
                    <img src={course.imageUrl} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {meta && (
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${ESTADO_BADGE_CLASS[meta.estado]}`}>
                        {ESTADO_LABEL[meta.estado]}
                      </span>
                    )}
                    <span className="text-[11px] text-neutral-400">{course.level}</span>
                  </div>
                  <h3 className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-1">
                    {course.description}
                  </p>
                  <span className="text-[11px] text-neutral-400">{course.lessons} lecciones · {course.author}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── EMPIEZA GRATIS ── */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-editorial text-xl lg:text-2xl text-neutral-800 dark:text-neutral-100">Empieza gratis</h2>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/test-hormonal')}
            className="text-left p-5 rounded-xl bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-600/20 transition-colors group"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400">Test gratuito</span>
            <p className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 mt-1">Descubre tu perfil hormonal</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
              22 preguntas basadas en la escala MRS. Identifica tu fase, la severidad de tus síntomas y tus ejes de riesgo.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-400 mt-3 group-hover:gap-2 transition-all">
              Hacer el test <ArrowRight className="w-3 h-3" />
            </span>
          </button>
          <button
            onClick={() => navigate('/test-vinculo-animal')}
            className="text-left p-5 rounded-xl bg-salvia-50 dark:bg-salvia-400/10 border border-salvia-200 dark:border-salvia-400/30 hover:bg-salvia-100 dark:hover:bg-salvia-400/20 transition-colors group"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-salvia-600 dark:text-salvia-400">Test gratuito</span>
            <p className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 mt-1">Test de Vínculo Animal</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
              Descubre el patrón de apego entre tú y tu mascota — 3 minutos, resultados al instante.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-salvia-600 dark:text-salvia-400 mt-3 group-hover:gap-2 transition-all">
              Hacer el test <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>

      {/* ── PRÓXIMOS EVENTOS ── */}
      {upcomingEvents.length > 0 && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-editorial text-xl lg:text-2xl text-neutral-800 dark:text-neutral-100">Próximos eventos</h2>
            <button onClick={() => navigate('/calendario')} className="flex items-center gap-1 text-xs text-primary-700 dark:text-primary-400 hover:text-primary-600 transition-colors font-medium">
              Ver calendario <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcomingEvents.map((event) => {
              const d = new Date(event.date);
              return (
                <div key={event.id} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <div className="shrink-0 w-12 text-center">
                    <p className="font-editorial text-2xl text-primary-700 dark:text-primary-400 leading-none tabular-nums">
                      {d.toLocaleDateString('es-MX', { day: 'numeric', timeZone: 'America/Mexico_City' })}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1">
                      {d.toLocaleDateString('es-MX', { month: 'short', timeZone: 'America/Mexico_City' })}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug line-clamp-1">{event.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">{event.description}</p>
                    {event.location && (
                      <p className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                        <MapPin className="w-3 h-3" /> {event.location}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── EXPLORAR ── */}
      <div className="px-6 lg:px-0 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Explorar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: AboutUsIcon, title: 'Nosotros', action: onNavigateToAbout },
            { icon: AppsIcon, title: 'Apps', action: onNavigateToApps },
            { icon: CoursesIcon, title: 'Todos los cursos', action: () => navigate('/cursos') },
          ].map((item) => (
            <div
              key={item.title}
              onClick={item.action}
              className="group flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="w-7 h-7 bg-salvia-50 dark:bg-salvia-400/10 text-salvia-400 rounded-lg flex items-center justify-center shrink-0 group-hover:text-salvia-600 transition-colors">
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 transition-colors">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
