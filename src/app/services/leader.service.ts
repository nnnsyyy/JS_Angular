import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHttpMsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
    // return Observable.of(LEADERS).delay(2000);
    return this.restangular.all("leaders").getList();
  }

  getLeader(id: number): Observable<Leader> {
    // return Observable.of(LEADERS.filter((leader)=>(leader.id === id))[0]).delay(2000);
    return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    // return Observable.of(LEADERS.filter((leader)=>(leader.featured))[0]).delay(2000);
    return this.restangular.all('leaders').getList({featured: true})
      .map(leaders => leaders[0]);
  }

}
