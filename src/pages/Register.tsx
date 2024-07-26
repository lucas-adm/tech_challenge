import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

type Register = {
    username: string;
    email: string;
    password: string;
};

const Register = () => {

    const [darkMode] = useState<boolean>(() => { return window.matchMedia("(prefers-color-scheme: dark)").matches; });

    const initialData: Register = {
        username: "",
        email: "",
        password: ""
    };

    const [data, setData] = useState<Register>(initialData);
    const [errors, setErrors] = useState<Register>(initialData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors({
            ...errors, [event.target.name]: ""
        })
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }

    const navigate = useNavigate();

    const [requesting, setRequesting] = useState<boolean>(false);

    useEffect(() => {
        setData({
            ...data,
            username: data.username.toLowerCase(),
            email: data.email.toLowerCase()
        });
    }, [data.username, data.email]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(), setRequesting(true);

        const regex: RegExp = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        if (regex.test(data.email) === false) {
            setRequesting(false);
            return setErrors({ ...errors, email: "Email inválido." });
        }

        const API = import.meta.env.VITE_API;
        axios.post(`${API}/register`, data)
            .then(() => navigate('/login'))
            .catch((err) => {
                const { username, email, password } = JSON.parse(err.config.data);
                if (username.length > 33) {
                    setErrors({ ...errors, username: "Máximo de 33 caracteres." });
                }
                if (email.length > 50) {
                    setErrors({ ...errors, email: "Máximo de 50 caracteres." });
                }
                if (password.length > 33) setErrors({ ...errors, password: "Máximo de 33 caracteres." });
                if (err.response.data.error === "Username unavailable") {
                    return setErrors({ ...errors, username: "Usuário já existe." });
                }
                if (err.response.data.error === "Email unavailable") {
                    return setErrors({ ...errors, email: "Email já existe." });
                }
            })
            .finally(() => {
                setRequesting(false);
            });
    }

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <section className="w-screen max-w-full h-svh md:h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <section className="w-screen max-w-full h-svh md:h-screen flex flex-col flex-center justify-center items-center bg-white dark:bg-slate-900">
                    <Link to={'/login'}><img src="/imgs/favicon.png" alt="favicon" className="w-24 -full backdrop transition" style={{ filter: "drop-shadow(0 0 2rem #5b21b6)" }} /></Link>
                    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-2 p-8">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="w-fit dark:text-white">Nome</label>
                            <input id="username" name="username" type="text" placeholder="Insira seu nome" required onChange={handleChange} className="p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition" />
                            <span className="text-red-500">{errors.username}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="w-fit dark:text-white">Email</label>
                            <input id="email" name="email" type="text" placeholder="Insira seu email" required onChange={handleChange} className="p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition" />
                            <span className="text-red-500">{errors.email}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="w-fit dark:text-white">Senha</label>
                            <input id="password" name="password" type="password" placeholder="Insira sua senha" required onChange={handleChange} className="p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition" />
                            <span className="text-red-500">{errors.password}</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-violet-500 bg-opacity-50 dark:bg-opacity-100 py-2 px-4 rounded text-lg text-violet-600 w-full text-center dark:text-white mt-4 hover:shadow-md hover:shadow-violet-400 transition">{requesting ? "Registrando..." : "Registrar"}</button>
                        </div>
                    </form>
                </section>
                <div className="lg:col-span-2 xl:col-span-3 pattern-isometric pattern-violet-600 pattern-bg-slate-50 dark:pattern-bg-slate-900 pattern-size-16 pattern-opacity-50 dark:pattern-opacity-80"></div>
            </section>
        </div>
    )
}

export default Register