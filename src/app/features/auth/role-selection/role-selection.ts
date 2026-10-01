import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-role-selection',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.css',
})
export class RoleSelection {
  private router = inject(Router);

  selectRole(role: 'admin' | 'user') {
    if (role === 'admin') {
      this.router.navigate(['/admin-login']);
    } else {
      this.router.navigate(['/user-login']);
    }
  }
}
