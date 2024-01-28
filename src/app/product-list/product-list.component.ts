import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productsList: Product[] = [];
  cart: Cart[] = [];
  constructor(
    private productServices: ProductsService,
    private cartServices: CartService
  ) {}
  ngOnInit(): void {
    this.productServices.getProducts().subscribe((res) => {
      this.productsList = res;
    });
    this.cartServices.currentCart.subscribe((res) => (this.cart = res));
  }

  idIncerment(): number {
    return this.productServices.idIncerment();
  }
  addtocart(cart: Cart) {
    cart.id = this.idIncerment();
    this.cart.push(cart);
    this.cartServices.changeCart(this.cart);
  }
}
