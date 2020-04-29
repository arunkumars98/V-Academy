import { Component, OnInit } from '@angular/core';
import {Course} from "../model/Course";
import {RestServiceService} from "../rest-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/User";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  selected_course_code : string;
  selected_course_id : number;
  selected_course : Course;
  gstprice : number;
  total_price : number;
  current_user : User;
  data_ready : boolean = false;

  constructor(public paymentService: RestServiceService,private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    new Promise( (resolve,reject) => {
    let isValidUser : Boolean = Boolean(sessionStorage.getItem('isValidUser'));
    if(isValidUser) {
      try {
        this.current_user = JSON.parse(sessionStorage.getItem('current_user'));
        this.activatedRoute.queryParamMap.subscribe(params => {
          this.selected_course_id = +params.get('course');
          this.paymentService.getCourseById(this.selected_course_id).subscribe(
            (data: Course) => {
              this.selected_course = data;
              this.selected_course_code = data.coursecode;
              let z : number = +Number(+data.price / 100).toPrecision(2);
              this.gstprice = z * 18;
              this.total_price = +this.gstprice + +data.price;
            }
          );
        });
        this.data_ready = true;
        resolve();
      }
      catch (e) {
        console.log(e);
        reject();
      }
    }
    else {
      this.router.navigate(['user','login']);
    }
    });
  }

  doPayment() {
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
    let payment_details : string = date + '-' + this.selected_course_code + '-' + this.total_price;
    let request_body : User = this.current_user;
    request_body.enrolled_courses = request_body.enrolled_courses + this.selected_course_code + ',';
    request_body.payment_details = request_body.payment_details + payment_details + ',';
    this.paymentService.updatePayment(request_body).subscribe(
      (data : User) => {
        this.current_user = data;
        sessionStorage.setItem('current_user',JSON.stringify(this.current_user));
      }
    );
    this.paymentService.updateEnrolls(this.selected_course_id);
    this.router.navigate(['courses/learn'], {queryParams : { 'course' : this.selected_course_id}});
  }
}
