import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MilestoneDetailsComponent } from "./frontend/milestone-details/milestone-details.component";
import { FrontendEntryComponent } from "./frontend/frontend-entry/frontend-entry.component";
import { BackendEntryComponent } from "./backend/backend-entry/backend-entry.component";

const routes: Routes = [
  { path: "frontend", component:  FrontendEntryComponent},
  { path: "backend", component: BackendEntryComponent },
  { path: "milestone-detail/:id", component: MilestoneDetailsComponent },
  { path: "", component: MilestoneDetailsComponent, redirectTo: "frontend" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
