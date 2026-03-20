import React from 'react';
import ProgramPage from '../components/ProgramPage';

const TallerMascotas: React.FC = () => (
  <ProgramPage
    titulo="Lo Que Tu Mascota Quiere Decirte"
    hook="Descubre cómo tu mascota refleja tu estado emocional y aprende herramientas concretas para sanar el vínculo con tu animal."
    imagen="/images/courses/taller-mascotas/mascota.png"
    fechas="Viernes 27 de marzo + Viernes 10 de abril"
    modalidad="Presencial u Online · 3:00 – 7:00 pm"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Taller · 2 Módulos']}
    modulos={[
      {
        numero: '1',
        fecha: 'Viernes 27 de marzo',
        titulo: 'Tu Mascota Es Tu Espejo',
        bloques: [
          { time: '', title: 'El espejo invisible', desc: 'La evidencia científica detrás de la sincronización emocional entre mascota y dueño. Cómo el animal doméstico funciona como válvula del sistema familiar y qué mecanismos de transferencia operan entre ambos.' },
          { time: '', title: 'Los conflictos más comunes', desc: 'Tabla práctica con los 10 patrones más frecuentes: qué manifiesta tu mascota (vómitos, dermatitis, ansiedad, agresividad) y qué refleja de la vida emocional del dueño. Aprenderás a leer las señales.' },
          { time: '', title: 'Remedios florales para tu mascota', desc: 'Las 7 esencias florales esenciales para animales, cuándo usar cada una, cómo administrarlas de forma segura y un ejercicio guiado para seleccionar la fórmula personalizada de tu mascota.' },
          { time: '', title: 'Lectura del campo mórfico', desc: 'Los 7 patrones del campo mórfico entre dueño y mascota. Las 3 preguntas clave que usa el terapeuta para acceder al vínculo. Ejercicio vivencial en parejas y facilitación de casos en vivo.' },
          { time: '', title: 'Tu botiquín diario', desc: 'Rutina diaria de observación (2 minutos), protocolo semanal con flores y sesión quincenal con imanes. Sales del taller con una hoja resumen lista para pegar en tu refrigerador.' },
        ],
      },
      {
        numero: '2',
        fecha: 'Viernes 10 de abril',
        titulo: 'Sana el Vínculo con Tu Animal',
        bloques: [
          { time: '', title: 'Testimonios vivenciales', desc: 'Ronda de experiencias de las 2 semanas entre módulos. ¿Alguien resolvió algo en su vida y vio cambio en su mascota? Revisión de registros, correlaciones y ajustes a las fórmulas de flores.' },
          { time: '', title: 'Terapia biomagnética para mascotas', desc: 'Protocolos de regulación general adaptados a animales. Aprenderás los principios de aplicación y verás una demostración completa del proceso de rastreo.' },
          { time: '', title: 'Fórmulas avanzadas de flores', desc: 'Fórmulas prediseñadas para los problemas más comunes: ansiedad de separación, agresividad, animal rescatado, enfermedad crónica y duelo. Ajuste de tu fórmula personal.' },
          { time: '', title: 'Protocolo integrado', desc: 'El protocolo completo de 5 pasos que te llevas a casa: evaluar al dueño, correlacionar el síntoma, leer el campo mórfico, aplicar herramientas al animal y tratar al dueño en paralelo.' },
          { time: '', title: 'Cierre y lo que viene', desc: 'Resumen de todas las herramientas del taller. Anticipo del programa avanzado de octubre: Terapeuta Animal Integrativo con certificación.' },
        ],
      },
    ]}
    entregables={[
      'Tabla de 10 conflictos mascota-dueño más comunes',
      '7 remedios florales esenciales + 5 fórmulas prediseñadas',
      '10 protocolos de terapia biomagnética para animales',
      'Las 3 preguntas del campo mórfico',
      'Protocolo integrado de 5 pasos',
      'Hoja resumen con rutina diaria y semanal',
    ]}
    requisitos="Ninguno. Solo traer una foto de tu mascota."
    whatsappMsg="Hola, quiero inscribirme al taller Lo Que Tu Mascota Quiere Decirte"
  />
);

export default TallerMascotas;
