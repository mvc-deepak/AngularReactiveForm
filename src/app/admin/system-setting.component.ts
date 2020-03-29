import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})

export class SystemSettingComponent implements OnInit {

  // This FormGroup Class contains fullName and Email form controls
  systemsettingForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures FormGroup and it's form controls are created when component is initialised
  ngOnInit() {

    this.systemsettingForm = this.fb.group({
      //fullName: ['test'],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      phone: [''],

      //email: ['', Validators.required],
      //email: ['', [Validators.required, validatePragimtechDomain]],
      //email: ['', [Validators.required, validateEmailDomain('pragimtech.com')]],

      // email and confirmEmail form controls are grouped using a nested form group
      // Notice, the validator is attached to the nested emailGroup using an object
      // with key validator. The value is our validator function matchEmails() which
      // is defined below. The important point to keep in mind is when the validation
      // fails, the validation key is attached the errors collection of the emailGroup
      // This is the reason we added emailGroup key both to formErrors object and
      // validationMessages object.

      emailGroup: this.fb.group({
        email: ['', [Validators.required, validateEmailDomain('pragimtech.com')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: matchEmails }),

      //Form Array
      // Create skills FormArray using injected FormBuilder class array() method. 
      // At the moment, in the created FormArray we only have one FormGroup instance that is
      // returned by addSkillFormGroup() method
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])

      //Form Group
      // skills: this.fb.group({
      //   skillName: ['', Validators.required],
      //   experienceInYears: ['', Validators.required],
      //   proficiency: ['', Validators.required]
      // }),

    });

    // Subscribe to contactPreference form control valueChanges observable 
    // Not Required as calling onContactPrefernceChange from email control (click)="onContactPrefernceChange('email')"
    // Not Required as calling onContactPrefernceChange from phone control (click)="onContactPrefernceChange('phone')"
    // this.systemsettingForm.get('contactPreference')
    //   .valueChanges.subscribe((data: string) => {
    //     this.onContactPrefernceChange(data);
    //   });

    // When any of the form control value in employee form changes
    // our validation function logValidationErrors() is called
    this.systemsettingForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.systemsettingForm);
    });


    // Subscribe to valueChanges observable
    this.systemsettingForm.get('fullName').valueChanges.subscribe(
      value => {
        //console.log(value);
      }
    );

    // Subscribe to FormGroup valueChanges observable
    this.systemsettingForm.valueChanges.subscribe(
      value => {
        //console.log(JSON.stringify(value));
      }
    );

  };



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
    const phoneFormControl = this.systemsettingForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }


  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the corresponding form control
  // Group properties on the formErrors object. The UI will bind to these properties to display the respective validation messages

  formErrors = {
    'fullName': '',
    'confirmEmail': '',
    'emailGroup': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  // This structure stoes all the validation messages for the form Include validation messages for confirmEmail and emailGroup properties. 
  // Notice to store the validation message for the emailGroup we are using emailGroup key. 
  // This is the same key that the matchEmails() validation function below returns, if the email and confirm email do not match.

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters',
      'maxlength': 'Full Name must be less than 10 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be prgaimtech.com'
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
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  addSkillButtonClick(): void {
    (<FormArray>this.systemsettingForm.get('skills')).push(this.addSkillFormGroup());
  }
  

  onValidateFormClick(): void {
    this.logValidationErrors1(this.systemsettingForm);
    console.log(this.formErrors);
  }

  onSubmit(): void {
    console.log(this.systemsettingForm);
    console.log(this.systemsettingForm.value);
  }

  onSetValueClick(): void {
    this.logKeyValuePairs(this.systemsettingForm);
    this.systemsettingForm.reset();

    this.systemsettingForm.setValue({
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
    this.logKeyValuePairs(this.systemsettingForm);
    this.systemsettingForm.reset();

    this.systemsettingForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      // skills: {
      //   skillName: 'C#',
      //   experienceInYears: 5,
      //   proficiency: 'beginner'
      // }
    });
  }

  logValidationErrors(group: FormGroup = this.systemsettingForm): void {
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
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    // We need this additional check to get to the FormGroup
    // in the FormArray and then recursively call this
    // logValidationErrors() method to fix the broken validation
    if (abstractControl instanceof FormArray) {
      for (const control of abstractControl.controls) {
        if (control instanceof FormGroup) {
          this.logValidationErrors(control);
        }
      }
    }


    });
  }


  logValidationErrors2(group: FormGroup = this.systemsettingForm): void {
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
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {

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

  logValidationErrors1(group: FormGroup): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);
      // If the control is nested form group, recursively call
      // this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors1(abstractControl);
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

}

function validateEmailDomain(domainName: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
      return null;
    } else {
      return { 'emailDomain': true };
    }
  };
}

function validatePragimtechDomain(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLowerCase() === 'pragimtech.com') {
    return null;
  } else {
    return { 'emailDomain': true };
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

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}


