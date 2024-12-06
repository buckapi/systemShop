import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.css'
})
export class CashComponent {
  constructor
  (public global: GlobalService) 
  {
  
  }
}
