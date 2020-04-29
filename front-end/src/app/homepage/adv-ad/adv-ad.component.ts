import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'adv-ad',
  templateUrl: './adv-ad.component.html',
  styleUrls: ['./adv-ad.component.css']
})
export class AdvAdComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  gotoForum()
  {
    this.router.navigate(['forum'],{ queryParams : { 'search' : 'all' }});
  }
}
