import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

const URL_BACKEND = "http://localhost:8080"
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  listStocks() {
    return this.http.get(`${URL_BACKEND}/getStocks`)
  }

  newStocks(body: any) {
    return this.http.post(`${URL_BACKEND}/buy`, body, httpOptions)
  }

  deleteStock(id: any) {
    return this.http.delete(`${URL_BACKEND}/delete/${id}`, httpOptions)
  }

  getStockQuotes(symbol: string) {
    return this.http.get(`${URL_BACKEND}/finnhub/quote/${symbol}`)
  }
}
