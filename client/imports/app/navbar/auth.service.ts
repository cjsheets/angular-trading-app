/* -----------------------------------|
 *|  Auth Service - Firebase
 */
import { Injectable } from '@angular/core';
import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Logger } from '../shared/logger.service';
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  constructor(
    private _log: Logger,
    private router: Router
  ) {}

  login() {

  }

  logout() {

  }

  getUID() {

  }
}
