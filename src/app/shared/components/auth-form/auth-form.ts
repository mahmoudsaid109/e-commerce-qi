import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthForm implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  role: 'admin' | 'user' = 'user';
  mode: 'login' | 'register' = 'login';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit() {
    this.role = this.route.snapshot.data['role'] || 'user';
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }

  submit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.role === 'admin') {
        if (email === 'mahmoud@gmail.com' && password === 'admin123') {
          this.authService.login('admin');
          Swal.fire('Success', 'Logged in as Admin', 'success');
          this.router.navigate(['/admin-dashboard']);
        } else {
          Swal.fire('Error', 'Invalid email or password', 'error');
        }
      } else {
        if (this.mode === 'login') {
          Swal.fire('Success', 'Logged in successfully', 'success');
        } else {
          Swal.fire('Success', 'Registered successfully', 'success');
        }
        this.authService.login('user');
        this.router.navigate(['/products']);
      }
    }
  }
}
