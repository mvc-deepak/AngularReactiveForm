import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee/employee.service';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,

    // Moved to seperate Module, Employee Module
    // CreateEmployeeComponent,
    // ListEmployeesComponent,

    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,

    // Lazy Load this Module
    // EmployeeModule,

    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Moved to top, otherwise dont work
    // EmployeeModule 
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
