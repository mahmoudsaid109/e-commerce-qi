import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produt-filter',
  imports: [FormsModule],
  templateUrl: './produt-filter.html',
  styleUrl: './produt-filter.css',
})
export class ProdutFilter implements OnInit {
  @Input({ required: true }) products!: Product[];
  @Output() filterChanged = new EventEmitter<Product[]>();
  
  searchInput = '';
  selectedCategory = 'all';

  get categories(): string[] {
    return [...new Set(this.products.map((product) => product.category))];
  }

  ngOnInit() {
    this.emitFilter();
  }

  onFilterChange() {
    this.emitFilter();
  }

  emitFilter() {
    if (!this.products) return;
    const filtered = this.products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchInput.toLowerCase());
      const matchesCategory =
        this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.filterChanged.emit(filtered);
  }
}
