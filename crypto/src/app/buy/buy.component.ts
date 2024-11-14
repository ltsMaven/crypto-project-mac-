import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Stock } from '../models/stock';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  stock: Stock = new Stock('', null, null);
  fetchedPrice: number | null = null;
  stockArray: string[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}






  buyStock() {
    if (this.stock.symbol) {
      // Fetch the latest price before proceeding with the purchase
      this.dbService.getStockQuotes(this.stock.symbol).subscribe({
        next: (data: any) => {
          this.fetchedPrice = data.c; // Latest price from the API
          
          // Check if the fetched price is valid
          if (this.fetchedPrice !== null && this.fetchedPrice > 0) {
            this.stock.price = this.fetchedPrice; // Set the stock price to the latest price

            // Proceed with the purchase only after fetching the price
            this.dbService.newStocks(this.stock).subscribe({
              next: (result: any) => {
                console.log('Stock purchase successful:', result);
                this.router.navigate(['/']);
              },
              error: (err: any) => {
                console.error('Error during stock purchase:', err);
                alert('Stock does not exist.');
              }
            });
          } else {
            alert('Invalid stock symbol. Please check the symbol and try again.');
          }
        },
        error: (err: any) => {
          console.error('Error fetching stock price:', err);
          alert('Failed to fetch stock price. Please check the symbol.');
        }
      });
    } else {
      alert('Please enter a valid stock symbol.');
    }
  }
}
