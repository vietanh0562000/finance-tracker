type TransactionItemProps = {
    amount: Number,
    description: String,
    date: String
}

export default function TransactionItem({ amount, description, date }: TransactionItemProps) {
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
        </div>
    );
}
