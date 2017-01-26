import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { LastFM } from "./interface/last-fm.interface";
import { Logger } from "./logger.service";
import { AuthService } from "../navbar/auth.service";
import * as Raven from 'raven-js';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBase = this._api +
    "method=artist.getTopAlbums&format=json&limit=50&artist=";

  constructor(
    private _auth: AuthService,
    private _http: Http,
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}

  public getAlbums$(artist: string): Observable<Response> {
    this._log['log']('api::getAlbums$(): ', artist);
    let userID = '&u=' + this._auth.getUID();
    return this._http
      .get(this.apiBase + artist + userID,)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(err: Response) : Observable<Response> {
    let errorMessage = 'Http Response Error :: yelp.service';
    console.log('Error Handler: ', err);
    //this._log['error']('Http Response Error: ',err);
    Raven.captureException(err.json().err || errorMessage);
    return Observable.throw(err.json().err || errorMessage);
  }
}
