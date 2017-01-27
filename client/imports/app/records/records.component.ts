import { Component, OnDestroy, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';
import { RecordCollection, TraderCollection } from "../../../../shared/collections/trading.collection";
import {Records, Traders} from "../../../../shared/models/trading.model";

// import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../shared/api.service';
import { LastFM } from "../shared/interface/last-fm.interface";
import { Logger } from '../shared/logger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import template from "./records.view.html";
import style from "./records.view.scss";
import { MeteorObservable } from 'meteor-rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';



@Component({
  selector: 'records',
  template,
  styles: [ style ]
})
export class RecordsComponent implements OnInit, OnDestroy { 
  records: Observable<any[]>;
  traders: Observable<any[]>;
  private bricks: Array<{}> = [];
  private subs: Subscription[] = [];
  private currentRoute: string;
  private recordID: string;
    public records$: ReplaySubject<{}> = new ReplaySubject(1);
  private initialBrick = true;
  constructor(
    private _api: ApiService,
    private _log: Logger,
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subs[this.subs.length] = route.params.subscribe(params => { 
        if(params.hasOwnProperty('rid'))
          this.recordID = atob(params['rid']);
    });
  }

  public model;
  public uid;


  ngOnInit(): void {
    this.uid = this._auth.getUID();
    this.records$.subscribe((records: any) =>{
      this.bricks = [];
      console.log('Records: ', records)
      records.forEach(record => this.bricks.push(record))
    })
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url.pop().path;
      switch(this.currentRoute){
        case 'records': this.initRecordsView(); break;
        case 'search': this.initSearchView(); break;
       };
    });
  }

  initRecordsView(){
    let recordCollection = RecordCollection.find({}).zone();
    recordCollection.subscribe(records => this.records$.next(records));
  }

  initSearchView(){

  }

  search(value){
    this._api.queryAPI$(value.artist)
      .subscribe((albums : LastFM) => {
        let uid = this._auth.getUID(),
          albumAry = [];
          console.log('search-albums: ', albums)
        albums.topalbums.album.forEach(album =>{
          console.log('search: ', album)
          if(album.image[2]['#text'] != ''){
            albumAry.push({
              id: album.url,
              owner: uid,
              name: album.name,
              artist: album.artist.name,
              image: album.image[2]['#text'],
              available: true
            })
          }
        })
        this.records$.next(albumAry);
      });
  }

  requestTrade(record){
    console.log('requestTrade', record)
    let uid = this._auth.getUID();
    MeteorObservable.call('requestTrade', record.owner, uid, record._id)
      .subscribe(() => {
        console.log('record requested.');
      }, (error) => {
        console.log(`Failed to request due to ${error}`);
      });
  }

  addRecord(record){
    console.log('addRecord', record)
    MeteorObservable.call('addRecord', record)
      .subscribe(() => {
        console.log('record requested.');
      }, (error) => {
        console.log(`Failed to request due to ${error}`);
      });
  }

  removeRecord(record){
    console.log('removeRecord', record)
    MeteorObservable.call('removeRecord', record._id)
      .subscribe(() => {
        console.log('record requested.');
      }, (error) => {
        console.log(`Failed to request due to ${error}`);
      });
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }

}