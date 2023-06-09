import React, { useContext } from 'react'

//ROUTER
import { Outlet, Navigate, Routes, Route } from 'react-router-dom'

//COMPONENTS
import { AdminNavbar, AdminSidebar, Footer, Navbar, ScrollToTop } from './components';

//CONTEXTS
import { AuthContext } from './context/AuthContext';

//USERINTERFACE
import { About, Blog, BlogRead, Contact, Home, Login, Register } from './pages/userInterface';

//CSS
import './App.css'

//TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './context/ThemeContext';
import { Admin, AdminBlogCreate, AdminBlogEdit, AdminLogin, AdminUsers, AdminBlogs, AdminContact } from './pages/admin';

const App = () => {

    const { currentUser } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext)

    const LoginRoute = ({ children }) => {
        if (currentUser.status) {
            return <Navigate to="/" />;
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
                    <Route path='/biz-barada' element={<About />} />
                    <Route path='/habarlasmak' element={<Contact />} />

                    <Route path='/maglumatlar' element={<Blog />} />
                    <Route path='/maglumat/:blogId' element={<BlogRead />} />
                </Route>

                <Route path='/' element={<LoginRoute><Auth /></LoginRoute>} >
                    <Route path='/giris-etmek' element={<Login />} />
                    <Route path='/hasaba-durmak' element={<Register />} />
                </Route>

                <Route path='/' element={<AdminLayout darkMode={darkMode} />} >
                    <Route path='/admin' element={<Admin />} />

                    <Route path='/admin/teswirler' element={<AdminContact />} />

                    <Route path='/admin/maglumatlar' element={<AdminBlogs />} />
                    <Route path='/admin/maglumat-gos' element={<AdminBlogCreate />} />
                    <Route path='/admin/maglumat-uytget/:blogId' element={<AdminBlogEdit />} />
                </Route>

                <Route path='/' element={<LoginRoute><Auth /></LoginRoute>} >
                    <Route path='/admin/giris-etmek' element={<AdminLogin />} />
                </Route>

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

const Auth = () => {
    return (
        <>
            <Outlet />
        </>
    );
};


const AdminLayout = ({ darkMode }) => {
    return (
        <div className={`${darkMode ? "bg-dark" : "bg-main"}`}>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <nav id='sidebarMenu' className="col-xl-2 col-lg-2 col-md-2 d-md-block position-fixed collapse" style={darkMode ? { backgroundColor: "#212529", zIndex: "100" } : { backgroundColor: "#edf2f9", zIndex: "100" }}>
                        <AdminSidebar />
                    </nav>

                    <main className="col-xl-9 col-lg-9 col-md-9 ms-sm-auto px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div >
        </div >
    );
};

export default App