import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Search, Plus, CheckCircle2, XCircle, ChevronLeft, ChevronRight, KeyRound, ChevronDown, Clock, UserCheck } from 'lucide-react';
import UserTable from '../components/admin/UserTable';
import GrantAccessModal from '../components/admin/GrantAccessModal';
import CoursesView from '../components/admin/CoursesView';
import CourseManagementModal from '../components/admin/CourseManagementModal';
import UserFormModal from '../components/admin/UserFormModal';
import { MOCK_DATA } from '../data/mockData';
import { ACTIVE_COURSE_IDS } from '../data/catalog';
import { generarContrasena } from '../lib/password';

const LOTE_USUARIOS = 25;

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

// Reset Password Modal
const ResetPasswordModal: React.FC<{
    user: any;
    onSave: (password: string) => Promise<void>;
    onClose: () => void;
}> = ({ user, onSave, onClose }) => {
    // La contraseña se genera: nadie tiene que inventarla ni teclearla dos
    // veces en un móvil. Sale legible y con el mensaje listo para enviar.
    const [password] = useState(() => generarContrasena());
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [listo, setListo] = useState(false);
    const [copiado, setCopiado] = useState(false);

    const mensaje = [
        `Hola ${(user?.name || '').split(' ')[0] || ''}, restablecí tu contraseña.`,
        '',
        'Entra en institutocentrobioenergetica.com',
        `Correo: ${user?.email}`,
        `Contraseña: ${password}`,
        '',
        'Puedes cambiarla cuando entres.',
    ].join('\n');

    const handleSubmit = async () => {
        setSaving(true);
        try {
            await onSave(password);
            setListo(true);
        } catch (e: any) {
            setError(e.message || 'Error al cambiar contraseña');
        } finally {
            setSaving(false);
        }
    };

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(mensaje);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2500);
        } catch {
            setError('No se pudo copiar. Selecciona el texto y cópialo a mano.');
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
            <div role="dialog" aria-modal="true" className="relative bg-white dark:bg-neutral-800 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                        <KeyRound className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
                            {listo ? 'Contraseña restablecida' : 'Restablecer contraseña'}
                        </h2>
                        <p className="text-xs text-neutral-500 truncate">{user?.name || user?.email}</p>
                    </div>
                </div>

                {!listo ? (
                    <>
                        <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                            Se asignará esta contraseña nueva:
                        </p>
                        <div className="px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 mb-4">
                            <span className="font-mono text-[16px] text-neutral-800 dark:text-neutral-100">{password}</span>
                        </div>
                        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
                        <div className="flex gap-2">
                            <button onClick={onClose} className="flex-1 px-4 py-3 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 transition-colors min-h-[44px]">
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex-1 px-4 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50 min-h-[44px]"
                            >
                                {saving ? 'Guardando…' : 'Restablecer'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 font-sans mb-3">
{mensaje}
                        </pre>
                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-salvia-500 hover:bg-salvia-600 text-white text-sm font-semibold transition-colors min-h-[44px]"
                            >
                                Abrir WhatsApp
                            </a>
                            <button onClick={copiar} className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition-colors min-h-[44px]">
                                {copiado ? 'Copiado' : 'Copiar mensaje'}
                            </button>
                        </div>
                        <button onClick={onClose} className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors min-h-[44px]">
                            Terminar
                        </button>
                    </>
                )}
            </div>
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
        adminResetPassword,
        approveUser,
        enrollInCourses,
        user: currentUser,
    } = useAuth();

    // Flujo "Dar acceso": busca o crea la persona, la inscribe y entrega el
    // mensaje de WhatsApp listo para enviar.
    const [isGrantOpen, setIsGrantOpen] = useState(false);
    const [grantEmail, setGrantEmail] = useState<string | undefined>(undefined);
    const [grantCurso, setGrantCurso] = useState<string | undefined>(undefined);
    const [seccion, setSeccion] = useState<'alumnos' | 'cursos'>('alumnos');

    const abrirDarAcceso = (email?: string, cursoId?: string) => {
        setGrantEmail(email);
        setGrantCurso(cursoId);
        setIsGrantOpen(true);
    };

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCourses, setFilterCourses] = useState<'all' | 'with' | 'without'>('all');
    const [filterCourseId, setFilterCourseId] = useState<string>('all');
    const [visibles, setVisibles] = useState(LOTE_USUARIOS);
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
    const [userForm, setUserForm] = useState({ name: '', email: '', password: '', isAdmin: false });

    // Reset Password Modal
    const [resetPasswordUser, setResetPasswordUser] = useState<any>(null);

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

    useEffect(() => { fetchUsers(); }, []);

    // Reset page when filters change
    useEffect(() => { setVisibles(LOTE_USUARIOS); }, [searchTerm, filterCourses, filterCourseId]);

    // --- Aprobación de acceso ---
    // Un usuario recién registrado queda pendiente y NO puede iniciar sesión
    // hasta que se apruebe aquí. Solo cambia el campo `approved`.
    const handleToggleApproval = async (user: any) => {
        const nuevoEstado = !user.approved;
        try {
            await approveUser(user.id, nuevoEstado);
            await fetchUsers();
            showToast(
                nuevoEstado
                    ? `${user.name || user.email} ya puede iniciar sesión`
                    : `Acceso revocado a ${user.name || user.email}`
            );
        } catch (error) {
            showToast('Error al actualizar la aprobación', 'error');
        }
    };

    // --- Subscription Handlers ---
    const handleToggleSubscription = async (userId: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await updateUserSubscription(userId, newStatus);
            await fetchUsers();
            showToast(`Suscripción ${newStatus === 'active' ? 'activada' : 'desactivada'} correctamente`);
        } catch (error) {
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
            showToast('Error al actualizar los cursos', 'error');
        }
    };

    // --- User Management Handlers ---
    const handleOpenCreateUser = () => {
        setEditingUser(null);
        setUserForm({ name: '', email: '', password: '', isAdmin: false });
        setIsUserModalOpen(true);
    };

    const handleOpenEditUser = (user: any) => {
        setEditingUser(user);
        setUserForm({ name: user.name, email: user.email, password: '', isAdmin: user.isAdmin });
        setIsUserModalOpen(true);
    };

    const handleSaveUser = async () => {
        try {
            if (editingUser) {
                await adminUpdateUser(editingUser.id, { name: userForm.name, email: userForm.email, isAdmin: userForm.isAdmin });
            } else {
                if (!userForm.password) { showToast('La contraseña es obligatoria para nuevos usuarios', 'error'); return; }
                await adminCreateUser(userForm);
            }
            setIsUserModalOpen(false);
            setEditingUser(null);
            await fetchUsers();
            showToast(editingUser ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
        } catch (error: any) {
            showToast(error.message || 'Error al guardar usuario', 'error');
        }
    };

    const handleDeleteUser = async (user: any) => {
        if (user.isAdmin) { showToast('No se puede eliminar una cuenta de administrador', 'error'); return; }
        if (user.id === currentUser?.id) { showToast('No puedes eliminar tu propia cuenta', 'error'); return; }
        const name = user.name || user.email;
        if (!window.confirm(`¿Eliminar a "${name}"?\n\nEsta acción no se puede deshacer.`)) return;
        if (!window.confirm(`CONFIRMAR: ¿Realmente deseas eliminar permanentemente a "${name}"?`)) return;
        try {
            await adminDeleteUser(user.id);
            await fetchUsers();
            showToast(`"${name}" eliminado correctamente`);
        } catch (error: any) {
            showToast(error.message || 'Error al eliminar usuario', 'error');
        }
    };

    const handleResetPassword = async (password: string) => {
        if (!resetPasswordUser) return;
        await adminResetPassword(resetPasswordUser.id, password);
        showToast(`Contraseña de ${resetPasswordUser.name || resetPasswordUser.email} actualizada`);
    };

    const handleFormChange = (field: string, value: string | boolean) => {
        setUserForm((prev) => ({ ...prev, [field]: value }));
    };

    // --- Filtering & Pagination ---
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourses =
            filterCourses === 'all' ||
            (filterCourses === 'with' && user.enrolledCourses?.length > 0) ||
            (filterCourses === 'without' && (!user.enrolledCourses || user.enrolledCourses.length === 0));
        const matchesCourseId =
            filterCourseId === 'all' ||
            (user.enrolledCourses || []).includes(filterCourseId);
        return matchesSearch && matchesCourses && matchesCourseId;
    });

    const usuariosMostrados = filteredUsers.slice(0, visibles);
    const quedanPorMostrar = filteredUsers.length - usuariosMostrados.length;

    // Cuentas registradas que aún no pueden iniciar sesión
    const pendingUsers = users.filter((u) => u.approved === false);

    const filterBtnClass = (active: boolean) =>
        `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            active
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
        }`;

    return (
        <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 px-6 pb-20 relative max-w-6xl mx-auto">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <header className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
                            Panel de Administración
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-normal">{users.length} personas · {MOCK_DATA.courses.filter(c => ACTIVE_COURSE_IDS.includes(c.id)).length} cursos</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => abrirDarAcceso()}
                        className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors min-h-[44px]"
                    >
                        <UserCheck className="w-5 h-5" /> Dar acceso
                    </button>
                    <button
                        onClick={handleOpenCreateUser}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 transition-colors min-h-[44px]"
                    >
                        <Plus className="w-5 h-5" /> Nuevo usuario
                    </button>
                </div>
            </header>

            {/* Dos secciones: la persona y el curso, las dos preguntas del negocio */}
            <div className="flex gap-1 mb-6 border-b border-neutral-200 dark:border-neutral-700">
                {([['alumnos', 'Alumnos'], ['cursos', 'Cursos']] as const).map(([clave, etiqueta]) => (
                    <button
                        key={clave}
                        onClick={() => setSeccion(clave)}
                        aria-current={seccion === clave}
                        className={`px-4 py-2.5 text-[13.5px] -mb-px border-b-2 transition-colors ${
                            seccion === clave
                                ? 'border-primary-600 text-neutral-800 dark:text-neutral-100 font-semibold'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                        }`}
                    >
                        {etiqueta}
                    </button>
                ))}
            </div>

            {seccion === 'cursos' ? (
                <CoursesView
                    usuarios={users}
                    loading={loading}
                    onInscribir={(cursoId) => abrirDarAcceso(undefined, cursoId)}
                />
            ) : (
            <>



            {/* Aviso de cuentas pendientes: sin aprobación no pueden iniciar sesión */}
            {pendingUsers.length > 0 && (
                <div className="mb-6 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4">
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                                {pendingUsers.length === 1
                                    ? '1 persona espera aprobación para entrar'
                                    : `${pendingUsers.length} personas esperan aprobación para entrar`}
                            </p>
                            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                                Se registraron pero no pueden iniciar sesión hasta que apruebes su acceso.
                            </p>
                            <div className="mt-3 space-y-2">
                                {pendingUsers.map((u) => (
                                    <div key={u.id} className="flex items-center gap-3 flex-wrap bg-white dark:bg-neutral-800 rounded-lg px-3 py-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 truncate">
                                                {u.name || 'Sin nombre'}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{u.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => handleToggleApproval(u)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-salvia-500 text-white hover:bg-salvia-600 transition-colors"
                                            >
                                                <UserCheck className="w-3.5 h-3.5" /> Aprobar
                                            </button>
                                            <button
                                                onClick={() => abrirDarAcceso(u.email)}
                                                className="px-3 py-1.5 rounded-lg text-[12px] font-medium border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 transition-colors"
                                            >
                                                Dar curso
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search + Filters */}
            <div className="mb-6 space-y-3">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    <button className={filterBtnClass(filterCourses === 'all')} onClick={() => setFilterCourses('all')}>Todos</button>
                    <button className={filterBtnClass(filterCourses === 'without')} onClick={() => setFilterCourses('without')}>Sin cursos</button>

                    <div className="relative">
                        <select
                            value={filterCourseId}
                            onChange={e => setFilterCourseId(e.target.value)}
                            aria-label="Filtrar por curso"
                            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 focus:outline-none focus:border-primary-600 transition-colors cursor-pointer min-h-[34px]"
                        >
                            <option value="all">Por curso…</option>
                            {MOCK_DATA.courses
                                .filter(c => ACTIVE_COURSE_IDS.includes(c.id))
                                .map(course => (
                                    <option key={course.id} value={course.id.toString()}>
                                        {course.title.split('—')[0].trim()}
                                    </option>
                                ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                    </div>
                </div>

                {/* Al filtrar por un curso, la cabecera responde la pregunta del negocio */}
                {filterCourseId !== 'all' && (
                    <p className="text-[13px] text-neutral-600 dark:text-neutral-300">
                        <strong className="font-semibold">
                            {MOCK_DATA.courses.find(c => c.id.toString() === filterCourseId)?.title.split('—')[0].trim()}
                        </strong>
                        {' — '}{filteredUsers.length} {filteredUsers.length === 1 ? 'alumno inscrito' : 'alumnos inscritos'}
                    </p>
                )}
                {filterCourseId === 'all' && filteredUsers.length !== users.length && (
                    <p className="text-xs text-neutral-400">
                        {filteredUsers.length} de {users.length} personas
                    </p>
                )}
            </div>

            <UserTable
                users={usuariosMostrados}
                loading={loading}
                currentUserId={currentUser?.id}
                onToggleApproval={handleToggleApproval}
                onManageCourses={handleOpenCourseModal}
                onEditUser={handleOpenEditUser}
                onDeleteUser={handleDeleteUser}
                onResetPassword={(user) => setResetPasswordUser(user)}
            />

            {/* La búsqueda y los filtros son la forma de encontrar a alguien;
                el lote solo evita renderizar cientos de tarjetas de golpe. */}
            {!loading && quedanPorMostrar > 0 && (
                <div className="mt-5 text-center">
                    <button
                        onClick={() => setVisibles((v) => v + LOTE_USUARIOS)}
                        className="px-5 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-[13px] font-medium text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 transition-colors min-h-[40px]"
                    >
                        Mostrar {Math.min(LOTE_USUARIOS, quedanPorMostrar)} más
                        <span className="text-neutral-400"> · quedan {quedanPorMostrar}</span>
                    </button>
                </div>
            )}

            </>
            )}

            <GrantAccessModal
                isOpen={isGrantOpen}
                onClose={() => { setIsGrantOpen(false); setGrantEmail(undefined); setGrantCurso(undefined); }}
                usuarios={users}
                emailInicial={grantEmail}
                cursoInicial={grantCurso}
                onEnroll={async (userId, courseIds) => {
                    await enrollInCourses(userId, courseIds);
                    await fetchUsers();
                }}
                onCreateUser={async (datos) => { await adminCreateUser(datos); }}
                onRefresh={async () => {
                    const data = await getAllUsers();
                    setUsers(data);
                    return data as any[];
                }}
            />

            <CourseManagementModal
                isOpen={isCourseModalOpen}
                user={selectedUserForCourses}
                selectedCourseIds={selectedCourseIds}
                onToggleCourse={handleCourseToggle}
                onSave={handleSaveCourses}
                onClose={() => setIsCourseModalOpen(false)}
            />

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

            {resetPasswordUser && (
                <ResetPasswordModal
                    user={resetPasswordUser}
                    onSave={handleResetPassword}
                    onClose={() => setResetPasswordUser(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
