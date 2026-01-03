import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, CheckCircle, XCircle, Search, BookOpen, X, Plus, Pencil, Save, Trash2 } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const AdminDashboard: React.FC = () => {
    const { getAllUsers, updateUserSubscription, updateUserCourses, adminCreateUser, adminUpdateUser, user: currentUser } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Course Management Modal State
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [selectedUserForCourses, setSelectedUserForCourses] = useState<any>(null);
    const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

    // User Management (Create/Edit) Modal State
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- Subscription Handlers ---
    const handleToggleSubscription = async (userId: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await updateUserSubscription(userId, newStatus);
            await fetchUsers();
        } catch (error) {
            console.error('Error updating subscription:', error);
            alert('Error al actualizar la suscripción');
        }
    };

    // --- Course Management Handlers ---
    const handleOpenCourseModal = (user: any) => {
        setSelectedUserForCourses(user);
        setSelectedCourseIds(user.enrolledCourses || []);
        setIsCourseModalOpen(true);
    };

    const handleCourseToggle = (courseId: string) => {
        setSelectedCourseIds(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleSaveCourses = async () => {
        if (!selectedUserForCourses) return;
        try {
            await updateUserCourses(selectedUserForCourses.id, selectedCourseIds);
            setIsCourseModalOpen(false);
            setSelectedUserForCourses(null);
            await fetchUsers();
        } catch (error) {
            console.error('Error updating courses:', error);
            alert('Error al actualizar los cursos');
        }
    };

    // --- User Management Handlers (Create/Edit) ---
    const handleOpenCreateUser = () => {
        setEditingUser(null);
        setUserForm({ name: '', email: '', password: '', isAdmin: false });
        setIsUserModalOpen(true);
    };

    const handleOpenEditUser = (user: any) => {
        setEditingUser(user);
        setUserForm({
            name: user.name,
            email: user.email,
            password: '', // We don't show password
            isAdmin: user.isAdmin
        });
        setIsUserModalOpen(true);
    };

    const handleSaveUser = async () => {
        try {
            if (editingUser) {
                // Update existing user
                await adminUpdateUser(editingUser.id, {
                    name: userForm.name,
                    email: userForm.email,
                    isAdmin: userForm.isAdmin
                    // Not updating password here for simplicity, but could add if password field is filled
                });
            } else {
                // Create new user
                if (!userForm.password) {
                    alert('La contraseña es obligatoria para nuevos usuarios');
                    return;
                }
                await adminCreateUser(userForm);
            }
            setIsUserModalOpen(false);
            setEditingUser(null);
            await fetchUsers();
        } catch (error: any) {
            console.error('Error saving user:', error);
            alert(error.message || 'Error al guardar usuario');
        }
    };


    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeSubscriptions = users.filter(u => u.subscriptionStatus === 'active').length;

    return (
        <div className="w-full lg:mt-20 mt-16 px-4 pb-20 relative">
            <header className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-black text-[var(--text-main)] uppercase tracking-tight">Panel de Administración</h1>
                        <p className="text-[var(--text-muted)] font-medium">Gestión de usuarios y suscripciones</p>
                    </div>
                </div>
                <button
                    onClick={handleOpenCreateUser}
                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-5 h-5" /> Nuevo Usuario
                </button>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[var(--panel-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                    <div className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">Total Usuarios</div>
                    <div className="text-3xl font-black text-[var(--text-main)]">{users.length}</div>
                </div>
                <div className="bg-[var(--panel-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                    <div className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">Suscripciones Activas</div>
                    <div className="text-3xl font-black text-green-600">{activeSubscriptions}</div>
                </div>
                <div className="bg-[var(--panel-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                    <div className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">Tu Rol</div>
                    <div className="text-xl font-black text-indigo-600 flex items-center gap-2">
                        <Shield className="w-5 h-5" /> Administrador
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-8 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                    type="text"
                    placeholder="Buscar usuario por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                />
            </div>

            {/* Users Table */}
            <div className="bg-[var(--panel-bg)] rounded-[2.5rem] border border-[var(--border-color)] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Usuario</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Estado Suscripción</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">Cargando usuarios...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">No se encontraron usuarios</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-[var(--bg-main)] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="font-bold text-[var(--text-main)]">{user.name}</div>
                                                {user.isAdmin && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Admin</span>}
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
                                                    onClick={() => handleToggleSubscription(user.id, user.subscriptionStatus || 'inactive')}
                                                    disabled={user.id === currentUser?.id}
                                                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${user.id === currentUser?.id
                                                            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                                                            : user.subscriptionStatus === 'active'
                                                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40'
                                                                : 'bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/40'
                                                        }`}
                                                    title={user.subscriptionStatus === 'active' ? 'Cancelar Suscripción' : 'Activar Suscripción'}
                                                >
                                                    {user.subscriptionStatus === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                </button>

                                                <button
                                                    onClick={() => handleOpenCourseModal(user)}
                                                    className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all flex items-center gap-1"
                                                    title="Gestionar Cursos"
                                                >
                                                    <BookOpen className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleOpenEditUser(user)}
                                                    className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center gap-1"
                                                    title="Editar Usuario"
                                                >
                                                    <Pencil className="w-4 h-4" />
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

            {/* Course Management Modal */}
            {isCourseModalOpen && selectedUserForCourses && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[var(--panel-bg)] w-full max-w-2xl rounded-[2rem] shadow-2xl border border-[var(--border-color)] overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                            <div>
                                <h2 className="text-xl font-black text-[var(--text-main)]">Gestionar Acceso a Cursos</h2>
                                <p className="text-sm text-[var(--text-muted)]">Usuario: <span className="font-bold text-indigo-600">{selectedUserForCourses.name}</span></p>
                            </div>
                            <button
                                onClick={() => setIsCourseModalOpen(false)}
                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-[var(--text-muted)]"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {MOCK_DATA.courses.map(course => {
                                    const isSelected = selectedCourseIds.includes(course.id.toString());
                                    return (
                                        <div
                                            key={course.id}
                                            onClick={() => handleCourseToggle(course.id.toString())}
                                            className={`
                                                cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3
                                                ${isSelected
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-sm'
                                                    : 'bg-[var(--bg-main)] border-[var(--border-color)] hover:border-indigo-300 dark:hover:border-indigo-700'
                                                }
                                            `}
                                        >
                                            <div className={`
                                                w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5
                                                ${isSelected
                                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                                    : 'border-zinc-300 dark:border-zinc-600'
                                                }
                                            `}>
                                                {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-[var(--text-main)]'}`}>
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                                                    {course.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)] flex justify-end gap-3">
                            <button
                                onClick={() => setIsCourseModalOpen(false)}
                                className="px-6 py-3 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveCourses}
                                className="px-6 py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 transition-all"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Management Modal (Create/Edit) */}
            {isUserModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[var(--panel-bg)] w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-[var(--border-color)] overflow-hidden">
                        <div className="p-8 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                            <h2 className="text-2xl font-black text-[var(--text-main)]">
                                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                            </h2>
                            <button
                                onClick={() => setIsUserModalOpen(false)}
                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-[var(--text-muted)]"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={userForm.name}
                                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-600 outline-none"
                                    placeholder="Ej. Juan Pérez"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={userForm.email}
                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-600 outline-none"
                                    placeholder="Ej. juan@ejemplo.com"
                                />
                            </div>

                            {!editingUser && (
                                <div>
                                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Contraseña</label>
                                    <input
                                        type="password"
                                        value={userForm.password}
                                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-600 outline-none"
                                        placeholder="Min. 6 caracteres"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    checked={userForm.isAdmin}
                                    onChange={(e) => setUserForm({ ...userForm, isAdmin: e.target.checked })}
                                    className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="isAdmin" className="font-bold text-[var(--text-main)] select-none cursor-pointer">
                                    ¿Es Administrador?
                                </label>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)] flex justify-end gap-3">
                            <button
                                onClick={() => setIsUserModalOpen(false)}
                                className="px-6 py-3 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveUser}
                                className="px-6 py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <Save className="w-5 h-5" /> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
