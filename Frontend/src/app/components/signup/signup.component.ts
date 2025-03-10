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


  constructor(private authService: AuthService, public router: Router) {

  }


  onSubmit() {
    if (this.form.password === this.form.confirmPassword) {
      this.authService.register({
        login: this.form.username,
        email: this.form.email,
        password: this.form.password
      }).subscribe((result) => {
          this.router.navigate(['/login']);
        }
      );
    }
  }
}
