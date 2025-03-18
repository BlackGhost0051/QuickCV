import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cv-form',
  imports: [],
  templateUrl: './cv-form.component.html',
  standalone: true,
  styleUrl: './cv-form.component.css'
})
export class CvFormComponent implements OnInit{
  cvId!: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cvId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Loaded CV Form with ID:", this.cvId);
  }

}
