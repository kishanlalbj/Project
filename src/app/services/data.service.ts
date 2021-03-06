import { Injectable,EventEmitter } from '@angular/core';
import { Http,Response, RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  tokenService: any;
  
  constructor(private http:Http) { }
  private url:string = "http://localhost:8080";
  
  // private subject = new Subject<any>();
  private subject = new BehaviorSubject("");
  private resultdata = new BehaviorSubject([]);
  public beSubject =  new BehaviorSubject(null);
  public username = new BehaviorSubject("");
  public filterdata  = this.beSubject.asObservable();
  public getusername = this.username.asObservable();
  
  
  
  setUser(user:any):void {
    this.username = user;
    console.log(user);
  }
  
  public dataComm(data){
    this.beSubject.next(data);
  }
  
  getQuestion(): Observable<any>
  {
    return this.subject.asObservable();
  }
  
  setQuestion(user:any):void{
    this.subject.next(user);
  }
  
  setResultData(result:any):void{
    this.resultdata.next(result);
  }
  
  getResultData(): Observable<any>{
    return this.resultdata.asObservable();
  }
  
  getData(question) {
    
    return this.http.get( this.url+'/data?q='+question);
    //  return this.http.get('http://localhost:3000/process/?question='+question);
    
  }
  
  getfeedback() {
    //  return this.http.get('http://localhost:3000/getFeedback');
    return this.http.get(this.url+'/feedback');
  }
  
  getindent() {
    //  return this.http.get('http://localhost:3000/intent');
    return this.http.get(this.url+'/indents');
    
  }

  sendfeedback(feed) {
    console.log(feed);
    const headers = new Headers(
      {
        'Content-Type': 'application/json'
      });
      //  return this.http.post("http://localhost:3000/feedback",feed,{headers:headers});
      return this.http.post(this.url+"/feedback",feed,{headers:headers});
    }
    
    sendapproved(approved) {
      const headers = new Headers(
        { 
          'Content-Type': 'application/json'
        });
        return this.http.post(this.url+"/result",approved,{headers:headers});   
        //  return this.http.post("http://localhost:3000/conversation_training",approved);   	
      } 
    }
    