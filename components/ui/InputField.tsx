import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    icon: React.ReactNode;
    rightElement?: React.ReactNode;
    helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    icon,
    rightElement,
    helperText
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-black text-primary-600 uppercase tracking-widest mb-2 px-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-primary-600 transition-colors">
                    {icon}
                </div>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full pl-12 pr-12 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all"
                    placeholder={placeholder}
                />
                {rightElement && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {rightElement}
                    </div>
                )}
            </div>
            {helperText && (
                <p className="mt-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-1">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default InputField;
