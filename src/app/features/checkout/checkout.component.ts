import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';
import { CheckoutForm } from '../../shared/components/checkout-form/checkout-form';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CheckoutForm],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cartService = inject(CartService);
  router = inject(Router);
  showForm = false;

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
