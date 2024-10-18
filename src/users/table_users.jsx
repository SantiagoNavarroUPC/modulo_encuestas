import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import UsersForm from './form_users';
import { FaPlus } from 'react-icons/fa';
import './users.css'; 

const UsersTable = () => {
  const usersCollection = collection(db, "usuarios");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTypeUser, setSelectedTypeUser] = useState(null);
  const tags = ["administrativos", "profesores", "estudiantes", "empleadores", "egresados", "directivos"];

  // Abrir/Cerrar formulario
  const toggleForm = (user = null) => { 
    setSelectedUser(user); 
    setIsFormOpen(!isFormOpen);
  };

  // Fetch data al cargar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = [];
        const querySnapshotUsers = await getDocs(usersCollection);
        querySnapshotUsers.forEach(doc => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            rol: data.rol,
            typeUser: data.typeUser || []
          });
        });
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      if (!updatedUser.id) {
        throw new Error("ID del usuario no está definido.");
      }
  
      const userDoc = doc(db, 'usuarios', updatedUser.id);
      await updateDoc(userDoc, updatedUser);
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
  
      alert("Usuario actualizado correctamente.");
  
      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (error) {
      alert(`Error al actualizar el usuario: ${error.message}`);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const userRef = doc(db, "usuarios", id);
      await deleteDoc(userRef);
      
      setUsers(prevUsers => prevUsers.filter(u => u.id !== id));

    } catch (error) {
      alert(`Error al eliminar el usuario: ${error.message}`);
    }
  };

  const getStateIcon = (typeUser) => {
    if (Array.isArray(typeUser)) {
      return typeUser.join(", ");
    } else if (typeof typeUser === "string") {
      return typeUser;
    }
    return 'N/A';
  };

  const filteredUsers = selectedTypeUser 
    ? users.filter(user => user.typeUser.includes(selectedTypeUser))
    : users;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Lista de Usuarios</h3>
      </div>
      <div className='main-table-users'>
        <div className='filter-container'>
          {tags.map(tag => (
            <button 
            key={tag} 
            className={`tag ${selectedTypeUser === tag ? 'active' : ''}`} 
            onClick={() => setSelectedTypeUser(tag === selectedTypeUser ? null : tag)} 
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>          
          ))}
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Celular</th>
              <th>Tipo de Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6">No se encontraron usuarios</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{getStateIcon(user.typeUser.charAt(0).toUpperCase() + user.typeUser.slice(1))}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => toggleForm(user)}>Editar</button>
                      <button className="delete" onClick={() => deleteUser(user.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleForm}>&times;</span>
            <UsersForm 
              user={selectedUser} 
              tags={tags} 
              updateUser={updateUser} 
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default UsersTable;
