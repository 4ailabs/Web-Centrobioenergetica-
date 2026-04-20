import React from 'react';
import { CheckCircle, XCircle, BookOpen, Pencil, Trash2, Shield } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';

const COURSE_SHORT_NAMES: Record<string, string> = {
  '101': 'Aminoácidos',
  '102': 'Set Point',
  '103': 'BV4',
  '104': 'Mascotas',
  '105': 'Reset Hormonal',
  '106': 'Actos que Mueven',
  '107': 'Resonantia',
  '108': 'Mascotas',
};

function getCourseShortName(courseId: string): string {
  if (COURSE_SHORT_NAMES[courseId]) return COURSE_SHORT_NAMES[courseId];
  const course = MOCK_DATA.courses.find(c => c.id.toString() === courseId);
  return course ? course.title.split('—')[0].split(':')[0].trim() : `Curso ${courseId}`;
}

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    subscriptionStatus: 'active' | 'inactive';
    enrolledCourses?: string[];
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
        <div className="space-y-3">
            {users.map((user) => {
                const isCurrentUser = user.id === currentUserId;
                const courseCount = user.enrolledCourses?.length || 0;

                return (
                    <div
                        key={user.id}
                        className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 transition-colors"
                    >
                        {/* Row 1: Avatar + Name + Email + Badges */}
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-600/20 flex items-center justify-center text-primary-600 font-semibold text-sm shrink-0">
                                {(user.name || '?').charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 truncate">
                                        {user.name || 'Sin nombre'}
                                    </span>
                                    {user.isAdmin && (
                                        <span className="inline-flex items-center gap-1 text-[10px] bg-primary-100 dark:bg-primary-600/20 text-primary-600 px-1.5 py-0.5 rounded font-medium shrink-0">
                                            <Shield className="w-2.5 h-2.5" /> Admin
                                        </span>
                                    )}
                                    {isCurrentUser && (
                                        <span className="text-[10px] text-neutral-400 shrink-0">(tú)</span>
                                    )}
                                </div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                            </div>
                        </div>

                        {/* Row 2: Status pills */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {/* Subscription status */}
                            {user.subscriptionStatus === 'active' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-salvia-50 dark:bg-salvia-400/10 text-salvia-600 dark:text-salvia-400 text-[11px] font-medium">
                                    <CheckCircle className="w-3 h-3" /> Suscripción activa
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-[11px] font-medium">
                                    <XCircle className="w-3 h-3" /> Sin suscripción
                                </span>
                            )}

                            {/* Enrolled courses */}
                            {courseCount === 0 ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-400 text-[11px] font-medium">
                                    <BookOpen className="w-3 h-3" /> Sin cursos
                                </span>
                            ) : (
                                <div className="flex flex-wrap gap-1">
                                    {user.enrolledCourses!.map(courseId => (
                                        <span
                                            key={courseId}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-medium"
                                        >
                                            <BookOpen className="w-3 h-3 shrink-0" />
                                            {getCourseShortName(courseId)}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Row 3: Action buttons with labels */}
                        <div className="flex items-center gap-2 flex-wrap border-t border-neutral-100 dark:border-neutral-700 pt-3">
                            <button
                                onClick={() => onManageCourses(user)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-600/10 transition-colors"
                            >
                                <BookOpen className="w-3.5 h-3.5" /> Cursos
                            </button>

                            <button
                                onClick={() => onToggleSubscription(user.id, user.subscriptionStatus || 'inactive')}
                                disabled={isCurrentUser}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                                    isCurrentUser
                                        ? 'opacity-30 cursor-not-allowed text-neutral-400'
                                        : user.subscriptionStatus === 'active'
                                            ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                                            : 'text-salvia-600 dark:text-salvia-400 hover:bg-salvia-50 dark:hover:bg-salvia-400/10'
                                }`}
                            >
                                {user.subscriptionStatus === 'active' ? (
                                    <><XCircle className="w-3.5 h-3.5" /> Desactivar</>
                                ) : (
                                    <><CheckCircle className="w-3.5 h-3.5" /> Activar</>
                                )}
                            </button>

                            <button
                                onClick={() => onEditUser(user)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5" /> Editar
                            </button>

                            {!user.isAdmin && !isCurrentUser && (
                                <button
                                    onClick={() => onDeleteUser(user)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors ml-auto"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserTable;
