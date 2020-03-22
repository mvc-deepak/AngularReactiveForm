import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ManagecustomerComponent } from './managecustomer.component';
import { CustomerdetailsComponent } from './customerdetails.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    ManagecustomerComponent,
    CustomerdetailsComponent,
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
