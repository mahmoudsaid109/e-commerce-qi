import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { productDataList } from '../../models/product_data_list';
import { ProdutCardComponent } from '../produt-card/produt-card.component';
import { FormsModule } from '@angular/forms';
import { ProdutFilter } from '../produt-filter/produt-filter';

@Component({
  selector: 'app-produt-list',
  imports: [FormsModule, ProdutFilter],
  templateUrl: './produt-list.component.html',
  styleUrl: './produt-list.component.css',
})
export class ProdutListComponent {
  products: Product[] = productDataList;
   
}
