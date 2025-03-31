import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  isDropdownOpen = false;

  constructor(public authService: AuthService) {
  }

  loginButtonClick(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.isDropdownOpen = false;
    this.authService.logout();
  }

}
