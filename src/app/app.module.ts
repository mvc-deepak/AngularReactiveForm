import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee/employee.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomerModule } from './customer/customer.module';

//Moved to AppRoutingModule
// const appRoutes: Routes = [
//   { path: 'home1', component: Home1Component },
//   { path: 'home2', component: Home1Component },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
// ];


@NgModule({
  declarations: [
    AppComponent,

    // Moved to seperate Module, Employee Module
    // CreateEmployeeComponent,
    // ListEmployeesComponent,

    HomeComponent,
    PageNotFoundComponent,
  
  ],
  imports: [
    BrowserModule,

    //feature modules should be imported before AppRoutingModule 

    //Eager Loading
    CustomerModule,

    // Lazy Load this Module
    // EmployeeModule,

    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    //Moved to AppRoutingModule
    //RouterModule.forRoot(appRoutes)

    // Moved to top, otherwise dont work
    // EmployeeModule 
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})

export class AppModule { }
