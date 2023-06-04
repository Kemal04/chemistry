import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import axios from 'axios'
import Api_Address from '../../../env'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const AdminContact = () => {

    const { darkMode } = useContext(ThemeContext)

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/contact`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res) => {
                setContacts(res.data.contacts)
            })
        }
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${Api_Address}/api/contact/delete/${id}`)
            toast.success(data.success)
            const afterDelete = contacts.filter((contacts) => {
                return contacts.id !== id
            })
            setContacts(afterDelete)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        
        <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className={`h5 ${darkMode ? "text-white" : "text-dark"}`}>
                                <div>Maglumatlar ( {contacts.length} )</div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end'>
                            <input className="form-control form-control-sm" type="text" placeholder="Gözle..." />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end'>
                            <select className={`form-select form-select-sm select-month me-2 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                                <option defaultValue>Hemme maglumatlar</option>
                                <option>Täzeler</option>
                                <option>Köneler</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`card-body p-3 ${darkMode ? "bg-dark-blue text-white" : ""}`}>
                    <div className='row justify-content-between aling-items-center'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr className={`${darkMode ? "text-white" : null}`}>
                                    <th>N</th>
                                    <th>Ady</th>
                                    <th>E-mail adresi</th>
                                    <th>Temasy</th>
                                    <th>Mazmuny</th>
                                    <th>Redaktirlemek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contacts.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((contact, index) => (
                                        <tr key={index}>
                                            <td className={`${darkMode ? "text-white" : null}`}>{index + 1}</td>
                                            <td className={`${darkMode ? "text-white" : null}`}>{contact.name}</td>
                                            <td className={`${darkMode ? "text-white" : null}`}>{contact.email}</td>
                                            <td className={`${darkMode ? "text-white" : null}`}>{contact.subject}</td>
                                            <td className={`${darkMode ? "text-white" : null}`}>{contact.comment}</td>
                                            <td className='d-flex justify-content-center align-items-center'>
                                                <button className='btn btn-sm btn-outline-danger mx-3' onClick={() => handleDelete(contact.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminContact