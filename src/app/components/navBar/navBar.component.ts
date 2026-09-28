import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
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

  get cartCount(): number {
    return this.cartService.getCartCount();
  }

  toggleLogin() {
    if (this.authService.isLoggedIn) {
      this.authService.logout();
      Swal.fire({
        icon: 'info',
        title: 'Logged Out',
        text: 'You have successfully logged out.',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      this.authService.login();
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: 'You have successfully logged in!',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
}
