import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { productDataList } from '../../models/product_data_list';
import { FormsModule } from '@angular/forms';
import { ProdutCardComponent } from '../produt-card/produt-card.component';

@Component({
  selector: 'app-produt-filter',
  imports: [FormsModule, ProdutCardComponent],
  templateUrl: './produt-filter.html',
  styleUrl: './produt-filter.css',
})
export class ProdutFilter {
  @Input({ required: true }) products!: Product[];
  searchInput = '';
  selectedCategory = 'all';

  get categories(): string[] {
    return [...new Set(this.products.map((product) => product.category))];
  }

  filteredProducts(): Product[] {
    return this.products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchInput.toLowerCase());
      const matchesCategory =
        this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
