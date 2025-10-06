import { useState } from 'react';
import { login } from '../shared/authService';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      window.location.href = '/'; // Redirige al home o dashboard
    } catch (err) {
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:320,margin:'auto',padding:24,background:'#f5f5f2',borderRadius:12}}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{width:'100%',marginBottom:12,padding:8}}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{width:'100%',marginBottom:12,padding:8}}
      />
      <button type="submit" disabled={loading} style={{width:'100%',padding:10}}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
      {error && <div style={{color:'red',marginTop:10}}>{error}</div>}
    </form>
  );
}
