import { Injectable } from '@angular/core';

import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

   submitFeedback(fb: Feedback): Observable<Feedback>{
     return this.restangular.all('feedback').post(fb);
   }

}
