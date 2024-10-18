import React, { useState, useEffect } from 'react';
import './questions.css'; 
import QuestionsForm from './form_questions';
import { FaPlus } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const QuestionsTable = () => {
  const surveysCollection = collection(db, "encuestas");
  const questionsCollection = collection(db, "preguntas");
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  // Abrir/Cerrar formulario
  const toggleForm = (question = null) => { 
    setSelectedQuestion(question); 
    setIsFormOpen(!isFormOpen);
  };

  // Fetch data al cargar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveysData = [];
        const querySnapshotSurveys = await getDocs(surveysCollection);
        querySnapshotSurveys.forEach(doc => {
          const data = doc.data();
          surveysData.push({
            id: doc.id,
            name: data.name,
            type: data.type.charAt(0).toUpperCase() + data.type.slice(1),
            state: data.state,
          });
        });
        setSurveys(surveysData);

        const questionsData = [];
        const querySnapshotQuestions = await getDocs(questionsCollection);
        querySnapshotQuestions.forEach(doc => {
          const data = doc.data();
          questionsData.push({
            id: doc.id,
            name: data.name,
            question: data.question,
            survey: data.survey,
            state: data.state,
          });
        });
        setQuestions(questionsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching surveys or questions:', error);
      }
    };
    fetchData();
  }, []);

  // Filtrado de preguntas por encuesta seleccionada
  useEffect(() => {
    if (selectedSurvey) {
      setFilteredQuestions(questions.filter(q => q.survey === selectedSurvey));
    } else {
      setFilteredQuestions([]); // No mostrar preguntas si no hay encuesta seleccionada
    }
  }, [selectedSurvey, questions]);

  // Actualización de preguntas
  const updateQuestion = async (updatedQuestion) => {
    try {
      const questionRef = doc(db, "preguntas", updatedQuestion.id);
      await updateDoc(questionRef, {
        name: updatedQuestion.name,
        question: updatedQuestion.question,
        survey: updatedQuestion.survey,
        state: updatedQuestion.state,
      });
      
      setQuestions(prevQuestions => 
        prevQuestions.map(q => 
          q.id === updatedQuestion.id ? updatedQuestion : q
        )
      );

      // Cerrar el formulario después de actualizar
      toggleForm();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  // Función para eliminar una pregunta
  const deleteQuestion = async (id) => {
    try {
      const questionRef = doc(db, "preguntas", id);
      await deleteDoc(questionRef); // Eliminar el documento de Firebase
      
      // Actualizar el estado local para reflejar los cambios
      setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Lista de Preguntas</h3>
      </div>
      <div className='main-table-questions'>
        <div className='filter-container-questions'>
          {surveys.map(survey => (
            <button 
              key={survey.id} 
              className={`tag ${selectedSurvey === survey.id ? 'active' : ''}`} 
              onClick={() => setSelectedSurvey(survey.id)}
            >
              {survey.name}
            </button>
          ))}
          {selectedSurvey && (
            <button 
              className="tag clear" 
              onClick={() => setSelectedSurvey(null)}
            >
              Limpiar Filtro
            </button>
          )}
        </div>
        <div className='search-container right'>
          <button onClick={() => toggleForm()}> 
            <FaPlus /> Agregar Pregunta
          </button>
        </div>

        {selectedSurvey ? (  // Solo mostrar si hay una encuesta seleccionada
          filteredQuestions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nombre</th>
                  <th>Pregunta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question, index) => (
                  <tr key={question.id}>
                    <td>{index + 1}</td>
                    <td className="td-justify">{question.name}</td>
                    <td className="td-justify">{question.question}</td>
                    <td>
                      <div className="actions">
                        <button onClick={() => toggleForm(question)}>Editar</button>
                        <button className="delete" onClick={() => deleteQuestion(question.id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="message">No hay preguntas disponibles.</p> 
          )
        ) : (
          <p className='message'>Seleccione un tipo de encuesta para ver las preguntas.</p>
        )}
      </div>
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleForm}>&times;</span>
            <QuestionsForm 
              question={selectedQuestion} 
              surveys={surveys} 
              updateQuestion={updateQuestion} 
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default QuestionsTable;



