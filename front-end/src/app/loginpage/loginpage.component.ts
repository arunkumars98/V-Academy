import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {RestServiceService} from "../rest-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import {delay} from "rxjs/operators";
import {User} from "../model/User";

@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})

export class LoginpageComponent implements OnInit,AfterViewInit {

  @ViewChild('tabs')
  private tabs : NgbTabset;

  login_username :string;
  login_password :string;

  signup_username :string;
  signup_password :string;
  signup_fullname :string;
  signup_email :string;
  signup_repassword : string;
  signup_mobile : string;

  constructor(private restServiceService: RestServiceService, private router : Router, private activatedRoute : ActivatedRoute ) { }

  ngOnInit(): void {
  }

  sendLoginDetails(username,password)
  {
    if(this.restServiceService.isLoggedIn)
    {
      try {
        this.restServiceService.updateSession();
        sessionStorage.removeItem('JwtToken');
        sessionStorage.clear();
        this.restServiceService.current_name = '';
        this.restServiceService.isLoggedIn = false;
      }
      catch (e) {
        console.log(e);
      }
    }
    this.login_username = username;
    this.login_password = password;
    let loginDetails:any =
      {
        "username" : this.login_username,
        "password" : this.login_password
      };
    this.restServiceService.getTokenfromServer(loginDetails)
      .subscribe((data: any[]) => {
        this.restServiceService.setJWTtoken(data['token']);
        sessionStorage.setItem('isValidUser','true');
        sessionStorage.setItem('isValidJwtToken','true');
        sessionStorage.setItem('isLoggedIn','true');
        sessionStorage.setItem('current_name',this.login_username);
        this.restServiceService.isLoggedIn = true;
        this.restServiceService.current_name = this.login_username;
        this.restServiceService.getUser(this.login_username);
      },
      error => {
        alert('Username or Password Incorrect');
      });
    let promise = new Promise((resolve,reject) => {
      setTimeout( () => {
        try {
          let isValidUser: Boolean = Boolean(sessionStorage.getItem('isValidUser'));
          if (isValidUser) {
            this.restServiceService.addSession('User', this.login_username);
            this.router.navigate(['/']);
          }
          resolve();
        }
        catch (e) {
          console.log('Add Session failed');
          reject();
        }
      },3000);
    });
  }

  sendSignupDetails(fullname,username,email,password,mobile)
  {
      this.signup_fullname = fullname;
      this.signup_username = username;
      this.signup_email = email;
      this.signup_password = password;
      this.signup_mobile = mobile;

      let request_body: User = new User(0,this.signup_fullname,this.signup_username,this.signup_password,
                             this.signup_email,this.signup_mobile, '','','','','','');

      this.restServiceService.addUser(request_body).pipe(delay(0))
      .subscribe((data : string) =>
      {
          alert(data);
          if(data.includes('added'))
          {
            this.router.navigate(['user', 'login']);
          }
      });
  }

  ngAfterViewInit(): void {
      this.activatedRoute.paramMap.pipe(delay(0))
        .subscribe(params => {
          this.tabs.select(params.get('type'));
        });
  }
}
