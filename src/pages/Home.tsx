import { Launch } from "../components/Form";

import Form from "../components/Form";
import TableRow from "../components/TableRow";
import MobileTableRow from "../components/MobileTableRow";

import TotalCard from "../components/TotalCard";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Home = () => {

    const [darkMode] = useState<boolean>(() => { return window.matchMedia("(prefers-color-scheme: dark)").matches; });

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => { setShowModal(!showModal) };

    const modalRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const handler = (event: MouseEvent | KeyboardEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false)
            }
        }
        document.addEventListener('mousedown', handler);
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === "Escape") handler(event);
        })
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === "Escape") handler(event);
            })
        }
    }, [])

    const [currentDate, setCurrentDate] = useState({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    const [totals, setTotals] = useState({
        totalDebit: "0",
        totalCredit: "0",
    })

    const [launchs, setLaunchs] = useState<Launch[]>([]);

    const [newLaunchs, setNewLaunchs] = useState<number>(0);

    const [requesting, setRequesting] = useState<boolean>(false);

    useEffect(() => {
        setRequesting(true);
        const API = import.meta.env.VITE_API;
        axios.get(`${API}/launchs?month=${currentDate.month}&year=${currentDate.year}`)
            .then((res) => {
                setLaunchs(res.data.launchs)
                setTotals({
                    ...totals, totalDebit: res.data.totalDebitValue.totalDebit, totalCredit: res.data.totalCreditValue.totalCredit
                })
            })
            .catch()
            .finally(() => setRequesting(false));
    }, [currentDate, newLaunchs])

    const navigate = useNavigate();

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="w-screen max-w-full min-h-svh md:min-h-screen bg-slate-50 dark:bg-slate-900 bg-gradient-to-b from-transparent via-transparent to-violet-50 dark:to-violet-900/25">
                <header className="w-screen max-w-full p-2 bg-gradient-to-b from-violet-300 to-transparent ... dark:from-violet-950">
                    <div className="hidden md:flex max-w-5xl m-auto items-center justify-between p-2">
                        <div className="flex items-center justify-center gap-2">
                            <img src="/imgs/favicon.png" alt="favicon" className="w-16" />
                            <h1 className="text-3xl font-bold text-violet-600 dark:text-violet-300 bg-white/30 shadow-md backdrop-blur-sm w-fit py-1 px-2 rounded-lg">Contabilidade Eficiente</h1>
                        </div>
                        <button onClick={() => { sessionStorage.removeItem("logged"), navigate('/login') }} className="text-violet-900 dark:text-white font-bold">Sair</button>
                    </div>
                    <div className="md:hidden flex justify-between p-4">
                        <div className="flex items-center justify-center gap-2">
                            <img src="/imgs/favicon.png" alt="favicon" className="w-16" />
                            <h1 className="text-3xl font-bold text-violet-600 dark:text-violet-300 bg-white/30 backdrop-blur-sm w-fit py-1 px-2 rounded-lg">C.E</h1>
                        </div>
                        <button onClick={() => { sessionStorage.removeItem("logged"), navigate('/login') }} className="text-violet-900 dark:text-white font-bold">Sair</button>
                    </div>
                </header>
                <main className="flex flex-col gap-4 w-full max-w-5xl m-auto p-4">
                    <header className="flex justify-between gap-4 max-[475px]:flex-col">
                        <h2 className="text-2xl self-center dark:text-white">Lançamentos</h2>
                        <div className="flex gap-4 max-[475px]:justify-center">
                            <select name="yearlist" id="years" value={currentDate.year} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCurrentDate({ ...currentDate, year: Number(event.target.value) }) }}>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                            </select>
                            <select name="monthlist" id="months" value={currentDate.month} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCurrentDate({ ...currentDate, month: Number(event.target.value) }) }}>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                            <button onClick={toggleModal} className="bg-violet-600  text-white py-2 px-4 rounded text-lg dark:text-white hover:bg-violet-800 transition-colors">Registrar</button>
                        </div>
                    </header>
                    {requesting ?
                        <>
                            <img src="/svgs/loading.svg" alt="loading signal" className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12" />
                        </> :
                        <>
                            <div className="flex justify-between gap-4">
                                <TotalCard type="debit" value={totals.totalDebit} />
                                <TotalCard type="credit" value={totals.totalCredit} />
                            </div>
                            <div className="overflow-auto rounded-lg shadow hidden md:block">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                        <tr>
                                            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Data</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Descrição</th>
                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Valor</th>
                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Tipo</th>
                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {launchs.map(launch => (
                                            <TableRow key={launch.id} id={launch.id} date={launch.date} description={launch.description} value={launch.value} type={launch.type} onDelete={() => { setNewLaunchs(prevLaunchs => prevLaunchs - 1) }} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                {launchs.map(launch => (
                                    <MobileTableRow key={launch.id} id={launch.id} date={launch.date} description={launch.description} value={launch.value} type={launch.type} onDelete={() => { setNewLaunchs(prevLaunchs => prevLaunchs - 1) }} />
                                ))}
                            </div>
                        </>
                    }
                </main>
                {showModal &&
                    <div className="min-h-svh md:min-h-screen w-screen fixed top-0 left-0 backdrop-blur-md">
                        <Form ref={modalRef} onSubmit={toggleModal} onNewLaunch={() => { setNewLaunchs(prevLaunchs => prevLaunchs + 1) }} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Home