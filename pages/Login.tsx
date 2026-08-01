import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputField from '../components/ui/InputField';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { whatsappLink } from '../lib/whatsapp';
import { COLOR } from '../lib/tokens';

const LogoAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const glowRef = useRef<SVGCircleElement | null>(null);
  const coreRef = useRef<SVGCircleElement | null>(null);
  const txt1Ref = useRef<HTMLDivElement | null>(null);
  const txt2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animate dots one by one
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      setTimeout(() => {
        dot.style.transition = 'opacity 0.3s';
        dot.style.opacity = '1';
      }, 200 + i * 100);
    });

    // Glow
    setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transition = 'opacity 0.4s';
        glowRef.current.style.opacity = '0.45';
      }
    }, 1600);

    // Core
    setTimeout(() => {
      if (coreRef.current) {
        coreRef.current.style.transition = 'opacity 0.3s';
        coreRef.current.style.opacity = '1';
      }
    }, 1800);

    // Text
    setTimeout(() => {
      if (txt1Ref.current) {
        txt1Ref.current.style.transition = 'opacity 0.8s';
        txt1Ref.current.style.opacity = '1';
      }
    }, 2100);

    setTimeout(() => {
      if (txt2Ref.current) {
        txt2Ref.current.style.transition = 'opacity 0.8s';
        txt2Ref.current.style.opacity = '1';
      }
    }, 2400);

    // Complete
    setTimeout(onComplete, 3600);
  }, [onComplete]);

  const dots = [
    { cx: 0, cy: -50, fill: COLOR.terracota },
    { cx: 25, cy: -43.3, fill: COLOR.salvia },
    { cx: 43.3, cy: -25, fill: COLOR.terracota },
    { cx: 50, cy: 0, fill: COLOR.salvia },
    { cx: 43.3, cy: 25, fill: COLOR.terracota },
    { cx: 25, cy: 43.3, fill: COLOR.salvia },
    { cx: 0, cy: 50, fill: COLOR.terracota },
    { cx: -25, cy: 43.3, fill: COLOR.salvia },
    { cx: -43.3, cy: 25, fill: COLOR.terracota },
    { cx: -50, cy: 0, fill: COLOR.salvia },
    { cx: -43.3, cy: -25, fill: COLOR.terracota },
    { cx: -25, cy: -43.3, fill: COLOR.salvia },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(80,80)">
          {dots.map((d, i) => (
            <circle
              key={i}
              ref={el => { dotsRef.current[i] = el; }}
              cx={d.cx}
              cy={d.cy}
              r="8"
              fill={d.fill}
              style={{ opacity: 0 }}
            />
          ))}
          <circle ref={glowRef} cx="0" cy="0" r="5" fill={COLOR.ambar} style={{ opacity: 0 }} />
          <circle ref={coreRef} cx="0" cy="0" r="3" fill={COLOR.ambar} style={{ opacity: 0 }} />
        </g>
      </svg>
      <div className="mt-5 text-center">
        <div ref={txt1Ref} className="text-[9px] tracking-[4px] font-medium text-neutral-600 dark:text-neutral-400" style={{ opacity: 0 }}>
          INSTITUTO
        </div>
        <div ref={txt2Ref} className="text-[13px] tracking-[1.8px] font-medium text-primary-600 mt-1" style={{ opacity: 0 }}>
          CENTROBIOENERGETICA
        </div>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animDone, setAnimDone] = useState(false);
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
    <div className="flex items-center justify-center p-6 py-16 lg:py-24 min-h-[80vh]">
      <div className="w-full max-w-md">
        {/* Logo animation → form */}
        <div className="relative">
          {/* Animation */}
          <div
            className={`flex items-center justify-center transition-all duration-700 ${animDone ? 'opacity-0 scale-95 absolute inset-0 pointer-events-none' : 'opacity-100'}`}
            style={{ minHeight: animDone ? 0 : 280 }}
          >
            <LogoAnimation onComplete={() => setAnimDone(true)} />
          </div>

          {/* Form */}
          <div className={`transition-all duration-700 ${animDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8 border border-neutral-200 dark:border-neutral-700">
              {/* Small logo at top of form */}
              <div className="flex justify-center mb-6">
                <img src="/logo-instituto.svg" alt="Instituto Centrobioenergética" className="w-10 h-10" />
              </div>

              <div className="text-center mb-6">
                <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-1">Bienvenido</h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs">Inicia sesión en tu cuenta</p>
              </div>

              {error && (
                error.includes('aprobación') ? (
                  /* No es un fallo del usuario: la cuenta existe y espera activación */
                  <div className="mb-5 p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg text-amber-800 dark:text-amber-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium">Tu cuenta aún no está activada</p>
                        <p className="text-[11px] mt-1 leading-relaxed opacity-90">
                          Ya estás registrado. Activamos los accesos manualmente; si necesitas entrar ahora, escríbenos.
                        </p>
                        <a
                          href={whatsappLink('Hola, me registré en la plataforma y necesito activar mi acceso.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-[11px] font-semibold underline"
                        >
                          Escribir por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium">{error}</span>
                  </div>
                )
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-salvia-400 text-white py-3 rounded-lg font-medium text-sm hover:bg-salvia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 min-h-[44px]"
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
              </form>

              <div className="mt-6 text-center border-t border-neutral-200 dark:border-neutral-700 pt-5">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
