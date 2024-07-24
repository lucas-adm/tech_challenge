import TableRow from "./TableRow"

const MobileTableRow = ({ date, description, value, type }: TableRow) => {
    return (
        <div className="bg-white space-y-3 p-4 rounded-lg shadow break-words">
            <div className="flex items-center space-x-2 text-sm">
                <div className="text-gray-500">{new Date(date).toLocaleDateString('pt-BR')}</div>
                <div>
                    {type === "debit" &&
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">débito</span>
                    }
                    {type === "credit" &&
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-800 bg-indigo-200 rounded-lg bg-opacity-50">crédito</span>
                    }
                </div>
            </div>
            <div className="text-sm text-gray-700">{description}</div>
            <div className="text-sm font-medium text-indigo-500">R$ {value.replace('.', ',')}</div>
        </div>
    )
}

export default MobileTableRow