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
        email: new FormControl(),
       
        //Nested Form Group
        skills: new FormGroup({
          skillName: new FormControl(),
          experienceInYears: new FormControl(),
          proficiency: new FormControl()
        })
    
      });
    }

    onSubmit(): void {
      console.log(this.customerForm);
      console.log(this.customerForm.value);
     
    }

    onSetValueClick(): void {
      this.customerForm.reset();
      this.customerForm.setValue({
        fullName: 'Pragim Technologies',
        email: 'pragim@pragimtech.com',
        skills: {
          skillName: 'C#',
          experienceInYears: 5,
          proficiency: 'beginner'
        }
      });
    }

    onPatchValueClick(): void {
      this.customerForm.reset();
      this.customerForm.patchValue({
        fullName: 'Pragim Technologies',
        email: 'pragim@pragimtech.com',
        // skills: {
        //   skillName: 'C#',
        //   experienceInYears: 5,
        //   proficiency: 'beginner'
        // }
      });
    }
}
