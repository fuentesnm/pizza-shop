import { useState, useEffect } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import User from './User';
import Login from '../../Login.jsx';

function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  const openModal = (user = null) => {
    setSelectedUser(user); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers((prev) => prev.filter((user) => user.id !== id));
      console.log('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const closeUser = () => {
    localStorage.removeItem('loggedUser');
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => window.location.reload()} />;
  }

  return (
    <div>
    <section className="hero is-small is-primary">
      <div className="hero-body">
        <h1 className="title hast-text-centered">Gestión de usuarios</h1>
        <button className="button is-info is-small is-primary" onClick={() => closeUser()}>
          Cerrar usuario
        </button>
      </div>
    </section>
    <section className="section">

      <button className="button is-info is-small is-primary" onClick={() => openModal()}>
        Agregar Usuario
      </button>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.user}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="button is-info is-small"
                  onClick={() => openModal(user)}
                >
                  Editar
                </button>
                <button
                  className="button is-danger is-small ml-3"
                  onClick={() => deleteUser(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>      

      {/* Modal */}
      {isModalOpen && (
        <User
          user={selectedUser}
          onClose={closeModal}
          refreshUsers={() => {
            const fetchUsers = async () => {
              const querySnapshot = await getDocs(collection(db, 'users'));
              const usersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setUsers(usersList);
            };
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}

export {Users};
