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


@Component({
  selector: 'trades',
  template,
  styles: [ style ]
})
export class TradesComponent implements OnInit { 
  records: Records[];
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
      recordIDs = [],
      trader = TraderCollection.find({id: uid}).zone();
    trader.subscribe(tradeStatus => {
      if(tradeStatus[0].hasOwnProperty('requests'))
        tradeStatus[0].requests.forEach(request => {
          this.requestStatus.push({record_id: request.record_id, status: request.loan_status});
          recordIDs.push({_id: request.record_id});
        });
      if(tradeStatus[0].hasOwnProperty('offers'))
        tradeStatus[0].offers.forEach(offer => {
          this.offerStatus.push({record_id: offer.record_id, status: offer.loan_status});
          recordIDs.push({_id: offer.record_id});
        });
    });
    RecordCollection.find({$or: recordIDs}).zone()
      .subscribe(records => this.records = records);
    console.log('subscribed to records')
  }

}