import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

// Types
interface Question {
  id: string;
  section: 'A' | 'B' | 'C';
  sectionLabel: string;
  text: string;
  subtext?: string;
  type: 'single' | 'scale' | 'multi';
  options?: { label: string; value: number }[];
  scaleLabels?: { min: string; max: string };
}

interface Profile {
  name: string;
  description: string;
  color: string;
  phase: string;
  severity: string;
  recommendation: string;
}

// Questions
const questions: Question[] = [
  // SECTION A — Phase
  { id: 'a1', section: 'A', sectionLabel: 'Tu fase', text: '¿Qué edad tienes?', type: 'single', options: [
    { label: '35 – 39', value: 0 }, { label: '40 – 44', value: 1 }, { label: '45 – 49', value: 2 },
    { label: '50 – 54', value: 3 }, { label: '55 – 59', value: 4 }, { label: '60 o más', value: 5 },
  ]},
  { id: 'a2', section: 'A', sectionLabel: 'Tu fase', text: '¿Cómo están tus ciclos menstruales?', type: 'single', options: [
    { label: 'Regulares como siempre', value: 0 },
    { label: 'Regulares pero han cambiado de duración', value: 1 },
    { label: 'Irregulares — a veces se adelantan, a veces se atrasan más de 7 días', value: 2 },
    { label: 'He tenido períodos de 2+ meses sin menstruar, pero vuelven', value: 3 },
    { label: 'Llevo entre 3 y 12 meses sin menstruar', value: 4 },
    { label: 'Llevo más de 12 meses sin menstruar', value: 5 },
  ]},
  { id: 'a3', section: 'A', sectionLabel: 'Tu fase', text: '¿Has notado cambios en el sangrado?', type: 'single', options: [
    { label: 'Es igual que siempre', value: 0 },
    { label: 'Más abundante o más escaso que antes', value: 1 },
    { label: 'Muy errático — a veces mucho, a veces casi nada', value: 2 },
    { label: 'Ya no menstruo', value: 3 },
  ]},
  { id: 'a4', section: 'A', sectionLabel: 'Tu fase', text: '¿Te han realizado alguna cirugía ginecológica?', type: 'single', options: [
    { label: 'No', value: 0 },
    { label: 'Histerectomía (conservé ovarios)', value: 1 },
    { label: 'Ooforectomía unilateral (un ovario)', value: 1 },
    { label: 'Ooforectomía bilateral (ambos ovarios)', value: 5 },
  ]},
  // SECTION B — Symptoms (MRS adapted)
  { id: 'b1', section: 'B', sectionLabel: 'Tus síntomas', text: 'Bochornos o sudoraciones', subtext: 'Calores repentinos, oleadas de calor, sudoración sin causa', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b2', section: 'B', sectionLabel: 'Tus síntomas', text: 'Molestias cardíacas', subtext: 'Palpitaciones, taquicardia, opresión en el pecho sin causa cardiológica', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b3', section: 'B', sectionLabel: 'Tus síntomas', text: 'Problemas de sueño', subtext: 'Dificultad para dormir, despertar a media noche, despertar muy temprano', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b4', section: 'B', sectionLabel: 'Tus síntomas', text: 'Dolores musculares o articulares', subtext: 'Dolor de cuerpo, rigidez, molestias articulares', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b5', section: 'B', sectionLabel: 'Tus síntomas', text: 'Estado de ánimo bajo', subtext: 'Tristeza, ganas de llorar, falta de motivación, cambios de humor', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b6', section: 'B', sectionLabel: 'Tus síntomas', text: 'Irritabilidad', subtext: 'Nerviosismo, tensión interna, reacciones desproporcionadas', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b7', section: 'B', sectionLabel: 'Tus síntomas', text: 'Ansiedad', subtext: 'Inquietud interna, sensación de pánico, preocupación constante', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b8', section: 'B', sectionLabel: 'Tus síntomas', text: 'Agotamiento físico y mental', subtext: 'Bajo rendimiento, olvidos frecuentes, falta de concentración', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b9', section: 'B', sectionLabel: 'Tus síntomas', text: 'Cambios en el deseo sexual', subtext: 'Menos deseo, menos satisfacción, evitar la intimidad', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b10', section: 'B', sectionLabel: 'Tus síntomas', text: 'Problemas de vejiga', subtext: 'Urgencia, frecuencia, goteo al toser o reír', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  { id: 'b11', section: 'B', sectionLabel: 'Tus síntomas', text: 'Sequedad vaginal', subtext: 'Ardor, molestia, dolor en relaciones', type: 'scale', scaleLabels: { min: 'No lo tengo', max: 'Muy severo' }},
  // SECTION C — Risk
  { id: 'c1', section: 'C', sectionLabel: 'Tu riesgo', text: '¿Tienes antecedentes familiares de osteoporosis o fractura de cadera?', type: 'single', options: [
    { label: 'No', value: 0 }, { label: 'Sí, un familiar', value: 1 }, { label: 'Sí, madre o abuela directa', value: 2 },
  ]},
  { id: 'c2', section: 'C', sectionLabel: 'Tu riesgo', text: '¿Antecedentes familiares de infarto o enfermedad cardiovascular antes de los 65 años?', type: 'single', options: [
    { label: 'No', value: 0 }, { label: 'Sí', value: 2 },
  ]},
  { id: 'c3', section: 'C', sectionLabel: 'Tu riesgo', text: '¿Fumas o has fumado más de 5 años?', type: 'single', options: [
    { label: 'Nunca', value: 0 }, { label: 'Fumé pero lo dejé', value: 1 }, { label: 'Fumo actualmente', value: 2 },
  ]},
  { id: 'c4', section: 'C', sectionLabel: 'Tu riesgo', text: '¿Haces ejercicio de resistencia al menos 2 veces por semana?', subtext: 'Pesas, bandas elásticas, o ejercicio con carga', type: 'single', options: [
    { label: 'Sí, regularmente', value: 0 }, { label: 'A veces', value: 1 }, { label: 'No, nunca o casi nunca', value: 2 },
  ]},
  { id: 'c5', section: 'C', sectionLabel: 'Tu riesgo', text: '¿Has notado alguno de estos cambios en los últimos 2 años?', type: 'multi', options: [
    { label: 'Pérdida de estatura', value: 1 },
    { label: 'Infecciones urinarias recurrentes', value: 1 },
    { label: 'Piel mucho más delgada o seca', value: 1 },
    { label: 'Olvidos frecuentes o niebla mental', value: 1 },
    { label: 'Aumento de peso en abdomen sin cambio de dieta', value: 1 },
    { label: 'Ninguno de los anteriores', value: 0 },
  ]},
  { id: 'c6', section: 'C', sectionLabel: 'Tu riesgo', text: '¿Tu dieta incluye regularmente soya, tofu o edamame?', type: 'single', options: [
    { label: 'Sí, varias veces por semana', value: 0 }, { label: 'Ocasionalmente', value: 1 }, { label: 'Casi nunca o nunca', value: 2 },
  ]},
];

// Algorithm
function calculateProfile(answers: Record<string, number | number[]>): Profile {
  // Phase score
  const phaseScore = (['a1', 'a2', 'a3', 'a4'] as const).reduce((sum, id) => {
    const v = answers[id];
    return sum + (typeof v === 'number' ? v : 0);
  }, 0);

  // Symptom scores
  const somatic = (['b1', 'b2', 'b3', 'b4'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0);
  const psychological = (['b5', 'b6', 'b7', 'b8'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0);
  const urogenital = (['b9', 'b10', 'b11'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0);
  const totalB = somatic + psychological + urogenital;

  // Risk score
  const c5vals = answers['c5'];
  const c5score = Array.isArray(c5vals) ? c5vals.reduce((a, b) => a + b, 0) : (typeof c5vals === 'number' ? c5vals : 0);
  const riskScore = (['c1', 'c2', 'c3', 'c4', 'c6'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0) + c5score;

  // Phase name
  let phase = '';
  if (phaseScore <= 2) phase = 'Reproductiva tardía';
  else if (phaseScore <= 5) phase = 'Transición temprana';
  else if (phaseScore <= 9) phase = 'Transición tardía';
  else if (phaseScore <= 12) phase = 'Postmenopausia temprana';
  else phase = 'Postmenopausia establecida';

  // Severity
  let severity = '';
  if (totalB <= 4) severity = 'Mínima';
  else if (totalB <= 8) severity = 'Leve';
  else if (totalB <= 16) severity = 'Moderada';
  else severity = 'Severa';

  // Risk level
  let riskLevel = '';
  if (riskScore <= 3) riskLevel = 'Bajo';
  else if (riskScore <= 7) riskLevel = 'Moderado';
  else riskLevel = 'Alto';

  // Profile determination
  // Count how many axes are significantly active (>=5 somatic, >=5 psych, >=3 urogenital)
  const activeAxes = (somatic >= 5 ? 1 : 0) + (psychological >= 5 ? 1 : 0) + (urogenital >= 3 ? 1 : 0);

  // 1. Calma — pre-transition, minimal symptoms
  if (totalB <= 4 && phaseScore <= 3) return {
    name: 'Calma', color: '#7a9466', phase, severity,
    description: 'Tu cuerpo aun no ha entrado en transicion hormonal activa. Los indicadores son estables. Este es el momento de conocer tu mapa — antes de que los sintomas aparezcan, no despues.',
    recommendation: 'Necesitas los mapas preventivos: cardiovascular, oseo y metabolico.',
  };

  // 2. Señal — early transition, mild symptoms
  if (totalB <= 10 && phaseScore >= 2 && phaseScore <= 6) return {
    name: 'Senal', color: '#BA7517', phase, severity,
    description: 'Las primeras senales estan aqui. Tu cuerpo esta empezando a cambiar de programa hormonal. Los ciclos se mueven, el sueno cambia, el animo fluctua. No es que algo este mal — es que la transicion ya comenzo.',
    recommendation: 'Necesitas los mapas de transicion: termorregulacion, sueno y regulacion emocional.',
  };

  // 3. Niebla — psychological axis dominates clearly
  if (psychological >= 7 && psychological > somatic && psychological > urogenital) return {
    name: 'Niebla', color: '#534AB7', phase, severity,
    description: 'El impacto principal esta en tu animo, tu energia y tu claridad mental. La irritabilidad, la ansiedad, el agotamiento o los olvidos dominan tu dia a dia. Esto tiene una base neuroendocrina especifica — no es "estres" ni es "tu caracter".',
    recommendation: 'Necesitas los mapas del eje emocional: serotonina, GABA/allopregnanolona y BDNF.',
  };

  // 4. Oleaje — somatic axis dominates clearly
  if (somatic >= 9 && somatic > psychological) return {
    name: 'Oleaje', color: '#D85A30', phase, severity,
    description: 'Tu cuerpo esta en plena transicion. Los sintomas fisicos dominan — calores, sudoraciones, dolor articular, problemas de sueno. El sistema termorregulador y el eje somatico estan activos.',
    recommendation: 'Necesitas los mapas somaticos: KNDy/termorregulacion, sueno y musculoesqueletico.',
  };

  // 5. Silencio — urogenital axis significant
  if (urogenital >= 5 && phaseScore >= 6) return {
    name: 'Silencio', color: '#8B6F4E', phase, severity,
    description: 'Lo que muchas mujeres callan. El eje urogenital necesita atencion — sequedad, molestias, cambios en la sexualidad, problemas de vejiga. Es progresivo y no se resuelve solo. Tiene regulacion especifica.',
    recommendation: 'Necesitas los mapas urogenitales: epitelio vaginal, microbioma y eje vesical.',
  };

  // 6. Raíz — post-menopausal with high risk but lower symptoms
  if (phaseScore >= 10 && riskScore >= 6 && totalB <= 20) return {
    name: 'Raiz', color: '#8B4513', phase, severity,
    description: 'Los sintomas visibles pueden haber bajado, pero debajo de la superficie los ejes estructurales estan en riesgo. Hueso, corazon, cognicion — lo que no se siente hoy se manifiesta en 5 anos si no se mapea ahora.',
    recommendation: 'Necesitas los mapas de riesgo: oseo (RANK/RANKL), cardiovascular (eNOS/NO) y cognitivo.',
  };

  // 7. Tormenta — severe symptoms across multiple axes (truly severe)
  if (totalB >= 22 && activeAxes >= 2) return {
    name: 'Tormenta', color: '#C25A2A', phase, severity,
    description: 'La transicion esta en su punto mas intenso. Multiples sistemas estan activos al mismo tiempo — calores, sueno fragmentado, cambios emocionales, cambios corporales. Tu cuerpo necesita regulacion en varios frentes simultaneamente.',
    recommendation: 'Necesitas la cartografia completa: los 9 mapas de regulacion + fitoterapia por fase.',
  };

  // 8. Default — Transición (moderate mixed, no single axis dominates)
  return {
    name: 'Transicion', color: '#B5604A', phase, severity,
    description: 'Tu cuerpo esta en transicion activa con sintomas distribuidos en varios ejes. No hay un solo sistema dominante — hay una reorganizacion general que necesita un mapa completo para navegar.',
    recommendation: 'Necesitas la cartografia completa para identificar cuales mapas priorizar.',
  };
}

// Component
const TestHormonal: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  const [multiSelections, setMultiSelections] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<Profile | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = step >= 0 && step < totalQuestions ? questions[step] : null;
  const progress = step >= 0 ? ((step + 1) / totalQuestions) * 100 : 0;

  // Use ref to always have latest answers for profile calculation
  const answersRef = React.useRef(answers);
  answersRef.current = answers;

  const advanceStep = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      if (step + 1 >= totalQuestions) {
        setResult(calculateProfile(answersRef.current));
      } else {
        setStep(s => s + 1);
      }
      setMultiSelections(new Set());
      setAnimating(false);
    }, 200);
  }, [step, totalQuestions]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setAnimating(true);
      setTimeout(() => {
        setStep(s => s - 1);
        setAnimating(false);
      }, 200);
    }
  }, [step]);

  const handleSingle = (value: number) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    // Use timeout to let state settle, then advance with fresh ref
    setTimeout(() => {
      answersRef.current = newAnswers;
      advanceStep();
    }, 250);
  };

  const handleScale = (value: number) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      answersRef.current = newAnswers;
      advanceStep();
    }, 350);
  };

  const handleMultiToggle = (value: number, idx: number) => {
    if (!currentQuestion) return;
    // "Ninguno" logic — clear selections and advance
    if (idx === (currentQuestion.options?.length ?? 0) - 1) {
      setMultiSelections(new Set());
      const newAnswers = { ...answers, [currentQuestion.id]: [0] };
      setAnswers(newAnswers);
      setTimeout(() => {
        answersRef.current = newAnswers;
        advanceStep();
      }, 250);
      return;
    }
    const newSet = new Set(multiSelections);
    if (newSet.has(idx)) newSet.delete(idx); else newSet.add(idx);
    setMultiSelections(newSet);
    const vals = Array.from(newSet).map(i => currentQuestion.options?.[i]?.value ?? 0);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: vals.length > 0 ? vals : [0] }));
  };

  // Score calculations for result
  const somatic = (['b1', 'b2', 'b3', 'b4'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0);
  const psychological = (['b5', 'b6', 'b7', 'b8'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0);
  const urogenital = (['b9', 'b10', 'b11'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0);
  const c5v = answers['c5'];
  const c5s = Array.isArray(c5v) ? c5v.reduce((a, b) => a + b, 0) : 0;
  const riskTotal = (['c1', 'c2', 'c3', 'c4', 'c6'] as const).reduce((s, id) => s + (typeof answers[id] === 'number' ? answers[id] as number : 0), 0) + c5s;

  // INTRO
  if (step === -1) return (
    <div className="w-full pt-[72px] lg:pt-0 min-h-screen flex items-center justify-center px-6" style={{ background: '#F9F8F6' }}>
      <div className="max-w-lg w-full text-center">
        <div className="mb-6">
          <span className="inline-block text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-3">Instituto Centrobioenergetica</span>
          <h1 className="text-2xl lg:text-3xl font-editorial font-medium text-neutral-800 leading-tight mb-3">
            Cartografía Hormonal Femenina
          </h1>
          <p className="text-[15px] text-neutral-500 leading-relaxed max-w-md mx-auto">
            22 preguntas para identificar tu fase, la severidad de tus síntomas y tus ejes de riesgo. Al final recibirás tu perfil hormonal personalizado.
          </p>
        </div>
        <div className="mb-8 text-left bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
          {[
            { label: 'Sección A', desc: 'Tu fase reproductiva', count: '4 preguntas' },
            { label: 'Sección B', desc: 'Tus síntomas actuales', count: '11 preguntas' },
            { label: 'Sección C', desc: 'Tu perfil de riesgo', count: '6 preguntas' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-primary-600">{s.label}</span>
                <p className="text-[13px] text-neutral-600">{s.desc}</p>
              </div>
              <span className="text-[11px] text-neutral-400">{s.count}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setStep(0)}
            className="w-full py-3.5 rounded-xl text-white text-[15px] font-medium transition-opacity hover:opacity-90"
            style={{ background: '#B5604A' }}
          >
            Comenzar
          </button>
          <p className="text-[11px] text-neutral-400">Tiempo estimado: 4 minutos. Tus respuestas son privadas y se procesan en tu dispositivo.</p>
          <div className="mt-4 text-left bg-neutral-50 rounded-lg p-5 border border-neutral-100">
            <p className="text-[12px] font-medium uppercase tracking-widest text-neutral-400 mb-3">Base cientifica del algoritmo</p>
            <div className="space-y-2.5">
              <p className="text-[14px] text-neutral-500 leading-relaxed"><span className="font-medium text-neutral-700">Fase reproductiva:</span> Clasificacion STRAW+10 (Harlow et al. J Clin Endocrinol Metab 2012) — estandar internacional para la estadificacion del envejecimiento reproductivo femenino.</p>
              <p className="text-[14px] text-neutral-500 leading-relaxed"><span className="font-medium text-neutral-700">Severidad de sintomas:</span> Menopause Rating Scale / MRS (Heinemann et al. Health Qual Life Outcomes 2003) — escala validada en 10 idiomas, con normas de referencia para poblacion latinoamericana.</p>
              <p className="text-[14px] text-neutral-500 leading-relaxed"><span className="font-medium text-neutral-700">Perfil de riesgo:</span> Factores de riesgo oseo, cardiovascular, cognitivo y genitourinario basados en guias de la North American Menopause Society (NAMS) y la International Menopause Society (IMS).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // RESULT
  if (result) {
    const maxBar = 16;
    const urMax = 12;
    return (
      <div className="w-full pt-[72px] lg:pt-0 pb-16 px-6" style={{ background: '#F9F8F6' }}>
        <div className="max-w-lg mx-auto pt-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>

          {/* Profile name */}
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-2">Tu perfil hormonal</span>
            <h1 className="text-3xl font-editorial font-medium leading-tight mb-1" style={{ color: result.color }}>
              Perfil {result.name}
            </h1>
            <p className="text-[13px] text-neutral-400">{result.phase} — Severidad {result.severity}</p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
            <p className="text-[15px] text-neutral-700 leading-relaxed">{result.description}</p>
          </div>

          {/* Scores */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
            <h3 className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 mb-5">Severidad por eje</h3>
            <div className="space-y-4">
              {[
                { label: 'Somático', sublabel: 'Calores, sueño, dolor', value: somatic, max: maxBar, color: '#D85A30' },
                { label: 'Psicológico', sublabel: 'Ánimo, irritabilidad, ansiedad, cognición', value: psychological, max: maxBar, color: '#534AB7' },
                { label: 'Urogenital', sublabel: 'Sexualidad, vejiga, sequedad', value: urogenital, max: urMax, color: '#8B6F4E' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-[13px] font-medium text-neutral-700">{bar.label}</span>
                      <span className="text-[11px] text-neutral-400 ml-2">{bar.sublabel}</span>
                    </div>
                    <span className="text-[13px] font-medium" style={{ color: bar.color }}>{bar.value}/{bar.max}</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.min((bar.value / bar.max) * 100, 100)}%`, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
            <h3 className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 mb-4">Nivel de riesgo a futuro</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((riskTotal / 14) * 100, 100)}%`,
                    background: riskTotal <= 3 ? '#7a9466' : riskTotal <= 7 ? '#BA7517' : '#C25A2A',
                  }}
                />
              </div>
              <span className="text-[13px] font-medium" style={{ color: riskTotal <= 3 ? '#7a9466' : riskTotal <= 7 ? '#BA7517' : '#C25A2A' }}>
                {riskTotal <= 3 ? 'Bajo' : riskTotal <= 7 ? 'Moderado' : 'Alto'}
              </span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-xl p-6 mb-8" style={{ background: result.color + '0A', border: `1px solid ${result.color}20` }}>
            <h3 className="text-[13px] font-medium mb-2" style={{ color: result.color }}>Lo que tu mapa necesita</h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">{result.recommendation}</p>
          </div>

          {/* CTA */}
          <div className="text-center space-y-3">
            <a
              href="https://wa.me/525579076626?text=Hola%2C%20hice%20el%20test%20hormonal%20y%20mi%20perfil%20es%20"
              target="_blank" rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-xl text-white text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{ background: '#B5604A' }}
            >
              Quiero saber más sobre El Reset Hormonal
            </a>
            <p className="text-[13px] text-neutral-500">
              16 y 30 de mayo — Cartografía Hormonal Femenina
            </p>
            <p className="text-[11px] text-neutral-400 mt-4">
              Este test tiene fines informativos y educativos. El algoritmo integra la clasificacion STRAW+10 (Harlow et al. 2012) para estadificacion de fase reproductiva, la escala MRS (Heinemann et al. 2003) validada internacionalmente para severidad de sintomas, y factores de riesgo basados en guias NAMS/IMS. Tus respuestas se procesan localmente en tu dispositivo. No sustituye la evaluacion medica.
            </p>
          </div>

          {/* Retake */}
          <div className="text-center mt-6">
            <button
              onClick={() => { setStep(-1); setAnswers({}); setResult(null); }}
              className="text-[13px] text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Volver a hacer el test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUESTION
  if (!currentQuestion) return null;

  const sectionProgress = currentQuestion.section === 'A' ? 'A' : currentQuestion.section === 'B' ? 'B' : 'C';
  const sectionColors: Record<string, string> = { A: '#B5604A', B: '#534AB7', C: '#8B6F4E' };

  return (
    <div className="w-full pt-[72px] lg:pt-0 min-h-screen flex flex-col" style={{ background: '#F9F8F6' }}>
      {/* Progress */}
      <div className="px-6 pt-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={step === 0 ? () => navigate(-1) : goBack}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-600 transition-colors text-[13px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 0 ? 'Salir' : 'Anterior'}</span>
            </button>
            <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: sectionColors[sectionProgress] }}>
              {currentQuestion.sectionLabel}
            </span>
            <span className="text-[11px] text-neutral-400">{step + 1} / {totalQuestions}</span>
          </div>
          <div className="h-1 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: sectionColors[sectionProgress] }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className={`max-w-lg w-full transition-all duration-200 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-xl lg:text-2xl font-editorial font-medium text-neutral-800 leading-tight mb-2">
            {currentQuestion.text}
          </h2>
          {currentQuestion.subtext && (
            <p className="text-[13px] text-neutral-400 mb-6">{currentQuestion.subtext}</p>
          )}
          {!currentQuestion.subtext && <div className="mb-6" />}

          {/* Single select */}
          {currentQuestion.type === 'single' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSingle(opt.value)}
                  className="w-full text-left px-4 py-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50 transition-all text-[14px] text-neutral-700 flex items-center justify-between group"
                >
                  {opt.label}
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Scale 0-4 */}
          {currentQuestion.type === 'scale' && (
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-[11px] text-neutral-400">{currentQuestion.scaleLabels?.min}</span>
                <span className="text-[11px] text-neutral-400">{currentQuestion.scaleLabels?.max}</span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => handleScale(v)}
                    className="flex-1 py-4 rounded-xl border border-neutral-200 bg-white hover:border-primary-400 hover:bg-primary-50 transition-all text-center"
                  >
                    <span className="text-lg font-medium text-neutral-600">{v}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['0', '1', '2', '3', '4'].map((l) => (
                  <span key={l} className="text-[10px] text-neutral-300 flex-1 text-center">
                    {l === '0' ? 'No' : l === '1' ? 'Leve' : l === '2' ? 'Mod.' : l === '3' ? 'Sev.' : 'Muy sev.'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Multi select */}
          {currentQuestion.type === 'multi' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((opt, i) => {
                const isLast = i === (currentQuestion.options?.length ?? 0) - 1;
                const isSelected = isLast ? multiSelections.size === 0 && answers[currentQuestion.id] !== undefined : multiSelections.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleMultiToggle(opt.value, i)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all text-[14px] flex items-center gap-3 ${
                      isSelected
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-primary-500 bg-primary-500' : 'border-neutral-300'
                    }`}>
                      {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    {opt.label}
                  </button>
                );
              })}
              {multiSelections.size > 0 && (
                <button
                  onClick={advanceStep}
                  className="w-full mt-4 py-3 rounded-xl text-white text-[14px] font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: '#B5604A' }}
                >
                  Continuar <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestHormonal;
