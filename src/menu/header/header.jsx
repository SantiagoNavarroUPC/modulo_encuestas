import React from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'
import '../menu.css'
import { useLocation } from 'react-router-dom';

function Header({ OpenSidebar }) {
    const location = useLocation();
    const isShopPage = location.pathname === '/shop';

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
            <div className='header-left'>
                {isShopPage && <BsSearch className='icon' />}
                {isShopPage && <input type="text" placeholder="Buscar" />}
            </div>
            <div className='header-right'>
                <BsFillBellFill className='icon' />
                <BsFillEnvelopeFill className='icon' />
                <BsPersonCircle className='icon' />
            </div>
        </header>
    )
}

export default Header;
