import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/ui/AuthLayout';
import InputField from '../components/ui/InputField';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Bienvenido"
      subtitle="Inicia sesión en tu cuenta"
      error={error}
      footerText="¿No tienes una cuenta?"
      footerLinkText="Regístrate aquí"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<Mail className="w-5 h-5" />}
          placeholder="tu@email.com"
        />

        <InputField
          id="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          icon={<Lock className="w-5 h-5" />}
          placeholder="••••••••"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[var(--text-muted)] hover:text-primary-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--text-main)] text-[var(--bg-main)] py-4 rounded-2xl font-black text-lg hover:bg-primary-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-xl shadow-slate-900/10 uppercase"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;

