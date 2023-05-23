import { faBell, faMoon, faShoppingCart, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    const darkModeClick = () => {
        toggleDarkMode();
    }
    
    const { currentUser, setCurrentUser } = useContext(AuthContext)

    const logout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser({ email: "", id: 0, status: false, role: "User" })
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg bg-dark navbar-dark sticky-top ${darkMode ? "border-bottom" : ""}`}>
                <div className="container">
                    <NavLink to="/" className="navbar-brand">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="ms-auto" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <div onClick={darkModeClick} className="nav-link border-0 bg-dark text-white" style={{ cursor: "pointer" }}>
                                    {
                                        darkMode ?
                                            <FontAwesomeIcon icon={faSun} />
                                            :
                                            <FontAwesomeIcon icon={faMoon} />
                                    }
                                </div>
                            </li>
                            <li className="nav-item mx-2 dropdown">
                                <div className="nav-link position-relative">
                                    <div className="nav-link dropdown-toggle p-0 text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <ul className="dropdown-menu shadow border-0">
                                        <li><Link to="/" className="dropdown-item">Maglumatlar</Link></li>
                                        <li><Link to="/" className="dropdown-item">Biz Barada</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link to="/" className="dropdown-item" onClick={logout}>Çykyş etmek</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar