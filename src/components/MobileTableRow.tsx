import TableRow from "./TableRow"

import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import axios from "axios";

const MobileTableRow = ({ id, date, description, value, type, onDelete }: TableRow) => {

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
        <div className="bg-white space-y-3 p-4 rounded-lg shadow break-words">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                    <div className="text-gray-500">{new Date(date).toLocaleDateString('pt-BR')}</div>
                    <div>
                        {type === "debit" &&
                            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">débito</span>
                        }
                        {type === "credit" &&
                            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-violet-800 bg-violet-200 rounded-lg bg-opacity-50">crédito</span>
                        }
                    </div>
                </div>
                <div className="text-lg text-gray-700">
                    {requesting ?
                        <>
                            <img src="/svgs/loading.svg" alt="loading icon" className="w-6 m-auto" />
                        </> :
                        <>
                            {requested ?
                                <>
                                    <FaCheckCircle onClick={() => handleDeleteById(id)} className="cursor-pointer text-red-500 hover:text-violet-500 transition-colors m-auto" />
                                </> :
                                <>
                                    <FaMinus onClick={request} className="cursor-pointer hover:text-violet-500 transition-colors m-auto" />
                                </>
                            }
                        </>
                    }
                </div>
            </div>
            <div className="text-sm text-gray-700">{description}</div>
            <div className="text-sm font-medium text-violet-500">R$ {value.replace('.', ',')}</div>
        </div>
    )
}

export default MobileTableRow