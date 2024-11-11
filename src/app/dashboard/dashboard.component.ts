import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Stock } from '../models/stock';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  portfolio: any[] = [];
  totalValue: number = 0;
  totalProfit: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    console.log('Fetching all stocks...');
    this.onGetStock();
  }

  onGetStock() {
    this.dbService.listStocks().subscribe({
      next: (data: any) => {
        this.portfolio = data;
        console.log('Stock data:', data);
        this.calculateTotalValue();
        this.updateMarket();
      },
      error: (err: any) => {
        console.error('Error fetching stocks:', err);
      }
    });
  }

  calculateTotalValue() {
    this.totalValue = this.portfolio.reduce(
      (sum, stock) => sum + stock.price * stock.units,
      0
    );
  }


  confirmSell(stock: any) {
    const confirmation = confirm(`Are you sure you want to sell ${stock.symbol}? `)
    if (confirmation) {
      this.sellStock(stock);
    }
    
  }


  sellStock(stock: any) {
    this.dbService.deleteStock(stock._id).subscribe({
      next: (response: any) => {
        console.log('Stock sold:', response);
        this.onGetStock(); // Refresh portfolio after selling
      },
      error: (err: any) => {
        console.error('Error selling stock:', err);
      }
    });
  }



  updateMarket() {
    this.totalProfit = 0; 
    this.totalValue = 0; 

    this.portfolio.forEach( stock => {
      this.dbService.getStockQuotes(stock.symbol).subscribe({
        next: (data: any) => {
          stock.currentPrice = data.c;
          const profitLoss = (stock.currentPrice - stock.price) * stock.units;
          stock['profitLoss'] = profitLoss; 
          this.totalProfit += profitLoss; 
          this.totalValue += stock.currentPrice * stock.units;
        },
        error: (err: any) => {
          console.error(`Error fetching profit or loss`)
        }
      })
    })
  }
}
