import { Injectable } from '@angular/core';
import { IMilestoneService } from './milestone-service';

@Injectable()
export class MilestoneService implements IMilestoneService{

  getMilestones() {
    throw new Error("Method not implemented.");
  }
  constructor() { }

}
