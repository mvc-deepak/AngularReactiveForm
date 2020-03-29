import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading, PreloadAllModules } from '@angular/router';
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

  //Lazy Load Employee Module
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  // Lazy Load Employee Module
  //{ path: 'employees', loadChildren: './employee/employee.module#EmployeeModule' }

  // Custom Preload strategy
  {
    path: 'employees',
    data: { preload: true },
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },

  { path: '**', component: PageNotFoundComponent }// wild card route
];
// Pass configured routes to forRoot() method to let the angular router know about our routes
// Export imported RouterModule so router directives are available to module that imports this AppRoutingModule


@NgModule({
  
  imports: [
    //preloadingStrategy : NoPreloading
    //RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })

    //preloadingStrategy : PreloadAllModules
    //RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })

    //preloadingStrategy: Custom 
    RouterModule.forRoot(appRoutes, { preloadingStrategy: CustomPreloadingService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
