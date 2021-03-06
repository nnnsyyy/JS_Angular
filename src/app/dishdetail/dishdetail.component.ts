import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { flyInOut, visibility, expand } from '../animations/app.animation';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {

  // @Input()
  dish : Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': ''};
  // learn from official doc
  // create an msg object containing all possible error msg
  validationMessages = {
     'author': {
       'required':      'Name is required.',
       'minlength':     'Your name must be at least 2 characters long.'
     },
     'comment': {
       'required':      'Comment is required.'
     },
   };
   errMess: string;
   visibility = "shown";

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location:Location,
    private cm: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm() }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds=dishIds);
    // whenever params changes value,
    // then switchMap get it and do getDish() with new value
  // +: change a string to a integer
  // once getDish, subscribe will renew it
    this.route.params
      .switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']);})
      .subscribe(dish => { this.dish = dish;
        // not only get the value but also map 'dish'
        this.dishcopy = dish;
        this.setPrevNext(dish.id); this.visibility = 'shown';},
        errmsg => this.errMess = <any>errmsg);
  }

  createForm(){
    this.commentForm = this.cm.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', Validators.required,],
      date: ''
    })

        // add value changes observable
        this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
        // reset form validation message
        this.onValueChanged();
  }

  onValueChanged(data?: any){
    // if the form is not created
    if(!this.commentForm){ return;}
    const form = this.commentForm;
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
      // for setting value of specific field
      // var d = new Date();
      // this.commentForm.get('date').setValue(d.toISOString());
      this.comment = this.commentForm.value;
      this.comment.date = new Date().toISOString();
      this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
        .subscribe(dish => { this.dish = dish; console.log(this.dish);})

      this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      date: ''
    });

  }

  setPrevNext(dishId: number){
    // In array, get the index of certain search value
    let index = this.dishIds.indexOf(dishId);
    // modulo excaping index < 0
    this.prev = this.dishIds[(this.dishIds.length+index-1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+index+1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }
}
