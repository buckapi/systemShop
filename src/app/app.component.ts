import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GlobalService } from './services/global.service';
import { SidebarComponent } from "./components/ui/sidebar/sidebar.component";
import { TopNavbarComponent } from './components/ui/top-navbar/top-navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormRequestComponent } from "./components/form-request/form-request.component";
import { AuthPocketbaseService } from './services/auth-pocketbase.service';
import { TechnicalsComponent } from './components/technicals/technicals.component';
import { WorkInstructionsComponent } from './components/work-instructions/work-instructions.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { ProductsComponent } from './components/products/products.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CashComponent } from './components/cash/cash.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    SidebarComponent,
    TopNavbarComponent,
    RegisterComponent,
    LoginComponent,
    FormRequestComponent,
    TechnicalsComponent,
    WorkInstructionsComponent,
    HttpClientModule,
    ProductsComponent,
    EmployeesComponent,
    CashComponent,
  ],
 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qualitydetailing';
  constructor (
    public global: GlobalService,
    public auth:AuthPocketbaseService
  ){
    this.auth.permision();  
  }
}
