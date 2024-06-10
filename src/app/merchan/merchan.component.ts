import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-merchan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merchan.component.html',
  styleUrls: ['./merchan.component.css']
})
export class MerchanComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  addToCart(producto: any): void {
    this.cartService.addToCart(producto);
  }
}
