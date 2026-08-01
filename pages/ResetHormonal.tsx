import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgramPage from '../components/ProgramPage';
import { COLOR } from '../lib/tokens';

const TestBanner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/test-hormonal')}
      className="cursor-pointer mx-6 lg:mx-0 mb-6 rounded-xl overflow-hidden transition-all hover:shadow-md"
      style={{ background: '#F2EDE8', border: '1px solid #E0D6CC' }}
    >
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: COLOR.terracotaOscuro }}>Test gratuito</span>
          <h3 className="text-[15px] font-medium mt-0.5" style={{ color: '#3D3B37' }}>Descubre tu perfil hormonal</h3>
          <p className="text-[12px] mt-1" style={{ color: '#6B6963' }}>22 preguntas basadas en la escala MRS. Identifica tu fase, la severidad de tus sintomas y tus ejes de riesgo.</p>
        </div>
        <div className="shrink-0 ml-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: COLOR.terracotaOscuro }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResetHormonal: React.FC = () => (
  <ProgramPage
    titulo="El Reset Hormonal"
    hook="Método de equilibrio para el climaterio y la postmenopausia. Un sistema de regulación femenina con Cartografía Hormonal propia — no es un curso de biomagnetismo, es algo completamente diferente."
    imagen="/images/courses/reset-hormonal/reset_hormonal.webp"
    fechas="Grabación completa disponible"
    modalidad="Online · A tu ritmo"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Curso · 2 Módulos']}
    badge="Grabación disponible"
    heroElement={<TestBanner />}
    modulos={[
      {
        numero: '1',
        fecha: 'Grabación',
        titulo: 'El Mapa — Cartografía Hormonal',
        bloques: [
          { time: '', title: 'La transición (climaterio)', desc: 'Tres mapas de regulación diseñados para la fase de transición hormonal: el Mapa del Fuego Interior para los calores, el Mapa del Sueño Roto para el insomnio y el Mapa de la Tormenta Emocional para la labilidad.' },
          { time: '', title: 'El reset (postmenopausia)', desc: 'Tres mapas para la fase posterior: el Mapa del Hueso Vivo para la densidad ósea, el Mapa del Corazón Protegido para el riesgo cardiovascular y el Mapa de la Piel Nueva para los cambios dérmicos.' },
          { time: '', title: 'El nuevo equilibrio', desc: 'Tres mapas de mantenimiento a largo plazo: el Mapa del Eje Central, el Mapa de la Energía Vital y el Mapa del Equilibrio Final. La visión completa del sistema en 9 mapas.' },
          { time: '', title: 'Integración y práctica', desc: 'Práctica supervisada con los 9 mapas de la Cartografía Hormonal Femenina. Cada participante trabaja con un caso y recibe retroalimentación directa del Dr. Ojeda.' },
        ],
      },
      {
        numero: '2',
        fecha: 'Grabación',
        titulo: 'El Método — Protocolos y Botica',
        bloques: [
          { time: '', title: 'Protocolos de aplicación', desc: 'Cómo leer a la clienta, seleccionar los mapas correctos según su fase, armar protocolos personalizados y comunicar el plan de trabajo con un lenguaje profesional y claro.' },
          { time: '', title: 'La botica del reset', desc: 'Fitoterapia específica para cada fase del método: qué plantas usar, en qué dosis, qué presentaciones están disponibles y cómo indicarlas a tus clientas con confianza.' },
          { time: '', title: 'Casos clínicos', desc: 'Análisis de casos reales del consultorio. Se trabajan perfiles de clientas con diferentes combinaciones de síntomas y se arman protocolos integrados en tiempo real.' },
          { time: '', title: 'Cierre y certificación', desc: 'Evaluación práctica, entrega de la Guía de La Botica del Reset en formato digital y certificado oficial del método El Reset Hormonal.' },
        ],
      },
    ]}
    entregables={[
      '9 Mapas de Regulación de la Cartografía Hormonal Femenina',
      'Guía de La Botica del Reset (fitoterapia por fase)',
      'Protocolos de aplicación para clientas',
      'Material de consulta para cada mapa',
      'Certificado del método El Reset Hormonal',
    ]}
    whatsappMsg="Hola, quiero acceso a la grabación del curso El Reset Hormonal"
    ctaLabel="Pedir acceso a la grabación"
  />
);

export default ResetHormonal;
