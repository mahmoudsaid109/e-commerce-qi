import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-hopping-cart-summary',
  imports: [],
  templateUrl: './hopping-cart-summary.html',
  styleUrl: './hopping-cart-summary.css',
})
export class HoppingCartSummary {
  cartService = inject(CartService);

  get cartList() {
    return this.cartService.getCartItems();
  }
}
