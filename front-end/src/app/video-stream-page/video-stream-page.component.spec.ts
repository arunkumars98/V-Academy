import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamPageComponent } from './video-stream-page.component';

describe('VideoStreamPageComponent', () => {
  let component: VideoStreamPageComponent;
  let fixture: ComponentFixture<VideoStreamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStreamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStreamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
