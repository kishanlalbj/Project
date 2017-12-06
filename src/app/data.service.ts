import { Injectable,EventEmitter } from '@angular/core';
import { Http,Response, RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    tokenService: any;

  constructor(private http:Http) { }

  // private subject = new Subject<any>();
  private subject = new BehaviorSubject("");

  getQuestion(): Observable<any>
  {
      return this.subject.asObservable();
  }

  setQuestion(user:any):void{
      this.subject.next(user);
  }

  getData(question) {

        return this.http.get('http://localhost:8080/data?q='+question);
    //    return this.http.get('http://localhost:3000/process/?question='+question);

  }

  getfeedback() {
      return this.http.get('http://localhost:8080/feedback?processed=false');
  }

  getindent() {
      return this.http.get('http://localhost:8080/indents');
  }
  sendfeedback(feed) {
      console.log(feed);
    const headers = new Headers(
        {
            'Content-Type': 'application/json'
        });
    return this.http.post("http://localhost:8080/feedback",feed,{headers:headers});
  }

  sendapproved(approved) {
    return this.http.post("http://localhost:8080/result",approved);    
  } 

}
