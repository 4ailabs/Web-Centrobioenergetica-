import React, { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, KeyRound, UserMinus, UserCheck, Trash2 } from 'lucide-react';

interface UserRowMenuProps {
    aprobado: boolean;
    esAdmin: boolean;
    esUnoMismo: boolean;
    onEditar: () => void;
    onContrasena: () => void;
    onAlternarAcceso: () => void;
    onEliminar: () => void;
}

/**
 * Acciones secundarias de cada persona. El botón es permanente (no aparece
 * solo al pasar el cursor) porque en móvil no existe el hover y porque su
 * presencia es lo que indica que la fila tiene más opciones.
 */
const UserRowMenu: React.FC<UserRowMenuProps> = ({
    aprobado,
    esAdmin,
    esUnoMismo,
    onEditar,
    onContrasena,
    onAlternarAcceso,
    onEliminar,
}) => {
    const [abierto, setAbierto] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!abierto) return;
        const fuera = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false);
        };
        const escape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setAbierto(false);
        };
        document.addEventListener('mousedown', fuera);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('mousedown', fuera);
            document.removeEventListener('keydown', escape);
        };
    }, [abierto]);

    const item = 'w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-left transition-colors min-h-[42px]';

    const ejecutar = (accion: () => void) => {
        setAbierto(false);
        accion();
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setAbierto((v) => !v)}
                aria-label="Más acciones"
                aria-expanded={abierto}
                aria-haspopup="menu"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:border-neutral-400 transition-colors"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {abierto && (
                <div
                    role="menu"
                    className="absolute right-0 top-11 z-20 w-56 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden"
                >
                    <button role="menuitem" onClick={() => ejecutar(onEditar)} className={`${item} text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50`}>
                        <Pencil className="w-3.5 h-3.5 text-neutral-400" /> Editar datos
                    </button>
                    <button role="menuitem" onClick={() => ejecutar(onContrasena)} className={`${item} text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50`}>
                        <KeyRound className="w-3.5 h-3.5 text-neutral-400" /> Restablecer contraseña
                    </button>

                    {!esUnoMismo && (
                        <>
                            <div className="my-1 border-t border-neutral-100 dark:border-neutral-700" />
                            <button role="menuitem" onClick={() => ejecutar(onAlternarAcceso)} className={`${item} text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50`}>
                                {aprobado ? (
                                    <><UserMinus className="w-3.5 h-3.5 text-amber-500" /> Suspender acceso</>
                                ) : (
                                    <><UserCheck className="w-3.5 h-3.5 text-salvia-500" /> Reactivar acceso</>
                                )}
                            </button>
                        </>
                    )}

                    {!esAdmin && !esUnoMismo && (
                        <>
                            <div className="my-1 border-t border-neutral-100 dark:border-neutral-700" />
                            <button role="menuitem" onClick={() => ejecutar(onEliminar)} className={`${item} text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10`}>
                                <Trash2 className="w-3.5 h-3.5" /> Eliminar cuenta
                            </button>
                            <p className="px-3 pt-0.5 pb-2 text-[11px] text-neutral-400 leading-snug">
                                Borra también su progreso. Para retirarle el acceso sin perder nada, usa Suspender.
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserRowMenu;
