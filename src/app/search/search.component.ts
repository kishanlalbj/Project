import { KeyPipe } from './../key.pipe';
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

  error:boolean = false;
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
  
  isDocument:boolean = false;

  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) {

  }

  modal(i) {
    // alert(i);
    this.core =  this.answer[i].core_data;
  }

  search(question) {

    this.progress = true;


    this.dataservice.getData(question).subscribe((result:Response) =>{
        console.log(result.json()[0]);
      this.progress = false;
      if(result.json()[0].Type === "Success") {
        console.log("VALID SEARCH");
        this.p = 1;
        this.pp = 1;
        this.ppp = 1;
        this.invalid_search = false;
        this.intentFromSearch = result.json()[0].Intent;
        this.question = result.json()[0].Question;
		
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
        }
        else if(typeof this.answer == "object" ) {
          this.edited = true;
          this.coredata= true;
          console.log(result.json()[0].is_core_data);  
        }
         if(result.json()[0].is_core_data) {
        
          this.coredata = false;

        }
      }

      else {
        this.answer = result.json()[0].Result;
        this.invalid_search  = true;
        
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
        console.log(comment);
        console.log(this.intentFromSearch);
        let feed = {
          "question":this.question,
          "oldintent":this.intentFromSearch,
          "comment":comment,
          "processed":false
        }

        this.dataservice.sendfeedback(feed).subscribe((res:Response)=>{
          console.log("POSTED");
          this.toshow = true;
          this.feedsuccess = true;
        },(error)=>{
          console.log("NOT POSTED");
          this.toshow=true;
          this.feedsuccess = false;
        })
    
      }

  ngOnInit() {

    this.subscription = this.dataservice.getQuestion().subscribe(data =>{
    this.question = data;

    })
    this.search(this.question);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
