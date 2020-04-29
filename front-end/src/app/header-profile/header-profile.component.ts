import {Component, OnInit} from '@angular/core';
import {RestServiceService} from "../rest-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.css']
})

export class HeaderProfileComponent implements OnInit {

  constructor(public profileRestService : RestServiceService, private router : Router){
  }

  ngOnInit(): void {
  }

  dologoutCurrentUser()
  {
      alert(this.profileRestService.logoutUser());
      this.router.navigate(['user','login']);
  }

  goToAccount()
  {
    this.router.navigate(['profile/user'],{queryParams : {'tab' : 'Account'}});
  }

  gotoProfile()
  {
    this.router.navigate(['profile/user'],{queryParams : {'tab' : 'Profile'}});
  }
}
