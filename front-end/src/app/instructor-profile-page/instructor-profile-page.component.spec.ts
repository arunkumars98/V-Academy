import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfilePageComponent } from './instructor-profile-page.component';

describe('InstructorProfilePageComponent', () => {
  let component: InstructorProfilePageComponent;
  let fixture: ComponentFixture<InstructorProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
