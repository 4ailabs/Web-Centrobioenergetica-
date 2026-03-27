import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Species = 'perro' | 'gato' | 'caballo' | 'conejo' | 'ave' | 'otro';

interface Question {
  id: string;
  axis: 'ansiedad' | 'conexion';
  sectionLabel: string;
  text: string;
  subtext?: (species: Species) => string;
  scaleLabels: { min: string; max: string };
}

interface Profile {
  name: string;
  tagline: string;
  description: string;
  color: string;
  interpretation: string;
  recommendation: string;
}

// ─── Species labels ───────────────────────────────────────────────────────────

const speciesLabels: Record<Species, string> = {
  perro: 'Perro',
  gato: 'Gato',
  caballo: 'Caballo',
  conejo: 'Conejo',
  ave: 'Ave',
  otro: 'Otro',
};

const speciesEmoji: Record<Species, string> = {
  perro: '🐕',
  gato: '🐈',
  caballo: '🐴',
  conejo: '🐇',
  ave: '🦜',
  otro: '🐾',
};

// ─── Questions ────────────────────────────────────────────────────────────────

const questions: Question[] = [
  // EJE ANSIEDAD (5 preguntas)
  {
    id: 'a1',
    axis: 'ansiedad',
    sectionLabel: 'Eje de ansiedad',
    text: '¿Cómo reacciona cuando llegas a casa después de varias horas?',
    subtext: (s) => {
      const map: Record<Species, string> = {
        perro: 'Perro: ladra y salta sin poder detenerse',
        gato: 'Gato: maúlla insistentemente y se frota sin calmarse',
        caballo: 'Caballo: relincha y busca contacto físico continuo',
        conejo: 'Conejo: corre círculos sin poder calmarse',
        ave: 'Ave: vocaliza de forma agitada y continua',
        otro: 'Observa si busca contacto intensamente y no puede calmarse',
      };
      return map[s];
    },
    scaleLabels: {
      min: 'Se calma rápido o apenas reacciona',
      max: 'No puede calmarse: busca contacto sin detenerse',
    },
  },
  {
    id: 'a2',
    axis: 'ansiedad',
    sectionLabel: 'Eje de ansiedad',
    text: '¿Cómo reacciona cuando te preparas para salir?',
    subtext: (s) => {
      const map: Record<Species, string> = {
        perro: 'Perro: te sigue, se interpone en la puerta, vocaliza al verte prepararte',
        gato: 'Gato: se pone inquieto, maúlla o bloquea la salida',
        caballo: 'Caballo: se agita en el box cuando nota que te preparas para irte',
        conejo: 'Conejo: golpea el suelo o corre nerviosamente',
        ave: 'Ave: grita o vocaliza cuando ve señales de que vas a salir',
        otro: 'Observa si se agita antes de que salgas: te sigue, vocaliza, no te suelta',
      };
      return map[s];
    },
    scaleLabels: {
      min: 'No lo nota o ignora tu partida',
      max: 'Se agita antes de que salgas: te sigue, vocaliza, no te suelta',
    },
  },
  {
    id: 'a3',
    axis: 'ansiedad',
    sectionLabel: 'Eje de ansiedad',
    text: 'Cuando estás en casa pero en otra habitación, ¿qué hace?',
    subtext: (s) => {
      const map: Record<Species, string> = {
        perro: 'Perro: te sigue a todos lados, no puede estar solo aunque estés en casa',
        gato: 'Gato: se sube a donde estás sin que lo invites y no baja',
        caballo: 'Caballo: busca tu presencia cuando puede, se inquieta si pierdes el contacto visual',
        conejo: 'Conejo: se acerca y no se separa aunque estés cerca',
        ave: 'Ave: grita si no estás en su campo visual',
        otro: 'Observa si puede quedarse tranquilo sin verte',
      };
      return map[s];
    },
    scaleLabels: {
      min: 'Se queda tranquilo donde está',
      max: 'No puede estar sin verte: te busca de habitación en habitación',
    },
  },
  {
    id: 'a4',
    axis: 'ansiedad',
    sectionLabel: 'Eje de ansiedad',
    text: 'Cuando estás triste, tenso o agitado, ¿tu animal cambia?',
    subtext: () => 'Piensa en la última vez que tuviste un momento difícil en casa',
    scaleLabels: {
      min: 'No cambia su comportamiento',
      max: 'Se altera también: ansioso, hiperactivo o más pegajoso de lo habitual',
    },
  },
  {
    id: 'a5',
    axis: 'ansiedad',
    sectionLabel: 'Eje de ansiedad',
    text: '¿Con qué frecuencia muestra angustia visible cuando no puede estar cerca de ti?',
    subtext: (s) => {
      const map: Record<Species, string> = {
        perro: 'Perro: llora, destruye o elimina fuera del lugar habitual',
        gato: 'Gato: deja de comer, deja de acicalarse o se sobreacicala',
        caballo: 'Caballo: patea, se autolesiona o come repetidamente sin hambre real',
        conejo: 'Conejo: golpea el suelo de forma repetida',
        ave: 'Ave: se arranca plumas o grita de forma continua',
        otro: 'Observa si muestra síntomas físicos o conductuales claros de angustia',
      };
      return map[s];
    },
    scaleLabels: {
      min: 'Nunca o casi nunca',
      max: 'Con frecuencia: síntomas físicos o conductuales visibles',
    },
  },

  // EJE CONEXIÓN / EVITACIÓN (5 preguntas)
  {
    id: 'b1',
    axis: 'conexion',
    sectionLabel: 'Eje de conexión',
    text: 'Cuando le ofreces caricias o contacto físico, ¿cómo responde?',
    subtext: (s) => {
      const map: Record<Species, string> = {
        perro: 'Perro: ¿se acerca y busca más, o se aparta?',
        gato: 'Gato: ¿ronronea y busca contacto, o lo tolera y se va?',
        caballo: 'Caballo: ¿se relaja y acerca la cabeza, o se retira?',
        conejo: 'Conejo: ¿se deja acariciar con gusto, o se aleja?',
        ave: 'Ave: ¿busca el contacto con el pico o la cabeza, o lo evita?',
        otro: 'Observa si busca el contacto o lo tolera sin responder',
      };
      return map[s];
    },
    scaleLabels: {
      min: 'Lo busca activamente y disfruta',
      max: 'Lo evita o lo tolera sin responder',
    },
  },
  {
    id: 'b2',
    axis: 'conexion',
    sectionLabel: 'Eje de conexión',
    text: '¿Con qué frecuencia inicia juego o interacción por su propia cuenta?',
    subtext: () => 'Sin que tú lo estimules — ¿tiene iniciativa propia?',
    scaleLabels: {
      min: 'Frecuente: tiene energía e iniciativa propias',
      max: 'Casi nula: espera o no muestra interés propio',
    },
  },
  {
    id: 'b3',
    axis: 'conexion',
    sectionLabel: 'Eje de conexión',
    text: '¿Cuánto interés muestra en explorar su entorno?',
    subtext: (s) => {
      const map: Record<Species, string> = {
        perro: 'Jardín, paseos, objetos nuevos — ¿hay curiosidad activa?',
        gato: 'Nuevas superficies, objetos, ventanas — ¿explora o ignora?',
        caballo: 'El pastizal, objetos nuevos en el box, personas — ¿se acerca a explorar?',
        conejo: 'Su jaula, el piso libre, objetos — ¿husmea y explora o permanece quieto?',
        ave: 'Objetos nuevos en la jaula, el entorno — ¿investiga con interés?',
        otro: 'Observa si hay curiosidad activa o indiferencia hacia el entorno',
      };
      return map[s];
    },
    scaleLabels: {
      min: 'Activo y curioso, explora con energía',
      max: 'Poco o ningún interés, permanece siempre en el mismo lugar',
    },
  },
  {
    id: 'b4',
    axis: 'conexion',
    sectionLabel: 'Eje de conexión',
    text: '¿Cómo describirías su estado emocional cotidiano?',
    subtext: () => 'En un día normal, sin eventos especiales',
    scaleLabels: {
      min: 'Alerta, curioso, vivo, expresivo',
      max: 'Apagado, letárgico, poco expresivo',
    },
  },
  {
    id: 'b5',
    axis: 'conexion',
    sectionLabel: 'Eje de conexión',
    text: 'Frente a personas o situaciones nuevas, ¿cómo reacciona?',
    subtext: () => 'Un visitante en casa, un objeto diferente en la sala, un espacio nuevo',
    scaleLabels: {
      min: 'Explora con cautela y se adapta',
      max: 'Ignora completamente, sin curiosidad ni reacción',
    },
  },
];

