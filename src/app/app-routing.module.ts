import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BackendEntryComponent } from "./backend/backend-entry/backend-entry.component";
import { GenerateMilestoneComponent } from "./backend/generate-milestone/generate-milestone.component";
import { FrontendEntryComponent } from "./frontend/frontend-entry/frontend-entry.component";
import { MilestoneDetailsComponent } from "./frontend/milestone-details/milestone-details.component";
import { OpenedMilestoneGuard } from "./guard/opened-milestone.guard";
import { GenerateTeamComponent } from "./backend/generate-team/generate-team.component";
import { TeamDetailsComponent } from "./backend/team-details/team-details.component";
import { FrontendTeamGuard } from "./guard/frontend-team-guard.guard";
import { TeamWizardComponent } from "./frontend/team-wizard/team-wizard.component";
import { MilestoneSettingComponent } from "./backend/milestone-setting/milestone-setting.component";
import { BackendAdminGuard } from "./guard/backend-admin-guard.guard";
import { BackendLoginComponent } from "./backend/backend-login/backend-login.component";

const routes: Routes = [
  { path: "frontend", component: FrontendEntryComponent, canActivate: [FrontendTeamGuard] },
  { path: "milestone-details/:id", component: MilestoneDetailsComponent, canActivate: [OpenedMilestoneGuard, FrontendTeamGuard] },
  { path: "backend", component: BackendEntryComponent, canActivate: [BackendAdminGuard] },
  { path: "edit-milestone/:id", component: GenerateMilestoneComponent, canActivate: [BackendAdminGuard]  },
  { path: "generate-milestone", component: GenerateMilestoneComponent, canActivate: [BackendAdminGuard]  },
  { path: "milestones-settings", component: MilestoneSettingComponent, canActivate: [BackendAdminGuard]  },
  { path: "generate-team", component: GenerateTeamComponent, canActivate: [BackendAdminGuard]  },
  { path: "team-details/:id", component: TeamDetailsComponent, canActivate: [BackendAdminGuard]  },
  { path: "team-wizard", component: TeamWizardComponent },
  { path: "backendLogin", component: BackendLoginComponent },
  { path: "", redirectTo: "frontend", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
