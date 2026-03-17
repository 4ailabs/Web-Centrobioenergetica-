import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { AboutUsIcon, AppsIcon, CoursesIcon, YoutubeIcon } from '../components/Icons';
import { ArrowRight } from 'lucide-react';
import { handleCourseClick } from '../utils/framerIntegration';
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

  // Solo cursos que ya están disponibles (con videos), no los futuros
  const activeCourseIds = [102, 101, 103]; // Set Point, Aminoácidos, Bioenergética V4
  const courses = allCourses.filter(c => activeCourseIds.includes(c.id));

  const goToCourse = (course: Course) => {
    navigate(`/course/${course.id}`);
    handleCourseClick(course.id, course.title);
  };

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      {/* Hero */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-8">
        <p className="text-[15px] text-neutral-800 dark:text-neutral-100 font-medium mb-1">
          Escuela de práctica en salud complementaria y bienestar integral
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">
          Más de 2,800 terapeutas formados · 26 cursos especializados · Dr. Miguel Ojeda Rios
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Cursos', path: '/cursos', primary: true },
            { label: 'Servicios', path: '/servicios' },
            { label: 'Agenda', path: '/calendario' },
            { label: 'Nosotros', path: '/sobre-nosotros' },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => navigate(btn.path)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${btn.primary
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Próximamente — Taller Mascotas */}
      <div className="px-6 lg:px-0 pb-8">
        <div
          onClick={() => navigate('/taller-mascotas')}
          className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[200px]">
              <img src="/images/courses/taller-mascotas/mascota.png" alt="Lo Que Tu Mascota Quiere Decirte" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="sm:w-1/2 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary-600 text-white text-[10px] font-medium rounded-full">Próximamente</span>
                <span className="text-[11px] text-neutral-400">Taller · 2 Módulos</span>
              </div>
              <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors">
                Lo Que Tu Mascota Quiere Decirte
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 line-clamp-2">
                Viernes 27 de marzo + 10 de abril · 3:00 – 7:00 pm · Presencial u Online
              </p>
              <span className="text-[11px] text-neutral-400">Dr. Miguel Ojeda Rios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Próximamente — Reset Hormonal */}
      <div className="px-6 lg:px-0 pb-8">
        <div
          onClick={() => navigate('/reset-hormonal')}
          className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 overflow-hidden aspect-[16/9] sm:aspect-auto sm:min-h-[200px]">
              <img src="/images/courses/reset-hormonal/reset_hormonal.jpg" alt="El Reset Hormonal" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="sm:w-1/2 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary-600 text-white text-[10px] font-medium rounded-full">Próximamente</span>
                <span className="text-[11px] text-neutral-400">Curso · 2 Sábados</span>
              </div>
              <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors">
                Método de equilibrio para el climaterio
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 line-clamp-2">
                16 y 30 de mayo · 10:00 – 18:00 h · Presencial u Online
              </p>
              <span className="text-[11px] text-neutral-400">Dr. Miguel Ojeda Rios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Próximamente — Actos que Mueven */}
      <div className="px-6 lg:px-0 pb-8">
        <div
          onClick={() => navigate('/actos-que-mueven')}
          className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[200px]">
              <img src="/images/courses/actos-que-mueven/ritual_2.png" alt="Actos que Mueven" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="sm:w-1/2 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-white text-[10px] font-medium rounded-full" style={{ background: '#8B4513' }}>Próximamente</span>
                <span className="text-[11px] text-neutral-400">Taller · 2 Sábados</span>
              </div>
              <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mb-0.5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Actos que <span style={{ color: '#8B4513' }}>Mueven</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">El cuerpo no cambia con lo que entiendes — cambia con lo que haces</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 line-clamp-2">
                6 y 20 de junio · 10:00 – 18:00 h · Presencial · Cupo: 15 personas
              </p>
              <span className="text-[11px] text-neutral-400">Dr. Miguel Ojeda Rios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Próximamente — Regulación Bioeléctrica */}
      <div className="px-6 lg:px-0 pb-8">
        <div
          onClick={() => navigate('/regulacion-bioelectrica')}
          className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[200px]">
              <img src="/images/courses/regulacion-bioelectrica/Fondo.jpg" alt="Regulación Bioeléctrica" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="sm:w-1/2 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-white text-[10px] font-medium rounded-full" style={{ background: '#0F6E56' }}>Próximamente</span>
                <span className="text-[11px] text-neutral-400">Curso · 4 Sábados</span>
              </div>
              <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                El Cuerpo <span style={{ color: '#0F6E56' }}>Eléctrico</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">Tu cuerpo es un mapa eléctrico. Aprende a leerlo.</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 line-clamp-1">
                Julio–Agosto 2026 · Presencial u Online · 15 lugares
              </p>
              <span className="text-[11px] text-neutral-400">Dr. Miguel Ojeda Rios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses section */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Cursos disponibles</h2>
          <button onClick={() => navigate('/cursos')} className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 transition-colors font-medium">
            Ver todos <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => goToCourse(course)}
              className="group cursor-pointer flex gap-4 items-start hover:bg-white dark:hover:bg-neutral-800 rounded-xl p-2 -mx-2 transition-colors"
            >
              <div className="w-28 h-20 sm:w-36 sm:h-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                {course.imageUrl && (
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-1">
                  {course.description}
                </p>
                <span className="text-[11px] text-neutral-400">{course.lessons} lecciones</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore */}
      <div className="px-6 lg:px-0 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Explorar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: AboutUsIcon, title: "Nosotros", action: onNavigateToAbout },
            { icon: AppsIcon, title: "Apps", action: onNavigateToApps },
            { icon: CoursesIcon, title: "Todos los cursos", action: () => navigate('/cursos') },
            { icon: YoutubeIcon, title: "Wellvibe Media", action: () => navigate('/wellvibe-media') }
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
