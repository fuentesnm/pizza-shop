import { useState, useEffect } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import User from './User';

function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

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

  return (
    <div>
      <button className="button is-primary" onClick={() => openModal()}>
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
                  className="button is-danger is-small"
                  onClick={() => deleteUser(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
