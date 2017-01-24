import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from "./demo/demo.component";
import { WelcomeComponent } from './welcome/welcome.component';

// Save space in the root module, export components here
export const routedComponents = [
  DemoComponent,
  WelcomeComponent
];

const routes: Routes = [
  { path: 'at/demo', component: DemoComponent },
  { path: 'at', component: WelcomeComponent },
  { path: '**', redirectTo: 'at', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }