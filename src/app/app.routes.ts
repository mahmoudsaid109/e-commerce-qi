import { Routes } from '@angular/router';
import { ProdutListComponent } from './components/produt-list/produt-list.component';
import { HoppingCartSummary } from './components/hopping-cart-summary/hopping-cart-summary';

export const routes: Routes = [
  { path: '', component: ProdutListComponent },
  { path: 'cart', component: HoppingCartSummary },
  { path: '**', redirectTo: '' }
];
