export class Stock {
    symbol: string; 
    price: number; 
    units: number; 
    constructor(symbol: string, price: number | null, units: number | null){
        this.symbol = '';
        this.price = 0;
        this.units = 0;
    }

}