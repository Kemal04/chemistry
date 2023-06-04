import { faBed, faBuilding, faCogs, faComment, faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'

const Sidebar = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div>
            {/* NAVBAR BOLUMINDE BUTTON GIDIPDIR */}
            <div className="position-sticky pt-3" style={{ height: "calc(100vh - 48px)" }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/admin" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faHome} className="align-text-bottom me-2" />
                            Esasy Sahypa
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/maglumatlar" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faBuilding} className="align-text-bottom me-2" />
                            Maglumatlar
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/teswirler" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faComment} className="align-text-bottom me-2" />
                            Teswirler
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar