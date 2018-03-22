import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppMatComponentModule } from './app-mat-component.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendEntryComponent } from './backend/backend-entry/backend-entry.component';
import { GenerateMilestoneComponent } from './backend/generate-milestone/generate-milestone.component';
import { GenerateTeamComponent } from './backend/generate-team/generate-team.component';
import { HomeComponent } from './backend/home/home.component';
import { TeamDetailsComponent } from './backend/team-details/team-details.component';
import { TeamItemListComponent } from './backend/team-item-list/team-item-list.component';
import { MilestoneEffect } from './effects/milestone.effects';
import { TeamMilestoneEffect } from './effects/team-milestone.effect';
import { TeamEffect } from './effects/team.effect';
import { FrontendEntryComponent } from './frontend/frontend-entry/frontend-entry.component';
import { MilestoneDetailsComponent } from './frontend/milestone-details/milestone-details.component';
import { MilestoneListItemComponent } from './frontend/milestone-list-item/milestone-list-item.component';
import { TeamWizardComponent } from './frontend/team-wizard/team-wizard.component';
import { FrontendTeamGuard } from './guard/frontend-team-guard.guard';
import { OpenedMilestoneGuard } from './guard/opened-milestone.guard';
import { milestoneReducer } from './reducers/milestone.reducer';
import { teamMilestoneReducer } from './reducers/team-milestones-reducer';
import { teamReducer } from './reducers/team.reduces';
import { CookieService } from './service/cookie-service.service';
import { MilestoneService } from './service/milestone/milestone.service';
import { TeamMilestonesService } from './service/team-milestones/team-milestones.service';
import { TeamService } from './service/team/team.service';
import { GMapComponent } from './ui-shared/g-map/g-map.component';
import { HintOpenedDialogComponent } from './ui-shared/hint-opened-dialog/hint-opened-dialog.component';
import { NavbarComponent } from './ui-shared/navbar/navbar.component';
import { SortableDirective } from './ui-shared/sortable.directive';
import { gameTeamReducer } from './reducers/game-team.reducer';
import { MilestonesListComponent } from './ui-shared/milestones-list/milestones-list.component';
import { MilestoneSettingComponent } from './backend/milestone-setting/milestone-setting.component';
import { BackendAdminGuardGuard } from './guard/backend-admin-guard.guard';
import { BackendLoginComponent } from './backend/backend-login/backend-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GMapComponent,
    HintOpenedDialogComponent,
    SortableDirective,
    MilestonesListComponent,

    FrontendEntryComponent,
    MilestoneDetailsComponent,
    MilestoneListItemComponent,
    TeamWizardComponent,

    BackendEntryComponent,
    HomeComponent,
    GenerateMilestoneComponent,
    GenerateTeamComponent,
    TeamItemListComponent,
    TeamDetailsComponent,
    MilestoneSettingComponent,
    BackendLoginComponent
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
      teams: teamReducer,
      gameTeams: teamMilestoneReducer,
      gameTeam: gameTeamReducer
    }),
    EffectsModule.forRoot([
      MilestoneEffect,
      TeamEffect,
      TeamMilestoneEffect
    ]),
    StoreDevtoolsModule.instrument()
  ],
  entryComponents: [
    HintOpenedDialogComponent
  ],
  providers: [
    MilestoneService,
    TeamService,
    TeamMilestonesService,
    OpenedMilestoneGuard,
    FrontendTeamGuard,
    BackendAdminGuardGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
