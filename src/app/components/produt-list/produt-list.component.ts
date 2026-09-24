import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { productDataList } from '../../models/product_data_list';
import { ProdutCardComponent } from '../produt-card/produt-card.component';
import { FormsModule } from '@angular/forms';
import { ProdutFilter } from '../produt-filter/produt-filter';
import { CartService } from '../../services/cart.service';
import { HoppingCartSummary } from '../hopping-cart-summary/hopping-cart-summary';

@Component({
  selector: 'app-produt-list',
  imports: [FormsModule, ProdutFilter, ProdutCardComponent, HoppingCartSummary],
  templateUrl: './produt-list.component.html',
  styleUrl: './produt-list.component.css',
})
export class ProdutListComponent {
  products: Product[] = productDataList;
  displayedProducts: Product[] = productDataList;
  cartService = inject(CartService);

  handleAddToCart(selectedProduct: Product) {
    this.cartService.addToCart(selectedProduct);
    alert('تم إضافة ' + selectedProduct.title + ' إلى السلة بنجاح!');
  }

  onFilterChanged(filtered: Product[]) {
    this.displayedProducts = filtered;
  }
}
