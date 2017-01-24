import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import template from "./welcome.view.html";
import style from "./welcome.view.scss";

@Component({
  selector: "welcome",
  template,
  styles: [ style ]
})
export class WelcomeComponent implements OnInit {
  greeting: string;

  constructor() {
    this.greeting = "Hello Demo Component!";
  }

  ngOnInit() {
    
  }
}
