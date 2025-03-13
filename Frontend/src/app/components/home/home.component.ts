import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HomeGenerateCvComponent} from '../home-generate-cv/home-generate-cv.component';
import {HomeHeaderComponent} from '../home-header/home-header.component';
import {HomeWelcomeComponent} from '../home-welcome/home-welcome.component';
import {HomeTestimonialsComponent} from '../home-testimonials/home-testimonials.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, HomeGenerateCvComponent, HomeHeaderComponent, HomeWelcomeComponent, HomeTestimonialsComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
