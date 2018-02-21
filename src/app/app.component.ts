import { Component, OnDestroy } from '@angular/core';
import { FactoryService } from './service/factory.service';
import { IMilestoneService } from './service/milestone/milestone-service';
import { IMilestone } from './model/milestone/milestone.d';
import { Subscription } from 'rxjs/Subscription';
import { Animations } from './animations/common-animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class AppComponent implements OnDestroy{

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
