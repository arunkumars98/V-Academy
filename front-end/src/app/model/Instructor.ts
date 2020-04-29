export class Instructor
{
  instructorid : number;
  fullname : string;
  username : string;
  password : string;
  email : string;
  mobile : string;
  courses : string;
  qualification : string;

  constructor(instructorid: number, fullname: string, username: string, password: string, email: string, mobile: string, courses: string, qualification: string) {
    this.instructorid = instructorid;
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.email = email;
    this.mobile = mobile;
    this.courses = courses;
    this.qualification = qualification;
  }
}
