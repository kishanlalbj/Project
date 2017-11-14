import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { DataService } from '../data.service';
import { Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit ,OnDestroy {
  
  question:string;
  subscription:Subscription;
  result:any;
  document:any;
  related_document:any;
  answer:any;
  author:any;
  updated_on:any;
  entity:any;
  res_type:any;
  isTable:boolean = false;
  edited:boolean = false;
  
  
  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) { 

  }

  search(question) {
    console.log(question);

    this.dataservice.getData(question).subscribe((result:Response) =>{
        this.result = result.json()[0];
        this.answer = result.json()[0].resut;
        this.res_type = typeof this.answer


        if(typeof this.answer == "string") {
          this.edited = false;
        }
        else if(typeof this.answer == "object") {
          this.edited = true;

        }

        if(this.edited === true) {
          console.log("Object");
        }
        else {
          console.log("String");
        }


        console.log(this.answer[0].well_id);
        this.document = result.json()[0].document;
        this.related_document = [];
        console.log("before",this.related_document);
        this.related_document = this.related_document.slice();
        this.related_document.push(result.json()[0].otherdata.related_document);
        console.log(this.related_document);
        this.author = result.json()[0].otherdata.more_details.author;
        this.updated_on = result.json()[0].otherdata.more_details.updated;
        this.entity = result.json()[0].entity;
    })
  }
  
  helpWindow(event) {
    window.open('https://www.google.com', '_blank', 'location=yes,height=10244,width=1021,scrollbars=yes,status=yes');
  }
  
  ngOnInit() {
   
  this.subscription = this.dataservice.getQuestion().subscribe(data =>{
    this.question = data;
    console.log(this.question);
  })    
  this.dataservice.getData(this.question).subscribe(
    (result:Response)=>{
      this.result = result.json()[0];
      this.answer = result.json()[0].resut;
      this.document = result.json()[0].document;
      this.related_document = [];
      
      if(typeof this.answer == "string") {
        this.edited = false;
      }
      else if(typeof this.answer == "object") {
        this.edited = true;
      }

      if(this.edited === true) {
        console.log("Object")

        for(let i=0;i<this.answer.length;i++) {
          let obj = this.result[i];
          for(let key in obj) {
            console.log(key);
          }
        }
        
      }
      else {
        console.log("String");
      }
      // console.log(this.answer);
      this.related_document.push(result.json()[0].otherdata.related_document);
      // console.log("Depre",this.related_document);
      this.author = result.json()[0].otherdata.more_details.author;
      this.updated_on = result.json()[0].otherdata.more_details.updated;
      this.entity = result.json()[0].entity;
 
    }
    )

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