// ─── Algorithm ────────────────────────────────────────────────────────────────

const evitativoInterpretation: Record<Species, string> = {
  perro:
    'En perros, este patrón suele leerse como apatía o indiferencia — cuando en realidad es distancia aprendida. Tu perro no eligió esto: lo aprendió como estrategia de adaptación ante un entorno donde el contacto fue inconsistente.',
  gato:
    'Los gatos con este perfil son los más malinterpretados: se les llama independientes cuando en realidad aprendieron que no vale la pena acercarse. No es independencia — es desconexión. El gato no eligió este patrón: lo aprendió.',
  caballo:
    'En caballos, este patrón puede verse como falta de respuesta al tacto o a la presencia humana — cuando en realidad es distancia aprendida. El caballo no eligió esto: desarrolló esta estrategia ante señales inconsistentes del entorno.',
  conejo:
    'En conejos, este patrón suele leerse como timidez permanente o desinterés — cuando en realidad es distancia aprendida. El conejo no eligió este patrón: lo aprendió como estrategia de adaptación.',
  ave:
    'En aves, este patrón puede verse como indiferencia o falta de sociabilidad — cuando en realidad es desconexión aprendida. El ave no eligió este patrón: lo desarrolló ante un entorno donde el contacto fue impredecible.',
  otro:
    'Este patrón suele leerse como independencia o indiferencia — cuando en realidad es distancia aprendida. Tu animal no eligió este patrón: lo aprendió como estrategia de adaptación ante un entorno donde el contacto fue inconsistente.',
};

