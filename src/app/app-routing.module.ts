import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MilestoneDetailsComponent } from "./frontend/milestone-details/milestone-details.component";
import { FrontendEntryComponent } from "./frontend/frontend-entry/frontend-entry.component";
import { BackendEntryComponent } from "./backend/backend-entry/backend-entry.component";
import { OpenedMilestoneGuard } from "./guard/opened-milestone.guard";
import { GenerateMilestoneComponent } from "./backend/generate-milestone/generate-milestone.component";

const routes: Routes = [
  { path: "frontend", component: FrontendEntryComponent },
  { path: "backend", component: BackendEntryComponent },
  { path: "generate-milestone", component: GenerateMilestoneComponent },
  { path: "milestone-details/:id", component: MilestoneDetailsComponent, canActivate: [OpenedMilestoneGuard] },
  { path: "", redirectTo: "frontend", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
