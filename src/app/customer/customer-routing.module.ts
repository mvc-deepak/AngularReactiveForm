import { NgModule } from '@angular/core';
import { ManagecustomerComponent } from './managecustomer.component';
import { CustomerdetailsComponent } from './customerdetails.component';
import { Routes, RouterModule } from '@angular/router';

// Define the routes
const appRoutes: Routes = [
  {
    path: 'customer',     // parent route with path customer.
    children: [           // parent 'customer' route has 2 child routes  
      { path: '', component: ManagecustomerComponent },
      { path: 'CustomerDetails', component: CustomerdetailsComponent },
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]

})
export class CustomerRoutingModule { }
