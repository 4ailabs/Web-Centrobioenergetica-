import React, { useMemo, useState } from 'react';
import { X, Check, Copy, MessageCircle, ArrowLeft } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';
import { ACCESOS_ASIGNABLES_IDS } from '../../data/catalog';
import { generarContrasena } from '../../lib/password';

interface UsuarioExistente {
    id: string;
    name?: string;
    email: string;
    enrolledCourses?: string[];
}

interface GrantAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    usuarios: UsuarioExistente[];
    /** Inscribe sin retirar los cursos que ya tuviera */
    onEnroll: (userId: string, courseIds: string[]) => Promise<void>;
    /** Crea la cuenta y devuelve el usuario creado */
    onCreateUser: (datos: { name: string; email: string; password: string }) => Promise<void>;
    /** Vuelve a cargar la lista tras crear */
    onRefresh: () => Promise<UsuarioExistente[]>;
    /** Curso preseleccionado (al entrar desde un curso concreto) */
    cursoInicial?: string;
    /** Correo preseleccionado (al entrar desde la bandeja) */
    emailInicial?: string;
}

const cursosDisponibles = MOCK_DATA.courses.filter((c) => ACCESOS_ASIGNABLES_IDS.includes(c.id));

function nombreCorto(titulo: string) {
    return titulo.split('—')[0].split(':')[0].trim();
}

