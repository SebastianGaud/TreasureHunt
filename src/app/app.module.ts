import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMatComponentModule } from './app-mat-component.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    MilestoneComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceModule,
    AppMatComponentModule,
    CommonModule
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
