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
import { DataService } from './services/data.service';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// import { Ng4FilesModule } from 'angular4-files-upload';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { FilterComponent } from './search/filter/filter.component';
import { KeyPipe } from './pipes/key.pipe';



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
	FilterComponent

	],

	imports: [
	RouterModule.forRoot(routes),
	BrowserModule,
	FileUploadModule,	
	BrowserAnimationsModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	MultiselectDropdownModule,
	// Ng4FilesModule 
	],
	exports:[FileUploadModule],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
