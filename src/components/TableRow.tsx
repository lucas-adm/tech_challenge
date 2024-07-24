type TableRow = {
    date: string;
    description: string;
    value: string;
    type: string;
}

const TableRow = ({ date, description, value, type }: TableRow) => {

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
        </tr>
    )
}

export default TableRow