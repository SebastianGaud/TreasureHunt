import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';


@Injectable()
export class GMapsService {
  geocoder: google.maps.Geocoder;

  constructor() { 
    this.geocoder = new google.maps.Geocoder();
  }

  public codeLatLng(coord: google.maps.LatLng) : google.maps.GeocoderResult | void{
    this.geocoder.geocode({
      location: coord
    }, 
    function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) return results[1]; 
      }
    });
  }


}
