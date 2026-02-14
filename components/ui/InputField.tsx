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
            <label htmlFor={id} className="block text-xs font-medium text-neutral-600 uppercase tracking-normal mb-2 px-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors duration-200">
                    {icon}
                </div>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full pl-12 pr-12 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200"
                    placeholder={placeholder}
                />
                {rightElement && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {rightElement}
                    </div>
                )}
            </div>
            {helperText && (
                <p className="mt-1.5 text-xs font-medium text-neutral-500 px-1">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default InputField;
