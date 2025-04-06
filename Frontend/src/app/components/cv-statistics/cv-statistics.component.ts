import {Component, OnInit, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-cv-statistics',
  imports: [ NgxChartsModule ],
  templateUrl: './cv-statistics.component.html',
  standalone: true,
  styleUrl: './cv-statistics.component.css'
})
export class CvStatisticsComponent implements OnInit{
  chartData: any[] = [];
  view: [number, number] = [700, 400];

  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.updateChartSize();

    this.http.get<any>('http://localhost:3100/api/cv/statistics')
      .subscribe(res => {
        const rawData = res.data;

        this.chartData = rawData.map((row: any[]) => ({
          name: row[8],                                // Job title
          value: Number(row[11].replace(/[$,]/g, ''))  // Salary
        }));


        console.log(this.chartData);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartSize();
  }

  updateChartSize() {
    const width = Math.min(window.innerWidth - (window.innerWidth * 0.1));
    const height = Math.min(window.innerHeight - (window.innerHeight * 0.1));
    this.view = [width, height];
  }
}
