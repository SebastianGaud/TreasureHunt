import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMatComponentModule } from './app-mat-component.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MilestoneDetailsComponent } from './frontend/milestone-details/milestone-details.component';
import { MilestoneListItemComponent } from './frontend/milestone-list-item/milestone-list-item.component';
import { ServiceModule } from './service/service.module';
import { NavbarComponent } from './ui-shared/navbar/navbar.component';
import { HomeComponent } from './backend/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MilestoneListItemComponent,
    MilestoneDetailsComponent,
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
