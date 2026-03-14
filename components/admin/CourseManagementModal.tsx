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
            <div className="bg-white dark:bg-neutral-800 w-full max-w-2xl rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Gestionar Acceso a Cursos</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                            Usuario: <span className="font-medium text-primary-600">{user.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-neutral-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Course list */}
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MOCK_DATA.courses.map((course) => {
                            const isSelected = selectedCourseIds.includes(course.id.toString());
                            return (
                                <div
                                    key={course.id}
                                    onClick={() => onToggleCourse(course.id.toString())}
                                    className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 flex items-start gap-3 ${
                                        isSelected
                                            ? 'bg-primary-50 dark:bg-primary-600/10 border-primary-300 dark:border-primary-600/30'
                                            : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600/50'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                        isSelected
                                            ? 'bg-primary-600 border-primary-600 text-white'
                                            : 'border-neutral-300 dark:border-neutral-600'
                                    }`}>
                                        {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                                    </div>
                                    <div>
                                        <h3 className={`font-medium text-sm mb-1 ${
                                            isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-neutral-900 dark:text-neutral-50'
                                        }`}>
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{course.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSave}
                        className="px-5 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-all min-h-[44px]"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseManagementModal;
