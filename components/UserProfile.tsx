import React, { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface User {
    name?: string;
    email: string;
    totalXP?: number;
}

interface UserProfileProps {
    user: User | null;
    mobile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, mobile = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const xp = user.totalXP || 0;
    const level = Math.floor(xp / 500) + 1;
    const nextLevelXP = level * 500;
    const currentLevelXP = (level - 1) * 500;
    const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowMenu(false);
    };

    return (
        <div className={`mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-800/30 ${mobile ? 'px-6' : ''}`}>
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-full flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100/50 dark:border-emerald-800/20 group hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                >
                    <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                        {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col overflow-hidden flex-1 text-left">
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 tracking-tight line-clamp-1">{user.name || 'Usuario'}</span>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Nivel {level}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-red-600 dark:text-red-400"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Cerrar Sesión</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-2 px-1">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Energía {xp} XP</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)] rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
