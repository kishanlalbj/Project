import { Component } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { DataService } from './data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'app';

  onDeactivate() {
      document.body.scrollTop = 0;
  }alldata:any = [];
  searchtext:string;

  constructor(private _http: Http,private dataservice:DataService) {
  }

  search() {
    console.log(this.searchtext);
    this.dataservice.getData(this.searchtext).subscribe(
      (response:Response)=>{
        this.alldata = response.json()[0];
        console.log(this.alldata);
      },
      (error)=>{
        console.log(error);
      }
    )
  }



}
