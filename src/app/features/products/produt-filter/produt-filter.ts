import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-produt-filter',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './produt-filter.html',
  styleUrl: './produt-filter.css',
})
export class ProdutFilter implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Output() filterChanged = new EventEmitter<Product[]>();

  productService = inject(ProductService);

  searchControl = new FormControl('');
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

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchInputWord => {
        this.searchInput = searchInputWord || '';
        const filtered = this.productService.filterProducts(this.products, this.searchInput, this.selectedCategory);
        return of(filtered);
      })
    ).subscribe(filtered => {
      this.filterChanged.emit(filtered);
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
