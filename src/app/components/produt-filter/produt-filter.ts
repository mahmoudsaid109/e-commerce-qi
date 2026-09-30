import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-produt-filter',
  imports: [FormsModule],
  templateUrl: './produt-filter.html',
  styleUrl: './produt-filter.css',
})
export class ProdutFilter implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Output() filterChanged = new EventEmitter<Product[]>();

  productService = inject(ProductService);

  searchInput = '';
  selectedCategory = 'all';
  categories: string[] = [];

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.error(err)
    });
    this.emitFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.emitFilter();
    }
  }

  onFilterChange() {
    this.emitFilter();
  }

  emitFilter() {
    const filtered = this.productService.filterProducts(this.products, this.searchInput, this.selectedCategory);
    this.filterChanged.emit(filtered);
  }
}
