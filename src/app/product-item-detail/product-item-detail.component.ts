import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css',
})
export class ProductItemDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  product: Product;
  selectedOption: string;
  cart: Cart[] = [];
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
  constructor(
    private route: ActivatedRoute,
    private productServices: ProductsService,
    private cartServices: CartService
  ) {
    this.product = {
      id: 1,
      name: '',
      price: 1,
      url: '',
      description: '',
    };

    this.selectedOption = '1';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      this.productServices
        .getProductById(Number(productId))
        .subscribe((product) => {
          if (product) {
            this.product = product;
          } else {
            this.product = {
              id: 1,
              name: '',
              price: 1,
              url: '',
              description: '',
            };
          }
        });
    });
    this.cartServices.currentCart.subscribe((res) => (this.cart = res));
  }

  idIncerment(): number {
    return this.productServices.idIncerment();
  }
  addtocart(cart: Cart) {
    if (this.cart.length === 0) {
      cart.id = this.idIncerment();
      this.cart.push(cart);
      this.cartServices.changeCart(this.cart);
    } else {
      let productExists = false;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].productId === this.product.id) {
          this.cart[i].amount += cart.amount;
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
  toNumber(selectedOption: string): number {
    return parseInt(selectedOption);
  }
}
