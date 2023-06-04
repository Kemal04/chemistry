import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api_Address from '../../../env';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ThemeContext } from '../../../context/ThemeContext';

const AdminBlogEdit = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const { blogId } = useParams()

    const [blog, setBlog] = useState({
        title: "",
        description: "",
        blog_img: "",
    })
    const [img, setImg] = useState('')
    const [description, setDescription] = useState()

    const uploadPicture = (e) => {
        setImg({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
    };

    const handleChange = (e) => {
        setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`${Api_Address}/api/blog/edit/${blogId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setBlog(res.data.blog)
            console.log(res.data.blog);
            setImg(res.data.blog.blog_img)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [navigate, blogId])

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', blog.title)
        formData.append('description', description)
        formData.append('blog_img', img.pictureAsFile === undefined ? img : img.pictureAsFile)

        if (!blog.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!description) {
            toast.error("Mazmuny ýazyň")
        }
        else if (!img) {
            toast.error("Surat saýlanmadyk")
        }
        else {
            await axios.post(`${Api_Address}/api/blog/edit/${blogId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/maglumatlar")
                }).catch((res) => {
                    toast.error(res.response.data.error)
                })
        }
    }

    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>Maglumat Uytgetmek</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "100%" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <form className='row' onSubmit={handleClick}>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-5">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input value={blog.title} name='title' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='blog_img' onChange={uploadPicture} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3 text-dark">
                                    <label className="form-label fw-bold">Mazmuny</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={blog.description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}
                                    />
                                </div>


                                <div className='d-grid mt-3'>
                                    <button type="submit" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}>Üýtgetmek</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminBlogEdit