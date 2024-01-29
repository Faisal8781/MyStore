import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { Confirmation } from '../models/confirmation.model';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnInit {
  @Input() cart: Cart;
  total: number;
  @Output() updateAmount: EventEmitter<Cart> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<Cart> = new EventEmitter();
  product: Product = { id: 1, name: '', price: 1, description: '', url: '' };
  options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
  ];
  selectedOption: string;
  constructor(
    private productServices: ProductsService,
    private cartServices: CartService
  ) {
    this.cart = {
      id: 1,
      productId: 1,
      amount: 1,
      price: 1,
    };
    this.total = 0;
    this.selectedOption = '1';
  }

  ngOnInit(): void {
    this.productServices
      .getProductById(this.cart.productId)
      .subscribe((res) => {
        if (res) {
          this.product = res;
        } else {
          this.product = this.product;
        }
      });
    this.selectedOption = this.cart.amount as unknown as string;
  }
  update(amount: number) {
    this.cart.amount = amount;
    this.cart.price = this.product.price * this.cart.amount;
    this.total = this.cart.price;
    this.updateAmount.emit(this.cart);
  }
  toNumber(selectedOption: string): number {
    return parseInt(selectedOption);
  }
  removeitem(cart: Cart) {
    this.removeFromCart.emit(cart);
    // this.cartServices.removeFromCart(cart);
    // this.total = this.cartServices.getTotalCost() - cart.price;
  }
}
