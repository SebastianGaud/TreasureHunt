import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { environment } from "../environments/environment";
import { AppMatComponentModule } from "./app-mat-component.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BackendEntryComponent } from "./backend/backend-entry/backend-entry.component";
import { GenerateMilestoneComponent } from "./backend/generate-milestone/generate-milestone.component";
import { HomeComponent } from "./backend/home/home.component";
import { MilestoneEffect } from "./effects/milestone.effects";
import { FrontendEntryComponent } from "./frontend/frontend-entry/frontend-entry.component";
import { MilestoneDetailsComponent } from "./frontend/milestone-details/milestone-details.component";
import { MilestoneListItemComponent } from "./frontend/milestone-list-item/milestone-list-item.component";
import { OpenedMilestoneGuard } from "./guard/opened-milestone.guard";
import { milestoneReducer } from "./reducers/milestone.reducer";
import { FactoryService } from "./service/factory.service";
import { MilestoneService } from "./service/milestone/milestone.service";
import { FakeTeamService } from "./service/team/fake-team.service";
import { TeamService } from "./service/team/team.service";
import { HintOpenedDialogComponent } from "./ui-shared/hint-opened-dialog/hint-opened-dialog.component";
import { NavbarComponent } from "./ui-shared/navbar/navbar.component";
import { GMapComponent } from "./ui-shared/g-map/g-map.component";
import { teamReducer } from "./reducers/team.reduces";
import { TeamEffect } from "./effects/team.effect";
import { GenerateTeamComponent } from "./backend/generate-team/generate-team.component";
import { TeamItemListComponent } from "./backend/team-item-list/team-item-list.component";
import { TeamDetailsComponent } from "./backend/team-details/team-details.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GMapComponent,
    HintOpenedDialogComponent,

    FrontendEntryComponent,
    MilestoneDetailsComponent,
    MilestoneListItemComponent,

    BackendEntryComponent,
    HomeComponent,
    GenerateMilestoneComponent,
    GenerateTeamComponent,
    TeamItemListComponent,
    TeamDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMatComponentModule,
    FormsModule,
    ReactiveFormsModule,

    //Firebase Config
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    //NGRX Config
    //StoreModule.provideStore() is deprecated
    StoreModule.forRoot({
      milestones: milestoneReducer,
      teams: teamReducer
    }),
    EffectsModule.forRoot([
      MilestoneEffect,
      TeamEffect
    ]),
    StoreDevtoolsModule.instrument()
  ],
  entryComponents: [
    HintOpenedDialogComponent
  ],
  providers: [
    FactoryService,
    MilestoneService,
    TeamService,
    FakeTeamService,

    OpenedMilestoneGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    serviceFactory: FactoryService
  ) {
  }
}
