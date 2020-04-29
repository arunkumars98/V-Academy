import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDetailsPageComponent } from './courses-details-page.component';

describe('CoursesDetailsPageComponent', () => {
  let component: CoursesDetailsPageComponent;
  let fixture: ComponentFixture<CoursesDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
