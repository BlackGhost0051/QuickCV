import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-cv-form',
  imports: [],
  templateUrl: './cv-form.component.html',
  standalone: true,
  styleUrl: './cv-form.component.css'
})
export class CvFormComponent implements OnInit{
  cvId!: number;
  url: string = "http://localhost:3100/api";
  formContent: SafeHtml = '';


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.cvId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Loaded CV Form with ID:", this.cvId);



    let formData: any = {
      "userData": {
        "name": "John Doe",
        "jobTitle": "Software Engineer",
        "phone": "+88 888 888 888",
        "email": "john.doe@example.com",
        "github": "https://github.com/johndoe",
        "about": "I am a third-year Computer Science student with a passion for web development.",
        "education": {
          "institution": "State University",
          "degree": "Bachelor of Science in Computer Science",
          "status": "Currently student"
        },
        "skills": {
          "languages": ["HTML", "CSS", "JavaScript", "Python"],
          "frameworks": ["Express", "Node.js", "Flask"]
        },
        "achievements": "Won first place in a local hackathon."
      },
      "formId": this.cvId
    }



    this.http.post<any>(`${this.url}/cv/get_form`, formData).subscribe(
      (response) => {
        console.log("Received form data:", response);
        this.formContent = this.sanitizer.bypassSecurityTrustHtml(response);
      },
      (error) => {
        console.error("Error fetching form data:", error);
      }
    );
  }

}
