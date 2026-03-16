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
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Suscripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500 dark:text-neutral-400">
                                    Cargando usuarios...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500 dark:text-neutral-400">
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-600/20 flex items-center justify-center text-primary-600 font-semibold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="font-medium text-neutral-800 dark:text-neutral-100">{user.name}</div>
                                            {user.isAdmin && (
                                                <span className="text-[10px] bg-primary-100 dark:bg-primary-600/20 text-primary-600 px-2 py-0.5 rounded-lg font-medium">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.subscriptionStatus === 'active' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 text-xs font-medium">
                                                <CheckCircle className="w-3 h-3" /> Activa
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 text-xs font-medium">
                                                <XCircle className="w-3 h-3" /> Inactiva
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onToggleSubscription(user.id, user.subscriptionStatus || 'inactive')}
                                                disabled={user.id === currentUserId}
                                                className={`p-2 rounded-lg transition-colors ${user.id === currentUserId
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : user.subscriptionStatus === 'active'
                                                        ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                        : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10'
                                                    }`}
                                                title={user.subscriptionStatus === 'active' ? 'Desactivar' : 'Activar'}
                                            >
                                                {user.subscriptionStatus === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                            </button>

                                            <button
                                                onClick={() => onManageCourses(user)}
                                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                title="Gestionar Cursos"
                                            >
                                                <BookOpen className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => onEditUser(user)}
                                                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => onDeleteUser(user)}
                                                disabled={user.id === currentUserId}
                                                className={`p-2 rounded-lg transition-colors ${user.id === currentUserId
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                    }`}
                                                title="Eliminar"
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
