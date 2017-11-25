import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Routes, RouterModule,Router} from "@angular/router";

@Component({
    selector: 'log-in',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
  })

export class LoginComponent{

    admin_username = "admin1";
    admin_password = "qwerty";
    admin2_username = "admin2";
    admin2_password = "asdfgh";
    user1_username = "kishan01";
    user1_password = "password";
    user2_username = "navan01";
    user2_password = "password2";

    invalidcred:boolean = false;

    constructor(private router:Router) {}
 
    login(username,password) {
    
      if(username == this.admin_username && password == this.admin_password ) {

        this.router.navigate(['admin'])

    }

    if(username == this.admin2_username && password == this.admin2_password ) {
      
              this.router.navigate(['admin'])
      
          }



    if(username == this.user1_username && password == this.user1_password ) {
            
                    this.router.navigate(['home'])
      }

      if(username == this.user2_username && password == this.user2_password ) {
        
                this.router.navigate(['home'])
  }

  else {
    this.invalidcred = true;
  }

    

  }
}
