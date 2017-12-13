import { Component,OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';



@Component({
	selector:'nav-bar',
	templateUrl:'navbar.component.html',
	styleUrls:['navbar.component.css']
})

export class NavbarComponent implements OnInit{
	public logourl = 'assets/navbar/wiproDigital.png';
	username:any;
	

	constructor(private dataservice:DataService,private router:Router) {
		
	}

	ngOnInit() {
		console.log("nginit called");
		this.dataservice.getusername.subscribe(username => {
			console.log(username);
			this.username = username;
		})
	}
	logout() {
		this.router.navigate['login']
	}

}
