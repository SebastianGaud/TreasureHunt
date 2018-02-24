import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendEntryComponent } from './backend-entry/backend-entry.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BackendEntryComponent,
    HomeComponent
  ]
})
export class BackendModule { }
