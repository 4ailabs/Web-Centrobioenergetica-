import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// Captura errores de render de las páginas para que un fallo puntual
// no deje toda la aplicación en pantalla blanca.
class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error de render capturado:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100">
            Algo salió mal al mostrar esta página
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-sm">
            El resto del sitio sigue funcionando. Vuelve al inicio e intenta de nuevo.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            className="mt-5 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
