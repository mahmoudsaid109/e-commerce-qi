import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-produt-filter',
  imports: [FormsModule],
  templateUrl: './produt-filter.html',
  styleUrl: './produt-filter.css',
})
export class ProdutFilter implements OnInit {
  @Output() filterChanged = new EventEmitter<Product[]>();
  
  productService = inject(ProductService);

  searchInput = '';
  selectedCategory = 'all';
  categories: string[] = [];

  ngOnInit() {
    this.categories = this.productService.getCategories();
    this.emitFilter();
  }

  onFilterChange() {
    this.emitFilter();
  }

  emitFilter() {
    const filtered = this.productService.filterProducts(this.searchInput, this.selectedCategory);
    this.filterChanged.emit(filtered);
  }
}
