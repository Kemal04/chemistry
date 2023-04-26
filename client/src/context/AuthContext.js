import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Api_Address from "../env";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    //CURRENT USER GET
    const [currentUser, setCurrentUser] = useState({
        email: "",
        id: 0,
        status: false,
        role: "User",
    });

    //SET CURRENT USER
    useEffect(() => {
        axios.get(`${Api_Address}/api/auth/current`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            if (res.data.error) {
                setCurrentUser({ ...currentUser, status: false, role: "User" });
            } else {
                setCurrentUser({
                    email: res.data.email,
                    id: res.data.id,
                    status: true,
                    role: res.data.role,
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //ADMIN PAGE
    const loginAdmin = async (login) => {
        await axios.post(`${Api_Address}/api/auth/rootman`, login).then((res) => {
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
            }

        })
    }

    //LOGIN PAGE
    const loginUser = async (login) => {
        await axios.post(`${Api_Address}/api/auth/login`, login).then((res) => {
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
            }

        })
    }

    const registerUser = async (register) => {
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
            }
        })
    }


    return (
        <AuthContext.Provider value={{ currentUser, loginUser, registerUser, setCurrentUser, loginAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};