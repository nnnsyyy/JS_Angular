import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  submitfb: Feedback;
  submitstatus: Boolean;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''};
  // learn from official doc
  // create an msg object containing all possible error msg
  validationMessages = {
     'firstname': {
       'required':      'First Name is required.',
       'minlength':     'First Name must be at least 2 characters long.',
       'maxlength':     'FirstName cannot be more than 25 characters long.'
     },
     'lastname': {
       'required':      'Last Name is required.',
       'minlength':     'Last Name must be at least 2 characters long.',
       'maxlength':     'Last Name cannot be more than 25 characters long.'
     },
     'telnum': {
       'required':      'Tel. number is required.',
       'pattern':       'Tel. number must contain only numbers.',
       'minlength':     'Tel. number must be at least 2 numbers long.'
     },
     'email': {
       'required':      'Email is required.',
       'email':         'Email not in valid format.'
     },
   };

  constructor(private fb: FormBuilder,
  private feedbackservice: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
    this.submitstatus = false;
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      // declare needed pattern in template file
      // email pattern is stil in process so maybe take risk
      telnum: ['', [Validators.required, Validators.pattern, Validators.minLength(2)] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    })

    // add value changes observable
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // reset form validation message
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    // if the form is not created
    if(!this.feedbackForm){ return;}
    const form = this.feedbackForm;
    // traverse all possible error field
    for (const field in this.formErrors){
      // clear previous error msg
      this.formErrors[field] = '';
      const control = form.get(field);
      // not null && dirty && invalid
      if(control && control.dirty && !control.valid){
        // get corresponding msg field
        const msg = this.validationMessages[field];
        for (const key in control.errors){
          this.formErrors[field] += msg[key] + ' ';
        }
      }
    }
  }

  onSubmit(){
    this.submitstatus = true;
    this.feedback = this.feedbackForm.value;
    // console.log(this.feedback);
    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe(fb => this.submitfb = fb);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    setTimeout(() => {this.submitstatus = false; this.submitfb = null;}, 5000 );
  }
}
