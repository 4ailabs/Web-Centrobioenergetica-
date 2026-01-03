import React from 'react';
import { CheckCircle, XCircle, BookOpen, Pencil, Trash2 } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    subscriptionStatus: 'active' | 'inactive';
}

interface UserTableProps {
    users: User[];
    loading: boolean;
    currentUserId?: string;
    onToggleSubscription: (userId: string, currentStatus: string) => void;
    onManageCourses: (user: User) => void;
    onEditUser: (user: User) => void;
    onDeleteUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    loading,
    currentUserId,
    onToggleSubscription,
    onManageCourses,
    onEditUser,
    onDeleteUser,
}) => {
    return (
        <div className="bg-[var(--panel-bg)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
                                Usuario
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
                                Estado Suscripción
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">
                                    Cargando usuarios...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-[var(--bg-main)] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="font-bold text-[var(--text-main)]">{user.name}</div>
                                            {user.isAdmin && (
                                                <span className="text-[10px] bg-primary-100 dark:bg-primary-900/30 text-primary-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.subscriptionStatus === 'active' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-black uppercase tracking-wider">
                                                <CheckCircle className="w-3 h-3" /> Activa
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-black uppercase tracking-wider">
                                                <XCircle className="w-3 h-3" /> Inactiva
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onToggleSubscription(user.id, user.subscriptionStatus || 'inactive')}
                                                disabled={user.id === currentUserId}
                                                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${user.id === currentUserId
                                                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                                                    : user.subscriptionStatus === 'active'
                                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40'
                                                        : 'bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/40'
                                                    }`}
                                                title={user.subscriptionStatus === 'active' ? 'Cancelar Suscripción' : 'Activar Suscripción'}
                                            >
                                                {user.subscriptionStatus === 'active' ? (
                                                    <XCircle className="w-4 h-4" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4" />
                                                )}
                                            </button>

                                            <button
                                                onClick={() => onManageCourses(user)}
                                                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all flex items-center gap-1"
                                                title="Gestionar Cursos"
                                            >
                                                <BookOpen className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => onEditUser(user)}
                                                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center gap-1"
                                                title="Editar Usuario"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => onDeleteUser(user)}
                                                disabled={user.id === currentUserId}
                                                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${user.id === currentUserId
                                                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                                                    : 'bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40'
                                                    }`}
                                                title="Eliminar Usuario"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
