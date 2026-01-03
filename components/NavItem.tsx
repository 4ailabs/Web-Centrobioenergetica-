import React from 'react';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
    mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, mobile = false }) => {
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${active
                ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold shadow-lg shadow-emerald-500/25'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 font-medium'
                } ${mobile ? 'mobile-nav-item' : ''}`}
        >
            <div className={`relative z-10 transition-all duration-200 ${active ? 'text-white' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
                {icon}
            </div>
            <span className="relative z-10 text-[13px] tracking-wide">{label}</span>

            {/* Hover glow effect */}
            {!active && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/5 group-hover:to-teal-600/5 rounded-xl transition-all duration-300" />
            )}
        </a>
    );
};

export default NavItem;
