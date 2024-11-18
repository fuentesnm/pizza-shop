import { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';

function User({ user, onClose, refreshUsers }) {
  const [formData, setFormData] = useState(
    user || {
      user: '',
      password: '',
      name: '',
      lastname: '',
      role: '',
    }
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, { ...formData, password: user.password }); 
        console.log('Usuario actualizado correctamente');
      } else {
        await addDoc(collection(db, 'users'), formData);
        console.log('Usuario agregado correctamente');
      }
      refreshUsers();
      onClose();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {user ? 'Editar Usuario' : 'Agregar Usuario'}
          </p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
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
            {!user && (
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
            )}
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Apellido</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => handleChange('lastname', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Rol</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="button is-primary" type="submit">
              Guardar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default User;
