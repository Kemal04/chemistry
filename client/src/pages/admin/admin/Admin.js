import React, { useContext, useEffect, useState } from 'react'
import '../../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBook, faClock, faComment, faEllipsis, faPenAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import user_icon from '../../../assets/icons/user.jpg'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import corner_bg from '../../../assets/banners/corner-1.png'
import { ThemeContext } from '../../../context/ThemeContext'
import axios from 'axios'
import Api_Address from '../../../env'
import moment from 'moment'

const Admin = () => {

    const { darkMode } = useContext(ThemeContext)

    const data = [
        {
            name: 'Sahypa A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Sahypa B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Sahypa C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Sahypa D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        }
    ];

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/user`).then((res) => {
                setUsers(res.data.users)
            })
        }
        fetchData()
    }, [])

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/blog`).then((res) => {
                setBlogs(res.data.blogs)
            })
        }
        fetchData()
    }, [])

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/contact`).then((res) => {
                setContacts(res.data.contacts)
            })
        }
        fetchData()
    }, [])

    return (
        <>
            <div className={`d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ${darkMode ? "text-white" : ""}`}>
                <h1 className="h2">Esasy Sahypa</h1>
            </div>

            <div className='row mt-5 g-0'>
                <div className='col-xl-4 col-lg-3 col-md-6 col-12 mb-3'>
                    <div className="row p-3 align-items-center mx-3 rounded-3 shadow text-white" style={{ background: "linear-gradient(to right, #ff512f, #f09819)" }}>
                        <div className="col-lg-8">
                            <h3 className='mb-3'>{users.length}</h3>
                            <p>Ulanyjylar</p>
                        </div>
                        <div className="col-lg-4 h1">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <Link to="/admin/ulanyjylar" className="border-light border-top pt-2 nav-link text-white pb-0">Maglumatlar <FontAwesomeIcon icon={faArrowRight} /></Link>
                    </div>
                </div>
                <div className='col-xl-4 col-lg-3 col-md-6 col-12 mb-3'>
                    <div className="row p-3 align-items-center mx-3 rounded-3 shadow text-white" style={{ background: "linear-gradient(to right, #0fab01, #15ff00)" }}>
                        <div className="col-lg-8">
                            <h3 className='mb-3'>{blogs.length}</h3>
                            <p>Maglumatlar</p>
                        </div>
                        <div className="col-lg-4 h1">
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        <Link to="/admin/maglumatlar" className="border-light border-top pt-2 nav-link text-white pb-0">Maglumatlar <FontAwesomeIcon icon={faArrowRight} /></Link>
                    </div>
                </div>
                <div className='col-xl-4 col-lg-3 col-md-6 col-12 mb-3'>
                    <div className="row p-3 align-items-center mx-3 rounded-3 shadow text-white" style={{ background: "linear-gradient(to right, #ff0000, #ff6767)" }}>
                        <div className="col-lg-8">
                            <h3 className='mb-3'>{contacts.length}</h3>
                            <p>Teswirler</p>
                        </div>
                        <div className="col-lg-4 h1">
                            <FontAwesomeIcon icon={faComment} />
                        </div>
                        <Link to="/" className="border-light border-top pt-2 nav-link text-white pb-0">Maglumatlar <FontAwesomeIcon icon={faArrowRight} /></Link>
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col-xl-6 col-lg-12 col-md-12 col-12 mb-3'>
                    <div className='card border-0 shadow'>
                        <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                            <div className='row align-items-center'>
                                <div className='col-xl-4 col-lg-4 col-md-12 col-12'>Ulanyjylar</div>
                                <div className='col-xl-8 col-lg-8 col-md-12 col-12'>
                                    <select className={`form-select form-select-sm ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                                        <option>Ulanyjylar</option>
                                        <option>Täzeler</option>
                                        <option>Köneler</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={`card-body ${darkMode ? "bg-dark-blue text-white" : null}`}>
                            {
                                users.slice(0, 4).sort((a, b) => (a.id < b.id) ? 1 : -1).map((user, index) => (
                                    <div className='row align-items-center my-3' key={index}>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-12 d-flex justify-content-start align-items-center'>
                                            <img src={user_icon} alt="" className='img-fluid rounded-circle me-3' style={{ width: "40px" }} />
                                            {user.email}
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-12 d-flex justify-content-end align-items-center'>
                                            <FontAwesomeIcon icon={faClock} className='me-2 text-primary' />
                                            {moment(user.createdAt).format('DD-MM-YYYY')} ý.
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={`card-footer text-center pt-3 pb-4 ${darkMode ? "bg-dark-blue-footer" : "bg-white"}`}>
                            <Link to="/admin/ulanyjylar" className={`d-flex align-items-center justify-content-center text-decoration-none ${darkMode ? "text-white" : null}`}>
                                Hemme Ulanyjylary Görkez
                                <FontAwesomeIcon icon={faArrowRight} className='ms-2 text-primary' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col-xl-6 col-lg-12 col-md-12 col-12 mb-3'>
                    <div className='card border-0 shadow'>
                        <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                            <div className='row align-items-center'>
                                <div className='col-xl-5 col-lg-5 col-md-5 col-5'>Maglumatlar</div>
                                <div className='col-xl-5 col-lg-5 col-md-5 col-5'>
                                    <select className={`form-select form-select-sm select-month me-2 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                                        <option value="0">January</option>
                                        <option value="1">February</option>
                                        <option value="2">March</option>
                                        <option value="3">April</option>
                                        <option value="4">May</option>
                                        <option value="5">Jun</option>
                                        <option value="6">July</option>
                                        <option value="7">August</option>
                                        <option value="8">September</option>
                                        <option value="9">October</option>
                                        <option value="10">November</option>
                                        <option value="11">December</option>
                                    </select>
                                </div>
                                <div className='col-xl-2 col-lg-2 col-md-2 col-2'>
                                    <div className="dropdown font-sans-serif btn-reveal-trigger">
                                        <button className={`btn btn-link text-600 btn-sm dropdown-caret-none btn-reveal ${darkMode ? "text-white" : "text-dark"}`} type="button" id="dropdown-total-sales" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
                                            <FontAwesomeIcon icon={faEllipsis} className='h5 m-0' />
                                        </button>
                                        <div className={`dropdown-menu dropdown-menu-end border py-2 ${darkMode ? "bg-dark-blue-footer" : null}`} aria-labelledby="dropdown-total-sales">
                                            <Link to="/" className={`dropdown-item ${darkMode ? "bg-dark-blue-footer" : null}`}>View</Link>
                                            <Link to="/" className={`dropdown-item ${darkMode ? "bg-dark-blue-footer" : null}`}>Export</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/" className="dropdown-item text-danger">Remove</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`card-body ${darkMode ? "bg-dark-blue text-white" : null}`}>
                            <div className='d-xl-block d-lg-block d-md-block d-none'>
                                <LineChart width={450} height={300} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-2'>
                <div className='col-xl-7 col-lg-7 col-md-12 col-12 mb-3'>
                    <div className={`card border-0 shadow p-4 ${darkMode ? "bg-dark-blue text-white" : null}`}>
                        <div className='card-title mt-2'>
                            Web Sahypanyň tutýan meýdany <b>1775.06 MB</b>-dan 2 GB
                        </div>
                        <div className="progress my-3">
                            <div className="progress-bar" role="progressbar" aria-label="Segment one" style={{ width: "40%" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                            <div className="progress-bar bg-info" role="progressbar" aria-label="Segment two" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                            <div className="progress-bar bg-success" role="progressbar" aria-label="Segment three" style={{ width: "10%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="row g-0 " style={{ fontWeight: "500" }}>
                            <div className="col-auto d-flex align-items-center pe-3"><span className="dot bg-primary"></span><span>Maglumatlar</span></div>
                            <div className="col-auto d-flex align-items-center pe-3"><span className="dot bg-info"></span><span>Teswirler</span></div>
                            <div className="col-auto d-flex align-items-center pe-3"><span className="dot bg-success"></span><span>Suratlar</span></div>
                            <div className="col-auto d-flex align-items-center"><span className="dot bg-200"></span><span>Boş</span></div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-5 col-lg-5 col-md-12 col-12 mb-3'>
                    <div className={`card h-100 border-0 shadow ${darkMode ? "bg-dark-blue text-white" : null}`}>
                        <div className="card-body position-relative p-3" style={{ backgroundImage: `url(${corner_bg})` }}>
                            <h5 className="text-warning">Running out of your space?</h5>
                            <p className="small mb-0">Your storage will be running out soon. Get more space and powerful productivity features.</p>
                            <Link to="/" className="btn btn-link fw-bold text-warning mt-lg-3 ps-0 text-decoration-none">Upgrade storage</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin