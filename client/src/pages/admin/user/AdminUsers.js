import React, { useEffect, useState } from 'react'
import user_icon from '../../../assets/icons/user.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import axios from 'axios'
import Api_Address from '../../../env'


const AdminUsers = () => {

    const { darkMode } = useContext(ThemeContext)


    const [users, setUsers] = useState([])

    const [page, setPage] = useState(1)

    const [pages, setPages] = useState()

    const changePage = ({ selected }) => {
        console.log(selected);
        setPage((selected + 1))
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/user`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
                params: {
                    page: page
                }
            }).then((res) => {
                setUsers(res.data.users)
                setPages(res.data.pagination.pages)
            })
        }
        fetchData()
    }, [page])


    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <Link to="/user/create" className={`h5 d-flex align-items-center text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}>
                                <div>Users (505)</div>
                                <FontAwesomeIcon icon={faPlus} className='ms-2' />
                            </Link>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end'>
                            <input className="form-control form-control-sm" type="text" placeholder="Search..." />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end'>
                            <select className={`form-select form-select-sm select-month me-2 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                                <option selected="selected">All followers</option>
                                <option>Concert Choir</option>
                                <option>Clubchem</option>
                                <option>Chamber Music Society</option>
                                <option>Alpha Chi Omega</option>
                                <option>Alpine Ski Club</option>
                                <option>Career Club</option>
                                <option>Musical Club</option>
                                <option>Asymptones</option>
                                <option>Clubchem</option>
                                <option>Brain Trust</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`card-body p-3 ${darkMode ? "bg-dark-blue text-white" : ""}`}>
                    <div className='row justify-content-between aling-items-center'>
                        {
                            users.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((user, index) => (
                                <div key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 text-center mb-4 border-bottom pb-3'>
                                    <img src={user_icon} alt="" className='img-fluid rounded-circle mb-2' style={{ width: "100px" }} />
                                    <div className={`${darkMode ? "text-white fw-bold" : "text-primary"}`}>{user.name} Kemal Hojayew</div>
                                    <div className='small'>{user.email}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUsers