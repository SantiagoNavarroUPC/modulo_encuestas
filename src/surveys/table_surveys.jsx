import React, { useState, useEffect } from 'react';
import './surveys.css';
import SurveysForm from './form_surveys'; 
import { FaPlus, FaSearch } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, getDocs, doc,deleteDoc } from 'firebase/firestore';

const SurveysTable = () => {
  const surveysCollection = collection(db, "encuestas");
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  // Toggle para abrir o cerrar el formulario
  const toggleForm = (survey = null) => { 
    setSelectedSurvey(survey);
    setIsFormOpen(!isFormOpen);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveysData = [];
        const querySnapshot = await getDocs(surveysCollection);
        querySnapshot.forEach(doc => {
          const data = doc.data();
          surveysData.push({
            id: doc.id,
            name: data.name,
            type: data.type, // Capitalizar el tipo
            state: data.state, // Ocultaremos esto visualmente
          });
        });
        setSurveys(surveysData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };
    fetchData();
  }, []);

  // Función para eliminar una encuesta
  const deleteSurvey = async (id) => {
    try {
      const surveyRef = doc(db, "encuestas", id);
      await deleteDoc(surveyRef); // Eliminar la encuesta de Firebase

      // Actualizar el estado local
      setSurveys(prevSurveys => prevSurveys.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting survey:', error);
    }
  };

  const getStateIcon = (state) => {
    if (state === 'activa') {
      return <span className="icon-green">Activa &#10003;</span>;
    } else {
      return <span className="icon-red">Inactiva &#10007;</span>;
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Lista de Encuestas</h3>
      </div>
      <div className='main-table-surveys'>
        <div className='search-container left'>
          <label htmlFor="searchInput"><FaSearch /> Buscar:</label>
          <input type="text" id="searchInput" placeholder="Ingrese su búsqueda" />
        </div>
        <div className='search-container right'>
          <button onClick={() => toggleForm()}><FaPlus /> Agregar Encuesta</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th> {/* Nueva columna para las acciones */}
            </tr>
          </thead>
          <tbody>
            {surveys.map(survey => (
              <tr key={survey.id}>
                <td>{survey.name}</td>
                <td>{survey.type.charAt(0).toUpperCase() + survey.type.slice(1)}</td>
                <td>{getStateIcon(survey.state)}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => toggleForm(survey)}>Editar</button>
                    <button className="delete" onClick={() => deleteSurvey(survey.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleForm}>&times;</span>
            <SurveysForm survey={selectedSurvey} />
          </div>
        </div>
      )}
    </main>
  );
}

export default SurveysTable;
