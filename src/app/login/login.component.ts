import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Routes, RouterModule,Router} from "@angular/router";
import { DataService } from '../services/data.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'log-in',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers:[NavbarComponent]
  })

export class LoginComponent{

    admin_username = "admin1";
    admin_password = "qwerty";
    admin2_username = "admin2";
    admin2_password = "asdfgh";
    user1_username = "guest";
    user1_password = "guest";
    user2_username = "navan01";
    user2_password = "password2";
    invalidcred:boolean = false;
    username:string;
    password:string;

    constructor(private router:Router,private dataservice:DataService,private navbar:NavbarComponent) {}
 
    login(username,password) {
    
      if(username == this.admin_username && password == this.admin_password ) {

        this.router.navigate(['admin'])

    }

    if(username == this.admin2_username && password == this.admin2_password ) {
      
              this.router.navigate(['admin'])

          }



    if(username == this.user1_username && password == this.user1_password ) {

                    this.dataservice.setUser(this.user1_username);
                    console.log("user sent");
                    this.navbar.ngOnInit();
                    this.router.navigate(['home']);

      }

      if(username == this.user2_username && password == this.user2_password ) {
        
                this.router.navigate(['home'])
  }

  else {
    this.invalidcred = true;
  }
  }
}
