type TransactionItemProps = {
    id: Number,
    amount: Number,
    description: String,
    date: String,
    onDelete: Function
}

export default function TransactionItem({ id, amount, description, date, onDelete }: TransactionItemProps) {
    const isNegative = Number(amount) < 0;
    const formatted = `${isNegative ? '-' : '+'}$${Math.abs(Number(amount)).toFixed(2)}`;

    return (
        <div className="transaction-card">
            <div className="card-meta">
                <p className="card-description">{description.toString()}</p>
                <p className="card-date">{date.toString()}</p>
            </div>
            <p className={`card-amount${isNegative ? ' negative' : ''}`}>
                {formatted}
            </p>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
