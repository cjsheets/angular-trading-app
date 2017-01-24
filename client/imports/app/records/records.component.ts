import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

// import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

import { Logger } from '../shared/logger.service';
import { ActivatedRoute } from '@angular/router';

// import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import template from "./records.view.html";
import style from "./records.view.scss";


@Component({
  selector: 'records',
  template,
  styles: [ style ]
})
export class RecordsComponent implements OnInit { 

  constructor(
    private _log: Logger,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  public model;


  ngOnInit(): void {
  }

}