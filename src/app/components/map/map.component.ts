import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CartService } from '../../services/cart.service';


declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public cartValues: any;
  modalDisplay = 'none';

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // parque simon bolivar
  public origin = { lat: 4.658383846282959, lng: -74.09394073486328 };
  // Parque la 93
  public destination = { lat: 4.676802158355713, lng: -74.04825592041016 };

  center: { lat: 24, lng: 12 };
  zoom: 15;
  display?: google.maps.LatLngLiteral;
  options = {};
  mode = 'DRIVING';

  constructor(private route: ActivatedRoute, private _data: CartService, private router: Router) {
    this.origin.lat = this._data.data.origin.lat;
    this.origin.lng = this._data.data.origin.lng;
    this.destination.lat = this._data.data.destination.lat;
    this.destination.lng = this._data.data.destination.lng;
    
    this.cartValues = {
      source: this._data.data.source,
      destination_address: this._data.data.destination_address,
      birthday: this._data.data.birthday,
      items: this._data.data.items,
      origin: this.origin,
      destination: this.destination
    }

  }
  ngOnInit(): void {
    this.loadMap();
    console.log(this.cartValues)
    console.log(google.maps.TravelMode.DRIVING);
  }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  public handleOriginChange(address: Address) {
    
    this.origin.lat = address.geometry.location.lat();
    this.origin.lng = address.geometry.location.lng();
  }

  public handleDestinationChange(address: Address) {
    this.destination.lat = address.geometry.location.lat();
    this.destination.lng = address.geometry.location.lng();
  }

  modeChanged(e){
    this.mode = e.target.value;
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });
  
    this.directionsDisplay.setMap(this.map);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: this.mode,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  finishOrder(){
    this.modalDisplay = 'block';
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  acceptInvoice(){
    this.router.navigate(['/']);
    this.closeModal();
  }
}
