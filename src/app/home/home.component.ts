import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
// import { CsvgeneratorService } from '../csvgenerator.servicei';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent  {

  alldata:any = [];
  searchtext:string;

  constructor(private _http: Http,private dataservice:DataService) {
  }

  message:object;


  sendquestion() {
    this.dataservice.getData(this.searchtext).subscribe(
      (response:Response)=>{
        this.alldata = response.json()[0];
        this.dataservice.changeMessage(this.alldata);
        // console.log(this.alldata);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  search() {
   
   
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
  //   // console.log("Approved CSV",this.approvedCsv);
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
