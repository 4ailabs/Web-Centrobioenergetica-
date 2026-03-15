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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-[14px] ${active
                ? 'bg-neutral-200/70 dark:bg-neutral-700/50 text-neutral-900 dark:text-neutral-50 font-medium'
                : 'text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30'
                } ${mobile ? 'mobile-nav-item' : ''}`}
        >
            <div className={`shrink-0 ${active ? 'text-neutral-900 dark:text-neutral-50' : 'text-neutral-500 dark:text-neutral-500'}`}>
                {icon}
            </div>
            <span>{label}</span>
        </a>
    );
};

export default NavItem;
