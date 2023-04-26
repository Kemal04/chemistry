import React from 'react'
import { NavLink } from 'react-router-dom'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white shadow">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">Garabogazköl</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Baş Sahypa</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/maglumatlar" className="nav-link">Maglumatlar</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/biz-barada" className="nav-link">Biz Barada</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/habarlasmak" className="nav-link">Habarlaşmak</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Gözle" />
                                <button className="btn btn-outline-secondary" type="submit">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar