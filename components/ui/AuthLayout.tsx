import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    error?: string;
    success?: string;
    footerText: string;
    footerLinkText: string;
    footerLinkTo: string;
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    title,
    subtitle,
    error,
    success,
    footerText,
    footerLinkText,
    footerLinkTo,
    children
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900">
            <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 border border-neutral-200 dark:border-neutral-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{title}</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm font-normal">{subtitle}</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-200">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-200">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{success}</span>
                    </div>
                )}

                {children}

                <div className="mt-8 text-center border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                        {footerText}{' '}
                        <Link to={footerLinkTo} className="text-primary font-medium hover:text-primary-dark transition-colors">
                            {footerLinkText}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
