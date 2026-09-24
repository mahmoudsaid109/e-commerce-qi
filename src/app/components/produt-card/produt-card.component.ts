import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-produt-card',
  imports: [],
  templateUrl: './produt-card.component.html',
  styleUrl: './produt-card.component.css',
})
export class ProdutCardComponent {
  @Input({required:true}) product!:Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
