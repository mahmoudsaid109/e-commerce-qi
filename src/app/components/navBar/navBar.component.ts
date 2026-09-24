import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navBar',
  imports: [RouterLink],
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent {
  cartService = inject(CartService);

  get cartCount(): number {
    return this.cartService.getCartCount();
  }
}
