import React from 'react';

interface PageHeaderProps {
    icon: React.ReactNode;
    tag: string;
    title: string;
    titleAccent?: string;
    description: string;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    icon,
    tag,
    title,
    titleAccent,
    description,
    children
}) => {
    return (
        <header className="px-4 relative overflow-hidden py-12">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
                            {icon}
                        </div>
                        <span className="text-primary-600 font-black uppercase tracking-widest text-[10px]">{tag}</span>
                    </div>
                    <h1 className="text-3xl lg:text-6xl font-black text-[var(--text-main)] tracking-tight mb-4 uppercase leading-[0.9]">
                        {title} {titleAccent && <span className="text-primary-600">{titleAccent}</span>}
                    </h1>
                    <p className="text-base lg:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
                {children}
            </div>
        </header>
    );
};

export default PageHeader;
