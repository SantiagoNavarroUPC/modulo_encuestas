import React from 'react';
import { FaClipboardList, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import { db } from '../firebase';
import './users.css'; 


const UsersForm = ({ user, tags, updateUser }) => {
  const [formData, setFormData] = React.useState({
    id: user.id,
    name: user ? user.name : '',
    lastName: user ? user.lastName : '',
    phone: user ? user.phone : '',
    rol: user ? user.rol : '',
    typeUser: user ? user.typeUser : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='form-questions'>
      <h5>{user ? 'Editar Usuario' : 'Agregar Usuario'}</h5>

      <label htmlFor="name"><FaClipboardList />  Nombre</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        placeholder="Nombre del usuario" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />

      <label htmlFor="lastName"><FaClipboardList />  Apellido</label>
      <input 
        type="text" 
        id="lastName" 
        name="lastName" 
        placeholder="Apellido del usuario" 
        value={formData.lastName} 
        onChange={handleChange} 
        required 
      />
      <label htmlFor="phone"><FaClipboardList />  Celular</label>
      <input 
        type="tel" 
        id="phone" 
        name="phone" 
        placeholder="Celular del usuario" 
        value={formData.phone} 
        onChange={handleChange} 
        required 
      />

      <label htmlFor="typeUser"><FaClipboardList />  Tipo de Usuario</label>
      <select 
        id="typeUser" 
        name="typeUser" 
        value={formData.typeUser} 
        onChange={handleChange} 
        required
      >
        <option value="">Seleccione el tipo de usuario</option>
        {["administrativos", "profesores", "estudiantes", "empleadores", "egresados", "directivos"].map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label htmlFor="rol"><FaClipboardList />  Rol</label>
      <select 
        id="rol" 
        name="rol" 
        value={formData.rol}
        onChange={handleChange} 
        required
      >
        <option value="">Seleccione el rol del usuario</option>
        <option value="1">Administrador</option>
        <option value="2">Usuario Normal</option>
      </select>

      <input type="submit" value="Guardar" />
    </form>
  );
}

export default UsersForm;




