import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideComponent } from './components/ride/ride.component';
import { AppComponent } from './app.component';
import { RideAndDeliverComponent } from './components/ride-and-deliver/ride-and-deliver.component';
import { MapComponent } from './components/map/map.component';
import { RideGreenComponent } from './components/ride-green/ride-green.component';

const routes: Routes = [
    //{ path: '', component: AppComponent },
    { path: 'ride', component: RideComponent },
    { path: 'ride_delivery', component: RideAndDeliverComponent },
    { path: 'ride_green', component: RideGreenComponent },
    { path: 'map', component: MapComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
