import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingComponent } from './system-setting.component';
import { AdminComponent } from './admin.component';

const appRoutes: Routes = [
  //http://localhost:4200/admin
  { path: '', component: AdminComponent },
  //http://localhost:4200/admin/admin
  { path: 'admin', component: AdminComponent },
  //http://localhost:4200/admin/systemsetting
  { path: 'systemsetting', component: SystemSettingComponent },
];


@NgModule({
  imports: [ RouterModule.forChild(appRoutes) ],
  exports: [ RouterModule ]
})

export class AdminRoutingModule { }
