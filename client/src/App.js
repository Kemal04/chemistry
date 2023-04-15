import React, { useContext } from 'react'

//ROUTER
import { Outlet, Navigate, Routes, Route } from 'react-router-dom'

//COMPONENTS
import { Footer, Navbar, ScrollToTop } from './components';

//CONTEXTS
import { AuthContext } from './context/AuthContext';

//USERINTERFACE
import { About, Contact, Home, Login, Register } from './pages/userInterface';

//CSS
import './App.css'

//TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/giris-etmek" />;
        }
        return children;
    };

    return (
        <>
            <ToastContainer />
            <ScrollToTop />

            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route path='/' index element={<Home />} />
                    <Route path='/biz-barada' index element={<About />} />
                    <Route path='/habarlasmak' index element={<Contact />} />
                </Route>

                {
                    !currentUser.status && (
                        <>
                            <Route path='/giris-etmek' index element={<Login />} />
                            <Route path='/hasaba-durmak' index element={<Register />} />
                        </>
                    )
                }
            </Routes>
        </>
    )
}

const Layout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

export default App