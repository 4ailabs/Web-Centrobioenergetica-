import React from 'react';
import ProgramPage from '../components/ProgramPage';

const ResetHormonal: React.FC = () => (
  <ProgramPage
    titulo="El Reset Hormonal"
    hook="Método de equilibrio para el climaterio y la postmenopausia. Un sistema de regulación femenina con Cartografía Hormonal propia — no es un curso de biomagnetismo, es algo completamente diferente."
    imagen="/images/courses/reset-hormonal/reset_hormonal.jpg"
    fechas="Sábado 16 de mayo + Sábado 30 de mayo"
    modalidad="Presencial u Online · 10:00 – 18:00 h"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Curso · 2 Sábados']}
    modulos={[
      {
        numero: '1',
        fecha: 'Sábado 16 de mayo',
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
        fecha: 'Sábado 30 de mayo',
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
    whatsappMsg="Hola, quiero inscribirme al curso El Reset Hormonal"
  />
);

export default ResetHormonal;
