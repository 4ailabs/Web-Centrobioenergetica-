import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MailIcon, PhoneIcon, YoutubeIcon } from '../components/Icons';
import { MapPin, GraduationCap, Heart, Stethoscope, RefreshCw, Users, Globe } from 'lucide-react';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-10">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-3">
          Quiénes <span className="text-primary-600">somos</span>
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          El Instituto Centrobioenergética es una institución de formación profesional especializada en herramientas de salud complementaria y bienestar integral. No somos una escuela de pensamiento. Somos una escuela de práctica.
        </p>
      </div>

      {/* Imagen del instituto */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="rounded-xl overflow-hidden aspect-[2.5/1] bg-neutral-100 dark:bg-neutral-800">
          <img src="/images/imagenes_instituto/clases.webp" alt="Alumnos del Instituto Centrobioenergética en clase" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Visión de salud */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5">
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Partimos de la definición contemporánea de la OMS: <span className="font-medium text-neutral-800 dark:text-neutral-100">la salud es la capacidad de adaptarse en sus diferentes dimensiones</span> — física, emocional, social y existencial. Las herramientas que enseñamos son útiles tanto para personas que atraviesan procesos de enfermedad como para personas sanas que quieren funcionar mejor.
          </p>
        </div>
      </div>

      {/* Lo que hacemos */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Lo que hacemos</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-colors">
            <div className="w-8 h-8 bg-primary-600/8 dark:bg-primary-600/15 rounded-lg flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">Salud complementaria</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Herramientas de apoyo para personas en proceso de enfermedad, en colaboración con el sistema médico y psicológico.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-colors">
            <div className="w-8 h-8 bg-primary-600/8 dark:bg-primary-600/15 rounded-lg flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">Bienestar activo</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Herramientas para quienes quieren funcionar mejor: más energía, claridad mental, mejor respuesta emocional.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lo que nos distingue */}
      <div className="px-6 lg:px-0 pb-10 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Lo que nos distingue</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Origen médico, no esotérico', desc: 'El Dr. Ojeda Rios es médico cirujano y miembro de la ISNN (Sociedad Internacional de Nutrigenómica y Nutrigenética). Rigor clínico que no se improvisa.' },
            { title: 'Críticos, no dogmáticos', desc: 'Enseñamos lo que funciona, no lo que es políticamente correcto. Cuando algo no funciona, lo decimos.' },
            { title: 'Actualizados, no estáticos', desc: '13 años de Seminario Anual con innovación real. Las técnicas que enseñamos no son las mismas de hace 10 años.' },
            { title: 'Integradores, no excluyentes', desc: 'Visión médica, Par Biomagnético, Bioenergética, Fitoterapia y desarrollo personal. Aliados de la medicina convencional.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full shrink-0 mt-2"></div>
              <div>
                <span className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100">{item.title}.</span>
                {' '}
                <span className="text-[13px] text-neutral-500 dark:text-neutral-400">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trayectoria */}
      <div className="px-6 lg:px-0 pb-10 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Trayectoria</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { num: '25+', label: 'Años de experiencia' },
            { num: '2,800+', label: 'Terapeutas formados' },
            { num: '26', label: 'Cursos especializados' },
            { num: '13', label: 'Seminarios anuales' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3">
              <div className="text-xl font-semibold text-primary-600 mb-0.5">{stat.num}</div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Pionero en la enseñanza de biomagnetismo y bioenergética en México y Latinoamérica. Instructor oficial del Diplomado de Biomagnetismo de la Universidad Autónoma Chapingo. Cursos impartidos en México, España, Estados Unidos y Europa, con alumnos en Japón, Irlanda y Costa de Marfil.
        </p>
      </div>

      {/* Promesa */}
      <div className="px-6 lg:px-0 pb-10 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Nuestra promesa</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-4">
          Formamos terapeutas que piensan, no que repiten. Que entienden su trabajo en términos de adaptación y regulación, no de cura y enfermedad. Que saben cuándo una herramienta es suficiente y cuándo no. Que trabajan con ética, con rigor y con actualización constante.
        </p>
        <p className="text-sm text-neutral-800 dark:text-neutral-100 font-medium italic">
          Que pueden estar en la consulta de un médico o en el despacho de un psicólogo sin que nadie tenga que disculparse por su presencia.
        </p>
      </div>

      {/* Director */}
      <div className="px-6 lg:px-0 pb-10 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Director</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg shrink-0">
            M
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">Dr. Miguel Ojeda Rios</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Médico Cirujano · Miembro de la ISNN (Sociedad Internacional de Nutrigenómica y Nutrigenética)</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Más de 25 años de experiencia clínica y formativa en medicina integrativa. Creador del método de Microbioenergética. Facilitador certificado de LEGO Serious Play.
            </p>
          </div>
        </div>
      </div>

      {/* Ubicación + Contacto */}
      <div className="px-6 lg:px-0 pb-10 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Ubicación</span>
              <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">Acapulco 36, Piso 8</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Col. Roma Norte · Ciudad de México</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Contacto</span>
              <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
            <div className="space-y-2">
              {[
                { icon: <PhoneIcon className="w-3.5 h-3.5" />, label: '+52 55 7907 6626', href: 'tel:+525579076626' },
                { icon: <MailIcon className="w-3.5 h-3.5" />, label: 'contacto@instituto...', href: 'mailto:contacto@institutocentrobioenergetica.com' },
                { icon: <YoutubeIcon className="w-3.5 h-3.5" />, label: 'Wellvibe Media', href: 'https://youtube.com/@wellvibe-media' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2.5 group"
                >
                  <span className="text-neutral-400 group-hover:text-primary-600 transition-colors">{item.icon}</span>
                  <span className="text-[13px] text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 transition-colors">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-0">
        <div className="bg-salvia-400 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h3 className="text-base font-medium text-white mb-1">¿Listo para comenzar?</h3>
            <p className="text-white/70 text-xs">Explora nuestros cursos o agenda una consulta.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/cursos')} className="px-4 py-2.5 bg-white text-salvia-500 rounded-lg font-medium text-sm hover:shadow-sm transition-all">
              Ver cursos
            </button>
            <a href="https://wa.me/525579076626" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-white/15 border border-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/25 transition-all">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
