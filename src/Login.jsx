import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './config/firebase';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ user: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('user', '==', formData.user));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Usuario no encontrado.');
        return;
      }

      const userData = querySnapshot.docs[0].data();
      if (userData.password !== formData.password) {
        setError('Contraseña incorrecta.');
        return;
      }
      
      localStorage.setItem('loggedUser', JSON.stringify(userData));
      onLoginSuccess(userData); // Notificar al padre
    } catch (err) {
      console.error('Error durante el inicio de sesión:', err);
      setError('Ocurrió un error. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <div className="box" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h1 className="title">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Usuario</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={formData.user}
                onChange={(e) => handleChange('user', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="help is-danger">{error}</p>}
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
