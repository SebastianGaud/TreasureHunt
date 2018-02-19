import { Component, OnDestroy } from '@angular/core';
import { FactoryService } from './service/factory.service';
import { IMilestoneService } from './service/milestone/milestone-service';
import { IMilestone } from './model/milestone/milestone.d';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnDestroy{

  milestones: IMilestone[];
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
