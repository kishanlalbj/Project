import { Observable } from 'rxjs';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { CsvgeneratorService } from '../csvgenerator.service';
import { DataService } from "../data.service";
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
// import { IDropdownItem } from 'ng2-dropdown-multiselect';
import * as $ from 'jquery';
import {
  Ng4FilesStatus,
  Ng4FilesSelected
} from 'angular4-files-upload';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  feedback:any = [];
  optionsModel: any[];
  myOptions: IMultiSelectOption[];
  pppp:number;
  public selectedFiles;
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/api/file'});
  ngOnInit() {

    this.pppp = 1;
    this.myOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id:3,  name:'Option 3'}
  ]

    this.dataservice.getfeedback().subscribe((feedback:Response) =>{
      this.feedback = feedback.json();
      console.log(this.feedback[0].comment);
    })
    
    this.dataservice.getindent().subscribe((indents:Response) =>{
      this.myOptions = indents.json();
      console.log(this.myOptions);
    })
  }

  onChange() {
    // console.log(this.selected);
} 
  index:number = 1;
  indents:any = [];
  selected:any = [];
  private elem: ElementRef;
  toserver:any = [];

  
  
  constructor (private http: Http,private changeDetectorRef: ChangeDetectorRef,private csvgen: CsvgeneratorService,private dataservice:DataService) {
    // this.readCsvData();
  
  }
  
  
  deleteRow(index) {
    console.log(index);
    console.log(this.feedback[index]);
    this.feedback.splice(index, 1);
    this.changeDetectorRef.detectChanges();
  }
  
  
  approveRow(index) {
    console.log("selected indents for row " + index + "****",this.selected[index]);
    console.log("selected length",this.selected[index][0]);
    let indent = [];
    
    for(let i = 0;i<=this.selected[index].length-1;i++) {
      console.log("i ",i);
      console.log("final",this.myOptions[this.selected[index][i]-1].name);
    
      indent.push(this.myOptions[this.selected[index][i]-1].name);
    }
    console.log(indent);
    
    this.selected[index] = [];
    this.feedback[index].newintent = indent;
    this.toserver.push(this.feedback[index]);
    
   
    // let indent = [];
    // indent.push(this.selected[index]);
    // indent.push(this.selected2[index]);
    // this.feedback[index].newintent = indent;
    // this.toserver.push(this.feedback[index]);
    // this.selected[index] = "";
    // this.selected2[index] = "";
    this.feedback.splice(index,1);
    this.changeDetectorRef.detectChanges();   
  }
  
  sendjson() {
    console.log(this.toserver);
    this.dataservice.sendapproved(this.toserver).subscribe((res:Response)=> {
      console.log("response sent");
    })
  }

  
}
