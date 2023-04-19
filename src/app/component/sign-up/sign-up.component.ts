import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { validateSignInForm } from 'src/app/guards/authdata-guard';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { serverError } from 'src/app/services/constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user = {
    email: null,
    password: null,
    confirm_password: null,
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
    const { email, password, confirm_password } = this.user;
    const clientError = validateSignInForm({
      email,
      password,
      confirm_password,
    });
    if (clientError !== '') {
      this.clientError = clientError;
      return;
    } else if (email !== '' && password !== '')
      this.auth.authenticate(this.user, '/register').subscribe(
        () => {
          return console.log('success');
        },
        (e) => {
          console.log('error', e.error);
          return (this.errorMessage =
            e.error.failure || e.error.errors?.[0] || serverError);
        }
      );
  }
}
