import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataService } from "../services/data.service";
import { IMultiSelectOption ,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {PaginationInstance} from 'ngx-pagination';
import * as $ from 'jquery';

import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  loading:boolean;
  error:boolean;
  feedback_final = [];
  feedback:any = [];
  anotherq:any=[];
  optionsModel: any[];
  myOptions: IMultiSelectOption[];
  selectsettings:IMultiSelectSettings;
  pppp:number = 1;
  index:number = 1;
  indents:any = [];
  selected:any = [];
  selected2:any = [];
  private elem: ElementRef;
  toserver:any = [];
  public selectedFiles;
  showmessage:any = [];
  question2:any=[];
	intent1:any;
  intent2:any;
  datasent:boolean ;
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/api/file'});  
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  
  constructor (private router:Router,private http:Http,private changeDetectorRef: ChangeDetectorRef,private dataservice:DataService) {
    
    
  }
  
  refresh() {
    // window.location.reload();  
   this.ngOnInit();
  }
  
  gotoSearch() {
    // alert("called");
    this.router.navigateByUrl('/home');
  }
  
  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }
  
  
  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.pppp = 1;
    this.myOptions = [{ id:1 ,name:'Option1'},{ id:2 ,name:'Option2'}]
    
    this.selectsettings = {
      showUncheckAll:true,
      selectionLimit : 1,
      enableSearch :true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 1,
      displayAllSelectedText: true
    }; 
    
    
    this.dataservice.getfeedback().subscribe((feedback:Response) =>{
      this.loading = false;
      this.feedback = feedback.json();
      this.error = false;
    
      this.feedback_final = this.feedback;
      console.log(feedback.json())
      
      for(let i = 0;i<=this.feedback.length-1;i++) {
        
        this.anotherq[i] = false;
      }
    },(error)=> {

      // alert(this.error);
      // alert(this.loading);
      this.error = true;
      this.loading = false;
    })
    
    this.dataservice.getindent().subscribe((intent:Response) =>{
      this.myOptions = intent.json().intents;
    })
  }
  
  onChange() {
    // console.log(this.selected);
  } 
  
  
  
  toogle(index) {
    console.log(index);
    this.anotherq[index-1] = !this.anotherq[index-1];
    console.log(this.anotherq);
  }
  
  deleteRow(index) {
    console.log(index);
    // console.log(this.feedback[index]);
    //this.showmessage[index] = 1;
    console.log(this.feedback[index-1]);
    this.feedback.splice(index-1, 1);
    this.toserver.push(this.feedback[index-1])
    this.changeDetectorRef.detectChanges();
  }
  
  approveRow(index) {
    console.log(index);
    let indent = []; 
    for(let i = 0;i<=this.selected[index].length-1;i++) {
      this.intent1 = this.myOptions[this.selected[index][i]-1].name;
      if(this.selected2[index] != undefined) {
        this.intent2 = this.myOptions[this.selected2[index][i]-1].name;
      }
      else {
        this.intent2 = "";	
      }
    }
    
    this.feedback[index-1].newintent1 = this.intent1;
    if(this.intent2 == undefined) {
      this.intent2 = "";
    }
    this.feedback[index-1].newintent2 = this.intent2;
    this.feedback[index-1].question2 = this.question2[index]; 
    this.feedback[index-1].processed = "TRUE";
    this.toserver.push(this.feedback[index-1]);
    this.showmessage[index] = 1;
    this.changeDetectorRef.detectChanges();   
  }
  
  sendjson() {
    console.log(this.feedback);
    this.dataservice.sendapproved(this.feedback).subscribe((res:Response)=> {
      console.log("response sent");
      this.datasent = true;
      
    },(error) =>{
      this.datasent = false;
      console.log(error);   
    })
  }
}
