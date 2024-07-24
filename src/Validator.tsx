import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Validator = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!(sessionStorage.getItem("logged") !== null && sessionStorage.getItem("logged") === "true")) return navigate('/login');
    }, [])

    return <>{children}</>
    
}

export default Validator