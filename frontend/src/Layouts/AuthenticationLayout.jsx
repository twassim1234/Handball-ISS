import {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthenticationLayout({ children, requiresAuth, allowedRoles }) {
    const navigate = useNavigate();
    async function getUser() {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token){
            navigate('/home');
        }
        else{
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get("http://localhost:8000/admin");
            console.log(response.data);
        } 
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            {children}
        </>
    )
}