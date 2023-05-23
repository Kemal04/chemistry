import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import axios from 'axios'
import Api_Address from '../../../env'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const AdminBlogs = () => {

    const { darkMode } = useContext(ThemeContext)

    const [blogs, setBlogs] = useState([])

    const [page, setPage] = useState(1)

    const [pages, setPages] = useState()

    const changePage = ({ selected }) => {
        console.log(selected);
        setPage((selected + 1))
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/blog`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
                params: {
                    page: page
                }
            }).then((res) => {
                setBlogs(res.data.blogs)
                setPages(res.data.pagination.pages)
            })
        }
        fetchData()
    }, [page])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${Api_Address}/api/blog/delete/${id}`)
            toast.success(data.success)
            const afterDelete = blogs.filter((blogs) => {
                return blogs.id !== id
            })
            setBlogs(afterDelete)
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
                            <Link to="/admin/maglumat-gos" className={`h5 d-flex align-items-center text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}>
                                <div>Maglumatlar ( {blogs.length} )</div>
                                <FontAwesomeIcon icon={faPlus} className='ms-2' />
                            </Link>
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
                                    <th>Suraty</th>
                                    <th>Ady</th>
                                    <th>Mazmuny</th>
                                    <th>Pozmak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    blogs.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((blog, index) => (
                                        <tr key={index}>
                                            <td className={`${darkMode ? "text-white" : null}`}>{index + 1}</td>
                                            <td className={`${darkMode ? "text-white" : null}`}><img src={`${Api_Address}/img/blog/${blog.blog_img}`} alt="" style={{ width: "100px" }} /></td>
                                            <td className={`${darkMode ? "text-white" : null}`}>{blog.title}</td>
                                            <td className={`${darkMode ? "text-white" : null}`} dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 70) }}></td>
                                            <td className='d-flex justify-content-center align-items-center'>
                                                <button className='btn btn-outline-danger' onClick={() => handleDelete(blog.id)}>
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

export default AdminBlogs