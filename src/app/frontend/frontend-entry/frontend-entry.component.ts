import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMilestone } from '../../model/milestone/milestone.d';
import { Subscription } from 'rxjs/Subscription';
import { FactoryService } from '../../service/factory.service';
import { Animations } from '../../animations/common-animations';

@Component({
  selector: 'frontend-entry',
  templateUrl: './frontend-entry.component.html',
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class FrontendEntryComponent implements OnDestroy {
  
  milestones: IMilestone[] = [];
  milestoneSubscription: Subscription;

  constructor(
    private serviceFactory: FactoryService
  ) {
    let milestoneSubscribe =  serviceFactory.getMilestoneService()
      .getMilestones().subscribe(s => {
        this.milestones = s;

        console.log(this.milestones);
      });
  }

  ngOnDestroy(): void {
    this.milestoneSubscription.unsubscribe();
  }

}
