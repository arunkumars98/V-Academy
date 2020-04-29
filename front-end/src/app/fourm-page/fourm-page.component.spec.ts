import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourmPageComponent } from './fourm-page.component';

describe('FourmPageComponent', () => {
  let component: FourmPageComponent;
  let fixture: ComponentFixture<FourmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
