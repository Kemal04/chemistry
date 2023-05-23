import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api_Address from '../../../env';
import axios from "axios"

const AdminBlogCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [building, setBuilding] = useState({
        title: ""
    })
    const [img, setImg] = useState('')
    const [description, setDescription] = useState()

    const handleChange = (e) => {
        setBuilding((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', building.title)
        formData.append('description', description)
        formData.append('blog_img', img)

        if (!building.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!description) {
            toast.error("Mazmuny ýazyň")
        }
        else if (!img) {
            toast.error("Suraty saýlaň")
        }
        else {
            await axios.post(`${Api_Address}/api/blog/create`, formData, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/admin/maglumatlar')
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }

    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>Maglumat Goşmak</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "711px" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <form className='row' onSubmit={handleClick}>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-5">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='title' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-5">
                                    <label className="form-label fw-bold">Mazmuny</label>
                                    <CKEditor
                                        type='text'
                                        name="description"
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}
                                    />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='blog_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button type="submit" className={`btn ${darkMode ? "btn-outline-light" : "btn-primary"}`}>Goşmak</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminBlogCreate