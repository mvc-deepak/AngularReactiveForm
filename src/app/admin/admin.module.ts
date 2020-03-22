import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SystemSettingComponent } from './system-setting.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    SystemSettingComponent,
    AdminComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
