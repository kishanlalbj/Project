import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { CsvgeneratorService } from '../csvgenerator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})


export class HomeComponent  {


  constructor() {
    console.log(this.csvData);
  }

  csvData =  {
   "data": [
      {
        "Question": "Tell me the total depth of 210/3a-4Z well?",
        "Old Intent": "AllData",
        "New Intent": "TotalDepth",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "How deep is the well 210/29c-5?",
        "Old Intent": "TargetTolerance",
        "New Intent": "TotalDepth",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "210/30a-4X is operated by?",
        "Old Intent": "Equity",
        "New Intent": "Operator",
        "Comments": "intent identified is incorrect",
        "Entities": ""
      },
      {
        "Question": "BD06 is operated by whom?",
        "Old Intent": "Rig",
        "New Intent": "Operator",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "Who are the owners of 210/30a-4?",
        "Old Intent": "Operator",
        "New Intent": "Equity",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "210/30a-4Y is owned by whom?",
        "Old Intent": "Operator",
        "New Intent": "Equity",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "What is the appliance used in BD06?",
        "Old Intent": "Azimuth",
        "New Intent": "Rig",
        "Comments": "intent for appliance used for drilling is rig",
        "Entities": ""
      },
      {
        "Question": "In 210/30a-4Z what piece of euipment is used?",
        "Old Intent": "Azimuth",
        "New Intent": "Rig",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "What is the tolerance of the well BD06?",
        "Old Intent": "TotalDepth",
        "New Intent": "TargetTolerance",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "Tell me the tolerance of 210/30a-4Y well?",
        "Old Intent": "AllData",
        "New Intent": "TargetTolerance",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "Where is the hydrocarbon located for well 210/30a-4X?",
        "Old Intent": "TotalDepth",
        "New Intent": "SourceHydrocarbons",
        "Comments": "incorrect intent",
        "Entities": ""
      },
      {
        "Question": "What is the location of the hydrocarbon for well 210/30a-4Y?",
        "Old Intent": "Azimuth",
        "New Intent": "SourceHydrocarbons",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "When was the well 210/30-4Y spudded?",
        "Old Intent": "TargetTolerance",
        "New Intent": "SpudDate",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "When was the well 210/29c-5 spudded?",
        "Old Intent": "AllData",
        "New Intent": "SpudDate",
        "Comments": "intent for the question is spud date",
        "Entities": ""
      },
      {
        "Question": "Tell me all the details of 210/30a-4X well?",
        "Old Intent": "TargetTolerance",
        "New Intent": "AllData",
        "Comments": "intent should be AllData",
        "Entities": ""
      },
      {
        "Question": "Tell me the all the details of 210/30a-4Y well?",
        "Old Intent": "TotalDepth",
        "New Intent": "AllData",
        "Comments": "",
        "Entities": ""
      },
      {
        "Question": "What is the angular measurement of 210/29c-5?",
        "Old Intent": "Rig",
        "New Intent": "Azimuth",
        "Comments": "wrong intent",
        "Entities": ""
      },
      {
        "Question": "What is the spherical coordinate of 210/30a-4Y?",
        "Old Intent": "Rig",
        "New Intent": "Azimuth",
        "Comments": "",
        "Entities": ""
      }
    ]
  }
  


    

  // csvUrl: string = '../../assets/sample01.csv';  
  // csvData: any[] = [];
  // csvHeader: any[] = [];
  // approvedCsv:any[] = [];
  // index:number = 1;
  // constructor (private http: Http,private changeDetectorRef: ChangeDetectorRef,private csvgen: CsvgeneratorService) {
  // this.readCsvData();
  // }
  // deleteRow(index) {
  //   console.log(index);
  //   console.log(this.csvData[index]);
  //   this.csvData.splice(index, 1);
  //   this.changeDetectorRef.detectChanges();
  // }
  // approveRow(index) {
  //   console.log(index);
  //   // console.log(JSON.stringify(this.csvData[index]));
  //   this.approvedCsv.push(JSON.parse(JSON.stringify(this.csvData[index])));
  //   this.csvData.splice(index,1);
  //   console.log("Approved CSV",this.approvedCsv);
  //   this.changeDetectorRef.detectChanges();   
  // }
  // generateCSV() {
  //     this.csvgen.downloadFile(this.approvedCsv);    
  // }
  // readCsvData() {
  //   this.http.get(this.csvUrl)
  //   .subscribe(
  //     data => this.extractData(data),
  //     err => this.handleError(err)
  //   );
  // }
  // private extractData(res: Response) {

  //   let csvData = res['_body'] || '';
  //   let allTextLines = csvData.split(/\r\n|\n/);
  //   let headers = allTextLines[0].split(',');
  //   this.csvHeader = headers;
  //   console.log("Headers",headers);
  //   let lines = [];

  //   for ( let i = 1; i < allTextLines.length; i++) {
  //       // split content based on comma
  //       let data = allTextLines[i].split(',');
  //       if (data.length == headers.length) {
  //           let tarr = [];
  //           for ( let j = 0; j < headers.length; j++) {
  //               tarr.push(data[j]);
  //           }
  //           lines.push(tarr);
  //       }
  //   }
  //   this.csvData = lines;
  //   // console.log(this.csvData[0]);
  //   this.csvHeader.unshift('S.No');
  //   this.csvHeader.push('Actions'); 
  // }
  // private handleError (error: any) {
   
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); 
  //   return errMsg;
  // }
}
