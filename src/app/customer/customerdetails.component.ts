import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

    // This FormGroup Class contains fullName and Email form controls
    customerForm: FormGroup;
    constructor() { }
    // Initialise the FormGroup with the 2 FormControls we need.
    // ngOnInit ensures FormGroup and it's form controls are created when component is initialised
    ngOnInit() {
      this.customerForm = new FormGroup({
        fullName: new FormControl(),
        email: new FormControl()
      });
    }
  

  

}
