type TotalCardProps = {
    type: string;
    value: string | null;
}

const TotalCard = ({ type, value }: TotalCardProps) => {
    return (
        <div className="bg-indigo-400 w-full border-2 border-indigo-500 p-4 rounded flex flex-col gap-2 justify-center">
            {type === "debit" &&
                <>
                    <h3 className="text-lg text-indigo-800 font-bold">Débito mensal</h3>
                    <p className="text-lg text-indigo-800 font-bold">R$ {value !== null ? value : "0"}</p>
                </>
            }
            {type === "credit" &&
                <>
                    <h3 className="text-lg text-indigo-800 font-bold">Crédito mensal</h3>
                    <p className="text-lg text-indigo-800 font-bold">R$ {value !== null ? value : "0"}</p>
                </>
            }
        </div>
    )
}

export default TotalCard