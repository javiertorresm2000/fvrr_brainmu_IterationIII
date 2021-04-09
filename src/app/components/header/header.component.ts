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
    console.log("ME ÑLAM PEKLLA");
    this.cart.resetCart();
    this.router.navigate(['/ride']);
  }

  navigateRideDelivery(){
    console.log("ME ÑLAM PEKLLA");
    this.cart.resetCart();
    this.router.navigate(['/ride_delivery']);
  }
}
 