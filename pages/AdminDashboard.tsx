import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Search, Plus } from 'lucide-react';
import StatsCards from '../components/admin/StatsCards';
import UserTable from '../components/admin/UserTable';
import CourseManagementModal from '../components/admin/CourseManagementModal';
import UserFormModal from '../components/admin/UserFormModal';

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
        } catch (error: any) {
            console.error('Error deleting user:', error);
            alert(error.message || 'Error al eliminar usuario');
        }
    };

    const handleFormChange = (field: string, value: string | boolean) => {
        setUserForm((prev) => ({ ...prev, [field]: value }));
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeSubscriptions = users.filter((u) => u.subscriptionStatus === 'active').length;

    return (
        <div className="w-full lg:mt-20 mt-16 px-4 pb-20 relative">
            <header className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-black text-[var(--text-main)] uppercase tracking-tight">
                            Panel de Administración
                        </h1>
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
            <StatsCards totalUsers={users.length} activeSubscriptions={activeSubscriptions} />

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
