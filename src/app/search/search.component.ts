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
  related_document:any;
  answer:any;
  edited:boolean = false;
  operator_name:any;
  county_name:any;
  more_details?:any;
  field_name:any;
  well_report :string;
  production_data:string;
  injection_data:string;
  well_design:string;
  well_logs:string;
  display:any = [];
  welldocs:any = [];
  wellheaders:any = [];
  otherdata:any = [];
  
  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) {
    
  }
  
  search(question) {
    console.log(question);
    this.progress = true;
    
    this.dataservice.getData(question).subscribe((result:Response) =>{
      this.progress = false;
      
  
      if(result.json()[0].Type == "Success") {
        console.log("VALID SEARCH");
        // console.log(typeof result.json()[0].Result);
        this.invalid_search = false;
        this.document = result.json()[0].Document;
        this.result = result.json()[0].Indent;
        this.answer = result.json()[0].Result;
        this.otherdata = result.json()[0].Other_Data;
        console.log(this.otherdata[0]);
        // this.field_name = result.json()[0].Other_Data.More_Details.Field_Name;
        // this.operator_name = result.json()[0].Other_Data.More_Details.Operator_Name;
        // this.county_name = result.json()[0].Other_Data.More_Details.County_Name;
        // this.well_report = result.json()[0].Other_Data.Related_documents.Well_Report;
        // this.production_data = result.json()[0].Other_Data.Related_documents.Production_Data;
        // this.injection_data = result.json()[0].Other_Data.Related_documents.Injection_Data;
        // this.well_design = result.json()[0].Other_Data.Related_documents.Well_Design;
        // this.well_logs = result.json()[0].Other_Data.Related_documents.Well_Logs;
        
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
        console.log("INVALID SEARCH ",result.json()[0].Type);
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
      console.log(this.question);
    })
    this.search(this.question);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
