import axios from "axios";
import { useState } from "react";
import React, { forwardRef } from 'react';

export type Launch = {
    id?: number | null;
    date: string;
    description: string;
    value: string;
    type: string;
};

type Errors = {
    date: string;
    description: string;
    value: string;
    type: string;
}

type FormProps = {
    onSubmit: () => void,
    ref: React.RefObject<HTMLFormElement>
}

const Form = forwardRef<HTMLFormElement, FormProps>(({ onSubmit }, ref) => {

    const [darkMode] = useState<boolean>(() => { return window.matchMedia("(prefers-color-scheme: dark)").matches; });

    const initialLaunch: Launch = {
        date: "",
        description: "",
        value: "",
        type: "debit"
    };

    const initialErrors: Errors = {
        date: "",
        description: "",
        value: "",
        type: ""
    }

    const [data, setData] = useState<Launch>(initialLaunch);
    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [lastKey, setLastKey] = useState<string | null>(null);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setLastKey(event.key);
    };

    const [date, setDate] = useState<string>("");
    const [validDate, setValidDate] = useState<boolean>(false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrors({
            ...errors,
            [event.target.name]: ""
        });

        if (event.target.name === "date") {
            const value = event.target.value.replace(/\D/g, '').slice(0, 8);

            const dd = value.slice(0, 2);
            if (Number(dd.charAt(0)) > 3) return event.target.value = "";

            let mm = value.slice(2, 4);
            mm = mm.length === 1 && Number(mm.charAt(0)) > 1 ? `0${mm}` : mm;

            const yyyy = value.slice(4);

            const isBackSpacing = lastKey === "Backspace";

            event.target.value = `${dd}${dd.length >= 2 && (!isBackSpacing || event.target.value.length > 3) ? "/" : ""}${mm}${mm.length >= 2 && (!isBackSpacing || event.target.value.length > 6) ? "/" : ""}${yyyy}`;

            setDate(`${yyyy.length === 4 ? yyyy + "-" : ""}${mm.length ? mm + "-" : ""}${dd}`);
            setValidDate(yyyy.length === 4);
        }

        if (event.target.name === "value") {
            event.target.value = event.target.value.replace(/[^\d.]/g, '');
        }

        setData({
            ...data,
            [event.target.name]: event.target.value,
            date: date,
        });
    };

    const [requesting, setRequesting] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(), setRequesting(true);

        if (!validDate) {
            setRequesting(false);
            return setErrors({ ...errors, date: "Data inválida" });
        }
        if (!(parseFloat(data.value) > 0)) {
            setRequesting(false);
            return setErrors({ ...errors, value: "Número inválido" });
        }

        try {
            setData({
                ...data,
                date: new Date(data.date).toISOString().split('T')[0],
            })
        } catch {
            setRequesting(false);
            return setErrors({ ...errors, date: "Data inválida" });
        }

        const API = import.meta.env.VITE_API;

        axios.post(`${API}/launch`, data)
            .then(() => {
                location.reload();
                onSubmit();
            })
            .catch((err) => {
                const { description, value } = JSON.parse(err.config.data);
                if (description.length > 88) setErrors({ ...errors, description: "Máximo de 77 caracteres." })
                if ((value.replace('.', '')).length > 12) setErrors({ ...errors, value: "Máximo de 12 dígitos." })
                if (isNaN(value) && !isFinite(value)) setErrors({ ...errors, value: "Número inválido" })
            })
            .finally(() => {
                setRequesting(false);
            })

    };

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <form ref={ref} onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-500 flex flex-col gap-2 bg-slate-50 dark:bg-slate-900 w-full max-w-md p-8 rounded">
                <div className="flex flex-col gap-1">
                    <label htmlFor="date" className="w-fit dark:text-white">Data</label>
                    <input id="date" name="date" type="text" placeholder={`Hoje: ${new Date().toLocaleDateString('pt-BR')}`} required onChange={handleOnChange} onKeyDown={handleKeyDown} className="p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none" />
                    <span className="text-red-500">{errors.date}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="w-fit dark:text-white">Descrição</label>
                    <textarea id="description" name="description" placeholder="Descreva brevemente sua ação" value={data.description} required onChange={handleOnChange} className="min-h-20 p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none resize-none" />
                    <span className="text-red-500">{errors.description}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="value" className="w-fit dark:text-white">Valor</label>
                    <input id="value" type="text" name="value" placeholder="Siga o modelo: 11.11" value={data.value} required onChange={handleOnChange} className="p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none" />
                    <span className="text-red-500">{errors.value}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="type" className="w-fit dark:text-white">Tipo</label>
                    <select name="typelist" id="type" value={data.type} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setData({ ...data, type: event.target.value }) }} className="p-2 border border-slate-400 rounded focus:border-indigo-500 focus:outline-none">
                        <option value="debit">débito</option>
                        <option value="credit">crédito</option>
                    </select>
                    <span className="text-red-500">{errors.type}</span>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-indigo-500 bg-opacity-50 py-2 px-4 rounded text-lg text-indigo-800 w-full mt-4 dark:text-white">{requesting ? "Lançando..." : "Lançar"}</button>
                </div>
            </form>
        </div>
    )
});

export default Form