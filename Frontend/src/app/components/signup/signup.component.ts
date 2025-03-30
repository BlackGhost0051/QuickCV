import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public form = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  public errorMessage?: string;


  constructor(private authService: AuthService, public router: Router) {

  }


  onSubmit() {
    this.errorMessage = undefined;

    if (!this.form.username || !this.form.email || !this.form.password || !this.form.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.form.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    if (this.form.password !== this.form.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register({
      login: this.form.username,
      email: this.form.email,
      password: this.form.password
    }).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = `User with this login already exists.`;
      }
    );
  }
}
