import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Api_Address from "../env";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    //CURRENT USER GET
    const [currentUser, setCurrentUser] = useState({
        email: "",
        id: 0,
        status: false,
        role: "User",
    });

    //LOGIN PAGE
    const login = async (inputs) => {
        const res = await axios.post("http://localhost:3001/api/auth/login", inputs, {
            withCredentials: true
        })
        setCurrentUser(res.data)
    }

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

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};