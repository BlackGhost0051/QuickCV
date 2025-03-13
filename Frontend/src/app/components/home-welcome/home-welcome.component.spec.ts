import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWelcomeComponent } from './home-welcome.component';

describe('HomeWelcomeComponent', () => {
  let component: HomeWelcomeComponent;
  let fixture: ComponentFixture<HomeWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
