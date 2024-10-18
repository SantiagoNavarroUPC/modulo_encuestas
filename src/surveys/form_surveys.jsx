import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { FaClipboardList, FaUser, FaInfoCircle } from 'react-icons/fa';

export default function Component({ survey }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [surveyAdded, setSurveyAdded] = useState(false);

  const surveysCollection = collection(db, "encuestas");

  useEffect(() => {
    if (survey) {
      setValue('name', survey.name);
      setValue('type', survey.type);
      setValue('state', survey.state);
    }
  }, [survey, setValue]);

  const onSubmit = async (data) => {
    try {
      if (survey) {
        const surveyRef = doc(db, "encuestas", survey.id);
        await updateDoc(surveyRef, {
          name: data.name,
          type: data.type,
          state: data.state,
        });
        alert('¡Encuesta actualizada correctamente!');
      } else {
        await addDoc(surveysCollection, {
          name: data.name,
          type: data.type,
          state: data.state,
        });
        setSurveyAdded(true);
        alert('¡Encuesta agregada correctamente!');
      }

      reset();
    } catch (error) {
      alert('Hubo un error al guardar la encuesta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-surveys'>
      <h5>{survey ? 'Editar Encuesta' : 'Agregar Encuesta'}</h5>

      <label htmlFor="name"><FaClipboardList /> Nombre</label>
      <input 
        type="text" 
        id="name" 
        {...register("name", { required: true })} 
        placeholder="Nombre de la encuesta" 
        autoComplete="name" 
      />

      <label htmlFor="type"><FaUser /> Tipo</label>
      <select 
        id="type" 
        {...register("type", { required: true })} 
        autoComplete="off"
      >
        <option value="">Seleccione el tipo de encuesta</option>
        <option value="administrativos">Administrativos</option>
        <option value="profesores">Profesores</option>
        <option value="estudiantes">Estudiantes</option>
        <option value="empleadores">Empleadores</option>
        <option value="egresados">Egresados</option>
        <option value="directivos">Directivos</option>
      </select>

      <label htmlFor="state"><FaInfoCircle /> Estado</label>
      <select 
        id="state" 
        {...register("state", { required: true })} 
        autoComplete="off"
      >
        <option value="">Seleccione el estado de la encuesta</option>
        <option value="activa">Activa</option>
        <option value="inactiva">Inactiva</option>
      </select>

      <input type="submit" value={survey ? "Actualizar" : "Guardar"} />
    </form>
  );
}
