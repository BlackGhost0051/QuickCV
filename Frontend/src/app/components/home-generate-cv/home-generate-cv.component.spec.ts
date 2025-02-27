import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGenerateCvComponent } from './home-generate-cv.component';

describe('HomeGenerateCvComponent', () => {
  let component: HomeGenerateCvComponent;
  let fixture: ComponentFixture<HomeGenerateCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGenerateCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGenerateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
