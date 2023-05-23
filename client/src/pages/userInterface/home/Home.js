import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import chemistry from '../../../assets/icons/chemistry.png'
import virus from '../../../assets/icons/virus.png'
import card_1 from '../../../assets/cards/card_1.jpg'
import about_us from '../../../assets/banners/about_us.jpg'
import contact_bg from '../../../assets/banners/contact.jpg'
import Api_Address from '../../../env'
import { toast } from 'react-toastify'
import axios from "axios"
import { useEffect } from 'react'

const Home = () => {

    //CONTACT
    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        comment: "",
    })

    const handleChange = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (!contact.name) {
            toast.error("Adyňyzy ýazyň")
        }
        else if (!contact.email) {
            toast.error("E-mail adresiňizi ýazyň")
        }
        else if (!contact.subject) {
            toast.error("Temaňyzy ýazyň")
        }
        else if (!contact.comment) {
            toast.error("Teswiriňizi ýazyň")
        }
        else if (contact.comment.length < 25) {
            toast.error("Teswiriňizi 25 harpdan yokary bolmaly")
        }
        else {
            await axios.post(`${Api_Address}/api/contact/create`, contact)
                .then((res) => {
                    toast.success(res.data.success)
                    setContact({
                        name: "",
                        email: "",
                        subject: "",
                        comment: "",
                    })
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }

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
            <div className='home-bg d-flex align-items-center pt-5'>
                <div className='container'>
                    <div className='row justify-content-end'>
                        <div className='col-xl-6 text-white'>
                            <div className='h3 fw-normal'>Baş Sahypa</div>
                            <div className='display-2 fw-bold my-4'>Garabogaz köli</div>
                            <p className='h5 fw-normal'>
                                “Garabogaz köl önümçiliginiň ösüşiniň geljegi” , magniý gidroksidiniň alnyş taslamasynyň maglumat üpjünçiligi.
                            </p>
                            <Link to="/biz-barada" className='btn btn-outline-light rounded-0 mt-4 px-5' style={{ fontSize: "20px" }}>Biz Barada</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mb-5' style={{ marginTop: "-80px" }}>
                <div className='row g-0'>
                    <div className='col-xl-6'>
                        <div className='card border-0 bg-light p-3' style={{ borderRadius: "15px 0 0 15px" }}>
                            <div className='row align-items-center'>
                                <div className='col-xl-4'>
                                    <img src={chemistry} alt="" className='img-fluid' />
                                </div>
                                <div className='col-xl-8'>
                                    <div className='h4'>Önümçilik hojalygynyň ösüşi</div>
                                    <p>
                                        Garabogaz kölüň gömülen turşylarynyň howuz usulynda gaýtadan işlemek meselesiniň üstünde A.D.Pelş (4, 5, 6, 7, 8, 9) işledi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <div className='card border-0 bg-light p-4' style={{ borderRadius: "0 15px 15px 0" }}>
                            <div className='row align-items-center mb-2'>
                                <div className='col-xl-4'>
                                    <img src={virus} alt="" className='img-fluid' style={{ width: "90%" }} />
                                </div>
                                <div className='col-xl-8'>
                                    <div className='h4'>Howuz ulgamynyň ösüşiniň birinji nobaty</div>
                                    <p>
                                        Birinji nobatyň howuz ulgamynyň shemasy 3.2-nji suratda görkezilendir. Ol bar bolan tebigy howuzlary ulanmakda optimaldyr.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container text-center my-5 py-5'>
                <div className='display-3 text-primary' style={{ fontWeight: "500" }}>
                    Maglumatlar
                </div>
                <p className='fw-normal fst-italic mt-2'>“Garabogaz köl önümçiliginiň ösüşiniň geljegi”, magniý gidroksidiniň alnyş taslamasynyň maglumat üpjünçiligi artykmaclygy.</p>
            </div>

            <div className='container'>
                <div className='row'>
                    {
                        blogs.slice(0, 4).sort((a, b) => (a.id < b.id) ? 1 : -1).map((blog, index) => (
                            <Link to={`/maglumat/${blog.id}`} className='col-xl-6 mb-4 text-decoration-none text-dark' key={index}>
                                <div className='card shadow'>
                                    <div className='row'>
                                        <div className='col-xl-5'>
                                            <img src={`${Api_Address}/img/blog/${blog.blog_img}`} alt="" className='img-fluid' />
                                        </div>
                                        <div className='col-xl-7 p-5'>
                                            <div className='h3'>{blog.title}</div>
                                            <p className='my-3' dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 70) + "..." }}></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className='container-fluid bg-light mt-5' style={{ height: "411px" }}></div>

            <div className='container-fluid text-white mb-5' style={{ height: "1000px", backgroundColor: "#3f96e8" }}>
                <div className='container p-5'>
                    <div className=' text-center'>
                        <img src={about_us} alt="" className='img-fluid shadow' style={{ marginTop: "-300px" }} />
                    </div>
                    <div className='mt-5'>
                        <div className='h1 text-center'>
                            Biz nähili işleýäris ?
                        </div>
                        <div className='row justify-content-around my-5'>
                            <div className='col-xl-5 fw-normal lh-base' style={{ fontSize: "18px" }}>
                                “Arkadag Serdarly bagtyýar ýaşlar ýyly” mynasybetli ýaşlaryň arasynda geçirilýän ylmy işler boýunça  “Ýokary tehnologiýalar  we innowasion  işläp taýýarlamalary atly halkara bäsleşiginiň 2023-nji ýylda ýaşlaryň arasynda yglan edilen ylmy işleriň bäsleşigine “Himiki tehnologiýalar“ ugry boýunça  hödürlenýän temamyz  “Garabogaz köl önümçiliginiň ösüşiniň geljegi” taslamasynyň maglumat üpjünçiligi.</div>
                            <div className='col-xl-5 fw-normal lh-base' style={{ fontSize: "18px" }}>
                                Nanotehnologiýalar, himiki tehnologiýalar, täze materiallary öwrenmek we energetika ýurdumyzda  ylmyň ileri tutulýan ugurlary bolup durýar. Şoňa göräde, degişli pudaklary ösdürmek üçin bu ugurlarda dýüpli we amaly ylmy barlaglary geçirmek zerur bolup durýar.
                                <br /><br />
                                Administrasiya tarapyndan
                                <br /><br />
                                <Link to="/habarlasmak" className='btn btn-lg btn-outline-light px-5'>Habarlaşmak</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container' style={{ marginTop: "-150px" }}>
                <div className='row g-0'>
                    <div className='col-xl-4 mb-3'>
                        <div className='card border-0 rounded-0 bg-white py-3'>
                            <div className='display-5 fw-bold text-primary text-center'>A</div>
                            <div className='card-body text-center'>
                                <div className='card-title h4 mb-4 text-primary'>HTML, CSS, JS</div>
                                <p>
                                    Web dörediji hökmünde web sahypalaryny gurmak üçin ulanýan üç esasy dilimiz HTML, CSS we JavaScript. JavaScript programmirleme dilidir, sahypany gurmak üçin HTML ulanýarys we web sahypasyny dizaýn etmek we ýerleşdirmek üçin CSS ulanýarys.
                                </p>
                                <Link target='_blank' to="https://tr.wikipedia.org/wiki/HTML" className='text-dark text-decoration-none border-bottom pb-1' style={{ fontSize: "18px" }}>Maglumatlar</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 mb-3'>
                        <div className='card border-0 rounded-0 bg-white py-3'>
                            <div className='display-5 fw-bold text-primary text-center'>B</div>
                            <div className='card-body text-center'>
                                <div className='card-title h4 mb-4 text-primary'>REACT JS</div>
                                <p>React, ulanyjy interfeýslerini döretmek üçin açyk çeşme javascript kitaphanasydyr. “Facebook” -yň ýolbaşçylygyndaky dörediji topar tarapyndan işlenip düzülen “React”, “Model-View-Controller” ýörelgesine laýyklykda döredildi.</p>
                                <Link target='_blank' to="https://tr.wikipedia.org/wiki/React" className='text-dark text-decoration-none border-bottom pb-1' style={{ fontSize: "18px" }}>Maglumatlar</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 mb-3'>
                        <div className='card border-0 rounded-0 bg-white py-3'>
                            <div className='display-5 fw-bold text-primary text-center'>Ç</div>
                            <div className='card-body text-center'>
                                <div className='card-title h4 mb-4 text-primary'>NODE JS</div>
                                <p>Node.js, adatça serwer tarapyndaky torlaýyn programmalar üçin açyk çeşme iş wagtydyr. Node.js programmalary, adatça, müşderi tarapyndan skript dili bolan JavaScript-iň kömegi bilen işlenip düzülýär.</p>
                                <Link target='_blank' to="https://tr.wikipedia.org/wiki/Node.js" className='text-dark text-decoration-none border-bottom pb-1' style={{ fontSize: "18px" }}>Maglumatlar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid p-0 my-5'>
                <img src={contact_bg} alt="" className='img-fluid w-100' style={{ height: "600px", objectFit: "cover" }} />
                <div className='conatiner' style={{ marginTop: "-150px" }}>
                    <div className='row g-0 justify-content-center'>
                        <div className='col-xl-5'>
                            <div className="card border-0 shadow p-5">
                                <form className='row justify-content-center' onSubmit={handleClick}>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                                        <input value={contact.name} onChange={handleChange} name='name' type="text" className="form-control rounded-0" placeholder='Adynyz' autoComplete='off' />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                                        <input value={contact.email} onChange={handleChange} name='email' type="email" className="form-control rounded-0" placeholder='E-mail adresiniz' autoComplete='off' />
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-4">
                                        <input value={contact.subject} onChange={handleChange} name='subject' type="text" className="form-control rounded-0" placeholder='Temasy' autoComplete='off' />
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-4">
                                        <textarea value={contact.comment} onChange={handleChange} name='comment' typeof='text' className="form-control rounded-0" rows="6" placeholder='Mazmuny'></textarea>
                                    </div>
                                    <div className="col-xl-12 mb-4 text-center d-grid">
                                        <button type='submit' className='btn btn-outline-dark px-5'>Ugrat</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home