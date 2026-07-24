import React from 'react';
import ProgramPage from '../components/ProgramPage';

const Crania: React.FC = () => (
  <ProgramPage
    titulo="CRANIA"
    slogan="Devuelve el flujo"
    hook="Práctica craneofascial autoaplicada para liberar la tensión acumulada en rostro, cuello, mandíbula y cráneo — con respiración integrada y técnica manual guiada."
    imagen="/images/courses/crania/crania_16_9_webinar.png"
    fechas="Grabación completa disponible"
    modalidad="Clase práctica · Online · A tu ritmo"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Clase práctica · 2 módulos']}
    badge="Grabación disponible"
    accentColor="#1A3A5C"
    modulos={[
      {
        numero: '1',
        fecha: '',
        titulo: 'El Mapa Craneofascial',
        bloques: [
          {
            time: '',
            title: 'Anatomía aplicada',
            desc: 'Recorrido por las estructuras clave del cráneo, mandíbula, cuello y rostro. Aprenderás a identificar los puntos de mayor tensión y su relación con el sistema nervioso autónomo.',
          },
          {
            time: '',
            title: 'Fascia profunda y sistema nervioso',
            desc: 'Cómo la tensión fascial crónica afecta el tono vagal, el sueño, la concentración y el dolor de cabeza. El mecanismo por el que liberar la fascia produce cambios sistémicos.',
          },
          {
            time: '',
            title: 'Respiración craneofascial',
            desc: 'Técnica de respiración integrada para preparar el tejido antes de la manipulación manual. Aprenderás la secuencia de 4 tiempos que potencia cada maniobra.',
          },
        ],
      },
      {
        numero: '2',
        fecha: '',
        titulo: 'Protocolo de Autoaplicación',
        bloques: [
          {
            time: '',
            title: 'Las 6 maniobras esenciales',
            desc: 'Técnica manual paso a paso para liberar: occipital, temporal, esfenoides, mandíbula, hioides y columna cervical alta. Cada maniobra incluye posición, presión y tiempo de aplicación.',
          },
          {
            time: '',
            title: 'Práctica guiada en tiempo real',
            desc: 'Aplicación del protocolo completo con guía del Dr. Ojeda. Aprenderás a detectar la respuesta tisular y ajustar la presión según la tensión de cada zona.',
          },
          {
            time: '',
            title: 'Rutina de mantenimiento',
            desc: 'Protocolo de 10 minutos diarios para mantener la movilidad craneofascial. Indicaciones específicas para cefalea tensional, bruxismo, tensión cervical y fatiga visual.',
          },
        ],
      },
    ]}
    entregables={[]}
    requisitos="Ninguno. Solo una silla cómoda y 10 minutos sin interrupciones."
    whatsappMsg="Hola, quiero acceso a la grabación de la clase CRANIA — Práctica Craneofascial"
    ctaLabel="Pedir acceso a la grabación"
  />
);

export default Crania;
