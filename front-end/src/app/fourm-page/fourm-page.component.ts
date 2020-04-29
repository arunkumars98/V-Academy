import {Component, OnInit} from '@angular/core';
import {Question} from "../model/Question";
import {Reply} from "../model/Reply";
import {RestServiceService} from "../rest-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fourm-page',
  templateUrl: './fourm-page.component.html',
  styleUrls: ['./fourm-page.component.css']
})
export class FourmPageComponent implements OnInit {

  posts : Post[] = [];
  complete_posts : Post[] = [];
  complete_questions : Question[] = [];
  complete_replies : Reply[] = [];
  search_post : string;
  username : string;
  new_reply_text : string;
  new_post_topic : string;
  new_post_content : string;
  data_ready : boolean = false;

  constructor(private forumService : RestServiceService,private router : Router){
  }

  ngOnInit(): void {
    let isValidUser : Boolean = Boolean(sessionStorage.getItem('isValidUser'));
    let isValidInstructor : Boolean = Boolean(sessionStorage.getItem('isValidInstructor'));
    if(isValidUser || isValidInstructor)
    {
      this.username = sessionStorage.getItem('current_name');
    }
    else {
      this.router.navigate(['user','login']);
    }
    new Promise( (resolve,reject) => {
      setTimeout(() => {
        try {
          this.forumService.getAllForumQuestions().subscribe((data: Question[]) => {
            this.complete_questions = data;
            this.forumService.getAllForumReplies().subscribe((data: Reply[]) => {
              this.complete_replies = data;
              for (let x of this.complete_questions) {
                let temp: Reply[] = [];
                for (let y of this.complete_replies) {
                  if (x.qid == y.qid) {
                    temp.push(y);
                  }
                }
                if (temp.length == 0) {
                  this.complete_posts.push(new Post(x, null));
                } else {
                  this.complete_posts.push(new Post(x, temp));
                }
              }
              this.posts = this.complete_posts;
            });
          });
          this.data_ready = true;
          resolve();
        }
        catch (e) {
          console.error(e);
          reject();
        }
      }, 5000);
    });
  }

  doSearchPost(search : string)
  {
    this.search_post = search;
    this.posts = [];
    for(let x of this.complete_posts)
    {
      if(x.question.topic.includes(search) || x.question.content.includes(search))
      {
        this.posts.push(x);
      }
    }
    if(this.posts.length==0)
    {
      this.posts = this.complete_posts;
      this.search_post = '';
      alert("No Results found, Showing all posts");
    }
  }

  setDefautltSearch()
  {
    this.search_post = '';
    this.posts = this.complete_posts;
  }

  doReply(qid : number, content : string)
  {
    let date : string = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
    let timestamp : string = date + '  ' + this.getCurrentTime();
    let post_reply : Reply = new Reply(0,qid,timestamp,this.username,content);
    this.forumService.postReply(post_reply).subscribe( (data : Reply) => {
      if(data!=null)
      {
        for(let x of this.posts)
        {
          if(x.question.qid==qid && post_reply!=null)
          {
            x.replies.push(post_reply);
            break;
          }
        }
        alert('Reply posted successfully');
      }
      else {
        alert('Reply not posted!');
      }
    });
  }

  doPostNewQuestion(topic : string, content : string)
  {
    let date : string = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
    let time : string = this.getCurrentTime();
    let timestamp : string = date + '  ' + time;
    let post_question : Question = new Question(0,timestamp,this.username,topic,content);
    this.forumService.postQuestion(post_question).subscribe( (data : Question) => {
      if(data!=null)
      {
        this.posts.push(new Post(data,null));
        alert('Question posted successfully');
      }
      else {
        alert('Question not Posted!');
      }
    });
  }

  getCurrentTime() : string
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
    return hour + ":" + minute;
  }
}

export class Post {

  question : Question;
  replies : Reply[];

  constructor(question: Question, replies: Reply[]) {
    this.question = question;
    this.replies = replies;
  }
}
