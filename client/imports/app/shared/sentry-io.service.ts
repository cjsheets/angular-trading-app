import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

Raven
  .config('https://1bf7bc3e0fe84603bb24c098c1f0a0d0@sentry.io/131879')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError);
  }
}