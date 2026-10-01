import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (err) => console.error(err)
      });
    }
  }

  addToCart() {
    if (!this.authService.isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to login first to add products to your cart!',
      });
      return;
    }

    if (this.product) {
      this.cartService.addToCart(this.product);
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: this.product.title + ' Added to Cart successfully!',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }
}
