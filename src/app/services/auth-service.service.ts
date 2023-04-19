import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, tap } from 'rxjs';
import axios from 'axios';
import { API_URL } from './constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

interface loginInterface {
  jwt: string;
  user: {
    id: number;
    username: string;
  };
}

// const API_URL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  isLoggedIn() {
    return this.cookieService.get('isLoggedIn') === 'true';
  }

  authenticate(data, url = '') {
    const { email, password } = data;
    // try {
    const userObject = {
      username: email,
      password: password,
    };
    const loginURL = url === '' ? `${API_URL}/login` : `${API_URL}/register`;

    return this.http.post<loginInterface>(loginURL, userObject).pipe(
      tap((response) => {
        // Update application state
        this.isLoggedInSubject.next(true);
        this.cookieService.set('isLoggedIn', 'true');
        this.cookieService.set('auth', response.jwt);
        this.cookieService.set('user', response.user.id.toString());
        // Navigate to new page
        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.cookieService.delete('isLoggedIn');
  }
}
