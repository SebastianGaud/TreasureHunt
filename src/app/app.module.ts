import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppMatComponentModule } from './app-mat-component.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendEntryComponent } from './backend/backend-entry/backend-entry.component';
import { HomeComponent } from './backend/home/home.component';
import { FrontendEntryComponent } from './frontend/frontend-entry/frontend-entry.component';
import { MilestoneDetailsComponent } from './frontend/milestone-details/milestone-details.component';
import { MilestoneListItemComponent } from './frontend/milestone-list-item/milestone-list-item.component';
import { OpenedMilestoneGuard } from './guard/opened-milestone.guard';
import { milestoneReducer } from './reducers/milestone.reducer';
import { FactoryService } from './service/factory.service';
import { FakeMilestoneService } from './service/milestone/fake-milestone.service';
import { MilestoneService } from './service/milestone/milestone.service';
import { FakeTeamService } from './service/team/fake-team.service';
import { TeamService } from './service/team/team.service';
import { HintOpenedDialogComponent } from './ui-shared/hint-opened-dialog/hint-opened-dialog.component';
import { NavbarComponent } from './ui-shared/navbar/navbar.component';
import { EffectsModule } from '@ngrx/effects';
import { MilestoneEffect } from './effects/milestone.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HintOpenedDialogComponent,

    FrontendEntryComponent,
    MilestoneDetailsComponent,
    MilestoneListItemComponent,

    BackendEntryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMatComponentModule,
    //StoreModule.provideStore() is deprecated
    StoreModule.forRoot({
      milestones: milestoneReducer
    }),
    EffectsModule.forRoot([
      MilestoneEffect
    ]),
    StoreDevtoolsModule.instrument()
  ],
  entryComponents: [
    HintOpenedDialogComponent
  ],
  providers: [
    FactoryService,
    MilestoneService,
    FakeMilestoneService,
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
