import { Component } from '@angular/core';

//import { AuthService } from '../auth.service';
import template from "./social-auth.view.html";
import style from "./social-auth.view.scss";

@Component({
  selector: 'social-auth',
  template,
  styles: [ style ]
})

export class SocialAuthComponent {
 
  //constructor(private _auth: AuthService){}

}
