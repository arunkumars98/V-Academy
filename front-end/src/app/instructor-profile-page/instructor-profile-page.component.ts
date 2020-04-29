import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Instructor} from "../model/Instructor";
import {Router} from "@angular/router";
import {RestServiceService} from "../rest-service.service";
import {Course} from "../model/Course";

@Component({
  selector: 'app-instructor-profile-page',
  templateUrl: './instructor-profile-page.component.html',
  styleUrls: ['./instructor-profile-page.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class InstructorProfilePageComponent implements OnInit {

  active = 'Edit Courses';
  profile_edit : boolean = false;
  course_edit : boolean = false;
  instructor : Instructor;
  courses : Course[] = [];
  selected_course : Course;
  data_ready : boolean = false;
  edit_fullname : string;
  edit_username : string;
  edit_mobile : string;
  edit_email : string;
  edit_qualification : string;
  edit_password : string;
  edit_repassword : string;
  edit_course_name : string;
  edit_course_descrp : string;
  edit_course_author : string;
  edit_course_tag : string;
  edit_course_chapter : string;
  edit_course_test : string;
  edit_course_video : string;
  edit_course_image : string;
  edit_course_price : string;
  video_link : string;
  video_description : string;
  new_course_name : string;
  new_course_descrp : string;
  new_course_author : string;
  new_course_tag : string;
  new_course_chapter : string;
  new_course_test : string;
  new_course_video : string;
  new_course_image : string;
  new_course_price : string;
  new_course_rating : string;

  constructor(config: NgbModalConfig, private modalService: NgbModal,private router : Router, private iProfileService : RestServiceService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    let isValidInstructor : Boolean = Boolean(sessionStorage.getItem('isValidInstructor'));
    if(isValidInstructor) {
      new Promise( (resovle,reject) => {
        setTimeout ( () => {
          try {
            this.instructor = JSON.parse(sessionStorage.getItem('current_instructor'));
            let course_arr: string[] = this.instructor.courses.split(',');
            for (let x of course_arr) {
              this.iProfileService.getAllCourses().subscribe((data: Course[]) => {
                for (let y of data) {
                  if (y.coursecode == x) {
                    this.courses.push(y);
                  }
                }
              });
            }
            this.edit_fullname = this.instructor.fullname;
            this.edit_username = this.instructor.username;
            this.edit_email = this.instructor.email;
            this.edit_mobile = this.instructor.mobile;
            this.edit_qualification = this.instructor.qualification;
            this.data_ready = true;
            resovle();
          }
          catch (e) {
            console.error(e);
            reject();
          }
        },3000);
      });
    }
    else {
      this.router.navigate(['instructor/login']);
    }
  }

  changeInstructorDetails(fullname : string, username : string, email : string, mobile : string, qualification : string)
  {
    let post_instructor : Instructor = this.instructor;
    post_instructor.fullname = fullname;
    post_instructor.username = username;
    post_instructor.email = email;
    post_instructor.mobile =  mobile;
    post_instructor.qualification = qualification;
    this.iProfileService.updateInstructorProfile(post_instructor).subscribe( (data : Instructor) => {
      if(data!=null) {
        sessionStorage.setItem('current_instructor',JSON.stringify(data));
        alert("Profile details updated successfully");
      }
      else {
        alert("Profile details not updated!");
      }
    });
    this.changetoViewMode();
  }

  changePassword(password : string)
  {
    let post_instructor : Instructor = this.instructor;
    post_instructor.password = password;
    this.iProfileService.updateInstructorPassword(post_instructor).subscribe( (data : Instructor) => {
      if(data!=null) {
        sessionStorage.setItem('current_instructor',JSON.stringify(data));
        alert("Password updated successfully");
      }
      else {
        alert("Password not updated");
      }
    });
  }

  changeCourseDetails(name : string, descrp : string, author : string, tag : string, chapter : string,
                      test : string, video : string, image : string, price : string)
  {
    let post_course : Course = this.selected_course;
    post_course.coursename = name;
    post_course.descrp = descrp;
    post_course.author = author;
    post_course.tags = tag;
    post_course.test = test;
    post_course.chapters = chapter;
    post_course.videos = video;
    post_course.image = image;
    post_course.price = price;
    let day : string = new Date().getDate().toString();
    if (+day<10)
    {
      day = '0' + day;
    }
    let month : string = (new Date().getMonth() + 1).toString();
    if (+month<10)
    {
      month = '0' + month;
    }
    post_course.updated_on = day + "/" + month + "/" + new Date().getFullYear();
    this.iProfileService.updateCourseDetails(post_course).subscribe( (data : Course) => {
      if(data!=null) {
        this.selected_course = data;
        alert("Course details updated successfully");
      }
      else {
        alert("Course details not updated");
      }
    });
    this.changetoCourseViewMode();
  }

  addNewCourse(name : string, descrp : string, author : string, tag : string, chapter : string,
                      test : string, video : string, image : string, price : string, rating : string)
  {
    let arr : string[] = tag.split(',');
    let code : string = arr[0] + '#';
    let day : string = new Date().getDate().toString();
    if (+day<10)
    {
      day = '0' + day;
    }
    let month : string = (new Date().getMonth() + 1).toString();
    if (+month<10)
    {
      month = '0' + month;
    }
    let date : string = day + "/" + month + "/" + new Date().getFullYear();
    let post_course : Course = new Course(0,code,name,author,descrp,price,rating,tag,test,chapter,
      video,image,'0',date,date);
    this.iProfileService.addCourse(post_course).subscribe( (data : string) => {
      alert(data);
      if(data.includes('Successfully'))
      {
          this.iProfileService.getCourseByCourseBody(post_course).subscribe( (response : Course) => {
            console.debug('response course :',response);
            this.courses.push(response);
            let code = response.coursecode;
            code = code.substring(0,3);
            this.iProfileService.updateInstructorCourse(this.instructor.username,code,response.courseid).subscribe(
              (data : Instructor) => {
                if(data!=null) {
                  this.instructor = data;
                  sessionStorage.setItem('current_instructor', JSON.stringify(this.instructor));
                  console.debug('After adding course', this.instructor);
                }
                else {
                  console.error('Instructor course not updated!');
                }
              });
        });
        this.updateCourseList();
      }
    });
  }

  editSelectedCourse(course : string)
  {
    for(let x of this.courses)
    {
      if(course==x.coursecode)
      {
        this.selected_course = x;
        break;
      }
    }
    this.edit_course_name = this.selected_course.coursename;
    this.edit_course_descrp = this.selected_course.descrp;
    this.edit_course_author = this.selected_course.author;
    this.edit_course_tag = this.selected_course.tags;
    this.edit_course_test = this.selected_course.test;
    this.edit_course_video = this.selected_course.videos;
    this.edit_course_price = this.selected_course.price;
    this.edit_course_chapter = this.selected_course.chapters;
    this.edit_course_image = this.selected_course.image;

    this.changetoCourseEditMode();
  }

  deleteInstructor()
  {
    this.iProfileService.deleteInstructor(this.instructor.username).subscribe( (data : string) => {
      alert(data);
    });
    this.iProfileService.logoutUser();
    this.router.navigate(['instructor','login']);
  }

  changetoEditMode()
  {
    this.profile_edit = true;
  }

  changetoViewMode()
  {
    this.profile_edit = false;
  }

  changetoCourseEditMode()
  {
    this.course_edit = true;
  }

  changetoCourseViewMode()
  {
    this.course_edit = false;
  }

  setVideoStream(link : string, description : string)
  {
    this.video_link = link;
    this.video_description = description;
    sessionStorage.setItem('link',link);
    sessionStorage.setItem('video_descrp',description);
    let id : number = Number(Math.random().toFixed(5));
    let code = String(id);
    code = code.substring(2,8);
    this.router.navigate(['instructor/video-stream'],{queryParams : {'id' : code}});
  }

  open(content) {
    this.modalService.open(content);
  }

  updateCourseList()
  {
    this.courses = [];
    let course_arr: string[] = this.instructor.courses.split(',');
    for (let x of course_arr) {
      this.iProfileService.getAllCourses().subscribe((data: Course[]) => {
        for (let y of data) {
          if (y.coursecode == x) {
            this.courses.push(y);
          }
        }
      });
    }
  }
}
