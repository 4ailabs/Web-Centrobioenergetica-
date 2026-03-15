import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/ui/AuthLayout';
import InputField from '../components/ui/InputField';

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

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

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
    <AuthLayout
      title="Crear Cuenta"
      subtitle="Regístrate para comenzar"
      error={error}
      success={success ? "Registro exitoso. Tu cuenta está pendiente de aprobación. Redirigiendo..." : undefined}
      footerText="¿Ya tienes una cuenta?"
      footerLinkText="Inicia sesión aquí"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="name"
          label="Nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<User className="w-5 h-5" />}
          placeholder="Tu nombre"
        />

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
          helperText="Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 hover:text-primary-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
        />

        <InputField
          id="confirmPassword"
          label="Confirmar Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          icon={<Lock className="w-5 h-5" />}
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-primary-600 text-white py-3.5 rounded-lg font-semibold text-base hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 min-h-[44px]"
        >
          {loading ? 'Registrando...' : success ? '¡Registro Exitoso!' : 'Registrarse'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;

