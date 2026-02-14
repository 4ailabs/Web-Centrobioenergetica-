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
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${active
                ? 'bg-primary text-white'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                } ${mobile ? 'mobile-nav-item' : ''}`}
        >
            <div className={`transition-colors duration-200 ${active ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                {icon}
            </div>
            <span>{label}</span>
        </a>
    );
};

export default NavItem;
