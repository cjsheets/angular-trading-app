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


@Component({
  selector: 'trades',
  template,
  styles: [ style ]
})
export class TradesComponent implements OnInit { 
  trader: Traders;
  requestStatus = [];
  offerStatus = [];

  constructor(
    private _log: Logger,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  public model;


  ngOnInit(): void {
    this.initTradesView();
  }

  initTradesView(){
    console.log('initializing trades')
    let uid = this._auth.getUID(),
      trader = TraderCollection.find({id: uid}).zone();
    trader.subscribe(tradeStatus => {
      if(tradeStatus[0].hasOwnProperty('requests'))
        tradeStatus[0].requests.forEach(request => {
          let record = RecordCollection.findOne({_id: request.record_id})
          this.requestStatus.push({
            request: request,
            record: record
          });
        });
      if(tradeStatus[0].hasOwnProperty('offers'))
        tradeStatus[0].offers.forEach(offer => {
          let record = RecordCollection.findOne({_id: offer.record_id})
          this.offerStatus.push({
            offer: offer,
            record: record
          });
        });
    });
    console.log(this.requestStatus)
  }

  acceptTrade(offer){
    console.log('setting trader collection')
    MeteorObservable.call('acceptTrade', offer.offer.owner_id, 
      offer.offer.requestor_id, offer.offer.record_id)
      .subscribe(() => {
        console.log('User successfully invited.');
      }, (error) => {
        console.log(`Failed to invite due to ${error}`);
      });
    
      // TraderCollection.update(
      //   {"$and": [
      //     { "id": offer.offer.owner_id },
      //     { "offers.requestor_id": offer.offer.requestor_id },
      //     { "offers.record_id": offer.offer.record_id },
      //     { "offers.loan_status": false }
      //   ]},
      // {"$set": { "offers.$.loan_status": true } }
      // )
      console.log('done')
  }

}