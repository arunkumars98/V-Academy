import { Component, OnInit } from '@angular/core';
import {Admin} from "../model/Admin";
import {User} from "../model/User";
import {Course} from "../model/Course";
import {RestServiceService} from "../rest-service.service";
import {Instructor} from "../model/Instructor";
import {Session} from "../model/Session";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  adminList : Admin[];
  userList : User[];
  courseList: Course[];
  instructorList : Instructor[];
  sessionList : Session[];
  data_ready : boolean = false;

  constructor(private adminControlService : RestServiceService, private router : Router) { }

  ngOnInit(): void {
    let isValidAdmin : Boolean = Boolean(sessionStorage.getItem('isValidAdmin'));
    if(isValidAdmin) {
      this.getDatabase();
    }
    else {
      this.router.navigate(['admin/login']);
    }
  }

  public getDatabase()
  {
    new Promise( (resolve,reject) => {
      setTimeout( () => {
        try {
          this.adminList = [];
          this.userList = [];
          this.instructorList = [];
          this.courseList = [];
          this.sessionList = [];

          this.adminControlService.getAllAdmins().subscribe(
            (data: Admin[]) => {
              this.adminList = data;
            });
          this.adminControlService.getAllUsers().subscribe(
            (data: User[]) => {
              this.userList = data;
            });
          this.adminControlService.getAllCourses().subscribe(
            (data: Course[]) => {
              this.courseList = data;
            });
          this.adminControlService.getAllInstructors().subscribe(
            (data: Instructor[]) => {
              this.instructorList = data;
            });
          this.adminControlService.getAllSessions().subscribe(
            (data: Session[]) => {
              this.sessionList = data;
            });
          this.data_ready = true;
          resolve();
        }
        catch (e) {
          console.error(e);
          reject();
        }
      },3000);
    });
  }

  public deleteUser(username : string)
  {
     this.adminControlService.deleteUser(username).subscribe(
       (data :string) => {
          alert(data);
       }
     );
     this.getDatabase();
  }

  public deleteInstructor(username : string)
  {
    this.adminControlService.deleteInstructor(username).subscribe(
      (data :string) => {
        alert(data);
      }
    );
    this.getDatabase();
  }

  public deleteAdmin(username : string)
  {
    this.adminControlService.deleteAdmin(username).subscribe(
      (data :string) => {
        alert(data);
      }
    );
    this.getDatabase();
  }

  public deleteCourse(id : number)
  {
    this.adminControlService.deleteCourse(id).subscribe(
      (data :string) => {
        alert(data);
      }
    );
    this.getDatabase();
  }

  public deleteSession(id : number)
  {
    this.adminControlService.deleteSession(id).subscribe(
      (data :string) => {
        alert(data);
      }
    );
    this.getDatabase();
  }

}
