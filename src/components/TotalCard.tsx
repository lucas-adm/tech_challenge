type TotalCardProps = {
    type: string;
    value: string | null;
}

const TotalCard = ({ type, value }: TotalCardProps) => {
    return (
        <div className="bg-violet-300 dark:bg-violet-200 rounded-md w-full border border-violet-500 p-4 flex flex-col gap-2 justify-center shadow">
            {type === "debit" &&
                <>
                    <h3 className="text-lg text-violet-800 dark:text-violet-600 font-bold">Débito mensal</h3>
                    <p className="text-lg text-violet-800 dark:text-violet-600 font-bold">R$ {value !== null ? value : "0"}</p>
                </>
            }
            {type === "credit" &&
                <>
                    <h3 className="text-lg text-violet-800 dark:text-violet-600 font-bold">Crédito mensal</h3>
                    <p className="text-lg text-violet-800 dark:text-violet-600 font-bold">R$ {value !== null ? value : "0"}</p>
                </>
            }
        </div>
    )
}

export default TotalCard