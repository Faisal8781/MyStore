import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { Confirmation } from '../models/confirmation.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  name: string = '';
  address: string = '';
  creditcard: string = '';
  cartList: Cart[] = [];
  items: Confirmation[] = [];
  total: number = 0;
  index: number = 0;
  constructor(private cartServices: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartServices.currentCart.subscribe((res) => {
      this.cartList = res;
    });
    this.cartList.forEach((cart) => {
      this.total += cart.price;
    });
  }
  updateTotal(cart: Cart) {
    this.total = 0;
    this.cartList.map((item) => {
      if (cart.id === item.id) {
        item.price = item.price;
        return item;
      } else {
        return item;
      }
    });
    this.cartList.forEach((item) => {
      this.total += item.price;
      this.cartServices.setTotalCost(this.total);
    });
  }

  validateCreditCard() {
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(this.creditcard)) {
      return false;
    }

    return true;
  }

  removeFromCart(item: Cart): void {
    this.total = this.total - item.price;
    this.index = this.cartList.indexOf(item);
    this.cartList.splice(this.index, 1);
    alert(`item removed successfully`);
  }
  formsubmited() {
    if (this.cartList.length !== 0 && this.validateCreditCard()) {
      this.cartServices.setCartItems(this.cartList);
      this.cartServices.setTotalCost(this.total);
      this.cartServices.setUsername(this.name);
      this.router.navigate(['/confirmation']);
    }
  }
}
