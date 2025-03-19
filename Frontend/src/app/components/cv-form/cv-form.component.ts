import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-cv-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cv-form.component.html',
  standalone: true,
  styleUrl: './cv-form.component.css'
})
export class CvFormComponent implements OnInit{
  cvId!: number;
  url: string = "http://localhost:3100/api";
  formContent: SafeHtml = '';
  cvForm!: FormGroup;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.cvId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Loaded CV Form with ID:", this.cvId);

    this.cvForm = this.fb.group({
      name: [''],
      jobTitle: [''],
      phone: [''],
      email: [''],
      github: [''],
      about: [''],
      education: this.fb.group({
        institution: [''],
        degree: [''],
        status: ['']
      }),
      skills: this.fb.group({
        languages: [''],
        frameworks: ['']
      }),
      achievements: ['']
    });

    let formData: any = {
      "userData": {
        "name": "John Doe",
        "jobTitle": "Software Engineer",
        "phone": "+88 888 888 888",
        "email": "john.doe@example.com",
        "github": `form/${this.cvId}`,
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
        // console.log("Received form data:", response);
        console.log(formData);
        this.formContent = this.sanitizer.bypassSecurityTrustHtml(response);
      },
      (error) => {
        console.error("Error fetching form data:", error);
      }
    );
  }

  submitForm() {
    let formData = this.getFormData();

    this.http.post(`${this.url}/cv/generate-pdf`, formData, { responseType: 'blob' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log("PDF generated successfully!");
      },
      (error) => {
        console.error("Error generating PDF:", error);
      }
    );
  }



  getFormData(){
    const formValue = this.cvForm.value;

    const skills = {
      languages: Array.isArray(formValue.skills.languages)
        ? formValue.skills.languages
        : (typeof formValue.skills.languages === 'string'
          ? formValue.skills.languages.split(',').map((lang: string) => lang.trim())
          : []),

      frameworks: Array.isArray(formValue.skills.frameworks)
        ? formValue.skills.frameworks
        : (typeof formValue.skills.frameworks === 'string'
          ? formValue.skills.frameworks.split(',').map((framework: string) => framework.trim())
          : [])
    };

    const formData = {
      userData: {
        ...formValue,
        skills: skills
      },
      formId: this.cvId
    };

    return formData;
  }


  reloadForm() {

    let formData = this.getFormData();

    console.log("Reloading with:", formData);

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
