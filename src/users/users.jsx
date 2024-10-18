import React, { useState } from 'react';
import '../menu/menu.css';
import Header from '../menu/header/header';
import Sidebar from '../menu/sidebar/sidebar';
import UsersTable from './table_users';

const Users = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <UsersTable /> {}
    </div>
  );
}

export default Users;
