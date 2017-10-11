import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHttpMsgService: ProcessHttpmsgService) { }

  getDishes():Observable<Dish[]> {
    // return Observable.of(DISHES).delay(2000);
    // Once get the response(res), map it to service function to be json
    return this.http.get(baseURL + 'dishes')
      .map(res => {return this.processHttpMsgService.extractData(res)});
  }

  getDish(id: number): Observable<Dish>{
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => {return this.processHttpMsgService.extractData(res)});
  }

  getFeaturedDish(): Observable<Dish>{
    // using creative parameter '?'
    // returning an array!!!!
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => {return this.processHttpMsgService.extractData(res)[0]});
  }

  getDishIds():Observable<number[]>{
    // One way to get array
    return this.getDishes()
      .map(dishes => {return dishes.map(dish => dish.id)});
  }
}
