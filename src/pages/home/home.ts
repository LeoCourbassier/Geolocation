import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: any;
  long: any;
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private localacc: LocationAccuracy,
    private geo: Geolocation
  ) 
  {
    platform.ready().then(() => {
      this.localacc.canRequest().then((canRequest: boolean) => {
        if(canRequest) {
          // the accuracy option will be ignored by iOS
          this.localacc.request(this.localacc.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {
               console.log('Request successful');
               this.geo.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
                // resp.coords.latitude
                // resp.coords.longitude
                console.log(JSON.stringify(resp));
                this.lat = resp.coords.latitude;
                this.long = resp.coords.longitude;
               }).catch((error) => {
                 console.log('Error getting location', error);
                 console.log(JSON.stringify(error));
                 this.lat = 'Error';
                 this.long = JSON.stringify(error);
               });
            },
            error => console.log('Error requesting location permissions', error)
          );
        }
      });
    });
  }

}
