export class User
{
    userid : number;
    fullname : string;
    username : string;
    password : string;
    email : string;
    mobile : string;
    parent_mobile: string;
    enrolled_courses : string;
    payment_details : string;
    active_courses : string;
    courses_completed : string;
    interest : string;

  constructor(userid: number, fullname: string, username: string, password: string, email: string, mobile: string, parent_mobile: string, enrolled_courses: string, payment_details: string, active_courses: string, courses_completed: string, interest: string) {
    this.userid = userid;
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.email = email;
    this.mobile = mobile;
    this.parent_mobile = parent_mobile;
    this.enrolled_courses = enrolled_courses;
    this.payment_details = payment_details;
    this.active_courses = active_courses;
    this.courses_completed = courses_completed;
    this.interest = interest;
  }
}
