import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvStatisticsComponent } from './cv-statistics.component';

describe('CvStatisticsComponent', () => {
  let component: CvStatisticsComponent;
  let fixture: ComponentFixture<CvStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
