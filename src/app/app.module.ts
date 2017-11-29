import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CsvgeneratorService } from "./csvgenerator.service";
import { DataService } from './data.service';
// import { HomeModule } from './home/home.module';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { KeyPipe } from './key.pipe';
// import { NewComponent } from './new/new.component';


const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login',component:LoginComponent },
{ path: 'home',component:HomeComponent },
{ path: 'search',component:SearchComponent },
{ path: 'admin',component:AdminComponent }
];

@NgModule({
	declarations: [
	AppComponent,
	LoginComponent,
	NavbarComponent,
	HomeComponent,
	SearchComponent,
	AdminComponent,
	KeyPipe,
	// NewComponent
	],

	imports: [
	RouterModule.forRoot(routes),
	BrowserModule,
	BrowserAnimationsModule,
	HttpModule,
	FormsModule,
	NgxPaginationModule
	],
	providers: [DataService,CsvgeneratorService],
	bootstrap: [AppComponent]
})
export class AppModule { }
