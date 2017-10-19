import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
    private processHttpMsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    // return Observable.of(PROMOTIONS).delay(2000);
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    // return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000);
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return Observable.of(PROMOTIONS.filter((promo) => (promo.featured))[0]).delay(2000);
    return this.restangular.all('promotions').getList({featured:true})
    .map(promotions => promotions[0]);
  }
}
