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

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowMenu(false);
    };

    return (
        <div className={`mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 ${mobile ? 'px-4' : ''}`}>
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30 transition-colors"
                >
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-medium text-sm shrink-0">
                        {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col overflow-hidden flex-1 text-left">
                        <span className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 truncate">{user.name || 'Usuario'}</span>
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">{user.email}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ${showMenu ? 'rotate-180' : ''}`} />
                </button>

                {showMenu && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-md overflow-hidden z-50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-red-600 dark:text-red-400 text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Cerrar Sesión</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
