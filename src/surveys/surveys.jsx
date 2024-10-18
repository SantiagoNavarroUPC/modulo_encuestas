import React, { useState } from 'react';
import '../menu/menu.css';
import Header from '../menu/header/header';
import Sidebar from '../menu/sidebar/sidebar';
import SurveysTable from './table_surveys';

const Surveys = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <SurveysTable /> {}
    </div>
  );
}

export default Surveys;
