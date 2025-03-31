import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule
  ],
  templateUrl: './change-password.component.html',
  standalone: true,
  styleUrl: './change-password.component.css'
})



export class ChangePasswordComponent {
  public errorMessage?: string;
  public message?: string;

  public credentials = {
    login: '',
    oldPassword: '',
    newPassword: ''
  };


  constructor(private authService: AuthService) {
  }


  changePassword(){
    this.errorMessage = undefined;
    this.message = undefined;


    // if(this.credentials == ''){
    //   return;
    // }

    return this.authService.changePassword(this.credentials).subscribe((result) => {
      if(!result){

      } else {

        this.credentials = {
          login: '',
          oldPassword: '',
          newPassword: ''
        };

        this.message = 'Password was changed.';
      }
    },
      (error) => {
      this.errorMessage = 'Login or password is incorrect.';
    }
      );
  }

  // signIn() {
  //   this.errorMessage = undefined;
  //   return this.authService.authenticate(this.credentials).subscribe((result) => {
  //       if (!result) {
  //         this.logged = false;
  //       } else {
  //         this.logout = false;
  //         this.credentials = {
  //           login: '',
  //           password: ''
  //         };
  //         this.router.navigate(['/']);
  //       }
  //     },
  //     (error) => {
  //       this.errorMessage = 'Login or password is incorrect.';
  //     }
  //   );
  // }

}
