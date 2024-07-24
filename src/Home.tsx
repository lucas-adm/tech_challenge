import Form from "./components/Form"
import TableRow from "./components/TableRow"
import MobileTableRow from "./components/MobileTableRow"

import { useRef, useState } from "react"

const Home = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(!showModal);
    }

    // Continuar...
    // const modalRef = useRef<HTMLFormElement>(null);

    return (
        <div>
            <header className="w-screen max-w-full bg-indigo-500 p-4">
                <h1 className="text-3xl font-bold text-indigo-900">Contabilidade Eficiente</h1>
            </header>
            <main className="flex flex-col gap-4 w-full max-w-5xl m-auto p-4">
                <header className="flex justify-between gap-4 max-[475px]:flex-col">
                    <h2 className="text-2xl self-center">Lançamentos</h2>
                    <div className="flex gap-4 max-[475px]:justify-center">
                        <select name="yearlist" id="years">
                            <option value="2024">2024</option>
                        </select>
                        <select name="monthlist" id="months">
                            <option value="01">Janeiro</option>
                            <option value="02">Fevereiro</option>
                            <option value="03">Março</option>
                            <option value="04">Abril</option>
                            <option value="05">Maio</option>
                            <option value="06">Junho</option>
                            <option value="07">Julho</option>
                            <option value="08">Agosto</option>
                            <option value="09">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                        <button onClick={openModal} className="bg-indigo-500 bg-opacity-50 py-4 px-6 rounded text-lg text-indigo-800">Lançar</button>
                    </div>
                </header>

                <div className="flex justify-between gap-4">
                    <div className="bg-indigo-400 w-full border-2 border-indigo-500 p-4 rounded flex flex-col gap-2 items-center justify-center">
                        <h3 className="text-lg text-indigo-800 font-bold">Crédito mensal</h3>
                        <p className="text-lg text-indigo-800 font-bold">R$ 444,44</p>
                    </div>
                    <div className="bg-indigo-400 w-full border-2 border-indigo-500 p-4 rounded flex flex-col gap-2 items-center justify-center">
                        <h3 className="text-lg text-indigo-800 font-bold">Débito mensal</h3>
                        <p className="text-lg text-indigo-800 font-bold">R$ 444,44</p>
                    </div>
                </div>

                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Data</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Descrição</th>
                                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Valor</th>
                                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Tipo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <TableRow date="16/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="credit" />
                            <TableRow date="16/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="debit" />
                            <TableRow date="16/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="credit" />
                            <TableRow date="16/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="debit" />
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    <MobileTableRow date="10/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="credit" />
                    <MobileTableRow date="10/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="debit" />
                    <MobileTableRow date="10/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="credit" />
                    <MobileTableRow date="10/10/2021" description="Kring New Fit office chair, mesh + PU, black" value="200,00" type="debit" />
                </div>
            </main>
            {showModal &&
                <div className="h-svh md:h-screen w-screen bg-black fixed bg-opacity-85 top-0 left-0">
                    <Form />
                </div>
            }
        </div>
    )
}

export default Home