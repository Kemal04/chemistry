import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Api_Address from '../../../env';
import axios from "axios"
import ReactPaginate from 'react-paginate';

const Blog = () => {

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

    return (
        <>
            <div className='home-bg-mini d-flex align-items-center'>
                <div className='container'>
                    <div className='row justify-content-center text-center align-items-center'>
                        <div className='col-xl-12 text-white'>
                            <div className='h1 fw-normal'>Maglumatlar</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-5'>
                <div className='row'>
                    {
                        blogs.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((blog, index) => (
                            <Link to={`/maglumat/${blog.id}`} className='col-xl-6 mb-4 text-decoration-none text-dark' key={index}>
                                <div className='card shadow'>
                                    <div className='row'>
                                        <div className='col-xl-5'>
                                            <img src={`${Api_Address}/img/blog/${blog.blog_img}`} alt="" className='img-fluid' style={{ height: "300px" }} />
                                        </div>
                                        <div className='col-xl-7 p-5'>
                                            <div className='h5'>{blog.title}</div>
                                            <p className='my-3' dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 70) + "..." }}></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                    <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                        {
                            pages === 1
                                ?
                                null
                                :
                                <ReactPaginate
                                    previousLabel="< yza"
                                    nextLabel="öňe >"
                                    pageCount={pages}
                                    onPageChange={changePage}
                                    containerClassName={"pagination"}
                                    pageLinkClassName={"page-link"}
                                    previousLinkClassName={"page-link"}
                                    nextLinkClassName={"page-link"}
                                    activeLinkClassName={"page-link active"}
                                    disabledLinkClassName={"page-link disabled"}
                                />
                        }
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Blog