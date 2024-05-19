import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merchan',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './merchan.component.html',
  styleUrls: ['./merchan.component.css']
})
export class MerchanComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  goToProductDetails(id: number): void {
    // Redirigir a la página de detalles del producto
    // Aquí puedes agregar la lógica para redirigir a los detalles del producto
    console.log("Ir a los detalles del producto con ID:", id);
  }
}
