import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ChangeDetectorRef, ViewChild, Output } from '@angular/core';
import { CsvgeneratorService } from '../csvgenerator.service';
import { DataService } from "../data.service";
import { IMultiSelectOption ,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {PaginationInstance} from 'ngx-pagination';
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

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 2,
    currentPage: 1
};

@Output() pageChange: EventEmitter<number>;

pageChanged(ev) {
  console.log('change to page', ev);
  this.config.currentPage = ev;
  this.anotherq[ev] = false;
}


 
  

  

  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/api/file'});
  ngOnInit() {
    
   
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
      this.feedback = feedback.json();

      for(let i = 0;i<=this.feedback.length;i++) {

        this.anotherq[i] = false;
      }
    })
    
    this.dataservice.getindent().subscribe((intent:Response) =>{
      this.myOptions = intent.json();
      // console.log("Intents from server",intent.json().intents);
      // this.myOptions = intent.json().intents;
      // console.log(this.myOptions);
    })
  }
  
  onChange() {
    // console.log(this.selected);
  } 
  
  constructor (private http:	 Http,private changeDetectorRef: ChangeDetectorRef,private csvgen: CsvgeneratorService,private dataservice:DataService) {
    
    
  }
  
  toogle(index) {
    console.log("toggled index",index);
    console.log("current page",this.config.currentPage);
    console.log("that index",(this.config.currentPage -1)*this.config.itemsPerPage + 1);
    console.log(this.anotherq);
    this.anotherq[index] = !this.anotherq[index];
  }
  
  deleteRow(index) {
    console.log("deleted index",index);
    // console.log(this.feedback[index]);
    // this.showmessage[index] = 1;
    this.feedback.splice(index, 1);
    this.changeDetectorRef.detectChanges();
  }
  
  approveRow(index) {
    console.log("approved index",index);
    // console.log(this.feedback);
    console.log(this.selected[index]);
    for(let i = 0;i<=this.selected[index].length-1;i++) {
      this.intent1 = this.myOptions[this.selected[index][i]-1].name;
      if(this.selected2[index] != undefined) {
        this.intent2 = this.myOptions[this.selected2[index][i]-1].name;
      }
      else {
        this.intent2 = "";	
      }
    }
  
    this.feedback[index].newintent1 = this.intent1;
    if(this.intent2 == undefined) {
      this.intent2 = "";
    }
    this.feedback[index].newintent2 = this.intent2;
    this.feedback[index].question2 = this.question2[index]; 
    this.feedback[index].processed = "TRUE";
    this.toserver.push(this.feedback[index]);
    this.showmessage[index] = 1;
    this.changeDetectorRef.detectChanges();   
  }
  
  sendjson() {
    console.log(this.feedback);
    this.dataservice.sendapproved(this.feedback).subscribe((res:Response)=> {
      console.log("response sent");
      // this.ngOnInit();
    },(error) =>{
      // window.location.reload();   
    })
  }
  
  
}
