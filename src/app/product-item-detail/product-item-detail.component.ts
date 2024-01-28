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
    cart.id = this.idIncerment();
    this.cart.push(cart);
    this.cartServices.changeCart(this.cart);
  }
  toNumber(selectedOption: string): number {
    return parseInt(selectedOption);
  }
}
