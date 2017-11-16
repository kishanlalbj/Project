import { Injectable,EventEmitter } from '@angular/core';
import { Http,Response } from '@angular/http';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  constructor(private http:Http) { }

//   private subject = new Subject<any>();
  private subject = new BehaviorSubject({});
  
  getQuestion(): Observable<any> 
  {
      return this.subject.asObservable();
  }
  
  setQuestion(user:any):void{
      this.subject.next(user);
  }
  getData(question) {
        return this.http.get('http://localhost:8080/data/?Question='+question);
  }

}
