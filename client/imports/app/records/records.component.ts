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


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url.pop().path;
      switch(this.currentRoute){
        case 'records': this.initRecordsView(); break;
        case 'search': this.initSearchView(); break;
        default:
          this.currentRoute = url.pop().path;
          switch(this.currentRoute){
            case 'request': this.requestTrade(); break;
            case 'remove': this.removeRecord(); break;
          };
      };
    });
  }

  initRecordsView(){
    this.records = RecordCollection.find({}).zone();
    this.bricks = [];
    let uid = this._auth.getUID();
    this.bricks.push({image: '/img/record.png', first: true})
    this.records.subscribe(pins => {
      let pin = pins[pins.length - 1];
      pin.rid = btoa(pin._id);
      pin.mine = (pin.owner == uid) ? true : false;
      //console.log(pin)
      this.bricks.push(pin)
    });
    console.log(this.bricks)
  }

  initSearchView(){

  }

  search(value){
    this._api.queryAPI$(value.artist)
      .subscribe((albums : LastFM) => {
        this.bricks = [];
        let uid = this._auth.getUID();
        albums.topalbums.album.forEach(album =>{
          if(album.image[2]['#text'] != ''){
            this.bricks.push({
              id: album.url,
              owner: uid,
              name: album.name,
              artist: album.artist.name,
              image: album.image[2]['#text'],
              available: true
            })
          }
        })
        //console.log(albums)
      });
  }

  requestTrade(){
    let uid = this._auth.getUID(),
      record = RecordCollection.findOne({_id: this.recordID}),
      requestor: any = TraderCollection.findOne({id: uid}),
      owner: any = TraderCollection.findOne({id: record.owner}),
      tradeRequest = { 
        record_id: this.recordID, loan_status: false
      }
    if(requestor){
      requestor.requests.push(tradeRequest);
      TraderCollection.update(requestor._id,
        {$set: 
          { requests: requestor.requests }
        });
    } else {
      let trade: Traders = {
        id: uid,
        requests: [tradeRequest]
      }
      TraderCollection.insert(trade);
    }
    if(owner){
      owner.requests.push(tradeRequest);
      TraderCollection.update(owner._id,
        {$set: 
          { offers: owner.requests }
        });
    } else {
      let trade: Traders = {
        id: record.owner,
        offers: [tradeRequest]
      }
      TraderCollection.insert(trade);
    }
    this.router.navigate(['/at/records']);
  }

  removeRecord(){

  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }

}