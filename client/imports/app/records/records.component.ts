import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';
import { RecordCollection, TraderCollection } from "../../../../shared/collections/trading.collection";

// import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../shared/api.service';
import { LastFM } from "../shared/interface/last-fm.interface";
import { Logger } from '../shared/logger.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import template from "./records.view.html";
import style from "./records.view.scss";



@Component({
  selector: 'records',
  template,
  styles: [ style ]
})
export class RecordsComponent implements OnInit { 
  records: Observable<any[]>;
  private bricks: Array<{}> = [];
  private subs: Subscription[] = [];
  private currentRoute: string;

  constructor(
    private _api: ApiService,
    private _log: Logger,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  public model;


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url.pop().path;
      switch(this.currentRoute){
        case 'records': this.initRecordsView(); break;
        case 'search': this.initSearchView(); break;
      }
    });
  }

  initRecordsView(){
    this.records = RecordCollection.find({}).zone();
    this.bricks = [];
    this.bricks.push({image: '/img/record.png', first: true})
    this.records.subscribe(pins => {
      let pin = pins[pins.length - 1];
      pin.rid = btoa(pin._id);
      this.bricks.push(pin)
    });
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
        console.log(albums)
      });
  }

}