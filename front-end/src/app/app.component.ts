import { Component , OnInit , HostListener } from '@angular/core';
import {RestServiceService} from "./rest-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'V-Academy';

  constructor(private mainService : RestServiceService) {
  }
}
