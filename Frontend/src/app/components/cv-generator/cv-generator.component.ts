import { Component } from '@angular/core';
import {CvListComponent} from '../cv-list/cv-list.component';

@Component({
  selector: 'app-cv-generator',
  imports: [
    CvListComponent
  ],
  templateUrl: './cv-generator.component.html',
  standalone: true,
  styleUrl: './cv-generator.component.css'
})
export class CvGeneratorComponent {

}
