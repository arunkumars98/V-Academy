import { Component, OnInit } from '@angular/core';
import { InstructorProfilePageComponent } from '../instructor-profile-page/instructor-profile-page.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-stream-page',
  templateUrl: './video-stream-page.component.html',
  styleUrls: ['./video-stream-page.component.css']
})
export class VideoStreamPageComponent implements OnInit {

  video_link : string;
  video_description : string;

  constructor(private router : Router) { }

  ngOnInit(): void {
    let isLoggedIn : Boolean = Boolean(sessionStorage.getItem('isLoggedIn'));
    if(isLoggedIn) {
      this.video_link =  sessionStorage.getItem('link');
      this.video_description = sessionStorage.getItem('video_descrp');
    }
    else {
     this.router.navigate(['user','login']);
    }
  }
}
