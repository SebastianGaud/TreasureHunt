import { NgModule } from '@angular/core';

import { FactoryService } from './factory.service';

@NgModule({
  imports: [
    FactoryService
  ],
  exports: [
    FactoryService
  ],
  declarations: []
})
export class ServiceModule { }
