import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMatComponentModule } from './app-mat-component.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MilestoneDetailsComponent } from './frontend/milestone-details/milestone-details.component';
import { MilestoneListItemComponent } from './frontend/milestone-list-item/milestone-list-item.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    MilestoneListItemComponent,
    MilestoneDetailsComponent
    NavbarComponent,
    HomeComponent
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
