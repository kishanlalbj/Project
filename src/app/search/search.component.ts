import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  message:string;
  displaydata:any;
  rd:any = [];
  query:string;
  demo = [];
  more = [];
  constructor(private data:DataService) { 
  }

  search(query) {
    console.log(query);
    this.data.getData(query).subscribe(
      (response:Response)=>{
        this.displaydata = response.json()[0];
        this.rd = [];
        this.more = [];
        this.rd.push(this.displaydata.otherdata.related_document)
        this.more.push(this.displaydata.otherdata.more_details)
        console.log("search",this.more);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  helpWindow(event) {
    window.open('https://www.google.com', '_blank', 'location=yes,height=10244,width=1021,scrollbars=yes,status=yes');
  }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.displaydata = message;
      this.query = this.displaydata.question;
      this.rd = [];
      this.demo.push(this.displaydata.otherdata);
      // this.rd.push(this.demo);
      console.log("ngInit",this.demo[1]);
    })
  }

}
