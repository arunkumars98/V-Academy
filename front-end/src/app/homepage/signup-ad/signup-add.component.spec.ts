import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAddComponent } from './signup-add.component';

describe('SignupAddComponent', () => {
  let component: SignupAddComponent;
  let fixture: ComponentFixture<SignupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
