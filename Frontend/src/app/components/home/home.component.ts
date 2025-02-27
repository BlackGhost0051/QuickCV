import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HomeGenerateCvComponent} from '../home-generate-cv/home-generate-cv.component';
import {HomeHeaderComponent} from '../home-header/home-header.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, HomeGenerateCvComponent, HomeHeaderComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
