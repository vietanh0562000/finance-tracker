export const Category = {
    Food: 'FOOD',
    Drink: 'DRINK',
    Study: 'STUDY',
    Work: 'WORK',
    Travel: 'TRAVEL',

    getAll() {
        return [
            this.Food, 
            this.Drink,
            this.Study,
            this.Work,
            this.Travel
        ]
    }
}