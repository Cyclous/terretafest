import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(item: any): void {
    const currentItems = this.cartItems.value;
    currentItems.push(item);
    this.cartItems.next(currentItems);
    this.cartCount.next(currentItems.length); // Actualizar el contador del carrito
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.cartCount.next(0); // Resetear el contador del carrito
  }

  getCartItems(): any[] {
    return this.cartItems.value;
  }
}
