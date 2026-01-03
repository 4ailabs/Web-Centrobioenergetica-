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
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-main)]">
            <div className="w-full max-w-md bg-[var(--panel-bg)] rounded-3xl shadow-2xl p-8 border border-[var(--border-color)]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-[var(--text-main)] mb-2 uppercase tracking-tight">{title}</h1>
                    <p className="text-[var(--text-muted)]">{subtitle}</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{success}</span>
                    </div>
                )}

                {children}

                <div className="mt-8 text-center border-t border-[var(--border-color)] pt-8">
                    <p className="text-sm text-[var(--text-muted)] font-medium">
                        {footerText}{' '}
                        <Link to={footerLinkTo} className="text-primary-600 font-bold hover:underline transition-all">
                            {footerLinkText}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
