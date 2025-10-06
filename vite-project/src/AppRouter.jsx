import { StrictMode, Suspense, useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import App from './App';

// Componente de enrutador condicional
function AppRouter() {
  const [Router, setRouter] = useState(() => ({ children }) => <>{children}</>);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar react-router-dom dinámicamente
    const loadRouter = async () => {
      try {
        const { BrowserRouter } = await import('react-router-dom');
        setRouter(() => BrowserRouter);
      } catch {
        console.warn('react-router-dom no está disponible. Usando enrutador básico.');
      } finally {
        setLoading(false);
      }
    };

    loadRouter();
  }, []);

  if (loading) {
    return <div>Cargando aplicación...</div>;
  }

  return (
    <StrictMode>
      <Suspense fallback={<div>Cargando...</div>}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </Suspense>
    </StrictMode>
  );
}

export default AppRouter;
