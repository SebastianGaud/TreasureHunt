import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppMatComponentModule } from "./app-mat-component.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MilestoneDetailsComponent } from "./frontend/milestone-details/milestone-details.component";
import { MilestoneListItemComponent } from "./frontend/milestone-list-item/milestone-list-item.component";
import { NavbarComponent } from "./ui-shared/navbar/navbar.component";
import { HomeComponent } from "./backend/home/home.component";
import { FrontendEntryComponent } from "./frontend/frontend-entry/frontend-entry.component";
import { BackendEntryComponent } from "./backend/backend-entry/backend-entry.component";
import { FactoryService } from "./service/factory.service";
import { MilestoneService } from "./service/milestone/milestone.service";
import { FakeMilestoneService } from "./service/milestone/fake-milestone.service";
import { FrontendModule } from "./frontend/frontend.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMatComponentModule,
    FrontendModule
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
    FactoryService,
    MilestoneService,
    FakeMilestoneService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
