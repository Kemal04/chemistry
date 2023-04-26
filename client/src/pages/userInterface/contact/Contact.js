import { faClock, faEnvelope, faMapLocation, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Api_Address from '../../../env'
import axios from 'axios'

const Contact = () => {

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

    return (
        <>
            <div className='home-bg-mini d-flex align-items-center'>
                <div className='container'>
                    <div className='row justify-content-center text-center align-items-center'>
                        <div className='col-xl-12 text-white'>
                            <div className='h1 fw-normal'>Habarlasmak</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white py-5'>
                <div className='container pb-5' style={{ marginTop: "-80px" }}>
                    <div className="card border-0 shadow p-5 bg-white">
                        <div className='row align-items-start'>
                            <div className='col-xl-3 col-lg-3 col-md-6 col-12 mb-4 text-center'>
                                <FontAwesomeIcon icon={faPhone} style={{ fontSize: "24px" }} />
                                <div className='h4 mt-3'>Telefon</div>
                                <div className='text-secondary'>+993 12 942179</div>
                            </div>
                            <div className='col-xl-3 col-lg-3 col-md-6 col-12 mb-4 text-center'>
                                <FontAwesomeIcon icon={faMapLocation} style={{ fontSize: "24px" }} />
                                <div className='h4 mt-3'>Salgymyz</div>
                                <div className='text-secondary'>Magtymguly şaýoly 68, Aşgabat, Türkmenistan</div>
                            </div>
                            <div className='col-xl-3 col-lg-3 col-md-6 col-12 mb-4 text-center'>
                                <FontAwesomeIcon icon={faClock} style={{ fontSize: "24px" }} />
                                <div className='h4 mt-3'>Iş wagtlarymyz</div>
                                <div className='text-secondary'>07:00-dan, 22:00 çenli</div>
                            </div>
                            <div className='col-xl-3 col-lg-3 col-md-6 col-12 mb-4 text-center'>
                                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "24px" }} />
                                <div className='h4 mt-3'>E-mail salgymyz</div>
                                <div className='text-secondary'>ttii.rektorlyk@online.tm</div>
                            </div>
                        </div>

                        <div className='t-3'>
                            <iframe title='0' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1903.0950130780116!2d58.391910516532896!3d37.940715927955566!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6ffde031dfabcd%3A0xf7a6540cdc19e8a7!2z0KLRg9GA0LrQvNC10L3RgdC60LjQuSDQk9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0JjQvdGB0YLQuNGC0YPRgiDQotGA0LDQvdGB0L_QvtGA0YLQsCDQuCDQodCy0Y_Qt9C4LCBBxZ9nYWJhdCwg0KLRg9GA0LrQvNC10L3QuNGB0YLQsNC9!5e1!3m2!1sru!2sus!4v1682438481619!5m2!1sru!2sus" style={{ border: "1px", width: "100%", height: "500px" }} allowFullScreen loading="lazy"></iframe>
                        </div>

                    </div>

                    <div className='text-center my-5'>
                        <div className='h6 ls-2 mb-3 text-primary'>Habarlaşmak</div>
                        <div className='h1'>Bize hat ugradyň</div>
                    </div>

                    <form className='row justify-content-center' onSubmit={handleClick}>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-4">
                            <input value={contact.name} onChange={handleChange} name='name' type="text" className="form-control rounded-0" placeholder='Adynyz' autoComplete='off' />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-4">
                            <input value={contact.email} onChange={handleChange} name='email' type="email" className="form-control rounded-0" placeholder='E-mail adresiniz' autoComplete='off' />
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-12 mb-4">
                            <input value={contact.subject} onChange={handleChange} name='subject' type="text" className="form-control rounded-0" placeholder='Temasy' autoComplete='off' />
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-12 mb-4">
                            <textarea value={contact.comment} onChange={handleChange} name='comment' typeof='text' className="form-control rounded-0" rows="6" placeholder='Mazmuny'></textarea>
                        </div>
                        <div className="col-xl-8 mb-4 text-center d-grid">
                            <button type='submit' className='btn btn-outline-primary px-5'>Ugrat</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact