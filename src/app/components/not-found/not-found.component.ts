import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container py-5 text-center">
      <h1 class="display-1 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="btn btn-primary mt-3">Go Home</a>
    </div>
  `
})
export class NotFoundComponent {
}
