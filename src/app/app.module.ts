import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CsvgeneratorService } from "./csvgenerator.service";


const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'admin', component: HomeComponent },
{ path: 'login',component:LoginComponent}
];

@NgModule({
	declarations: [
	AppComponent,
	LoginComponent,
	NavbarComponent,
	HomeComponent

	],

	imports: [
	RouterModule.forRoot(routes),
	BrowserModule,
	BrowserAnimationsModule,
	HttpModule

	],
	providers: [CsvgeneratorService],
	bootstrap: [AppComponent]
})
export class AppModule { }
