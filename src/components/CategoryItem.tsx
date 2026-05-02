type CategoryProps = {
    nameCategory: String,
    onSelect: Function
}
export default function CategoryItem({nameCategory, onSelect} : CategoryProps){
    return <div>
        <button onClick={() => onSelect(nameCategory)}>{nameCategory}</button>
    </div>
}