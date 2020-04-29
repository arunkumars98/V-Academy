import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLoginPageComponent } from './instructor-login-page.component';

describe('InstructorLoginPageComponent', () => {
  let component: InstructorLoginPageComponent;
  let fixture: ComponentFixture<InstructorLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
