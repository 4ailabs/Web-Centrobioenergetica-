import React from 'react';
import { BookOpen, Shield, Clock, UserMinus } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';
import UserRowMenu from './UserRowMenu';
import Badge from '../ui/Badge';

// El nombre se deriva SIEMPRE del catálogo real. Antes existía aquí un
// diccionario fijo de ids→nombres que quedó desfasado y mostraba el curso
// equivocado en el panel (p. ej. el 106 aparecía como "Actos que Mueven").
function getCourseShortName(courseId: string): string {
  const course = MOCK_DATA.courses.find(c => c.id.toString() === courseId);
  return course ? course.title.split('—')[0].split(':')[0].trim() : `Curso ${courseId}`;
}

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    approved?: boolean;
    subscriptionStatus: 'active' | 'inactive';
    enrolledCourses?: string[];
}

interface UserTableProps {
    users: User[];
    loading: boolean;
    currentUserId?: string;
    onManageCourses: (user: User) => void;
    onEditUser: (user: User) => void;
    onDeleteUser: (user: User) => void;
    onResetPassword: (user: User) => void;
    onToggleApproval: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    loading,
    currentUserId,
    onManageCourses,
    onEditUser,
    onDeleteUser,
    onResetPassword,
    onToggleApproval,
}) => {
    if (loading) {
        return (
            <div className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Cargando usuarios...
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                No se encontraron usuarios
            </div>
        );
    }

    return (
        <div className="space-y-2.5">
            {users.map((user) => {
                const isCurrentUser = user.id === currentUserId;
                const cursos = user.enrolledCourses || [];
                const suspendido = user.approved === false;

                return (
                    <div
                        key={user.id}
                        className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 flex items-start gap-3 flex-wrap transition-colors"
                    >
                        <div className="flex-1 min-w-[180px]">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[14.5px] font-semibold text-neutral-800 dark:text-neutral-100">
                                    {user.name || 'Sin nombre'}
                                </span>
                                {user.isAdmin && (
                                    <span className="inline-flex items-center gap-1 text-[10px] bg-primary-100 dark:bg-primary-600/20 text-primary-600 px-1.5 py-0.5 rounded font-medium">
                                        <Shield className="w-2.5 h-2.5" /> Admin
                                    </span>
                                )}
                                {isCurrentUser && <span className="text-[10px] text-neutral-400">(tú)</span>}
                                {suspendido && (
                                    <Badge tono="atencion" icono={<UserMinus className="w-2.5 h-2.5" />}>Sin acceso</Badge>
                                )}
                            </div>
                            <p className="text-[12.5px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{user.email}</p>

                            {cursos.length === 0 ? (
                                <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-amber-700 dark:text-amber-400">
                                    <Clock className="w-3 h-3" /> Sin cursos: no ve ningún contenido
                                </p>
                            ) : (
                                <p className="mt-2 text-[12.5px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    <BookOpen className="w-3 h-3 inline-block mr-1 -mt-0.5 text-neutral-400" />
                                    {cursos.map(getCourseShortName).join(' · ')}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => onManageCourses(user)}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition-colors min-h-[36px]"
                            >
                                <BookOpen className="w-3.5 h-3.5" /> Cursos
                            </button>
                            <UserRowMenu
                                aprobado={user.approved !== false}
                                esAdmin={user.isAdmin}
                                esUnoMismo={isCurrentUser}
                                onEditar={() => onEditUser(user)}
                                onContrasena={() => onResetPassword(user)}
                                onAlternarAcceso={() => onToggleApproval(user)}
                                onEliminar={() => onDeleteUser(user)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserTable;
