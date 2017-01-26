import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

//import { GetUserAttend, GetVenueAttend } from "./interface/api.interface";
import { Logger } from "./logger.service";
import * as Raven from 'raven-js';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBase = this._api + '/api/nightlife/';
  private _apiRoute = {
    my_v      : this.apiBase + 'my/venues',         // Get a users attendance
    v_attend  : this.apiBase + 'venue/attendance',  // Get a users attendance
    set_v     : this.apiBase + 'set/',              // Get a users attendance
    rm_v      : this.apiBase + 'rm/',               // Get a users attendance
  };
  public myAttendance;
  public venueAttendance;

  constructor(
    private _http: Http,
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}
}
