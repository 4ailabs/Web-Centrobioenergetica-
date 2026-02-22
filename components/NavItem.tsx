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
            className={`flex items-center gap-3 px-3 py-2.5 border-l-2 rounded-r transition-all duration-200 text-sm ${active
                ? 'border-primary-600 bg-primary-600/8 text-primary-600 dark:bg-primary-600/15 dark:text-primary-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200'
                } ${mobile ? 'mobile-nav-item' : ''}`}
        >
            <div className={`transition-colors duration-200 shrink-0 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-400 dark:text-neutral-500'}`}>
                {icon}
            </div>
            <span className={active ? 'font-medium' : 'font-normal'}>{label}</span>
        </a>
    );
};

export default NavItem;
