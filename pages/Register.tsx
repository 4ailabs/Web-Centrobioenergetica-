import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validar contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validar contraseña: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-main)]">
      <div className="w-full max-w-md bg-[var(--panel-bg)] rounded-[2.5rem] shadow-2xl p-8 border border-[var(--border-color)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[var(--text-main)] mb-2 uppercase tracking-tight">Crear Cuenta</h1>
          <p className="text-[var(--text-muted)]">Regístrate para comenzar</p>
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
            <span className="text-sm font-medium">
              Registro exitoso. Tu cuenta está pendiente de aprobación. Redirigiendo...
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs font-black text-primary-600 uppercase tracking-widest mb-2 px-1">
              Nombre (opcional)
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary-600 transition-colors" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-black text-primary-600 uppercase tracking-widest mb-2 px-1">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary-600 transition-colors" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-black text-primary-600 uppercase tracking-widest mb-2 px-1">
              Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary-600 transition-colors" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-primary-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-1">
              Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-black text-primary-600 uppercase tracking-widest mb-2 px-1">
              Confirmar Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary-600 transition-colors" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-[var(--text-main)] text-[var(--bg-main)] py-4 rounded-2xl font-black text-lg hover:bg-primary-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-xl shadow-slate-900/10 uppercase"
          >
            {loading ? 'Registrando...' : success ? '¡Registro Exitoso!' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary-600 font-bold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

