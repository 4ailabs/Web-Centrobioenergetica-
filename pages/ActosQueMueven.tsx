import React from 'react';
import ProgramPage from '../components/ProgramPage';

const ActosQueMueven: React.FC = () => (
  <ProgramPage
    titulo="Actos que Mueven"
    hook="El cuerpo no cambia con lo que entiendes — cambia con lo que haces. Un taller donde no se habla de rituales: se hacen."
    imagen="/images/courses/actos-que-mueven/ritual_3.jpg"
    fechas="Sábado 6 de junio + Sábado 20 de junio"
    modalidad="Presencial · Vivencial · 10:00 – 18:00 h"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Taller · 2 Sábados', 'Todo público', 'Cupo: 15 personas']}
    modulos={[
      {
        numero: '1',
        fecha: 'Sábado 6 de junio',
        titulo: 'Los 5 Actos Fundamentales',
        bloques: [
          { time: '', title: 'Apertura y secuencia TAME', desc: 'Encuadre del taller, reglas del espacio y los 5 pasos que hacen que un acto ritual llegue al sistema nervioso en lugar de quedarse en la mente.' },
          { time: '', title: 'Romper y reparar', desc: 'Para cuando algo te impactó con tanta fuerza que las piezas de la experiencia se separaron. Un acto con cerámica, quiebre y reparación con pegamento dorado (kintsugi).' },
          { time: '', title: 'Lo que nunca se dijo', desc: 'Para cuando la voz fue silenciada y lo no dicho se acumuló en la garganta. Un acto con escritura, voz y una botella que guarda y después libera.' },
          { time: '', title: 'Ponerse de pie', desc: 'Para cuando aprendiste a hacerte pequeño para no ser blanco. Un acto frente al espejo que trabaja la postura, el tamaño real y la presencia.' },
          { time: '', title: 'La cara que construí', desc: 'Para cuando construiste una cara para el mundo porque mostrar la real parecía peligroso. Un acto con máscara, espejo y la decisión de quitársela.' },
          { time: '', title: 'El primer bocado', desc: 'Para cuando todo se apagó por dentro. Un acto en la oscuridad con vela, luz y alimento que trabaja con la depleción y el reencendido.' },
        ],
      },
      {
        numero: '2',
        fecha: 'Sábado 20 de junio',
        titulo: 'La Secuencia que Transforma',
        bloques: [
          { time: '', title: 'Reencuentro', desc: 'Revisión de lo que se movió en las dos semanas entre módulos. Qué acto repitieron, qué notaron, qué apareció en el cuerpo y en la vida cotidiana.' },
          { time: '', title: 'El peso (descenso)', desc: 'Entrar al cuerpo tal como está, con todo lo que carga. Un acto con piedra de río que se sostiene, se baja y se suelta.' },
          { time: '', title: 'La herida que habla (descenso)', desc: 'Nombrar lo que duele y darle palabras. Una carta escrita a la herida misma — no a la persona que la causó — y un acto de contención.' },
          { time: '', title: 'El espejo (encuentro)', desc: 'Mirarse sin máscara y encontrar al que está adentro. Confrontación prolongada con el propio reflejo y un diálogo que no se olvida.' },
          { time: '', title: 'Diálogo con las partes (encuentro)', desc: 'Escuchar lo que cada zona del cuerpo guarda: garganta, pecho, estómago, piernas, manos. Un recorrido interoceptivo guiado con escritura.' },
          { time: '', title: 'La entrega a la tierra (ascenso)', desc: 'Soltar lo que ya no se necesita cargar. La carta se entierra, una semilla se siembra encima. Donde había dolor, ahora crece algo vivo.' },
          { time: '', title: 'El nuevo paso (ascenso)', desc: 'Dar el primer paso como alguien que soltó. La piedra se lava, se convierte en testigo, y el participante camina un camino nuevo frente al grupo.' },
        ],
      },
    ]}
    entregables={[
      '5 actos rituales fundamentales para practicar en casa',
      'La Secuencia TAME: 5 pasos para que el acto llegue al cuerpo',
      'Una secuencia progresiva de 6 fases como modelo',
      'Plato reparado con kintsugi',
      'Maceta con semilla plantada',
      'Piedra-testigo del proceso completo',
      'Canal de seguimiento grupal',
    ]}
    requisitos="Ninguno. No se requiere formación previa. Formato presencial y vivencial."
    whatsappMsg="Hola, quiero inscribirme al taller Actos que Mueven"
  />
);

export default ActosQueMueven;
