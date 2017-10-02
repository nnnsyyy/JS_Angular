import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
=======

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

>>>>>>> a60e96d

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

<<<<<<< HEAD
  dishes = DISHES;

  selectedDish: Dish;
=======
  dishes: Dish[];
>>>>>>> a60e96d

  selectedDish: Dish;

  constructor(private dishService: DishService) { }
  
  ngOnInit() {
    this.dishes = this.dishService.getDishes();
  }
    
  onSelect(dish){
      this.selectedDish = dish;
  }
<<<<<<< HEAD
  
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

=======
>>>>>>> a60e96d
}


