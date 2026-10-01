import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm {
  @Output() checkoutComplete = new EventEmitter<void>();

  fullName!: FormControl;
  email!: FormControl;
  address!: FormControl;
  creditCardNumber!: FormControl;
  checkoutForm!: FormGroup;

  constructor() {
    this.initFormControls();
    this.initForm();
  }

  initFormControls(): void {
    this.fullName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.address = new FormControl('', Validators.required);
    this.creditCardNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]);
  }

  initForm(): void {
    this.checkoutForm = new FormGroup({
      fullName: this.fullName,
      email: this.email,
      address: this.address,
      creditCardNumber: this.creditCardNumber
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.checkoutComplete.emit();
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
