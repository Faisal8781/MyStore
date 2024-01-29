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
