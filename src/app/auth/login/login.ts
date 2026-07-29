import { validate } from '@angular/forms/signals';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { AppInput } from '../../common/forms/input/input';
import { initialCredentialsData, CredentialsModel, loginSchema } from './login.interface';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from "@angular/router";
import { HttpResponse } from '../../interfaces/common.interface';

@Component({
  selector: 'app-login',
  imports: [AppInput, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  ngOnInit(){
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
    }
  }
  authService = inject(AuthService);
  router = inject(Router)

  loginModel = signal<CredentialsModel>(initialCredentialsData);
  loginForm = form(this.loginModel, loginSchema);
  errorMessage = signal<string>('')

  onLoginButtonClick() {
    this.loginForm().markAsTouched();
    if (this.loginForm().valid()) {
      this.authService.login(this.loginModel(), (result: HttpResponse) => {
        if(result.success) {
          this.router.navigate(['/'])
        } else {
          this.errorMessage.set(result.error)
        }
      });
    }
  }
}
