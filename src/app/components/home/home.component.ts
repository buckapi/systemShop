import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { TopNavbarComponent } from '../ui/top-navbar/top-navbar.component';
import { DataApiService } from '../../services/data-api.service';
import { AuthPocketbaseService } from '../../services/auth-pocketbase.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RealtimeProductsService } from '../../services/realtime-productos.service';
import { HttpClient } from '@angular/common/http';
import { RealtimeEmployeesService } from '../../services/realtime-employees.service';

interface WorkInstruction {
    id: string | number; 
    companyName: string;
    contactName: string;
    mobile: string;
    progress: number;
    status: string; 
    created: string;
    updated: string;
    collectionId: string;
    expand: any;
}

interface User {
    name: string;
    role: string;
    lastLogin: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopNavbarComponent,
    CommonModule, 
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent   {
  workInstructions: WorkInstruction[] = [];
  products: any[] = [];
  employees: any[] = [];
  form = new FormGroup({
    code: new FormControl('')
    });


  constructor(
    public global: GlobalService,
    public auth: AuthPocketbaseService,
    public dataApiService: DataApiService,
    public realtimeProducts: RealtimeProductsService,
    private http: HttpClient,
    public realtimeEmployees: RealtimeEmployeesService
  ){    
        
         this.dataApiService.getAllProducts();  
  }

  
  ngOnInit() {
    // Suscribirse a los cambios en tiempo real de los productos
    this.realtimeProducts.products$.subscribe(products => {
      this.products = products;
    });

    this.realtimeEmployees.employees$.subscribe(employees => {
      this.employees = employees;
    });
  }
}
