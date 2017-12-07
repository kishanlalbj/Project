import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule} from 'ngx-pagination';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CsvgeneratorService } from "./csvgenerator.service";
import { DataService } from './data.service';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Ng4FilesModule } from 'angular4-files-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FetchDataService } from './fetch-data.service';
import { FilterComponent } from './search/filter/filter.component';
import { KeyPipe } from './key.pipe';



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
	FileSelectDirective,
	FilterComponent

	],

	imports: [
	RouterModule.forRoot(routes),
	BrowserModule,
	BrowserAnimationsModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	MultiselectDropdownModule,
	Ng4FilesModule 
	],
	providers: [DataService,CsvgeneratorService,FetchDataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
