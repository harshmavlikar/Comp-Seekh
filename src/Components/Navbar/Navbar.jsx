import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/CSlogo1.png';
import menu_icon from '../../assets/menu-icon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation(); // Destructure t from useTranslation
    const [sticky, setSticky] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleNavClick = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
        }

        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    return (
        <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
            <img src={logo} alt="Logo" className='logo' />
            <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                <li>
                    <ScrollLink to="hero" smooth={true} offset={0} duration={500}>
                        {t('Home')}
                    </ScrollLink>
                </li>
                <li>
                    <ScrollLink to="courses" smooth={true} offset={-260} duration={500}>
                        {t('Courses')}
                    </ScrollLink>
                </li>
                <li>
                    <ScrollLink to="info" smooth={true} offset={-50} duration={500}>
                        {t('About us')}
                    </ScrollLink>
                </li>
                <li>
                    <ScrollLink to="campus" smooth={true} offset={-260} duration={500}>
                        {t('Campus')}
                    </ScrollLink>
                </li>
                <li>
                    <ScrollLink to="placements" smooth={true} offset={-150} duration={500}>
                        {t('Placements')}
                    </ScrollLink>
                </li>
                <li>
                    <ScrollLink to="contact" smooth={true} offset={-160} duration={500}>
                        {t('Contact us')}
                    </ScrollLink>
                </li>
                <li>
                    <button className='btn' onClick={handleLoginClick}>{t('Login')}</button>
                </li>
            </ul>
            <img src={menu_icon} alt="Menu" className='menu-icon' onClick={toggleMenu} />
            <LanguageSwitcher />
        </nav>
    );
}

export default Navbar;
