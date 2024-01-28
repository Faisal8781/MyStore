import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addtocart: EventEmitter<Cart> = new EventEmitter();
  options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];
  selectedOption: string;

  constructor() {
    this.product = {
      id: 1,
      name: '',
      price: 1,
      url: '',
      description: '',
    };
    this.selectedOption = '1';
  }

  ngOnInit(): void {}

  onSubmit(cart: Cart) {
    this.addtocart.emit(cart);
  }
  toNumber(selectedOption: string): number {
    return parseInt(selectedOption);
  }
}
