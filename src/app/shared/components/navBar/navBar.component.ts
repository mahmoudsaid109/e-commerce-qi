import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navBar',
  imports: [RouterLink],
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  get cartCount(): number {
    return this.cartService.getCartCount();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    Swal.fire({
      icon: 'info',
      title: 'Logged Out',
      text: 'You have successfully logged out.',
      timer: 2000,
      showConfirmButton: false
    });
  }
}
