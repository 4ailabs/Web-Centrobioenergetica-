import React from 'react';

interface StatsCardsProps {
    totalUsers: number;
    activeSubscriptions: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalUsers, activeSubscriptions }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[var(--panel-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                <div className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">
                    Total Usuarios
                </div>
                <div className="text-3xl font-black text-[var(--text-main)]">{totalUsers}</div>
            </div>

            <div className="bg-[var(--panel-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                <div className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">
                    Suscripciones Activas
                </div>
                <div className="text-3xl font-black text-green-600">{activeSubscriptions}</div>
            </div>

            <div className="bg-[var(--panel-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                <div className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">
                    Tu Rol
                </div>
                <div className="text-xl font-black text-indigo-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Administrador
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
