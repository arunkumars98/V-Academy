import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig, NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {Course} from '../model/Course';
import {User} from "../model/User";
import {RestServiceService} from "../rest-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class UserProfilePageComponent implements OnInit {

  active = 'Profile';
  profile_edit : boolean = false;
  suggested_courses : Course[] = [];
  enrolled_courses : Course[] = [];
  active_courses : Course[] = [];
  completed_courses : Course[] = [];
  user : User;
  complete_course_list : Course[] = [];
  payment_details : Payment[] = [];
  edit_fullname : string;
  edit_username : string;
  edit_mobile : string;
  edit_email : string;
  edit_parent_mobile : string;
  edit_password : string;
  edit_re_password : string;
  choice : string = 'none';
  data_ready : boolean = false;

  constructor(config: NgbModalConfig, rconfig: NgbRatingConfig, private modalService: NgbModal, private profileService : RestServiceService, private router : Router, private activatedRoute : ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
    rconfig.max = 5;
    rconfig.readonly = true;
  }

  ngOnInit(): void {
    let isValidUser : Boolean =  Boolean(sessionStorage.getItem('isValidUser'));
    if(isValidUser) {
      this.activatedRoute.queryParamMap.subscribe(params => {
        this.active = params.get('tab');
      });
      new Promise( (resolve,reject) => {
        setTimeout(() => {
          try {
            this.user = JSON.parse(sessionStorage.getItem('current_user'));
            this.profileService.getAllCourses().subscribe((data: Course[]) => {
              this.complete_course_list = data;
              for (let course of this.complete_course_list) {
                if (this.user.enrolled_courses.includes(course.coursecode)) {
                  this.enrolled_courses.push(course);
                }
                if (this.user.active_courses.includes(course.coursecode)) {
                  this.active_courses.push(course);
                }
                if (this.user.courses_completed.includes(course.coursecode)) {
                  this.completed_courses.push(course);
                }
                if (course.tags.includes(this.user.interest)) {
                  this.suggested_courses.push(course);
                }
              }
            });
            let arr: string[] = this.user.payment_details.split(',');
            for (let x of arr) {
              if(x.length==0)
              {
                break;
              }
              let y: string[] = x.split('-');
              this.payment_details.push(new Payment(y[0], y[1], y[2]));
            }
            this.edit_fullname = this.user.fullname;
            this.edit_username = this.user.username;
            this.edit_email = this.user.email;
            this.edit_mobile = this.user.mobile;
            this.edit_parent_mobile = this.user.parent_mobile;
            this.choice = this.user.interest;
            this.data_ready = true;
            resolve();
          }
          catch (e) {
            console.error(e);
            reject();
          }
        }, 3000);
      });
    }
    else {
      this.router.navigate(['user','login']);
    }
  }

  submitProfileChanges(fullname : string, username : string, email : string, mobile : string, parent_mobile : string)
  {
    let post_user : User = this.user;
    post_user.fullname = fullname;
    post_user.username = username;
    post_user.email = email;
    post_user.mobile = mobile;
    post_user.parent_mobile = parent_mobile;
    this.profileService.updateProfile(post_user).subscribe((data : User) => {
      if(data!=null) {
        sessionStorage.setItem('current_user',JSON.stringify(data));
        this.profileService.current_name = data.username;
        alert("Profile details updated successfully");
      }
      else {
        alert("Profile details not updated");
      }
    });
    this.changetoViewMode();
  }

  changePassword(password : string)
  {
    let post_user : User = this.user;
    post_user.password = password;
    this.profileService.updatePassword(post_user).subscribe((data : User) => {
      if(data!=null) {
        sessionStorage.setItem('current_user',JSON.stringify(data));
        alert("Password updated successfully");
      }
      else {
        alert("Password not updated");
      }
    });
  }

  changeSuggestion(choice : string)
  {
    let post_user : User = this.user;
    post_user.interest = choice;
    this.profileService.updateSuggesstion(post_user).subscribe((data : User) => {
      if(data!=null) {
        sessionStorage.setItem('current_user',JSON.stringify(data));
        alert("Personalized interest updated successfully");
      }
      else {
        alert("Personalized interest not updated");
      }
    });
  }

  deleteAccount()
  {
    this.profileService.deleteUser(this.user.username).subscribe( (data:string) => { alert(data); });
    this.profileService.logoutUser();
    this.router.navigate(['user','login']);
  }

  goToCourse(course_id : number)
  {
    this.router.navigate(['courses/learn'],{queryParams : {'course' : course_id}});
  }

  goToDetails(course_id : number)
  {
    this.router.navigate(['course', course_id]);
  }

  changetoEditMode()
  {
    this.profile_edit = true;
  }

  changetoViewMode()
  {
    this.profile_edit = false;
  }

  open(content) {
    this.modalService.open(content);
  }
}

class Payment {
  date : string;
  course_name : string;
  amount : string;

  constructor(date: string, course_code: string, amount: string) {
    this.date = date;
    this.course_name = course_code;
    this.amount = amount;
  }
}
