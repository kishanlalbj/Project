import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable , BehaviorSubject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FetchDataService {

  public beSubject =  new BehaviorSubject(null);
  public filterdata  = this.beSubject.asObservable()
  
  constructor(private http : Http) { }
  
  // public getJSON(){
  //   return this.http.get("../../assets/sample.json").map((res:any) =>
  //         { return  res.json().data });
  //   }

  public dataComm(data){
    this.beSubject.next(data);
  }

  public getActualJSON(){
    //return this.http.get("../../assets/actual.json")
      //.map((res:any) => { return res.json().data[1].Other_Data });
      return this.http.get("../../assets/multiple_json.json")
        .map((res:any) => { return res.json().Result })
  }
  
}
