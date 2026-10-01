import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hopping-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart-summary.html',
  styleUrl: './shopping-cart-summary.css',
})
export class HoppingCartSummary {
  cartService = inject(CartService);

  get cartList() {
    return this.cartService.getCartItems();
  }
}
