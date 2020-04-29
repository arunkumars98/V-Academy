import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "./model/User";
import {Admin} from "./model/Admin";
import {Instructor} from "./model/Instructor";
import {Course} from "./model/Course";
import {Question} from "./model/Question";
import {Reply} from "./model/Reply";
import {Session} from "./model/Session";

@Injectable({
  providedIn: 'root'
})

export class RestServiceService {

  isLoggedIn : boolean = Boolean(sessionStorage.getItem('isLoggedIn'));
  current_name : string = sessionStorage.getItem('current_name');

  constructor( private httpClient : HttpClient){
  }

  //Admin
  public getAdmin(username : string)
  {
    this.httpClient.get("http://localhost:8080/admin/get-admin/" + username, {headers : this.getHeader()})
      .subscribe( (data : Admin) => {
        sessionStorage.setItem('current_admin',JSON.stringify(data));
      });
  }

  public getAllAdmins()
  {
    return this.httpClient.get("http://localhost:8080/admin/all-admins",{headers : this.getHeader()});
  }

  public deleteAdmin(username : string)
  {
    return this.httpClient.delete("http://localhost:8080/admin/delete-admin/" + username,{headers : this.getHeader(), responseType : "text"});
  }

  //Course
  public getAllCourses()
  {
    return this.httpClient.get("http://localhost:8080/common/all-courses");
  }

  public getCourseById(id : number)
  {
    return this.httpClient.get("http://localhost:8080/course/course-id=" + id, {headers : this.getHeader()});
  }

  public getCourseByCourseBody(request_body : Course)
  {
    return this.httpClient.post("http://localhost:8080/course/get-course",request_body,{headers : this.getHeader()});
  }

  public addCourse(request_body : Course)
  {
    return this.httpClient.post("http://localhost:8080/course/add-course",request_body,{headers : this.getHeader(), responseType : "text"});
  }

  public updateCourseDetails(request_body : Course)
  {
    return this.httpClient.post("http://localhost:8080/course/update/details",request_body, {headers : this.getHeader()});
  }

  public updateEnrolls(course_id : number)
  {
    this.httpClient.get("http://localhost:8080/course/update/enrolls/" + course_id, {headers : this.getHeader(), responseType : "text"})
      .subscribe( (data : string) => { console.log(data); });
  }

  public deleteCourse(course_id : number)
  {
    return this.httpClient.delete("http://localhost:8080/course/delete-course/" + course_id,{headers : this.getHeader(), responseType : "text"});
  }

  //User
  public getAllUsers()
  {
    return this.httpClient.get("http://localhost:8080/admin/user/all-users",{headers : this.getHeader()});
  }

  public getUser(username : string)
  {
    this.httpClient.get("http://localhost:8080/user/get-user/" + username, {headers: this.getHeader()}).subscribe((data: User) => {
      sessionStorage.setItem('current_user',JSON.stringify(data));
    });
  }

  public updatePayment(request_body : User)
  {
    return this.httpClient.post("http://localhost:8080/user/update/payment",request_body, {headers : this.getHeader()});
  }

  public updateCourseComplete(request_body : User)
  {
    return this.httpClient.post("http://localhost:8080/user/update/course-complete",request_body, {headers : this.getHeader()});
  }

  public updateActiveCourse(request_body : User)
  {
    return this.httpClient.post("http://localhost:8080/user/update/active-course",request_body, {headers : this.getHeader()});
  }

  public updatePassword(request_body : User)
  {
    return this.httpClient.post("http://localhost:8080/user/update/password",request_body, {headers : this.getHeader()});
  }

  public updateSuggesstion(request_body : User)
  {
    return this.httpClient.post("http://localhost:8080/user/update/interest",request_body, {headers : this.getHeader()});
  }

  public updateProfile(request_body : User)
  {
    return this.httpClient.post("http://localhost:8080/user/update/profile",request_body, {headers : this.getHeader()});
  }

  public addUser(request_data : User)
  {
    return this.httpClient.post("http://localhost:8080/common/add-user",request_data,{responseType : "text"});
  }

  public deleteUser(username : string)
  {
    return this.httpClient.delete("http://localhost:8080/user/delete-user/" + username,{headers : this.getHeader(), responseType : "text"});
  }

  //Instructor
  public getAllInstructors()
  {
    return this.httpClient.get("http://localhost:8080/admin/instructor/all-instructors", { headers : this.getHeader()});
  }

  public getInstructor(username : string)
  {
    return this.httpClient.get("http://localhost:8080/instructor/" + username,
      { headers : this.getHeader()}).subscribe( (data : Instructor) =>
    { sessionStorage.setItem('current_instructor',JSON.stringify(data))});
  }

