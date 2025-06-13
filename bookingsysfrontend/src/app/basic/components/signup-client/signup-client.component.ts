import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-signup-client',
  standalone: false,
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)  
        ]
      ],
      password: [null, 
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]],
      checkPassword: [null, [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('checkPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('checkPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('checkPassword')?.setErrors(null);
    }
  }

  onlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
    event.preventDefault();
   }
  }

  submitForm() {
    this.authService.registerClient(this.validateForm.value).subscribe({
      next: res => {
        this.notification.success(
          'ALERT',
          'You have succesfully registered',
          { nzDuration: 3000 }
        );
        this.router.navigateByUrl('/');
      },
      error: err => {
        this.notification.error(
          'ALERT',
          `${err.error}`,
          { nzDuration: 3000 }
        );
      }
    });
  }
}
