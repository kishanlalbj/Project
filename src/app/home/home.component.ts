import { Observer } from 'rxjs/Observer';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit  {
  
  alldata:any = [];
  searchtext:string;
  subscription: Subscription;
  message:string;
  question:string;
  
  
  constructor(private _http: Http,private dataservice:DataService,private router:Router) {
    
  }
  
  sendquestion(question) {
    this.dataservice.setQuestion(question);
    this.router.navigate(['search']);
  }
  
  ngOnInit() {}
  
}
