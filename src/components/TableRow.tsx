import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import axios from "axios"

type TableRow = {
    id?: number;
    date: string;
    description: string;
    value: string;
    type: string;
    onDelete: () => void;
}

const TableRow = ({ id, date, description, value, type, onDelete }: TableRow) => {

    const [requested, setRequested] = useState<boolean>(false);
    const [requesting, setRequesting] = useState<boolean>(false);

    const handleDeleteById = (id: number | undefined) => {
        setRequesting(true); const API = import.meta.env.VITE_API;
        axios.delete(`${API}/launch/${id}`)
            .then(() => { onDelete(); })
            .catch()
            .finally(() => setRequesting(false));
    }

    const request = () => {
        setRequested(true)
        setTimeout(() => { setRequested(false); }, 3000);
    }


    return (
        <tr className="bg-white">
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {new Date(date).toLocaleDateString('pt-BR')}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {description}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="font-bold text-indigo-500">R$ {value.replace('.', ',')}</span>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {type === "debit" &&
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        débito
                    </span>
                }
                {type === "credit" &&
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-800 bg-indigo-200 rounded-lg bg-opacity-50">
                        crédito
                    </span>
                }
            </td>
            <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                {requesting ?
                    <>
                        <img src="/svgs/loading.svg" alt="loading icon" className="w-6 m-auto" />
                    </> :
                    <>
                        {requested ?
                            <>
                                <FaCheckCircle onClick={() => handleDeleteById(id)} className="cursor-pointer text-red-500 hover:text-indigo-500 transition-colors m-auto" />
                            </> :
                            <>
                                <FaMinus onClick={request} className="cursor-pointer hover:text-indigo-500 transition-colors m-auto" />
                            </>
                        }
                    </>
                }
            </td>
        </tr>
    )
}

export default TableRow