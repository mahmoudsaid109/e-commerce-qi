import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProdutCardComponent } from '../produt-card/produt-card.component';
import { FormsModule } from '@angular/forms';
import { ProdutFilter } from '../produt-filter/produt-filter';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
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
    this.products = this.productService.getProducts();
    this.displayedProducts = this.products;
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
      text: 'تم إضافة ' + selectedProduct.title + ' إلى السلة بنجاح!',
      timer: 1500,
      showConfirmButton: false
    });
  }

  onFilterChanged(filtered: Product[]) {
    this.displayedProducts = filtered;
  }
}
