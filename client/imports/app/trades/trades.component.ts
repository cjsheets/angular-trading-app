import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

// import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

import { Logger } from '../shared/logger.service';
import { ActivatedRoute } from '@angular/router';

import { RecordCollection, TraderCollection } from "../../../../shared/collections/trading.collection";
import {Records, Traders} from "../../../../shared/models/trading.model";

// import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import template from "./trades.view.html";
import style from "./trades.view.scss";
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Component({
  selector: 'trades',
  template,
  styles: [ style ]
})
export class TradesComponent implements OnInit { 
  trader: Traders;
    public trades$: ReplaySubject<{}> = new ReplaySubject(1);
private bricks = []

  constructor(
    private _log: Logger,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  public model;


  ngOnInit(): void {
    this.trades$.subscribe((trades: any) =>{
      this.bricks = [];
      console.log('Trades: ', trades)
      trades.forEach(trade =>{
        this.bricks.push(trade);
      })
    })
    this.initTradesView();
  }

  initTradesView(){
    let uid = this._auth.getUID(),
      usersCollection = TraderCollection.find({id: uid}).zone();
    usersCollection.subscribe(usersTrades => {
      let trades = [];
      if(usersTrades[0].hasOwnProperty('requests'))
        usersTrades[0].requests.forEach(request => {
          let record = RecordCollection.findOne({_id: request.record_id})
          trades.push({
            type: 'request',
            request: request,
            record: record
          });
        });
      if(usersTrades[0].hasOwnProperty('offers'))
        usersTrades[0].offers.forEach(offer => {
          let record = RecordCollection.findOne({_id: offer.record_id})
          trades.push({
            type: 'offer',
            offer: offer,
            record: record
          });
        });
        this.trades$.next(trades);
    });
  }

  acceptTrade(offer){
    console.log('setting trader collection')
    MeteorObservable.call('acceptTrade', offer.owner_id, 
      offer.requestor_id, offer.record_id)
      .subscribe(() => {
        console.log('User successfully invited.');
      }, (error) => {
        console.log(`Failed to invite due to ${error}`);
      });
  }

  declineTrade(offer){
    console.log('setting trader collection')
    MeteorObservable.call('declineTrade', offer.owner_id, 
      offer.requestor_id, offer.record_id)
      .subscribe(() => {
        console.log('User successfully invited.');
      }, (error) => {
        console.log(`Failed to invite due to ${error}`);
      });
  }

  cancelTrade(request){
    this.declineTrade(request);
  }

  returnRecord(request){
    console.log('setting trader collection')
    MeteorObservable.call('returnRecord', request.owner_id, 
      request.requestor_id, request.record_id)
      .subscribe(() => {
        console.log('User successfully invited.');
      }, (error) => {
        console.log(`Failed to invite due to ${error}`);
      });
  }

}