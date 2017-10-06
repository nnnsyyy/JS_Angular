import { Component, OnInit, Input } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  // @Input()
  dish : Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishservice:DishService,
    private route: ActivatedRoute,
    private location:Location) { }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds=dishIds);
    // whenever params changes value,
    // then switchMap get it and do getDish() with new value
  // +: change a string to a integer
  // once getDish, subscribe will renew it
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
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
