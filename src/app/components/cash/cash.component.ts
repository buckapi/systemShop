import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { RealtimeProductsService } from '../../services/realtime-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.css'
})
export class CashComponent {
  terminoBusqueda: string = '';
  productosEncontrados: any[] = [];
  metodoPago: string = 'efectivo';
  fechaActual: string = '';
  horaActual: string = '';
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  productos: any[] = [];
  productosFiltrados: any[] = [];
  pasoActual: number = 1; // 1: Productos, 2: Procesar pago, 3: Imprimir factura
  productosSeleccionados: any[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  constructor
  (public global: GlobalService,
    public realtimeProducts: RealtimeProductsService
  ) 
  {
    this.fechaActual = new Date().toLocaleDateString();
    this.horaActual = new Date().toLocaleTimeString();
  }
  ngOnInit() {
    this.fechaActual = new Date().toLocaleDateString();
    this.horaActual = new Date().toLocaleTimeString();
    
    this.realtimeProducts.products$.subscribe((products: any) => {
      this.productos = products;
      this.productosFiltrados = [...products]; // Inicialmente muestra todos los productos
      console.log('Productos cargados:', this.productos); // Para debugging
    });
  }

  onSearchChange(event: any) {
    const termino = event.target.value;
    console.log('Término de búsqueda:', termino); // Para debugging
    this.filtrarProductos(termino);
  }

  filtrarProductos(termino: string) {
    if (!termino) {
      this.productosFiltrados = [...this.productos];
      return;
    }

    termino = termino.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto => 
      producto.name.toLowerCase().includes(termino) || 
      producto.code.toLowerCase().includes(termino)
    );
    console.log('Productos filtrados:', this.productosFiltrados); // Para debugging
  }

  /* seleccionarProducto(producto: any) {
    console.log('Producto seleccionado:', producto);
    // Aquí puedes agregar el producto a tu lista de productos seleccionados
    this.productosSeleccionados.push(producto);
    this.searchTerm = ''; // Limpia el campo de búsqueda
    this.calcularTotal(); // Actualiza el total si es necesario
  } */
    seleccionarProducto(producto: any) {
      this.productosSeleccionados.push({
        ...producto,
        cantidad: 1
      });
      this.searchTerm = '';
      this.calcularTotal();
      this.pasoActual = 2; // Avanzamos al siguiente paso
    }
  
    eliminarProducto(producto: any) {
      // Primero mostrar confirmación
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar ${producto.name} de la lista?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, eliminar el producto
          const index = this.productosSeleccionados.findIndex(p => p.code === producto.code);
          
          if (index !== -1) {
            this.productosSeleccionados.splice(index, 1);
            this.calcularTotal();
  
            // Mostrar mensaje de éxito
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El producto ha sido eliminado correctamente',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
  
            // Si no quedan productos, volver al paso 1
            if (this.productosSeleccionados.length === 0) {
              this.irAPaso(1);
            }
          }
        }
      });
    }
  
    calcularTotal() {
      // Calcular subtotal
      this.subtotal = this.productosSeleccionados.reduce((total, producto) => {
        return total + (producto.price * producto.cantidad);
      }, 0);
  
      // Calcular IVA (16%)
      this.iva = this.subtotal * 0.16;
  
      // Calcular total
      this.total = this.subtotal + this.iva;
    }
  
    // Funciones para navegar entre pasos
    irAPaso(paso: number) {
      this.pasoActual = paso;
    }
 
  actualizarFechaHora() {
    const ahora = new Date();
    
    // Formato más corto
    this.fechaActual = ahora.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    this.horaActual = ahora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Para formato 24 horas
    });
  } 
  
  procesarVenta() {
    // Implementar lógica para procesar la venta
  }
}
