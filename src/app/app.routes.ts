import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/auth/role-selection/role-selection').then(m => m.RoleSelection) 
  },
  { 
    path: 'admin-login', 
    loadComponent: () => import('./shared/components/auth-form/auth-form').then(m => m.AuthForm),
    data: { role: 'admin' }
  },
  { 
    path: 'user-login', 
    loadComponent: () => import('./shared/components/auth-form/auth-form').then(m => m.AuthForm),
    data: { role: 'user' }
  },
  { 
    path: 'admin-dashboard', 
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/produt-list/produt-list.component').then(m => m.ProdutListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/shopping-cart-summary/shopping-cart-summary').then(m => m.HoppingCartSummary)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
