import { KeyPipe } from './../pipes/key.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit ,OnDestroy,ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { FilterComponent } from './filter/filter.component'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit ,OnDestroy {

  error:boolean = false;
  filter:boolean = true;
  progress:boolean=false;
  invalid_search:boolean = false;
  question:string;
  subscription:Subscription;
  result:any;
  document:any;
  answer:any;
  edited:boolean = false;
  display:any = [];
  welldocs:any = [];
  wellheaders:any = [];
  otherdata:any = [];
  coredata:boolean = true;
  core:any = [];
  p: number = 1;
  pp:number = 1;
  ppp:number = 1;
  intentFromSearch:any;
  comment:any;
  feedsuccess:boolean= false;
  toshow:boolean = false;
  source:any;
  isDocument:boolean = false;
  passage:boolean = false;
  passagedetails:any = [];
  passagedocs:any = [];

  @ViewChild('FilterComponent') filterComponent : FilterComponent;


  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) {

  }

  getFilterdata():void {
   this.filterComponent.getData();
  }

  modal(i) {
   
    this.core =  this.answer[i].core_data;
  }

  search(question) {
	 
    // console.log("***********************ON SEARCH******************************",this.passage);
    this.progress = true;


    this.dataservice.getData(question).subscribe((result:Response) =>{
      this.result = result.json()[0].Result;
    

      //cheking result type for filter
      //dont send for string

      if(typeof this.result == "object" && result.json()[0].Type != "Passage") {
        this.filter = true;
        this.dataservice.setResultData(this.result);
        this.filterComponent.getData();
        // this.getFilterdata();
        this.dataservice.filterdata.subscribe(result => {
          this.result = result;
          this.answer = [];
          this.answer = this.result;
        })
      }

      // console.log(result.json()[0]);
      this.progress = false;

       if(result.json()[0].Type === "Success") {
        this.invalid_search  = true;
        this.filter = true;
        this.passage = false;
        this.p = 1;
        this.pp = 1;
        this.ppp = 1;
        this.invalid_search = false;
        this.intentFromSearch = result.json()[0].Intent;
        this.question = result.json()[0].Question;
        this.source = result.json()[0].Response_Type;

        if(result.json()[0].Document == "" || result.json()[0].Document === "Not Available") {

          this.isDocument = true;
          this.document = "N/A"
        }
        else {
          this.document = result.json()[0].Document;
          this.isDocument = false;
        }

        this.answer = result.json()[0].Result;
        this.otherdata = result.json()[0].Other_Data;

        if(typeof this.answer == "string") {
          this.edited = false;
          this.filter = false;
        }
        else if(typeof this.answer == "object" ) {
          this.edited = true;
          this.coredata= true;
          this.filter = true;
         
        }
        if(result.json()[0].is_core_data) {

          this.coredata = false;

        }
      }

      else if(result.json()[0].Type === "Passage") {

        

        this.passagedetails = result.json()[0].Result;
        this.passagedocs = result.json()[0].Document;
        this.passage = true;
        this.invalid_search = false;
		  
     
      }

      else {
        this.answer = result.json()[0].Result;
        this.invalid_search  = true;
        this.passage = false;

      }
    },
    (error)=>{
      this.error = true;

    })
  }

  feedback(){

    this.toshow = false;
  }


  feedbacksubmit(comment) {
 

		let oldintent1 = this.intentFromSearch[0];
		let oldintent2 = this.intentFromSearch[1];
		
    let feed = {
      "question":this.question,
      "oldintent1":oldintent1,
      "oldintent2":oldintent2,
      "comment":this.comment,
      "processed":false
    }

    this.dataservice.sendfeedback(feed).subscribe((res:Response)=>{
      // console.log("POSTED");
      this.toshow = true;
      this.feedsuccess = true;
      this.comment = "";
    },(error)=>{
      // console.log("NOT POSTED");
      this.toshow=true;
      this.comment = "";
      
      this.feedsuccess = false;
    })

  }

  ngOnInit() {
    // alert("NGINIT",this.passage);
    // console.log("********************************OnINIT****************************************",this.passage);
    this.subscription = this.dataservice.getQuestion().subscribe(data =>{
      this.question = data;

    })
    this.search(this.question);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
