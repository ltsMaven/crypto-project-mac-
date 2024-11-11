import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyComponent } from './buy/buy.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'buy', component: BuyComponent}
];
