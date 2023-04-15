import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import Api_Address from '../../../env';
import { toast } from 'react-toastify'

const Register = () => {

    const { setCurrentUser } = useContext(AuthContext);

    const [register, setRegister] = useState({
        email: "",
        password: "",
    })
    const [cPassword, setCPassword] = useState("")

    const handleChange = (e) => {
        setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!register.email) {
            toast.error("E-poçta adresi ýok!")
        }
        else if (!register.password) {
            toast.error("Açar sözi ýok!")
        }
        else if (!cPassword) {
            toast.error("Açar sözi gaýtalanmaly ýok!")
        }
        else if (cPassword !== register.password) {
            toast.error("Açar sözi gabat gelenok!")
        }
        else if (register.password.length < 8) {
            toast.error("Açar sözi 8-den uly bolmaly!")
        }
        else {
            await axios.post(`${Api_Address}/api/auth/register`, register).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    localStorage.setItem("accessToken", res.data.token)
                    setCurrentUser({
                        email: res.data.email,
                        id: res.data.id,
                        status: true,
                        role: res.data.role,
                    });
                    toast.success(res.data.success)
                    navigate("/")
                    window.location.reload()
                }
            })
        }
    }

    return (
        <>
            <div className='login-body'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <div className='row g-0 align-items-center border-0 rounded bg-white'>
                                <div className='col-xl-6'>
                                    <div className='p-5'>
                                        <div className='h2 mb-5'>Hasaba Durmak</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <input onChange={handleChange} name='email' type="email" className="form-control rounded-0" placeholder='E-poçta adresi' />
                                            </div>
                                            <div className="mb-4">
                                                <input onChange={handleChange} name='password' type="password" className="form-control rounded-0" placeholder='Açar sözi' />
                                            </div>
                                            <div className="mb-4">
                                                <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} name='cPassword' type="password" className="form-control rounded-0" placeholder='Açar sözi gaýtala' />
                                            </div>
                                            <div className='d-grid'>
                                                <button type='submit' className="btn btn-sm btn-outline-dark rounded-0 px-5 fw-bold">Hasaba Dur</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='col-xl-6'>
                                    <div className='bg-login p-5 text-white'>
                                        <div className='display-1 fw-bold'>Hello World.</div>
                                        <p className='small my-3'>
                                            Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum, oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu doldurmak için kullanılır
                                        </p>
                                        <div className='small my-4'> Do you have an account ? </div>
                                        <Link to="/giris-etmek" className="btn btn-outline-light rounded-0 px-5 fw-bold">Giriş etmek</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register