function calculateProfile(
  answers: Record<string, number>,
  species: Species
): Profile & { anxietyScore: number; avoidanceScore: number } {
  const anxietyScore = ['a1', 'a2', 'a3', 'a4', 'a5'].reduce(
    (s, id) => s + (answers[id] ?? 0),
    0
  );
  const avoidanceScore = ['b1', 'b2', 'b3', 'b4', 'b5'].reduce(
    (s, id) => s + (answers[id] ?? 0),
    0
  );

  const highAnxiety = anxietyScore >= 10;
  const highAvoidance = avoidanceScore >= 10;

  let profile: Profile;

  if (!highAnxiety && !highAvoidance) {
    profile = {
      name: 'Vínculo Seguro',
      tagline: 'Base estable',
      color: '#7a9466',
      description:
        'El campo emocional entre ustedes tiene suelo firme. Tu animal confía en ti como base segura: puede alejarse, explorar, y volver. Siente tu estado pero no lo absorbe. Tiene autonomía y conexión al mismo tiempo — y eso no es fácil de construir.',
      interpretation:
        'La ciencia del vínculo confirma que la seguridad se construye y se mantiene, pero no es estática. Cualquier estrés sostenido en el hogar puede moverla. Conocer cómo funciona este patrón te ayuda a protegerlo — y a recuperarlo si algo lo sacude.',
      recommendation:
        'El taller te da las herramientas para entender por qué funciona y cómo mantenerlo. Vínculo sano no es un destino: es una práctica.',
    };
  } else if (highAnxiety && !highAvoidance) {
    profile = {
      name: 'Vínculo Ansioso',
      tagline: 'Tensión de fondo',
      color: '#B5604A',
      description:
        'Tu animal no tiene suficiente suelo interno para regularse sin ti. Busca proximidad de forma intensa, espeja tu estado con fidelidad, y puede mostrar síntomas cuando hay tensión sostenida en el hogar. No es "demasiado cariñoso" — es un sistema nervioso que aprendió que la estabilidad no está garantizada.',
      interpretation:
        'El flujo de tensión va del sistema humano al animal. Lo que no se procesa en el hogar, el animal lo porta. El cortisol compartido no es metáfora: tiene una firma química medible. Estudios de sincronía fisiológica dueño-animal muestran que el nivel de estrés del dueño predice el del animal con más fuerza que la raza o el ejercicio.',
      recommendation:
        'Este es el perfil que el taller aborda directamente: qué carga emocional porta tu animal y cómo aflojarla desde el sistema completo, no solo desde el animal.',
    };
  } else if (!highAnxiety && highAvoidance) {
    profile = {
      name: 'Vínculo Evitativo',
      tagline: 'Distancia aprendida',
      color: '#534AB7',
      description:
        'Tu animal ha aprendido a reducir la expresión de su necesidad de vínculo. Lo que parece independencia es, con frecuencia, desconexión. Hay conexión — pero está suprimida. Esto puede venir de su historia, de experiencias tempranas, o de un entorno donde el contacto fue inconsistente.',
      interpretation: evitativoInterpretation[species],
      recommendation:
        'El taller incluye trabajo específico sobre vínculo evitativo: cómo recuperar la conexión sin forzar el contacto y qué señales observar para saber que el patrón está cambiando.',
    };
  } else {
    profile = {
      name: 'Vínculo Desorganizado',
      tagline: 'Señales contradictorias',
      color: '#8B4513',
      description:
        'El patrón es contradictorio: hay tensión alta y desconexión al mismo tiempo. El animal busca proximidad y la rechaza. No hay un sistema de regulación claro. Esto puede indicar historia de trauma, señales inconsistentes del entorno humano, o un campo emocional muy cargado en el hogar.',
      interpretation:
        'Este es el perfil más complejo — no hay una sola palanca que mover. Hay varias capas que necesitan trabajo simultáneo: el animal, el dueño, y el campo entre ambos. Es también el perfil donde el trabajo sostenido tiene más impacto visible a mediano plazo.',
      recommendation:
        'Este vínculo merece atención estructurada. El taller te da las herramientas iniciales y el mapa para empezar a trabajar las múltiples capas.',
    };
  }

  return { ...profile, anxietyScore, avoidanceScore };
}

