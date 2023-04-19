import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'smsapp';

  constructor(private auth: AuthServiceService, private router: Router) {
    auth.isLoggedIn();
  }

  onLogin() {
    alert('Alert for Button');
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
