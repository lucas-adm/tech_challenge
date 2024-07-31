import { useState, useEffect } from "react";
import { forwardRef } from 'react';

import { NumberFormatValues, NumericFormat } from 'react-number-format';

import axios from "axios";


export type Launch = {
    id?: number;
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
    ref: React.RefObject<HTMLFormElement>;
    onSubmit: () => void;
    onNewLaunch: () => void;
}

const Form = forwardRef<HTMLFormElement, FormProps>(({ onSubmit, onNewLaunch }, ref) => {

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

        setData({
            ...data,
            [event.target.name]: event.target.value,
            date: date,
        });
    };

    const [requesting, setRequesting] = useState<boolean>(false);

    useEffect(() => {
        setData({
            ...data,
            date: data.date
        })
    }, [data.date])

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
                onSubmit();
                onNewLaunch();
            })
            .catch((err) => {
                const { date, description, value } = JSON.parse(err.config.data);
                if (Number(date.slice(5, 7) % 2) === 0 && Number(date.slice(8, 10)) > 30) setErrors({ ...errors, date: "Data inválida." })
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
            <form ref={ref} onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-full max-w-sm p-8 border-2 border-violet-500 flex flex-col gap-2 bg-white dark:bg-slate-900 rounded">
                <div className="flex flex-col gap-1">
                    <label htmlFor="date" className="w-fit dark:text-white">Data</label>
                    <input id="date" name="date" type="text" placeholder={`Hoje: ${new Date().toLocaleDateString('pt-BR')}`} required onChange={handleOnChange} onKeyDown={handleKeyDown} className="p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition" />
                    <span className="text-red-500">{errors.date}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="w-fit dark:text-white">Descrição</label>
                    <textarea id="description" name="description" placeholder="Descreva brevemente sua ação" value={data.description} required onChange={handleOnChange} className="min-h-20 p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition resize-none" />
                    <span className="text-red-500">{errors.description}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="value" className="w-fit dark:text-white">Valor</label>
                    <NumericFormat
                        className="p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition"
                        value={data.value}
                        onValueChange={(values: NumberFormatValues) => {
                            setData({ ...data, value: values.value })
                        }}
                        allowLeadingZeros={false}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        decimalSeparator=","
                        thousandSeparator="."
                        prefix="R$ "
                        placeholder="Insira seu valor"
                    />
                    <span className="text-red-500">{errors.value}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="type" className="w-fit dark:text-white">Tipo</label>
                    <select name="typelist" id="type" value={data.type} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setData({ ...data, type: event.target.value }) }} className="p-2 border border-slate-400 rounded focus:border-violet-500 focus:outline-none focus:shadow-md focus:shadow-violet-400 transition">
                        <option value="debit">débito</option>
                        <option value="credit">crédito</option>
                    </select>
                    <span className="text-red-500">{errors.type}</span>
                </div>
                <div className="flex items-center justify-center text-center">
                    <button className="bg-violet-500 bg-opacity-50 dark:bg-opacity-100 py-2 px-4 rounded text-lg text-white w-full text-center dark:text-white mt-4 hover:bg-violet-800 transition">{requesting ? "Lançando..." : "Lançar"}</button>
                </div>
            </form>
        </div>
    )
});

export default Form