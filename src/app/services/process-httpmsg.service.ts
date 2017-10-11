import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  public extractData(res: Response) {
    let body = res.json();
    // example execution
    console.log(body);
    return body || { };
  }

  public handleError (error: Response | any){
    let errMsg: string;
    if(error instanceof Response){
      const body = error.json() || '';
      // Extract error if it is within the response
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.tostring();
    }

    return Observable.throw(errMsg);
  }

}
