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


  constructor(private dataservice:DataService,private ref: ChangeDetectorRef) {

  }

  search(question) {
    console.log(question);

    this.dataservice.getData(question).subscribe((result:Response) =>{

		//this.result = JSON.parse(result);
		// console.log(result.json());

		if(result.json()[0].Type == "Success") {
      console.log("VALID SEARCH")
		this.invalid_search = false;
		this.document = result.json()[0].Document;
        this.result = result.json()[0].Indent;
        this.answer = result.json()[0].Result;
		// console.log(this.answer);
        this.field_name = result.json()[0].Other_Data.More_Details.Field_Name;
        this.operator_name = result.json()[0].Other_Data.More_Details.Operator_Name;
        this.county_name = result.json()[0].Other_Data.More_Details.County_Name;
        alert(this.county_name);
        this.well_report = result.json()[0].Other_Data.Related_documents.Well_Report;
        this.production_data = result.json()[0].Other_Data.Related_documents.Production_Data;
        this.injection_data = result.json()[0].Other_Data.Related_documents.Injection_Data;
        this.well_design = result.json()[0].Other_Data.Related_documents.Well_Design;
        this.well_logs = result.json()[0].Other_Data.Related_documents.Well_Logs;

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

		}

		else {
			this.answer = result.json()[0].Result;
			this.invalid_search  = true;
      console.log("INVALID SEARCH ",result.json()[0].Type);
		}


        // this.document = result.json()[0].document;
        // this.related_document = [];
        // this.related_document = this.related_document.slice();
        // this.related_document.push(result.json()[0].otherdata.related_document);
    },
  (error)=>{
    this.error = true;
	alert("eror from response");
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

      console.log(result.json());

	  if(result.json().Type === "Success") {

	  this.invalid_search = false;
      this.result = result.json()[0];
      this.answer = result.json()[0].Result;
      this.document = result.json()[0].Document;
      this.more_details = result.json()[0].Other_Data.More_Details;
	//  alert(this.document);
      if(typeof this.answer == "string") {
        this.edited = false;
      }
      else if(typeof this.answer == "object") {
        this.edited = true;
      }

      if(this.edited === true) {
        console.log("Object")

      }
      else {
        console.log("String");
      }
      this.more_details = this.result.Other_Data.More_Details;
      console.log(this.more_details);
      this.related_document = this.result.Other_Data.Related_documents;
      console.log(this.related_document);

      this.field_name = result.json()[0].Other_Data.More_Details.Field_Name;
      this.operator_name = result.json()[0].Other_Data.More_Details.Operator_Name;
      this.county_name = result.json()[0].Other_Data.More_Details.County_Name;

      this.well_report = result.json()[0].Other_Data.Related_documents.Well_Report;
      this.production_data = result.json()[0].Other_Data.Related_documents.Production_Data;
	 // alert(this.production_data);
      this.injection_data = result.json()[0].Other_Data.Related_documents.Injection_Data;
      this.well_design = result.json()[0].Other_Data.Related_documents.Well_Design;
      this.well_logs = result.json()[0].Other_Data.Related_documents.Well_Logs;
	  }

	  else {
		this.invalid_search = true;
    this.answer = result.json()[0].Result;
	  }

   },
   (error)=>{
     this.error = true;
	// alert("This is from ng Init");
   }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
