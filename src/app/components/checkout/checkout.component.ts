import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <div class="card shadow-sm border-0">
            <div class="card-body p-5">
              <h2 class="fw-bold mb-4">Checkout Process</h2>
              <p class="lead text-muted mb-4">You are about to securely purchase your items.</p>
              
              <div class="alert alert-info mb-4 text-start">
                <strong>Total Amount:</strong> \${{ cartService.getTotal() | number:'1.2-2' }}
              </div>

              <button class="btn btn-success btn-lg px-5 py-3 rounded-pill fw-bold" (click)="processCheckout()">
                <i class="bi bi-credit-card me-2"></i> Confirm and Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
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
