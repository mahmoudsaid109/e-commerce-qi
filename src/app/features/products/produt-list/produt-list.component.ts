import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProdutCardComponent } from '../../../shared/components/produt-card/produt-card.component';
import { FormsModule } from '@angular/forms';
import { ProdutFilter } from '../produt-filter/produt-filter';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-produt-list',
  imports: [FormsModule, ProdutFilter, ProdutCardComponent],
  templateUrl: './produt-list.component.html',
  styleUrl: './produt-list.component.css',
})
export class ProdutListComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  cartService = inject(CartService);
  productService = inject(ProductService);
  authService = inject(AuthService);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.displayedProducts = this.products;
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load products',
        });
      }
    })
  }

  handleAddToCart(selectedProduct: Product) {
    if (!this.authService.isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to login first to add products to your cart!',
      });
      return;
    }

    this.cartService.addToCart(selectedProduct);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: selectedProduct.title + ' Added to Cart successfully!',
      timer: 1500,
      showConfirmButton: false
    });
  }

  onFilterChanged(filtered: Product[]) {
    this.displayedProducts = filtered;
  }
}
