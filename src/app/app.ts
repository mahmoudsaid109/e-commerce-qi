import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProdutCardComponent } from './components/produt-card/produt-card.component';
import { ProdutListComponent } from './components/produt-list/produt-list.component';

@Component({
  selector: 'app-root',
  imports: [ProdutListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-qi');
}
