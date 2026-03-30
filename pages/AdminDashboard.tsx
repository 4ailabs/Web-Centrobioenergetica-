import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Search, Plus, CheckCircle2, XCircle } from 'lucide-react';
import StatsCards from '../components/admin/StatsCards';
import UserTable from '../components/admin/UserTable';
import CourseManagementModal from '../components/admin/CourseManagementModal';
import UserFormModal from '../components/admin/UserFormModal';

// Toast notification
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-slide-in-up ${
            type === 'success'
                ? 'bg-white dark:bg-neutral-800 border-salvia-400/30 text-salvia-600 dark:text-salvia-400'
                : 'bg-white dark:bg-neutral-800 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400'
        }`}>
            {type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const {
        getAllUsers,
        updateUserSubscription,
        updateUserCourses,
        adminCreateUser,
        adminUpdateUser,
        adminDeleteUser,
        user: currentUser,
    } = useAuth();

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Course Management Modal State
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [selectedUserForCourses, setSelectedUserForCourses] = useState<any>(null);
    const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

    // User Management (Create/Edit) Modal State
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
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
            showToast(`Suscripción ${newStatus === 'active' ? 'activada' : 'desactivada'} correctamente`);
        } catch (error) {
            console.error('Error updating subscription:', error);
            showToast('Error al actualizar la suscripción', 'error');
        }
    };

    // --- Course Management Handlers ---
    const handleOpenCourseModal = (user: any) => {
        setSelectedUserForCourses(user);
        setSelectedCourseIds(user.enrolledCourses || []);
        setIsCourseModalOpen(true);
    };

    const handleCourseToggle = (courseId: string) => {
        setSelectedCourseIds((prev) =>
            prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
        );
    };

    const handleSaveCourses = async () => {
        if (!selectedUserForCourses) return;
        try {
            await updateUserCourses(selectedUserForCourses.id, selectedCourseIds);
            setIsCourseModalOpen(false);
            setSelectedUserForCourses(null);
            await fetchUsers();
            showToast('Cursos actualizados correctamente');
        } catch (error) {
            console.error('Error updating courses:', error);
            showToast('Error al actualizar los cursos', 'error');
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
            password: '',
            isAdmin: user.isAdmin,
        });
        setIsUserModalOpen(true);
    };

    const handleSaveUser = async () => {
        try {
            if (editingUser) {
                await adminUpdateUser(editingUser.id, {
                    name: userForm.name,
                    email: userForm.email,
                    isAdmin: userForm.isAdmin,
                });
            } else {
                if (!userForm.password) {
                    showToast('La contraseña es obligatoria para nuevos usuarios', 'error');
                    return;
                }
                await adminCreateUser(userForm);
            }
            setIsUserModalOpen(false);
            setEditingUser(null);
            await fetchUsers();
            showToast(editingUser ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
        } catch (error: any) {
            console.error('Error saving user:', error);
            showToast(error.message || 'Error al guardar usuario', 'error');
        }
    };

    const handleDeleteUser = async (user: any) => {
        if (
            !window.confirm(
                `¿Estás seguro de que deseas eliminar permanentemente a "${user.name}"? Esta acción no se puede deshacer.`
            )
        ) {
            return;
        }

        try {
            await adminDeleteUser(user.id);
            await fetchUsers();
            showToast('Usuario eliminado correctamente');
        } catch (error: any) {
            console.error('Error deleting user:', error);
            showToast(error.message || 'Error al eliminar usuario', 'error');
        }
    };

    const handleFormChange = (field: string, value: string | boolean) => {
        setUserForm((prev) => ({ ...prev, [field]: value }));
    };

    const filteredUsers = users.filter(
        (user) =>
            (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeSubscriptions = users.filter((u) => u.subscriptionStatus === 'active').length;

    return (
        <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 px-6 pb-20 relative max-w-6xl mx-auto">
            {/* Toast notification */}
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}

            <header className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
                            Panel de Administración
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-normal">Gestión de usuarios y suscripciones</p>
                    </div>
                </div>
                <button
                    onClick={handleOpenCreateUser}
                    className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors min-h-[44px]"
                >
                    <Plus className="w-5 h-5" /> Nuevo Usuario
                </button>
            </header>

            {/* Stats */}
            <StatsCards totalUsers={users.length} activeSubscriptions={activeSubscriptions} />

            {/* Search */}
            <div className="mb-8 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Buscar usuario por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all"
                />
            </div>

            {/* Users Table */}
            <UserTable
                users={filteredUsers}
                loading={loading}
                currentUserId={currentUser?.id}
                onToggleSubscription={handleToggleSubscription}
                onManageCourses={handleOpenCourseModal}
                onEditUser={handleOpenEditUser}
                onDeleteUser={handleDeleteUser}
            />

            {/* Course Management Modal */}
            <CourseManagementModal
                isOpen={isCourseModalOpen}
                user={selectedUserForCourses}
                selectedCourseIds={selectedCourseIds}
                onToggleCourse={handleCourseToggle}
                onSave={handleSaveCourses}
                onClose={() => setIsCourseModalOpen(false)}
            />

            {/* User Management Modal (Create/Edit) */}
            <UserFormModal
                isOpen={isUserModalOpen}
                editingUser={editingUser}
                userForm={userForm}
                showPassword={showPassword}
                onFormChange={handleFormChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onSave={handleSaveUser}
                onClose={() => setIsUserModalOpen(false)}
            />
        </div>
    );
};

export default AdminDashboard;
