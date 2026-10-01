import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';
import Swal from 'sweetalert2';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-dashboard',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  productService = inject(ProductService);
  dialog = inject(MatDialog);
  products = signal<Product[]>([]);
  columns: string[] = ['id', 'image', 'title', 'price', 'category', 'actions'];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  openProductForm(product?: Product) {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '500px',
      data: product ? { ...product } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.productService.updateProduct(result).subscribe(() => {
            Swal.fire('Updated!', 'Product updated successfully.', 'success');
            this.products.update(products => {
              const index = products.findIndex(p => p.id === result.id);
              if (index !== -1) {
                const newProducts = [...products];
                newProducts[index] = result;
                return newProducts;
              }
              return products;
            });
          });
        } else {
          this.productService.addProduct(result).subscribe(newProduct => {
            Swal.fire('Added!', 'Product added successfully.', 'success');
            newProduct.id = Math.floor(Math.random() * 1000) + 30; // Random ID
            this.products.update(products => [newProduct, ...products]);
          });
        }
      }
    });
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          this.products.update(products => products.filter(p => p.id !== id));
        });
      }
    });
  }
}
