import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public credentials = {
    login: '',
    password: ''
  };

  public logged?: boolean;
  public logout?: boolean;
  public errorMessage?: string;

  constructor(public authService: AuthService, private router: Router) {
  }

  signIn() {
    this.errorMessage = undefined;
    return this.authService.authenticate(this.credentials).subscribe((result) => {
      if (!result) {
        this.logged = false;
      } else {
        this.logout = false;
        this.credentials = {
          login: '',
          password: ''
        };
        this.router.navigate(['/']);
      }
    },
      (error) => {
        this.errorMessage = 'Login or password is incorrect.';
      }
      );
  }
}
