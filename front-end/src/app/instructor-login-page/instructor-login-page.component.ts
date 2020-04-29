import { Component, OnInit } from '@angular/core';
import {RestServiceService} from "../rest-service.service";
import {Router} from "@angular/router";
import {Instructor} from "../model/Instructor";

@Component({
  selector: 'app-instructor-login-page',
  templateUrl: './instructor-login-page.component.html',
  styleUrls: ['./instructor-login-page.component.css']
})
export class InstructorLoginPageComponent implements OnInit {

  instructor_username : string;
  instructor_password : string;
  signup_username :string;
  signup_password :string;
  signup_fullname :string;
  signup_email :string;
  signup_repassword : string;
  signup_mobile : string;
  signup_qualification : string;

  constructor(private instructorLoginService : RestServiceService, private router : Router) { }

  ngOnInit(): void {
  }

  doLoginInstructor(username : string, password : string)
  {
    if(this.instructorLoginService.isLoggedIn)
    {
      try {
        this.instructorLoginService.updateSession();
        sessionStorage.removeItem('JwtToken');
        sessionStorage.clear();
        this.instructorLoginService.current_name = '';
        this.instructorLoginService.isLoggedIn = false;
      }
      catch (e) {
        console.log(e);
      }
    }
    this.instructor_username = username;
    this.instructor_password = password;
    let loginDetails : any =
      {
        "username" : 'instructor_' + this.instructor_username,
        "password" : this.instructor_password
      };
    this.instructorLoginService.getTokenfromServer(loginDetails).subscribe(
      (data : any[]) => {
        this.instructorLoginService.setJWTtoken(data['token']);
        let promise = new Promise((resolve,reject) => {
          setTimeout(() => {
            try {
                sessionStorage.setItem('isValidInstructor','true');
                sessionStorage.setItem('isValidJwtToken','true');
                sessionStorage.setItem('isLoggedIn','true');
                sessionStorage.setItem('current_name',this.instructor_username);
                this.instructorLoginService.isLoggedIn= true;
                this.instructorLoginService.current_name = this.instructor_username;
                this.instructorLoginService.getInstructor(this.instructor_username);
                this.instructorLoginService.addSession('Instructor', this.instructor_username);
                this.router.navigate(['profile/instructor']);
              resolve();
            } catch (e) {
              console.log('Add Session failed');
              reject();
            }
          }, 3000);
        });
      },
      error => {
        alert('Username or Password Incorrect');
      });
  }

  signupInstructor(fullName : string, username : string, email : string, mobile : string, qualification : string, password : string)
  {
    let instructor : Instructor = new Instructor(0,fullName,username,password,email,mobile,'',qualification);
    this.instructorLoginService.addInstructor(instructor).subscribe((data : string) =>
    {
      alert(data);
    });
  }
}
