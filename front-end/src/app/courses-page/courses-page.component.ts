import { Component, OnInit } from '@angular/core';
import { Course } from '../model/Course';
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {delay} from "rxjs/operators";
import {RestServiceService} from "../rest-service.service";
import {User} from "../model/User";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
  providers: [NgbRatingConfig]
})

export class CoursesPageComponent implements OnInit {

  coursesList : Course[] = [];
  search : string;
  dataList : Course[] = [];
  page = 1;
  pageSize = 9;

  constructor(config: NgbRatingConfig, private activatedRoute : ActivatedRoute,private courseService : RestServiceService, private router : Router) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.setSearch(params['search']);
        this.courseService.getAllCourses().pipe(delay(0)).subscribe((data: Course[]) => {
          this.dataList = data;
          if(this.getSearch()=='all')
          {
            this.coursesList = this.dataList;
          }
          else {
            this.coursesList = [];
            for(let x of this.dataList)
            {
              if(x.tags.includes(this.getSearch()) || x.coursename.includes(this.getSearch()))
              {
                console.log(x.tags + this.getSearch());
                this.coursesList.push(x);
              }
            }
          }
        });
      });
  }

  public setSearch(value : string)
  {
    this.search = value;
  }

  public getSearch() : string {
    return this.search;
  }

  public showAll()
  {
    this.router.navigate(['courses/all-courses'], {queryParams: {'search': 'all'}});
  }

  public gotoCourse(course_id : number)
  {
    let isValidUser : boolean = Boolean(sessionStorage.getItem('current_user'));
    if(isValidUser) {
        this.router.navigate(['course',course_id]);
    }
    else {
        this.router.navigate(['user','login']);
    }
  }

  public scroll()
  {
    window.scrollTo(0,0);
  }
}
