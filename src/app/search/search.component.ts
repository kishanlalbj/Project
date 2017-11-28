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
  
  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) {
    
  }
  
  search(question) {
    
    this.progress = true;

    
    this.dataservice.getData(question).subscribe((result:Response) =>{
      this.progress = false;
      
  
      if(result.json()[0].Type == "Success") {
        console.log("VALID SEARCH");
        this.invalid_search = false;
        this.document = result.json()[0].Document;
        this.result = result.json()[0].Indent;
        this.answer = result.json()[0].Result;
        this.otherdata = result.json()[0].Other_Data;
   

        if(typeof this.answer == "string") {
          this.edited = false;
        }
        else if(typeof this.answer == "object") {
          this.edited = true;
          console.log(this.answer);
          this.welldocs = result.json()[0].Result.Well_docs;
          this.wellheaders = result.json()[0].Result.Well_headers;
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
    })
    this.search(this.question);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
