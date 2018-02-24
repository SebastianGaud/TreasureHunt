import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendEntryComponent } from './frontend-entry/frontend-entry.component';
import { MilestoneDetailsComponent } from './milestone-details/milestone-details.component';
import { MilestoneListItemComponent } from './milestone-list-item/milestone-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FrontendEntryComponent,
    MilestoneDetailsComponent,
    MilestoneListItemComponent
  ],
})
export class FrontendModule { 
}
