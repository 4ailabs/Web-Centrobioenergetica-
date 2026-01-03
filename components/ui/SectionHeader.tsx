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
                <span className="text-primary-600 font-black uppercase tracking-widest text-[10px] mb-4 block">
                    {tag}
                </span>
            )}
            <h2 className={`text-3xl lg:text-5xl font-black mb-6 uppercase tracking-tight leading-none text-[var(--text-main)]`}>
                {title} {titleAccent && <span className="text-primary-600">{titleAccent}</span>}
            </h2>
            {description && (
                <p className={`text-[var(--text-muted)] text-base lg:text-lg leading-relaxed font-medium ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
