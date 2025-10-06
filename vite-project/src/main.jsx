import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';

// Renderiza la aplicación
const root = createRoot(document.getElementById('root'));
root.render(<AppRouter />);
