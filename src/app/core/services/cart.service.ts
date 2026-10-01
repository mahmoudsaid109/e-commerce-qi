import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private cartItems: Product[] = [];
  // isCartVisible: boolean = false;
  private cartItems = signal<Product[]>([]);
  isCartVisible = signal<boolean>(false);
  discount = signal<number>(0.15);
  constructor() { }


  subTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.price, 0);
  });



  discountValue = computed(() => {
    return this.subTotal() * this.discount();
  });

  subTotalAfterDiscount = computed(() => {
    return this.subTotal() - this.discountValue();
  });

  productsTax = computed(() => {
    return this.subTotalAfterDiscount() * 0.10;
  });

  shipping = computed(() => {
    return this.subTotal() > 0 ? 60 : 0;
  })

  totalPrice = computed(() => {
    return this.subTotalAfterDiscount() + this.productsTax() + this.shipping();
  })

  addToCart(product: Product): void {
    this.cartItems.update(items => [...items, product]);
  }

  removeItem(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== productId))
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  // getTotal(): number {
  //   return this.cartItems.reduce((total, item) => total + item.price, 0);
  // }

  getCartItems(): Product[] {
    return this.cartItems();
  }

  getCartCount(): number {
    return this.cartItems().length;
  }

  toggleCart() {
    this.isCartVisible.update(visible => !visible);
  }

  closeCart() {
    this.isCartVisible.set(false);
  }
}
/*
set => change value 
update => change value depending on the previous value 
computed => value that depends on other signals
*/