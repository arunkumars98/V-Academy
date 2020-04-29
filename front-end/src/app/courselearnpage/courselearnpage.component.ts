import { Component, OnInit } from '@angular/core';
import {RestServiceService} from "../rest-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../model/Course";
import {User} from "../model/User";

@Component({
  selector: 'app-courselearnpage',
  templateUrl: './courselearnpage.component.html',
  styleUrls: ['./courselearnpage.component.css']
})
export class CourselearnpageComponent implements OnInit {

  course_id : number;
  course_code : string;
  current_course : Course;
  textContent;
  data_ready : boolean = false;

  constructor(private learnService : RestServiceService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    let isValidUser : Boolean = Boolean(sessionStorage.getItem('isValidUser'));
    if(isValidUser) {
      new Promise( (resolve,reject)=> {
        setTimeout( () => {
          this.activatedRoute.queryParamMap.subscribe(params => {
            this.course_id = +params.get('course');
          });
          try {
            this.learnService.getCourseById(this.course_id).subscribe(
              (data: Course) => {
                this.current_course = data;
                this.course_code = this.current_course.coursecode;
                let user: User = JSON.parse(sessionStorage.getItem('current_user'));
                if(!user.active_courses.includes(this.course_code) && !user.courses_completed.includes(this.course_code))
                {
                  user.active_courses = user.active_courses + this.course_code + ',';
                  this.learnService.updateActiveCourse(user).subscribe((data: User) => {
                    sessionStorage.setItem('current_user', JSON.stringify(data));
                  });
                }
              }
            );
            this.data_ready = true;
            resolve();
          } catch (e) {
            console.error(e);
            reject();
          }
        },3000);
      });
    }
    else {
      this.router.navigate(['user','login']);
    }
  }

  doEndCourse()
  {
    let request_body : User = JSON.parse(sessionStorage.getItem('current_user'));
    if(!request_body.courses_completed.includes(this.course_code)) {
      request_body.courses_completed = request_body.courses_completed + this.course_code + ',';
      request_body.active_courses = request_body.active_courses.replace(this.course_code + ',', '');
      this.learnService.updateCourseComplete(request_body).subscribe(
        (data: User) => {
          sessionStorage.setItem('current_user', JSON.stringify(data));
        });
    }
    this.router.navigate(['profile/user'], { queryParams : { 'tab' : 'Enrolled Courses' }});
  }
}
