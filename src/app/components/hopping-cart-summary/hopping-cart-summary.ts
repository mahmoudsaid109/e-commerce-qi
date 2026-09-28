import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-hopping-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hopping-cart-summary.html',
  styleUrl: './hopping-cart-summary.css',
})
export class HoppingCartSummary {
  cartService = inject(CartService);

  get cartList() {
    return this.cartService.getCartItems();
  }
}
