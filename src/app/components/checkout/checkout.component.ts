import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cartService = inject(CartService);
  router = inject(Router);

  processCheckout() {
    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your purchase has been completed successfully.',
      timer: 3000,
      showConfirmButton: true,
      confirmButtonColor: '#198754',
      confirmButtonText: 'Back to Home'
    }).then(() => {
      this.cartService.clearCart();
      this.router.navigate(['/']);
    });
  }
}
