import React from 'react';
import { Users, BookOpen, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
    totalUsers: number;
    activeSubscriptions: number;
    usersWithCourses?: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalUsers, activeSubscriptions, usersWithCourses = 0 }) => {
    const stats = [
        { label: 'Usuarios registrados', value: totalUsers, icon: Users, color: 'text-neutral-800 dark:text-neutral-100' },
        { label: 'Con suscripción activa', value: activeSubscriptions, icon: CheckCircle, color: 'text-salvia-600 dark:text-salvia-400' },
        { label: 'Con cursos asignados', value: usersWithCourses, icon: BookOpen, color: 'text-blue-600 dark:text-blue-400' },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-4 h-4 text-neutral-400" />
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">{stat.label}</span>
                    </div>
                    <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
