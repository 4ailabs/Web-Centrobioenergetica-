import React from 'react';
import { X, Save, Eye, EyeOff } from 'lucide-react';

interface UserFormModalProps {
    isOpen: boolean;
    editingUser: any | null;
    userForm: {
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
    };
    showPassword: boolean;
    onFormChange: (field: string, value: string | boolean) => void;
    onTogglePassword: () => void;
    onSave: () => void;
    onClose: () => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
    isOpen,
    editingUser,
    userForm,
    showPassword,
    onFormChange,
    onTogglePassword,
    onSave,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-neutral-800 w-full max-w-lg rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                        {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-neutral-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            value={userForm.name}
                            onChange={(e) => onFormChange('name', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all"
                            placeholder="Ej. Juan Pérez"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={userForm.email}
                            onChange={(e) => onFormChange('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all"
                            placeholder="Ej. juan@ejemplo.com"
                        />
                    </div>

                    {!editingUser && (
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={userForm.password}
                                    onChange={(e) => onFormChange('password', e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all"
                                    placeholder="Min. 6 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={onTogglePassword}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={userForm.isAdmin}
                            onChange={(e) => onFormChange('isAdmin', e.target.checked)}
                            className="w-5 h-5 rounded text-primary-600 focus:ring-primary-600 accent-primary-600"
                        />
                        <label htmlFor="isAdmin" className="font-medium text-neutral-800 dark:text-neutral-100 select-none cursor-pointer">
                            ¿Es Administrador?
                        </label>
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
                        className="px-5 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-all flex items-center gap-2 min-h-[44px]"
                    >
                        <Save className="w-4 h-4" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserFormModal;
