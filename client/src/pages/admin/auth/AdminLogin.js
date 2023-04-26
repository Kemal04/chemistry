import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
import Api_Address from '../../../env'

const AdminLogin = () => {

    const { loginAdmin } = useContext(AuthContext);

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const loginUser = async (e) => {
        e.preventDefault();


        if (!login.email) {
            toast.error("E-mail adresini ýazyň!")
        }
        else if (!login.password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (login.password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            loginAdmin(login)
            navigate("/admin/giris-etmek")
        }
    }

    return (
        <div style={{ height: "100vh" }} className='bg-dark d-flex justify-content-center align-items-center'>
            <form onSubmit={loginUser} className='card border-0 shadow p-5 rounded-0' style={{ backgroundColor: "#323c48" }}>
                <div className='h2 text-center text-white mx-5 mb-3'>Admin Panel</div>
                <div className='h5 text-center text-secondary mx-5 mb-5'>Giriş etmek</div>
                <div className="mb-4">
                    <input name='email' value={login.email} onChange={handleChange} type="email" className="form-control rounded-0 border-0 text-white px-3 py-2" style={{ backgroundColor: "#3b4654" }} placeholder='Email address' />
                </div>
                <div className="mb-5">
                    <input name='password' value={login.password} onChange={handleChange} type="password" className="form-control rounded-0 border-0 text-white px-3 py-2" style={{ backgroundColor: "#3b4654" }} placeholder='Password' />
                </div>
                <button type="submit" className="btn btn-primary rounded-0">Giriş</button>
            </form>
        </div>
    )
}

export default AdminLogin