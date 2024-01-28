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
  @Input() total: number;
  @Output() updateAmount: EventEmitter<Cart> = new EventEmitter();
  product: Product = { id: 1, name: '', price: 1, description: '', url: '' };
  options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];
  selectedOption: string;
  constructor(private productServices: ProductsService) {
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
}
