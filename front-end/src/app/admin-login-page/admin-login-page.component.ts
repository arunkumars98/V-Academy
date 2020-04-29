import { Component, OnInit } from '@angular/core';
import {RestServiceService} from "../rest-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})

export class AdminLoginPageComponent implements OnInit {

  admin_username : string;
  admin_password : string;

  constructor(private adminLoginService : RestServiceService, private router : Router) { }

  ngOnInit(): void {
  }

  doAdminLogin(username,password)
  {
    if(this.adminLoginService.isLoggedIn)
    {
      try {
        this.adminLoginService.updateSession();
        sessionStorage.removeItem('JwtToken');
        sessionStorage.clear();
        this.adminLoginService.current_name = '';
        this.adminLoginService.isLoggedIn = false;
      }
      catch (e) {
        console.log(e);
      }
    }
    this.admin_username = username;
    this.admin_password = password;
    let credentials : any = {
      "username" : "admin_" + this.admin_username,
      "password" : this.admin_password
    };
    this.adminLoginService.getTokenfromServer(credentials).subscribe(
      (data : any[]) => {
        this.adminLoginService.setJWTtoken(data['token']);
        sessionStorage.setItem('isValidJwtToken','true');
        sessionStorage.setItem('isValidAdmin','true');
        sessionStorage.setItem('isLoggedIn','true');
        sessionStorage.setItem('current_name',this.admin_username);
        this.adminLoginService.isLoggedIn= true;
        this.adminLoginService.current_name = this.admin_username;
        this.adminLoginService.getAdmin(this.admin_username);
      }, error => {
        alert('Invalid Credentials!');
        console.error(error);
      });
    let promise = new Promise((resolve,reject) => {
      setTimeout( () => {
        try {
          let isValidAdmin: Boolean = Boolean(sessionStorage.getItem('isValidAdmin'));
          if (isValidAdmin) {
            this.adminLoginService.addSession("Admin",this.admin_username);
            this.router.navigate(['admin/control']);
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
}
