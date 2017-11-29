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

  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) {
    
  }
  
  modal(i) {
    // alert(i);
    this.core =  this.answer[i].core_data;
  }

  search(question) {
    
    this.progress = true;

    
    this.dataservice.getData(question).subscribe((result:Response) =>{
      
      this.progress = false;
      console.log(question);
      if(result.json()[0].Type == "Success") {
        console.log("VALID SEARCH");
        this.invalid_search = false;
        this.document = result.json()[0].Document;
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
          alert("It is core data");
          this.coredata = false;
         
        }
      }
      
      else {
        this.answer = result.json()[0].Result;
        this.invalid_search  = true;
        console.log("type fail",this.progress);
      }
    },
    (error)=>{
      this.error = true;
      alert("error from server");
    })
  }
  
  ngOnInit() {
    
    this.subscription = this.dataservice.getQuestion().subscribe(data =>{
    this.question = data;
    console.log("ON INIT",this.question)
    })
    this.search(this.question);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
