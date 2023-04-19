import { Router } from '@angular/router';
import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { validateSignInForm } from 'src/app/guards/authdata-guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: null,
    password: null,
  };
  errorMessage: string = '';
  clientError: string = '';

  constructor(private auth: AuthServiceService, private router: Router) {
    console.log('here init', this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      console.log('here onInit');
      this.router.navigate(['/']);
    }
  }

  OnInit() {
    console.log('here init');
    if (this.auth.isLoggedIn()) {
      console.log('here onInit');
      this.router.navigate(['/']);
    }
  }

  onSubmit(data) {
    this.clientError = '';
    this.errorMessage = '';
    const { email, password } = this.user;
    const clientError = validateSignInForm({ email, password });
    if (clientError !== '') {
      this.clientError = clientError;
      return;
    } else if (email !== '' && password !== '')
      this.auth.authenticate(this.user).subscribe(
        () => {
          return console.log('success');
        },
        (e) => {
          console.log('error', e.error);
          return (this.errorMessage = e.error.failure);
        }
      );
  }
}
