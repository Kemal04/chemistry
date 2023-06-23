import React, { useEffect, useState } from 'react'
import Api_Address from '../../../env'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import moment from 'moment';

const BlogRead = () => {
    const { blogId } = useParams()

    const [blog, setBlog] = useState("")

    useEffect(() => {
        axios.get(`${Api_Address}/api/blog/${blogId}`).then((res) => {
            setBlog(res.data.blog)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [blogId])

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-xl-10'>
                        <div className='card border-0 rounded-0' style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                            <div className='d-flex justify-content-center'>
                                <img src={`${Api_Address}/img/blog/${blog.blog_img}`} alt="" className='img-fluid' style={{ width: "500px" }} />
                            </div>
                            <div className='card-body'>
                                <div className='row justify-content-between align-items-center'>
                                    <div className='col-xl-10'>
                                        <div className='card-text h2 mb-3'>{blog.title}</div>
                                    </div>
                                    <div className='col-xl-2'>
                                        <div className='fst-italic text-secondary ms-3'>
                                            {moment(blog.createdAt).format("MMMM Do YYYY")}
                                        </div>
                                    </div>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogRead