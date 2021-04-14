import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  @ViewChild(CartComponent) cart: CartComponent;

  navigateRide(){
    this.cart.service_selected = 'cart1';
    this.cart.ride_green = false;
    this.cart.display_table = 'none';
    this.cart.resetCart();
    this.router.navigate(['/ride']);
    this.cart.buttons = 'flex';
  }

  navigateRideDelivery(){
    this.cart.service_selected = 'cart1';
    this.cart.ride_green = false;
    this.cart.display_table = 'none';
    this.cart.resetCart();
    this.router.navigate(['/ride_delivery']);
    this.cart.buttons = 'flex';
  }

  navigateRideGreen(){
    this.cart.ride_green = true;
    this.cart.display_table = 'block';
    this.cart.service_selected = 'cart1';
    this.cart.resetCart();
    this.router.navigate(['/ride_green']);
    this.cart.buttons = 'flex';
  }
}
 