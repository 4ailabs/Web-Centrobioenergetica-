// Contraseñas legibles para dictar o pegar en un mensaje: una palabra del
// vocabulario del instituto + 4 dígitos. Cumplen la validación del registro
// (mayúscula, minúscula, número y 8+ caracteres) sin ser una cadena de
// caracteres imposible de leer en voz alta por WhatsApp.
const PALABRAS = [
  'Salvia', 'Crania', 'Resonar', 'Cuarzo', 'Diapason', 'Sendero',
  'Bosque', 'Cauce', 'Raiz', 'Brote', 'Alba', 'Sereno',
  'Ambar', 'Terra', 'Vital', 'Pulso', 'Ritmo', 'Calma',
];

export function generarContrasena(): string {
  const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `${palabra}${numero}`;
}
