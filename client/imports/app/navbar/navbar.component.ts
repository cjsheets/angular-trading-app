import { Component } from '@angular/core';
import { AuthService } from './auth.service';

import { Logger } from '../shared/logger.service';
import template from "./navbar.view.html";
import style from "./navbar.view.scss";

@Component({
  selector: 'navbar',
  template,
  styles: [ style ]
})
export class NavbarComponent { 

  constructor(
    private _auth: AuthService,
    private _log: Logger
  ) {}


}