import { Component, OnInit } from '@angular/core';
import {RestServiceService} from "../rest-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../model/Course";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../model/User";

@Component({
  selector: 'app-courses-details-page',
  templateUrl: './courses-details-page.component.html',
  styleUrls: ['./courses-details-page.component.css']
})
export class CoursesDetailsPageComponent implements OnInit {

  data_ready : boolean = false;
  course_id : number;
  course_code : string;
  current_course : Course;
  dashboard : dash[] = [new dash('arunsdrip', 96.5),new dash('hareshaa',95),new dash('shalini',94)];
  rating : number;
  permitted_courses : string[] = [];

  constructor(config: NgbRatingConfig, private detailsService : RestServiceService, private activatedRoute : ActivatedRoute, private router : Router)
  {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void
  {
    let isValidUser : Boolean = Boolean(sessionStorage.getItem('isValidUser'));
    if(isValidUser) {
      let promise = new Promise( (resolve,reject) =>
        setTimeout( () => {
          try {
            this.activatedRoute.paramMap.subscribe(params => {
              this.course_id = +params.get('course');
              this.detailsService.getCourseById(this.course_id).subscribe(
                (data: Course) => {
                  this.current_course = data;
                  this.course_code = data.coursecode;
                  this.rating = +this.current_course.rating;
                });
            });
            this.data_ready = true;
            resolve();
          }
          catch (e) {
            console.error(e);
            reject();
          }
        },3000));
      let user : User = JSON.parse(sessionStorage.getItem('current_user'));
      let enrolled_courses : string[] = user.enrolled_courses.split(',');
      let completed_courses : string[] = user.courses_completed.split(',');
      for(let enrolls of enrolled_courses)
      {
        this.permitted_courses.push(enrolls);
      }
      for(let completes of completed_courses)
      {
        this.permitted_courses.push(completes);
      }
    }
    else {
      this.router.navigate(['user', 'login']);
    }
  }

  public startCourse()
  {
    if(this.permitted_courses.includes(this.course_code)) {
      this.router.navigate(['courses/learn'] , {queryParams : { 'course' : this.course_id}});
    }
    else {
      this.router.navigate(['payment'],{queryParams : { 'course' : this.course_id}});
    }
  }
}

export class dash {

  d_name : String;
  d_score : number;

  constructor(d_name: String, d_score: number) {
    this.d_name = d_name;
    this.d_score = d_score;
  }
}
