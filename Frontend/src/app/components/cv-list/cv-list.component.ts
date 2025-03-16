import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class CvListComponent implements OnInit {
  url: string = "http://localhost:3100/api";
  cvTemplates: { id: number, html: SafeHtml }[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this.http.get<any>(`${this.url}/cv/get_all_forms`).subscribe(
      (data) => {
        this.cvTemplates = data.templates.map((cv: any) => ({
          id: cv.id,
          html: this.sanitizer.bypassSecurityTrustHtml(cv.html)
        }));

        console.log("cvTemplates = ", this.cvTemplates);
      },
      (error) => {
        console.error('Error fetching CV templates', error);
      }
    );
  }

  onTemplateClick(id: number) {
    console.log("Clicked CV template with ID:", id);
  }



}
