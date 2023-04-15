import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {

    const { loginUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!login.email) {
            toast.error("E-poçta adresi ýok!")
        }
        else if (!login.password) {
            toast.error("Açar sözi ýok!")
        }
        else if (login.password.length < 8) {
            toast.error("Açar sözi 8-den uly bolmaly!")
        }
        else {
            loginUser(login)
            navigate("/giris-etmek")
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
                                    <div className='bg-login p-5 text-white'>
                                        <div className='display-1 fw-bold'>Hello World.</div>
                                        <p className='small my-3'>
                                            Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum, oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu doldurmak için kullanılır
                                        </p>
                                        <div className='small my-4'> Don't you have an account ? </div>
                                        <Link to="/hasaba-durmak " className="btn btn-outline-light rounded-0 px-5 fw-bold">Hasaba durmak</Link>
                                    </div>
                                </div>
                                <div className='col-xl-6'>
                                    <div className='p-5'>
                                        <div className='h2 mb-5'>Giriş Etmek</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <input onChange={handleChange} name='email' type="email" className="form-control rounded-0" placeholder='E-poçta adresi' />
                                            </div>
                                            <div className="mb-4">
                                                <input onChange={handleChange} name='password' type="password" className="form-control rounded-0" placeholder='Açar sözi' />
                                            </div>
                                            <div className='d-grid'>
                                                <button type='submit' className="btn btn-sm btn-outline-dark rounded-0 px-5 fw-bold">Giriş et</button>
                                            </div>
                                        </form>
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

export default Login