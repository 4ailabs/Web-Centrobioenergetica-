import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';

interface CourseManagementModalProps {
    isOpen: boolean;
    user: {
        id: string;
        name: string;
        enrolledCourses?: string[];
    } | null;
    selectedCourseIds: string[];
    onToggleCourse: (courseId: string) => void;
    onSave: () => void;
    onClose: () => void;
}

const CourseManagementModal: React.FC<CourseManagementModalProps> = ({
    isOpen,
    user,
    selectedCourseIds,
    onToggleCourse,
    onSave,
    onClose,
}) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-[var(--panel-bg)] w-full max-w-2xl rounded-[2rem] shadow-2xl border border-[var(--border-color)] overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                    <div>
                        <h2 className="text-xl font-black text-[var(--text-main)]">Gestionar Acceso a Cursos</h2>
                        <p className="text-sm text-[var(--text-muted)]">
                            Usuario: <span className="font-bold text-primary-600">{user.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-[var(--text-muted)]"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {MOCK_DATA.courses.map((course) => {
                            const isSelected = selectedCourseIds.includes(course.id.toString());
                            return (
                                <div
                                    key={course.id}
                                    onClick={() => onToggleCourse(course.id.toString())}
                                    className={`
                    cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3
                    ${isSelected
                                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 shadow-sm'
                                            : 'bg-[var(--bg-main)] border-[var(--border-color)] hover:border-primary-300 dark:hover:border-primary-700'
                                        }
                  `}
                                >
                                    <div
                                        className={`
                      w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5
                      ${isSelected
                                                ? 'bg-primary-600 border-primary-600 text-white'
                                                : 'border-zinc-300 dark:border-zinc-600'
                                            }
                    `}
                                    >
                                        {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                                    </div>
                                    <div>
                                        <h3
                                            className={`font-bold text-sm mb-1 ${isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-[var(--text-main)]'
                                                }`}
                                        >
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-[var(--text-muted)] line-clamp-2">{course.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-3 rounded-xl font-bold bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:scale-105 transition-all"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseManagementModal;
