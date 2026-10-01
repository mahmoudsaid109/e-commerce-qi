import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  isCartVisible: boolean = false;

  constructor() { }

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  closeCart() {
    this.isCartVisible = false;
  }
}
