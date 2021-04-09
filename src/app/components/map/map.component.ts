import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [CartService]
})
export class MapComponent implements OnInit {
  public cartValues: any;
  constructor(private _cartService: CartService) {
    this.cartValues = {
      source: '',
      destination_address: '',
      birthday: '',
      items: []
    }

    // this.cartValues.source = this.cartService.data.source;
    // this.cartValues.destination_address = this.cartService.data.destination_address;
    // this.cartValues.birthday = this.cartService.data.birthday;
    // this.cartValues.items = this.cartService.data.items;
  }
  ngOnInit(): void {
    console.log(this._cartService.data);
  }
}
