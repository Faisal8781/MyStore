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
    return this.cartServices.idIncerment();
  }
  addtocart(cart: Cart) {
    if (this.cart.length === 0) {
      cart.id = this.idIncerment();
      this.cart.push(cart);
      this.cartServices.changeCart(this.cart);
    } else {
      let productExists = false;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].productId === cart.productId) {
          this.cart[i].amount += cart.amount;
          if (this.cart[i].amount > 20) {
            this.cart[i].amount = 20;
            alert(
              'You have reached the maximum quantity of 20 for this product.'
            );
            return;
          }
          productExists = true;
          break;
        }
      }
      if (!productExists) {
        cart.id = this.idIncerment();
        this.cart.push(cart);
      }
      this.cartServices.changeCart(this.cart);
    }
    alert(`Proudct added successfully to shoppingcart`);
  }
}
