import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

type Login = {
    username: string;
    email: string;
    password: string;
};

const Login = () => {

    const [darkMode] = useState<boolean>(() => { return window.matchMedia("(prefers-color-scheme: dark)").matches; });

    const initialData: Login = {
        username: "",
        email: "",
        password: ""
    };

    const [data, setData] = useState<Login>(initialData);
    const [errors, setErrors] = useState<Login>(initialData);

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(), setRequesting(true);

        const regex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (regex.test(data.email) === false) {
            setRequesting(false);
            return setErrors({ ...errors, email: "Email inválido." });
        }

        const API = import.meta.env.VITE_API;
        axios.post(`${API}/login`, data)
            .then(() => {
                navigate('/');
                sessionStorage.setItem("logged", "true")
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 404) {
                    setErrors({ ...errors, username: "Talvez esteja errado", email: "Talvez esteja errado", password: "Talvez esteja errado" })
                }
                const { username, email, password } = JSON.parse(err.config.data);
                if (username.length > 33) setErrors({ ...errors, username: "Máximo de 33 caracteres." });
                if (email.length > 50) setErrors({ ...errors, email: "Máximo de 50 caracteres." });
                if (password.length > 33) setErrors({ ...errors, password: "Máximo de 33 caracteres." });
            })
            .finally(() => {
                setRequesting(false);
            })
    }

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <section className="w-screen h-svh md:h-screen flex flex-col gap-4 flex-center justify-center items-center bg-white dark:bg-slate-950">
                <img src="/imgs/favicon.png" alt="favicon" className="w-24 rounded-full border-2 border-transparent hover:border-indigo-500 transition-colors" />
                <form onSubmit={handleSubmit} className="w-full max-w-sm border-2 border-indigo-500 flex flex-col gap-2 bg-slate-50 dark:bg-slate-900 p-8 rounded">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="w-fit dark:text-white">Nome</label>
                        <input id="username" name="username" type="text" placeholder="Insira seu nome" required onChange={handleChange} className="p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none" />
                        <span className="text-red-500">{errors.username}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="w-fit dark:text-white">Email</label>
                        <input id="email" name="email" type="text" placeholder="Insira seu email" required onChange={handleChange} className="p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none" />
                        <span className="text-red-500">{errors.email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="w-fit dark:text-white">Senha</label>
                        <input id="password" name="password" type="password" placeholder="Insira sua senha" required onChange={handleChange} className="p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none" />
                        <span className="text-red-500">{errors.password}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-indigo-500 bg-opacity-50 py-2 px-4 rounded text-lg text-indigo-800 w-full text-center dark:text-white mt-4">{requesting ? "Conectando..." : "Conectar"}</button>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link to={'/register'} className="bg-white border-2 border-indigo-500 bg-opacity-50 dark:bg-opacity-100  py-2 px-4 rounded text-lg text-indigo-800 w-full text-center text-indigo-500 mt-4">Cadastrar</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Login