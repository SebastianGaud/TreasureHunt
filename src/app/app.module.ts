import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMatComponentModule } from './app-mat-component.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    MilestoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceModule,
    AppMatComponentModule
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
