import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '/logo.png';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/wanderings', label: 'Wanderings' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // get current path

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <img src={logo} alt="website-logo" id='website-logo' />
        </Link>
      </div>

      <button
        className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <li className='nav-link-item' key={item.href}>
            <Link
              to={item.href}
              className={location.pathname === item.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)} // close on nav
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
