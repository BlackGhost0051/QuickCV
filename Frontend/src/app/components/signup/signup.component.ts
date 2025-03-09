import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

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



  onSubmit(){
    console.log(this.form.username, this.form.email, this.form.password, this.form.confirmPassword);
  }
}
