import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';

import { CsvgeneratorService } from "./csvgenerator.service";


const routes: Routes = [
{ path: '', redirectTo: 'search', pathMatch: 'full' },

{ path: 'search',component:SearchComponent}
];

@NgModule({
	declarations: [
	AppComponent,
	SearchComponent,
	NavbarComponent

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
