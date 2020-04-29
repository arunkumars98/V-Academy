import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvAdComponent } from './adv-ad.component';

describe('AdvAdComponent', () => {
  let component: AdvAdComponent;
  let fixture: ComponentFixture<AdvAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
