import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomPreloadingService } from './custom-preloading.service';


//const routes: Routes = [];

// last route path is empty. This specifies route to redirect to if client side path is empty.
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },

  // Moved to EmployeeRoutingModule
  // { path: 'list', component: ListEmployeesComponent },
  // { path: 'create', component: CreateEmployeeComponent },
  // { path: 'edit/:id', component: CreateEmployeeComponent },

  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Lazy Load Employee Module
  {
    path: 'employees',
    data: { preload: true },
    loadChildren: './employee/employee.module#EmployeeModule'
  },

  { path: '**', component: PageNotFoundComponent }// wild card route
];
// Pass configured routes to forRoot() method to let the angular router know about our routes
// Export imported RouterModule so router directives are available to module that imports this AppRoutingModule


@NgModule({
  //preloadingStrategy : NoPreloading, or PreloadAllModules, or Custom
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: CustomPreloadingService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
