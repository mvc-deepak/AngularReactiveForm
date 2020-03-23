import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {

  pageTitle: string;

  // This FormGroup contains fullName and Email form controls

  employeeForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router
    ) 
    { 

    }


  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures FormGroup and it's form controls are created when component is initialised
  ngOnInit() {

    // this.route.paramMap.subscribe(params => {
    //   const empId = +params.get('id');
    //   if (empId) {
    //     this.getEmployee(empId);
    //   }
    // });

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle = 'Edit Employee';
        this.getEmployee(empId);
      } else {
        this.pageTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
      }
    });
    
  

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: matchEmails }),
      phone: [''],

    // Create skills FormArray using injected FormBuilder class array() method. 
    // At the moment, in the created FormArray we only have one FormGroup instance that is
    // returned by addSkillFormGroup() method

      skills: this.fb.array(
        [this.addSkillFormGroup()]
      )

      // skills: this.fb.group({
      //   skillName: ['', Validators.required],
      //   experienceInYears: ['', Validators.required],
      //   proficiency: ['', Validators.required]
      // }),
    });

    console.log(this.employeeForm);

    // When any of the form control value in employee form changes
    // our validation function logValidationErrors() is called
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });

    // this.employeeForm = this.fb.group({
    //   //fullName: [''],
    //   fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    //   email: [''],
    //   skills: this.fb.group({
    //     skillName: [''],
    //     experienceInYears: [''],
    //     proficiency: ['beginner']
    //   }),
    // });

    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   // Create skills form group
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    // Subscribe to valueChanges observable
    // this.employeeForm.get('fullName').valueChanges.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );

    // Subscribe to FormGroup valueChanges observable
    // this.employeeForm.valueChanges.subscribe(
    //   value => {
    //     console.log(JSON.stringify(value));
    //   }
    // );

  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }
  

  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    // 'fullName': '',
    // 'email': '',
    // 'confirmEmail': '',
    // 'emailGroup': '',
    // 'phone': '',
    // 'skillName': '',
    // 'experienceInYears': '',
    // 'proficiency': ''
  };


  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters',
      'maxlength': 'Full Name must be less than 10 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be dell.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },

    'phone': {
      'required': 'Phone is required.'
    },
    // 'skillName': {
    //   'required': 'Skill Name is required.',
    // },
    // 'experienceInYears': {
    //   'required': 'Experience is required.',
    // },
    // 'proficiency': {
    //   'required': 'Proficiency is required.',
    // },
  };

  
  

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        
        const messages = this.validationMessages[key];
      
      // abstractControl.value !== '' (This condition ensures if there is a value in the
      // form control and it is not valid, then display the validation error)

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    // We need this additional check to get to the FormGroup in the FormArray and then recursively call this logValidationErrors() method to fix the broken validation
    
    // if (abstractControl instanceof FormArray) {
    //   for (const control of abstractControl.controls) {
    //     if (control instanceof FormGroup) {
    //       this.logValidationErrors(control);
    //     }
    //   }
    // }


    });
  }


  logValidationErrors3(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors3(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }


  logValidationErrors2(group: FormGroup): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);
      // If the control is nested form group, recursively call
      // this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors2(abstractControl);
        // If the control is a FormControl
      } else {
        // Clear the existing validation errors
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          // Get all the validation messages of the form control
          // that has failed the validation
          const messages = this.validationMessages[key];
          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  logKeyValuePairs(group: FormGroup): void {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl
      } else {
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
      }
    });
  }

  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();
  
    if (this.employee.id) {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => this._router.navigate(['employees']),
        (err: any) => console.log(err)
      );
    } else {
      this._employeeService.addEmployee(this.employee).subscribe(
        () => this._router.navigate(['employees']),
        (err: any) => console.log(err)
      );
    }
  }
  

  mapFormValuesToEmployeeModel() {
    //this.employee = <IEmployee>this.employeeForm.value;
    //this.employee = Object.assign({}, this.employee, this.employeeForm.value);

    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }
  
  

  onLoadDataClick(): void {

    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);

    this.logKeyValuePairs(this.employeeForm);

    // this.employeeForm.setValue({
    //   fullName: 'Pragim Technologies',
    //   email: 'pragim@pragimtech.com',
    //   skills: {
    //     skillName: 'C#',
    //     experienceInYears: 5,
    //     proficiency: 'beginner'
    //   }
    // });
  }

  onLoadDataClick1(): void {
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      // skills: {
      //   skillName: 'C#',
      //   experienceInYears: 5,
      //   proficiency: 'beginner'
      // }
    });
  }

  removeSkillButtonClick(skillGroupIndex: number): void {

    //(<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);

    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();

  }

  employee: IEmployee;

  getEmployee(id: number) {
    this._employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => { 
          this.employee = employee; // Store employee object returned by API in employee property
          this.editEmployee(employee);
        },
        (err: any) => console.log(err)
      );
  }

  getEmployee1(id: number) {
    this._employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => this.editEmployee(employee),
        (err: any) => console.log(err)
      );
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });
  
    return formArray;
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });

  this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }
}

// Nested form group (emailGroup) is passed as a parameter. Retrieve email and
// confirmEmail form controls. If the values are equal return null to indicate
// validation passed otherwise an object with emailMismatch key. Please note we
// used this same key in the validationMessages object against emailGroup
// property to store the corresponding validation error message
function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  // If confirm email control value is not an empty string, and if the value
  // does not match with email control value, then the validation fails
  if (emailControl.value === confirmEmailControl.value
    || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}



