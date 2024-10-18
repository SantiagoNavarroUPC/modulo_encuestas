import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaClipboardList, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const QuestionsForm = ({ question, surveys, updateQuestion }) => {
  const { register, handleSubmit } = useForm();
  const [questionAdded, setQuestionAdded] = useState(false);
  const questionsCollection = collection(db, "preguntas");

  const onSubmit = async (data) => {
    try {
      if (question) {
        // Si estamos editando, actualizamos la pregunta
        const questionRef = doc(db, "preguntas", question.id);
        await updateDoc(questionRef, {
          name: data.name,
          question: data.question,
          survey: data.survey,
          state: data.state
        });
        alert('¡Pregunta actualizada correctamente!');
      } else {
        // Si estamos agregando, creamos una nueva pregunta
        await addDoc(questionsCollection, {
          name: data.name,
          question: data.question,
          survey: data.survey,
          state: data.state
        });
        alert('¡Pregunta agregada correctamente!');
      }
      setQuestionAdded(true);
    } catch (error) {
      alert('Hubo un error al guardar la pregunta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-questions'>
      <h5>{question ? 'Editar Pregunta' : 'Agregar Pregunta'}</h5>

      <label htmlFor="name"><FaClipboardList /> Nombre</label>
      <textarea
        id="name" 
        name="name" 
        placeholder="Nombre de la pregunta" 
        {...register("name", { required: true })} 
        autoComplete="name" 
        defaultValue={question ? question.name : ''} // Valor por defecto para editar
      />

      <label htmlFor="question"><FaQuestionCircle /> Descripcion</label>
      <textarea
        id="question"
        name="question"
        placeholder="Escribe la pregunta aquí"
        {...register("question", { required: false })}
        autoComplete="off"
        defaultValue={question ? question.question : ''} // Valor por defecto para editar
      />

      <label htmlFor="survey"><FaClipboardList /> Encuesta</label>
      <select id="survey" name="survey" {...register("survey", { required: true })} autoComplete="off" defaultValue={question ? question.survey : ''}>
        <option value="">Seleccione la encuesta</option>
        {surveys.map(survey => (
          <option key={survey.id} value={survey.id}>{survey.name}</option>
        ))}
      </select>

      <label htmlFor="state"><FaInfoCircle /> Estado</label>
      <select id="state" name="state" {...register("state", { required: true })} autoComplete="off" defaultValue={question ? question.state : ''}>
        <option value="">Seleccione el estado de la pregunta</option>
        <option value="activa">Activa</option>
        <option value="inactiva">Inactiva</option>
      </select>

      <input type="submit" value="Guardar"/>
    </form>
  );
}


export default QuestionsForm;
