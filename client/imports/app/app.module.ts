import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DemoDataService } from "./demo/demo-data.service";
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    NavbarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    routedComponents
  ],
  providers: [
    DemoDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
