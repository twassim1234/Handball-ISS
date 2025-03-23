import {useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";

export default function AuthenticationLayout({ children, requiresAuth, allowedRoles, redirectTo }) {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    async function getUser() {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token){    
            if(requiresAuth){
                navigate("/");
            }
        }
        else{
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get("http://localhost:8000/admin");
            if(allowedRoles && !allowedRoles.includes(response.data.role_id)){
                navigate("/");
            }
            else{
                if(redirectTo){
                    navigate(redirectTo);
                }
                else{
                    setUser(response.data);
                }
            }
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