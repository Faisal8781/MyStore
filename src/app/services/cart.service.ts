import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<Cart[]>([]);
  private totalCost: number = 0;
  private username: string = '';
  currentCart = this.cart.asObservable();
  id: number = 0;
  cartServices: Cart[] = [];
  constructor() {}

  changeCart(cart: Cart[]) {
    this.cart.next(cart);
  }

  getCartItems(): Cart[] {
    return this.cartServices;
  }
  setCartItems(items: Cart[]): void {
    this.cartServices = items;
  }

  getTotalCost(): number {
    return this.totalCost;
  }
  setTotalCost(total: number): void {
    this.totalCost = total;
  }

  getUsername(): string {
    return this.username;
  }
  setUsername(username: string): void {
    this.username = username;
  }
  idIncerment(): number {
    return (this.id += 1);
  }
}