const GrantAccessModal: React.FC<GrantAccessModalProps> = ({
    isOpen,
    onClose,
    usuarios,
    onEnroll,
    onCreateUser,
    onRefresh,
    cursoInicial,
    emailInicial,
}) => {
    const [email, setEmail] = useState(emailInicial ?? '');
    const [nombre, setNombre] = useState('');
    const [seleccionados, setSeleccionados] = useState<string[]>(cursoInicial ? [cursoInicial] : []);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [resultado, setResultado] = useState<{ nombre: string; email: string; password?: string; cursos: string[] } | null>(null);
    const [copiado, setCopiado] = useState(false);

    const emailLimpio = email.trim().toLowerCase();
    const existente = useMemo(
        () => usuarios.find((u) => (u.email || '').toLowerCase() === emailLimpio),
        [usuarios, emailLimpio]
    );
    const esNuevo = emailLimpio.length > 0 && !existente;

    if (!isOpen) return null;

    const alternarCurso = (id: string) => {
        setSeleccionados((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
    };

    const mensaje = resultado
        ? [
            `Hola ${resultado.nombre.split(' ')[0] || ''}, ya tienes acceso a ${resultado.cursos.join(' y ')}.`,
            '',
            'Entra en institutocentrobioenergetica.com',
            `Correo: ${resultado.email}`,
            ...(resultado.password ? [`Contraseña: ${resultado.password}`, '', 'Puedes cambiarla cuando entres.'] : []),
        ].join('\n')
        : '';

    const guardar = async () => {
        setError('');
        if (!emailLimpio) return setError('Escribe el correo de la persona');
        if (seleccionados.length === 0) return setError('Elige al menos un curso');
        if (esNuevo && !nombre.trim()) return setError('Escribe el nombre para crear la cuenta');

        setGuardando(true);
        try {
            let usuario = existente;
            let password: string | undefined;

            if (!usuario) {
                password = generarContrasena();
                await onCreateUser({ name: nombre.trim(), email: emailLimpio, password });
                const actualizados = await onRefresh();
                usuario = actualizados.find((u) => (u.email || '').toLowerCase() === emailLimpio);
                if (!usuario) throw new Error('La cuenta se creó pero no se pudo localizar. Revisa la lista.');
            }

            await onEnroll(usuario.id, seleccionados);

            setResultado({
                nombre: usuario.name || nombre.trim() || '',
                email: emailLimpio,
                password,
                cursos: seleccionados.map((id) => {
                    const curso = MOCK_DATA.courses.find((c) => c.id.toString() === id);
                    return curso ? nombreCorto(curso.title) : `Curso ${id}`;
                }),
            });
        } catch (e: any) {
            setError(e.message || 'No se pudo completar');
        } finally {
            setGuardando(false);
        }
    };

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(mensaje);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2500);
        } catch {
            setError('No se pudo copiar. Selecciona el texto y cópialo a mano.');
        }
    };

    const cerrar = () => {
        setEmail('');
        setNombre('');
        setSeleccionados([]);
        setResultado(null);
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/40" onClick={cerrar} aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Dar acceso a un curso"
                className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-neutral-800 rounded-t-2xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-xl"
            >
                <div className="sticky top-0 flex items-center justify-between gap-3 px-5 py-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-[17px] font-semibold text-neutral-800 dark:text-neutral-100">
                        {resultado ? 'Acceso concedido' : 'Dar acceso'}
                    </h2>
                    <button onClick={cerrar} aria-label="Cerrar" className="p-2 -mr-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* ── Resultado: el mensaje listo para enviar ── */}
                {resultado ? (
                    <div className="p-5 space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-salvia-50 dark:bg-salvia-400/10 border border-salvia-200 dark:border-salvia-400/30">
                            <Check className="w-5 h-5 text-salvia-600 dark:text-salvia-400 shrink-0 mt-0.5" />
                            <p className="text-[13px] text-salvia-700 dark:text-salvia-300 leading-relaxed">
                                {resultado.nombre || resultado.email} ya puede entrar y ver {resultado.cursos.join(' y ')}.
                            </p>
                        </div>

                        <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
                                Mensaje para enviarle
                            </span>
                            <pre className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 font-sans">
{mensaje}
                            </pre>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-salvia-500 hover:bg-salvia-600 text-white text-sm font-semibold transition-colors min-h-[44px]"
                            >
                                <MessageCircle className="w-4 h-4" /> Abrir WhatsApp
                            </a>
                            <button
                                onClick={copiar}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:border-neutral-400 transition-colors min-h-[44px]"
                            >
                                <Copy className="w-4 h-4" /> {copiado ? 'Copiado' : 'Copiar mensaje'}
                            </button>
                        </div>

                        {resultado.password && (
                            <p className="text-[12px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Guarda o envía la contraseña ahora: por seguridad no vuelve a mostrarse. Si se pierde,
                                puedes generar otra desde la ficha de la persona.
                            </p>
                        )}

                        <button
                            onClick={cerrar}
                            className="w-full px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors min-h-[44px]"
                        >
                            Terminar
                        </button>
                    </div>
                ) : (
                    /* ── Formulario ── */
                    <div className="p-5 space-y-5">
                        <div>
                            <label htmlFor="ga-email" className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
                                1 · Correo de la persona
                            </label>
                            <input
                                id="ga-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nombre@correo.com"
                                autoComplete="off"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-100 text-[15px] focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15 outline-none transition-all min-h-[46px]"
                            />
                            {existente && (
                                <p className="mt-2 text-[13px] text-salvia-600 dark:text-salvia-400 font-medium">
                                    Ya tiene cuenta: {existente.name || existente.email}
                                    {existente.enrolledCourses && existente.enrolledCourses.length > 0 && (
                                        <span className="text-neutral-600 dark:text-neutral-400 font-normal">
                                            {' '}· {existente.enrolledCourses.length} curso{existente.enrolledCourses.length > 1 ? 's' : ''} ya asignado{existente.enrolledCourses.length > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </p>
                            )}
                            {esNuevo && (
                                <div className="mt-3">
                                    <label htmlFor="ga-nombre" className="block text-[12px] text-neutral-600 dark:text-neutral-400 mb-1.5">
                                        No tiene cuenta todavía — se creará con este nombre
                                    </label>
                                    <input
                                        id="ga-nombre"
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Nombre y apellido"
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-100 text-[15px] focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15 outline-none transition-all min-h-[46px]"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
                                2 · Cursos
                            </span>
                            <div className="space-y-2">
                                {cursosDisponibles.map((curso) => {
                                    const id = curso.id.toString();
                                    const marcado = seleccionados.includes(id);
                                    const yaLoTiene = existente?.enrolledCourses?.includes(id);
                                    return (
                                        <label
                                            key={id}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors min-h-[46px] ${
                                                marcado
                                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-600/10'
                                                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={marcado}
                                                onChange={() => alternarCurso(id)}
                                                className="w-4 h-4 accent-primary-600"
                                            />
                                            <span className={`text-[14px] flex-1 ${marcado ? 'font-semibold text-neutral-800 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-300'}`}>
                                                {nombreCorto(curso.title)}
                                            </span>
                                            {yaLoTiene && (
                                                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 shrink-0">ya lo tiene</span>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {error && (
                            <p className="text-[13px] text-red-600 dark:text-red-400 font-medium">{error}</p>
                        )}

                        <button
                            onClick={guardar}
                            disabled={guardando}
                            className="w-full px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors min-h-[46px]"
                        >
                            {guardando ? 'Dando acceso…' : esNuevo ? 'Crear cuenta y dar acceso' : 'Dar acceso'}
                        </button>
                        <p className="text-[12px] text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                            Nunca se retira un curso que la persona ya tuviera.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrantAccessModal;
