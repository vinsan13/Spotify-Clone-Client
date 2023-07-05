import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMusic, faStar, faRankingStar, faBars } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
const Navbar = () => {
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);



    return (
        <nav className='navbar' ref={menuRef}>
            <div className='navbar_logo'>
                <div className='logo-img'><img src="./spotify_logo.png" alt="logo" /></div>
                <div className="menu-button" onClick={toggleMenu}>
                    <span className='menu-icon'>{!isOpen?<FontAwesomeIcon icon={faBars} />:<FontAwesomeIcon icon={faBars} rotation={90} />}</span>
                </div>
            </div>

            <div className={isOpen ? ' navbar_menu responsive' : 'navbar_menu'} >
                <ul className='navbar_menu-list'>
                    <li className='navbar_menu-item'>
                        <FontAwesomeIcon icon={faHouse} />
                        <a href="/">Discover</a>
                    </li>
                    <li className='navbar_menu-item'>
                        <FontAwesomeIcon icon={faMusic} />
                        <a href="/">Around You</a>
                    </li>
                    <li className='navbar_menu-item'>
                        <FontAwesomeIcon icon={faStar} />
                        <a href="/">Top Artists</a>
                    </li>
                    <li className='navbar_menu-item'>
                        <FontAwesomeIcon icon={faRankingStar} />
                        <a href="/">Top Charts</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar