import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-produt-card',
  imports: [RouterModule],
  templateUrl: './produt-card.component.html',
  styleUrl: './produt-card.component.css',
})
export class ProdutCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    console.log('button clicked', this.product.title);
    this.addToCart.emit(this.product);
  }
}
