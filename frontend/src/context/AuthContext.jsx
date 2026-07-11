import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("access");

        if (token) {

            api.defaults.headers.Authorization = `Bearer ${token}`;

            api.get("accounts/me/")
                .then((response) => {

                    setUser(response.data);

                })
                .catch(() => {

                    localStorage.clear();

                    setUser(null);

                })
                .finally(() => {

                    setLoading(false);

                });

        } else {

            setLoading(false);

        }

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}