// ─── Component ────────────────────────────────────────────────────────────────

const TestVinculoAnimal: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(-1); // -1 = intro
  const [species, setSpecies] = useState<Species | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<(Profile & { anxietyScore: number; avoidanceScore: number }) | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = step >= 0 && step < totalQuestions ? questions[step] : null;
  const progress = step >= 0 ? ((step + 1) / totalQuestions) * 100 : 0;

  const answersRef = React.useRef(answers);
  answersRef.current = answers;
  const speciesRef = React.useRef(species);
  speciesRef.current = species;

  const advanceStep = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      if (step + 1 >= totalQuestions) {
        setResult(calculateProfile(answersRef.current, speciesRef.current ?? 'otro'));
      } else {
        setStep(s => s + 1);
      }
      setAnimating(false);
    }, 200);
  }, [step, totalQuestions]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setAnimating(true);
      setTimeout(() => { setStep(s => s - 1); setAnimating(false); }, 200);
    } else if (step === 0) {
      setStep(-1);
    }
  }, [step]);

  const handleScale = (value: number) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      answersRef.current = newAnswers;
      advanceStep();
    }, 300);
  };

  const sectionColor = currentQuestion?.axis === 'ansiedad' ? '#B5604A' : '#534AB7';

  // ── INTRO ────────────────────────────────────────────────────────────────

  if (step === -1) return (
    <div className="w-full pt-[72px] lg:pt-0 min-h-screen flex items-center justify-center px-6 bg-[var(--bg-main)]">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <span className="inline-block text-[11px] font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
            Instituto Centrobioenergetica
          </span>
          <h1 className="text-2xl lg:text-3xl font-editorial font-medium text-neutral-800 dark:text-neutral-100 leading-tight mb-3">
            Test de Vínculo Animal
          </h1>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
            10 preguntas para identificar el patrón de vínculo entre tú y tu animal. Al final recibes tu perfil con interpretación clínica.
          </p>
        </div>

        {/* Species selector */}
        <div className="mb-6">
          <p className="text-[12px] font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 text-center">
            ¿Con qué animal vives?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(speciesLabels) as Species[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpecies(s)}
                className={`px-3 py-3.5 rounded-xl border text-[14px] font-medium transition-all flex flex-col items-center gap-1.5 ${
                  species === s
                    ? 'border-primary-400 bg-primary-50 dark:bg-primary-600/15 text-primary-700 dark:text-primary-400'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
                }`}
              >
                <span className="text-xl">{speciesEmoji[s]}</span>
                <span>{speciesLabels[s]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Structure preview */}
        <div className="mb-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 space-y-3">
          {[
            { label: 'Sección A', desc: 'Eje de ansiedad de vínculo', count: '5 preguntas', color: '#B5604A' },
            { label: 'Sección B', desc: 'Eje de conexión y exploración', count: '5 preguntas', color: '#534AB7' },
          ].map((sec) => (
            <div key={sec.label} className="flex items-center justify-between">
              <div>
                <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: sec.color }}>{sec.label}</span>
                <p className="text-[14px] text-neutral-600 dark:text-neutral-300">{sec.desc}</p>
              </div>
              <span className="text-[12px] text-neutral-400">{sec.count}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => { if (species) setStep(0); }}
            disabled={!species}
            className="w-full py-4 rounded-xl text-white text-[16px] font-medium transition-all bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            {species ? `Comenzar con ${speciesLabels[species]}` : 'Selecciona tu animal para comenzar'}
          </button>
          <p className="text-[12px] text-neutral-400 text-center">
            Tiempo estimado: 3 minutos · Procesado en tu dispositivo
          </p>

          {/* Scientific basis */}
          <div className="mt-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-5 border border-neutral-100 dark:border-neutral-700">
            <p className="text-[12px] font-medium uppercase tracking-widest text-neutral-400 mb-3">Base científica</p>
            <div className="space-y-2">
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <span className="font-medium text-neutral-700 dark:text-neutral-200">Eje de ansiedad:</span> Adaptado del Pet Attachment Questionnaire (PAQ) — subescala de ansiedad. Validado en múltiples especies.
              </p>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <span className="font-medium text-neutral-700 dark:text-neutral-200">Eje de conexión:</span> Adaptado del B-LAPS (Lexington Attachment to Pets Scale) y del Secure Base Test de Ainsworth aplicado a animales (Vitale et al. 2019, Keeling et al. 2009).
              </p>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <span className="font-medium text-neutral-700 dark:text-neutral-200">Modelo 2D:</span> Los cuatro perfiles de vínculo derivan del modelo Ansiedad × Evitación de la teoría del apego (Bowlby, Ainsworth), adaptado a la díada dueño-animal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── RESULT ───────────────────────────────────────────────────────────────

  if (result) {
    const anxPct = Math.min((result.anxietyScore / 20) * 100, 100);
    const avoPct = Math.min((result.avoidanceScore / 20) * 100, 100);

    const anxLabel = result.anxietyScore <= 4 ? 'Mínima' : result.anxietyScore <= 9 ? 'Leve' : result.anxietyScore <= 15 ? 'Moderada' : 'Elevada';
    const avoLabel = result.avoidanceScore <= 4 ? 'Mínima' : result.avoidanceScore <= 9 ? 'Leve' : result.avoidanceScore <= 15 ? 'Moderada' : 'Elevada';

    return (
      <div className="w-full pt-[72px] lg:pt-0 pb-16 px-6 bg-[var(--bg-main)]">
        <div className="max-w-2xl mx-auto pt-6">

          {/* Nav */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/taller-mascotas')}
              className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors text-[13px]"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al taller
            </button>
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {species ? `${speciesEmoji[species]} ${speciesLabels[species!]}` : ''}
            </span>
          </div>

          {/* Profile header */}
          <div className="mb-2">
            <p className="text-[12px] uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400" style={{ letterSpacing: 3 }}>
              Test de Vínculo Animal
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h1 className="text-3xl lg:text-4xl" style={{ fontFamily: "'Newsreader', Georgia, serif", fontWeight: 500, color: result.color, letterSpacing: 0.3, lineHeight: 1.1 }}>
                {result.name}
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md self-start sm:self-auto" style={{ background: result.color + '15', border: `1px solid ${result.color}25` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: result.color }} />
                <span className="text-[13px] font-medium" style={{ color: result.color }}>{result.tagline}</span>
              </div>
            </div>
          </div>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${result.color}70, ${result.color}20, transparent)` }} />

          {/* 2D Axis bars */}
          <div className="py-6 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-[12px] font-medium uppercase tracking-widest mb-5 text-neutral-500 dark:text-neutral-400">
              Perfil por eje
            </h3>
            <div className="space-y-5">
              {/* Anxiety axis */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-200">Ansiedad de vínculo</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px]" style={{ color: '#B5604A' }}>{anxLabel}</span>
                    <span className="text-[12px] text-neutral-400">{result.anxietyScore}/20</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${anxPct}%`, background: '#B5604A' }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-neutral-400">Baja</span>
                  <span className="text-[10px] text-neutral-400">Alta</span>
                </div>
              </div>

              {/* Avoidance axis */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-200">Evitación / distancia</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px]" style={{ color: '#534AB7' }}>{avoLabel}</span>
                    <span className="text-[12px] text-neutral-400">{result.avoidanceScore}/20</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${avoPct}%`, background: '#534AB7' }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-neutral-400">Baja</span>
                  <span className="text-[10px] text-neutral-400">Alta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-neutral-200 dark:border-neutral-700">
            <p className="text-[16px] leading-relaxed text-neutral-800 dark:text-neutral-200" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
              {result.description}
            </p>
          </div>

          {/* Interpretation */}
          <div className="py-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex gap-4">
              <div className="shrink-0 w-1 rounded-full" style={{ background: result.color }} />
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400">
                  Lo que esto indica
                </h3>
                <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {result.interpretation}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="py-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex gap-4">
              <div className="shrink-0 w-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400">
                  Indicación
                </h3>
                <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {result.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Important note */}
          <div className="py-4 border-b border-neutral-200 dark:border-neutral-700">
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              <span className="font-medium text-neutral-600 dark:text-neutral-300">Importante:</span>{' '}
              El patrón de tu animal no viene siempre de tu estado emocional — también puede venir de su historia previa, su raza o sus instintos. Este test es un punto de partida para observar, no un diagnóstico definitivo. Si tu animal tiene síntomas físicos, el primer paso es siempre el veterinario.
            </p>
          </div>

          {/* CTA */}
          <div className="py-8">
            <div className="rounded-xl p-5 sm:p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <p className="font-editorial text-xl text-neutral-800 dark:text-neutral-100 mb-1">
                Lo Que Tu Mascota Quiere Decirte
              </p>
              <p className="text-[14px] mb-4 text-neutral-500 dark:text-neutral-400">
                Taller presencial y online · Módulo 1: 27 de marzo · Módulo 2: 10 de abril
              </p>
              <a
                href={`https://wa.me/525579076626?text=${encodeURIComponent(`Hola, hice el Test de Vínculo Animal y mi perfil es ${result.name} (Ansiedad ${result.anxietyScore}/20, Evitación ${result.avoidanceScore}/20). Quiero saber más sobre el taller Lo Que Tu Mascota Quiere Decirte.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white text-[15px] font-medium transition-opacity hover:opacity-90 bg-primary-600"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Quiero inscribirme
              </a>
            </div>
          </div>

          {/* Methodology */}
          <div className="pb-6">
            <details className="group">
              <summary className="cursor-pointer text-[12px] font-medium uppercase tracking-widest list-none flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Metodología y referencias
              </summary>
              <div className="mt-3 space-y-2 pl-5">
                <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  <span className="font-medium text-neutral-600 dark:text-neutral-300">Modelo de apego:</span> Bowlby (1969), Ainsworth (1978). Extensión a animales domésticos: Topál et al. (1998), Vitale et al. (2019 — gatos, Current Biology).
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  <span className="font-medium text-neutral-600 dark:text-neutral-300">Escala PAQ:</span> Zilcha-Mano et al. (2011). Subescalas Ansiedad × Evitación aplicadas a la díada dueño-mascota.
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  <span className="font-medium text-neutral-600 dark:text-neutral-300">B-LAPS:</span> Versión breve de la Lexington Attachment to Pets Scale (Johnson et al. 1992). Validada en perros, gatos y otras especies.
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  <span className="font-medium text-neutral-600 dark:text-neutral-300">Equinos:</span> Keeling et al. (2009). Horse-Human Attachment Questionnaire (HAQ, 2025).
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Este test es una herramienta de orientación clínica, no un instrumento diagnóstico certificado. No sustituye evaluación veterinaria ni psicológica.
                </p>
              </div>
            </details>
          </div>

          {/* Retake */}
          <div className="text-center pb-4">
            <button
              onClick={() => { setStep(-1); setAnswers({}); setResult(null); setSpecies(null); }}
              className="text-[13px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Volver a hacer el test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUESTION ─────────────────────────────────────────────────────────────

  if (!currentQuestion) return null;

  const subtext = species ? currentQuestion.subtext?.(species) : undefined;

  return (
    <div className="w-full pt-[72px] lg:pt-0 min-h-screen flex flex-col bg-[var(--bg-main)]">
      {/* Progress bar */}
      <div className="px-6 pt-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors text-[13px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 0 ? 'Salir' : 'Anterior'}</span>
            </button>
            <span className="text-[12px] font-medium uppercase tracking-widest" style={{ color: sectionColor }}>
              {currentQuestion.sectionLabel}
            </span>
            <span className="text-[12px] text-neutral-400 dark:text-neutral-500">{step + 1} / {totalQuestions}</span>
          </div>
          <div className="h-1 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: sectionColor }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 py-6 sm:py-8">
        <div className={`max-w-lg w-full transition-all duration-200 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-xl sm:text-2xl font-editorial font-medium text-neutral-800 dark:text-neutral-100 leading-tight mb-2">
            {currentQuestion.text}
          </h2>
          {subtext ? (
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">{subtext}</p>
          ) : (
            <div className="mb-6" />
          )}

          {/* Scale 0-4 */}
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-[12px] text-neutral-500 dark:text-neutral-400 max-w-[45%] leading-tight">{currentQuestion.scaleLabels.min}</span>
              <span className="text-[12px] text-neutral-500 dark:text-neutral-400 max-w-[45%] text-right leading-tight">{currentQuestion.scaleLabels.max}</span>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((v) => (
                <button
                  key={v}
                  onClick={() => handleScale(v)}
                  className="flex-1 py-5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-600/10 transition-all text-center active:scale-95"
                >
                  <span className="text-lg font-medium text-neutral-600 dark:text-neutral-300">{v}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Nunca', '', 'A veces', '', 'Siempre'].map((l, i) => (
                <span key={i} className="text-[10px] text-neutral-400 dark:text-neutral-500 flex-1 text-center">{l}</span>
              ))}
            </div>
          </div>

          {/* Species indicator */}
          {species && (
            <p className="text-[12px] text-neutral-400 dark:text-neutral-500 text-center mt-6">
              {speciesEmoji[species]} {speciesLabels[species]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestVinculoAnimal;
