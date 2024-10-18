import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BsCheckCircle, 
  BsGrid1X2Fill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsFillCheckCircleFill, 
  BsBarChartFill, 
  BsBoxArrowRight 
} from 'react-icons/bs';
import '../menu.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [exit, setExit] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setExit(true);
    navigate('/');
  };

  const handleMenu = () => {
    navigate('/menu');
  };

  const handleSurveys = () => {
    navigate('/surveys');
  };

  const handleQuestions = () => {
    navigate('/questions');
  };

  const handleUsers = () => {
    navigate('/users');
  };

  const handleReports = () => {
    navigate('/reports');
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCheckCircle className='icon_header' /> ENCUESTAS
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="" className='icon' onClick={e => { e.preventDefault(); handleMenu(); }}>
            <BsGrid1X2Fill /> Panel de inicio
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='icon' onClick={e => { e.preventDefault(); handleSurveys(); }}>
            <BsFillCheckCircleFill /> Encuestas
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='icon' onClick={e => { e.preventDefault(); handleQuestions(); }}>
            <BsFillGrid3X3GapFill /> Preguntas
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='icon' onClick={e => { e.preventDefault(); handleUsers(); }}>
            <BsPeopleFill className='icon' /> Usuarios
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='icon' onClick={e => { e.preventDefault(); handleReports(); }}>
            <BsBarChartFill className='icon' /> Reportes
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='icon' onClick={e => { e.preventDefault(); handleLogin(); }}>
            <BsBoxArrowRight /> Salir
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
