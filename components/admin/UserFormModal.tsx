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
            <div className="bg-[var(--panel-bg)] w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-[var(--border-color)] overflow-hidden">
                <div className="p-8 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                    <h2 className="text-2xl font-black text-[var(--text-main)]">
                        {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-[var(--text-muted)]"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            value={userForm.name}
                            onChange={(e) => onFormChange('name', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:ring-2 focus:ring-primary-600 outline-none"
                            placeholder="Ej. Juan Pérez"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={userForm.email}
                            onChange={(e) => onFormChange('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:ring-2 focus:ring-primary-600 outline-none"
                            placeholder="Ej. juan@ejemplo.com"
                        />
                    </div>

                    {!editingUser && (
                        <div>
                            <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={userForm.password}
                                    onChange={(e) => onFormChange('password', e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:ring-2 focus:ring-primary-600 outline-none"
                                    placeholder="Min. 6 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={onTogglePassword}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={userForm.isAdmin}
                            onChange={(e) => onFormChange('isAdmin', e.target.checked)}
                            className="w-5 h-5 rounded text-primary-600 focus:ring-primary-600 accent-primary-600"
                        />
                        <label htmlFor="isAdmin" className="font-bold text-[var(--text-main)] select-none cursor-pointer">
                            ¿Es Administrador?
                        </label>
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
                        className="px-6 py-3 rounded-xl font-bold bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserFormModal;
