import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BackendEntryComponent } from "./backend/backend-entry/backend-entry.component";
import { GenerateMilestoneComponent } from "./backend/generate-milestone/generate-milestone.component";
import { FrontendEntryComponent } from "./frontend/frontend-entry/frontend-entry.component";
import { MilestoneDetailsComponent } from "./frontend/milestone-details/milestone-details.component";
import { OpenedMilestoneGuard } from "./guard/opened-milestone.guard";
import { GenerateTeamComponent } from "./backend/generate-team/generate-team.component";
import { TeamDetailsComponent } from "./backend/team-details/team-details.component";

const routes: Routes = [
  { path: "frontend", component: FrontendEntryComponent },
  { path: "backend", component: BackendEntryComponent },
  { path: "generate-milestone", component: GenerateMilestoneComponent },
  { path: "generate-team", component: GenerateTeamComponent },
  { path: "team-details/:id", component: TeamDetailsComponent },
  { path: "milestone-details/:id", component: MilestoneDetailsComponent, canActivate: [OpenedMilestoneGuard] },
  { path: "", redirectTo: "frontend", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
