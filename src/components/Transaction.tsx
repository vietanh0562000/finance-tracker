type TransactionItemProps = {
    amount: Number,
    description: String, 
    date: String
}
export default function TransactionItem({amount, description, date} : TransactionItemProps){
    return (
        <div>
            <p>{amount.toString()}</p>
            <p>{description}</p>
            <p>{date}</p>
        </div>
    )
}