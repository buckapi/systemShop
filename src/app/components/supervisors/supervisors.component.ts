import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthPocketbaseService } from '../../services/auth-pocketbase.service';
import Swal from 'sweetalert2';
import { RealtimeProductsService } from '../../services/realtime-invetaryProductos.service';
import { DataApiService } from '../../services/data-api.service';
interface Product {
  name: string;
  role: string;
  description: string;
  tasks: number;
  rating: number;
  reviews: number;
}
@Component({
  selector: 'app-supervisors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.css']
})
export class SupervisorsComponent {
  showForm: boolean = false;
  productForm: FormGroup;
  previewImage: string = 'assets/images/thumbs/setting-profile-img.jpg';
  products: Product[] = [
    {
      name: 'Maria Prova',
      role: 'Content Writer',
      description: 'Experienced content writer with a focus on UX writing.',
      tasks: 45,
      rating: 4.8,
      reviews: 750
    },
    {
      name: 'Alex John',
      role: 'Web Developer',
      description: 'Specialized in front-end development with Angular and React.',
      tasks: 30,
      rating: 4.7,
      reviews: 500
    },
    // Agrega más supervisores según sea necesario
  ];
  constructor(
    public global: GlobalService,
    private fb: FormBuilder,
    public auth: AuthPocketbaseService,
    public realtimeInventoryProducts: RealtimeProductsService,
    public dataApiService: DataApiService
  ) { 
    this.realtimeInventoryProducts.products$;

    // Configurar el formulario con validadores
    this.productForm = this.fb.group({
      name: ['', Validators.required],
/*       email: ['', [Validators.required, Validators.email]],
 */      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      image: [null]
    });
  }

  // Alternar la visibilidad del formulario
  showNewProduct() {
    this.showForm = !this.showForm;
  }

  // Manejar la selección de archivo e imagen de vista previa
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.previewImage = URL.createObjectURL(file);
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      const request = {
        email: this.productForm.get('email')?.value || '',
        name: this.productForm.get('name')?.value || '',
        address: this.productForm.get('address')?.value || '',
        phone: this.productForm.get('phone')?.value || '',
        collection: 'productsInventory'
      };

      this.dataApiService.addProduct(request).subscribe(
        response => {
          console.log('Producto guardado exitosamente:', response);
          
          // Ocultar el formulario y mostrar la lista de productos
          this.showForm = false;
          
          // Actualizar la lista de productos (asumiendo que tienes un método para esto)
          this.realtimeInventoryProducts.products$;

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El producto ha sido guardado exitosamente.',
            confirmButtonText: 'Aceptar'
          });

          this.productForm.reset();
        },
        error => {
          console.error('Error al guardar el producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el producto. Por favor, inténtalo de nuevo.',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
  
}
