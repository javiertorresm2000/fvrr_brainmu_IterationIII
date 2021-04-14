import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RideComponent } from './components/ride/ride.component';
import { RideAndDeliverComponent } from './components/ride-and-deliver/ride-and-deliver.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { MapComponent } from './components/map/map.component';
import { CartService } from './services/cart.service';
import { GoogleMapsModule} from '@angular/google-maps';
import { RideGreenComponent } from './components/ride-green/ride-green.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RideComponent,
    RideAndDeliverComponent,
    CartComponent,
    MapComponent,
    RideGreenComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    GooglePlaceModule,
    DragDropModule,
    FormsModule,
    routing
  ],
  providers: [CartService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
