import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient)
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + `/${id}`);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.getProducts().pipe(
      map(products => {
        const categories: string[] = [];
        products.forEach((product) => {
          if (!categories.includes(product.category)) {
            categories.push(product.category)
          }
        })
        return categories;
      })
    )
  }


  filterProducts(
    products: Product[],
    searchInput: string,
    category: string
  ): Product[] {
    const search = searchInput.trim().toLowerCase();
    return products.filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(search);
      const matchesCategory =
        category === 'all' ||
        product.category === category;
      return matchesSearch && matchesCategory;
    });
  }
}


