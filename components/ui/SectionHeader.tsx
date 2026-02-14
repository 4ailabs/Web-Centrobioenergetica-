import React from 'react';

interface SectionHeaderProps {
    tag?: string;
    title: string;
    titleAccent?: string;
    description?: string;
    center?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    tag,
    title,
    titleAccent,
    description,
    center = false
}) => {
    return (
        <div className={`mb-12 ${center ? 'text-center' : ''}`}>
            {tag && (
                <span className="text-primary font-medium text-xs mb-4 block">
                    {tag}
                </span>
            )}
            <h2 className={`text-3xl lg:text-5xl font-semibold mb-6 tracking-tight leading-tight text-neutral-900 dark:text-neutral-50`}>
                {title} {titleAccent && <span className="text-primary">{titleAccent}</span>}
            </h2>
            {description && (
                <p className={`text-neutral-600 dark:text-neutral-300 text-base lg:text-lg leading-relaxed font-normal ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
