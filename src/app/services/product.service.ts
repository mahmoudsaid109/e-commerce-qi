import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { productDataList } from '../models/product_data_list';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = productDataList;

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  filterProducts(searchInput: string, category: string): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }
}
