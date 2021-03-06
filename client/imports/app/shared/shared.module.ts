import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from './api.service';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';
import { Meteor } from 'meteor/meteor';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MasonryModule,
    NgbModule.forRoot(),
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasonryModule,
    NgbModule
  ],
  providers: [
    ApiService,
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: 'api-url', useValue: Meteor.settings.public.api_url },
  ],
})
export class SharedModule { }
