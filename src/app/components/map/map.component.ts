import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public cartValues: any;

  center: {lat:24, lng: 12};
  zoom: 15;
  display?: google.maps.LatLngLiteral;

  constructor(private route: ActivatedRoute, private _data: CartService) {
    this.cartValues = {
      source: this._data.data.source,
      destination_address: this._data.data.destination_address,
      birthday: this._data.data.birthday,
      items: this._data.data.items
    }
    
  }
  ngOnInit(): void {
  }
}
