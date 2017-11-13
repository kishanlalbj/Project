import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  constructor(private http:Http) { }

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: object) {
    this.messageSource.next(message)
  }

  getData(question) {
        return this.http.get('http://localhost:8080/data/?question='+question);
  }

}
