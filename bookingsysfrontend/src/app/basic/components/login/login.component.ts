import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  validateForm!: FormGroup;

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private notification: NzNotificationService,
  private router: Router
) {}

ngOnInit() {
  this.validateForm = this.fb.group({
    username: [null, [Validators.required]],
     password: [null, 
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]],
  });
}

submitForm() {
  this.authService.login(
    this.validateForm.get(['username'])!.value,
    this.validateForm.get(['password'])!.value
  ).subscribe(
    res => {
      const body = res.body;
      const role = body.role;

      if (role === 'CLIENT') {
        this.router.navigateByUrl('client/dashboard');
      } else if (role === 'COMPANY') {
        this.router.navigateByUrl('company/dashboard');
      }
    },
    err => {
      const message = typeof err.error === 'string' ? err.error : 'Login failed. Please try again.';
      this.notification.error('Login Failed', message, { nzDuration: 3000 });
    }
  );
}




}
