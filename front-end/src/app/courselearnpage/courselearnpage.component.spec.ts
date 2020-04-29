import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourselearnpageComponent } from './courselearnpage.component';

describe('CourselearnpageComponent', () => {
  let component: CourselearnpageComponent;
  let fixture: ComponentFixture<CourselearnpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourselearnpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourselearnpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
