import { Injectable,EventEmitter } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class IntentService{
    private intentUrl = '../../assets/intents.json';

    constructor(private http:Http){
        console.log('Intents File');
    }
    //
    // getIntent():Promise<intents[]>{
    //     return  this._http.get(this.intentUrl)
    //     // .toPromise().then(res => res.json() as intents[]);
    //
    // }

    // getIntent():Observable<intents>{
    //   return  this._http.get(this.intentUrl);
    // }

    private subject = new BehaviorSubject("");

    getIntents(): Observable<any>{
    //  console.log("Intents Observable");
        return this.subject.asObservable();
    }

    setIntents(user:any):void {
        this.subject.next(user);
      }

      getIntent() {
        // console.log(this.http.get(this.intentUrl));
            return this.http.get(this.intentUrl);
          }
}
