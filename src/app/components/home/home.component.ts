import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { TopNavbarComponent } from '../ui/top-navbar/top-navbar.component';
import { DataApiService } from '../../services/data-api.service';
import { AuthPocketbaseService } from '../../services/auth-pocketbase.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RealtimeProductsService } from '../../services/realtime-productos.service';

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
  form = new FormGroup({
    code: new FormControl('')
    });


  constructor(
    public global: GlobalService,
    public auth: AuthPocketbaseService,
    private dataApiService: DataApiService,
    private router: Router,
    private realtimeProducts: RealtimeProductsService
  ){    
        
         this.dataApiService.getAllProducts();
   
  }

  
  ngOnInit() {    
    this.realtimeProducts.products$;
  }
}