  public addInstructor(request_body : Instructor)
  {
    return this.httpClient.post("http://localhost:8080/common/add-instructor",request_body,{responseType : "text"});
  }

  public deleteInstructor(username : string)
  {
    return this.httpClient.delete("http://localhost:8080/instructor/delete-instructor/" + username,{ headers : this.getHeader(), responseType : "text"});
  }

  public updateInstructorProfile(request_body : Instructor)
  {
    return this.httpClient.post("http://localhost:8080/instructor/update/profile",request_body, {headers : this.getHeader()});
  }

  public updateInstructorPassword(request_body : Instructor)
  {
    return this.httpClient.post("http://localhost:8080/instructor/update/password",request_body, {headers : this.getHeader()});
  }

  public updateInstructorCourse(username : string, course : string, id : number)
  {
    return this.httpClient.get("http://localhost:8080/instructor/update/course/"+ username + "/" + course + "/" + id, {headers : this.getHeader()});
  }

  //Session
  public getAllSessions()
  {
    return this.httpClient.get("http://localhost:8080/admin/session/all-sessions",{headers : this.getHeader()});
  }

  public addSession(type : string, username : string)
  {
    let minute : string = new Date().getMinutes().toString();
    if (+minute<10)
    {
      minute = '0' + minute;
    }
    let hour : string = new Date().getHours().toString();
    if (+hour<10)
    {
      hour = '0' + hour;
    }
    let time : string = hour + ":" + minute;
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
    let request_body = new Session(0,type,username,date,time,'active');
    this.httpClient.post("http://localhost:8080/session/add-session",request_body,{headers : this.getHeader()})
      .subscribe( (data : Session) => {
        if(data!=null) {
          sessionStorage.setItem('Session', JSON.stringify(data));
        }
        else {
          console.error('Session not added');
        }
      });
  }

  public deleteSession(id : number)
  {
    let url : string = 'http://localhost:8080/session/delete-session/' + id;
    return this.httpClient.delete(url,{headers : this.getHeader(), responseType : "text"});
  }

  public updateSession()
  {
    let minute : string = new Date().getMinutes().toString();
    if (+minute<10)
    {
      minute = '0' + minute;
    }
    let hour : string = new Date().getHours().toString();
    if (+hour<10)
    {
      hour = '0' + hour;
    }
    let time : string = hour + ":" + minute;
    let request_body : Session = JSON.parse(sessionStorage.getItem('Session'));
    request_body.outTime = time;
    this.httpClient.post("http://localhost:8080/session/update",request_body,
     {headers : this.getHeader(), responseType : "text"}).subscribe( (data : string) => { console.log(data)});
  }

  //Authorization
  public logoutUser(): string
  {
    try {
      this.updateSession();
    }
    catch (e) {
      console.log(e);
    }
    sessionStorage.setItem('isLoggedIn','false');
    sessionStorage.setItem('current_name',null);
    sessionStorage.setItem('isValidUser','false');
    sessionStorage.setItem('isValidAdmin','false');
    sessionStorage.setItem('isValidInstructor','false');
    sessionStorage.setItem('current_user',null);
    sessionStorage.setItem('current_admin',null);
    sessionStorage.setItem('current_instructor',null);
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.current_name = 'Login';
    return "Logged Out Successfully";
  }

  public getTokenfromServer(username_password)
  {
    return this.httpClient.post("http://localhost:8080/login",username_password);
  }

  public setJWTtoken(jwttoken : string)
  {
    sessionStorage.setItem('JwtToken',jwttoken);
  }

  public getHeader() : HttpHeaders
  {
    let requestHeader =  new HttpHeaders();
    requestHeader = requestHeader.append("Authorization","Bearer "+ sessionStorage.getItem('JwtToken'));
    requestHeader = requestHeader.append("Access-Control-Allow-Origin", "*");
    return requestHeader;
  }

  //Forum
  public getAllForumQuestions()
  {
    return this.httpClient.get("http://localhost:8080/forum/all-questions", {headers : this.getHeader()});
  }

  public getAllForumReplies()
  {
    return this.httpClient.get("http://localhost:8080/forum/all-replies", {headers : this.getHeader()});
  }

  public postQuestion(post_question : Question)
  {
    return this.httpClient.post("http://localhost:8080/forum/post/question",post_question, {headers : this.getHeader()});
  }

  public postReply(post_reply : Reply)
  {
    return this.httpClient.post("http://localhost:8080/forum/post/reply",post_reply,{headers : this.getHeader()});
  }
}
