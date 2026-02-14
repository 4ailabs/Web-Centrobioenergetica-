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
        <header className="px-6 py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                            {icon}
                        </div>
                        <span className="text-primary-600 font-medium text-xs">{tag}</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight max-w-3xl">
                        {title} {titleAccent && <span className="text-primary-600">{titleAccent}</span>}
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed font-normal">
                        {description}
                    </p>
                </div>
                {children}
            </div>
        </header>
    );
};

export default PageHeader;
