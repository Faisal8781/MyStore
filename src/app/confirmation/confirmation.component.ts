import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent implements OnInit {
  username: string = '';
  totalCost: number = 0;

  constructor(private cartInfo: CartService, private router: Router) {}
  ngOnInit(): void {
    if (this.cartInfo.getCartItems().length !== 0) {
      this.username = this.cartInfo.getUsername();
      this.totalCost = this.cartInfo.getTotalCost();
    } else {
      this.router.navigate(['/']);
    }
  }
}
