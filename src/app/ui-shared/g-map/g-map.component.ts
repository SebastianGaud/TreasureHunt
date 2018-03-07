import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'g-map',
  templateUrl: './g-map.component.html',
  styles: []
})
export class GMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;


  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  marker: google.maps.Marker;
  geocoder: google.maps.Geocoder;


  constructor() {
    this.geocoder = new google.maps.Geocoder();
   }

  ngOnInit() {
    let initialLocation = new google.maps.LatLng(44.2227398, 12.040731199999982);

    var mapProp = {
      center: initialLocation,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
      position: initialLocation,
      map: this.map,
      visible: false
    });

    google.maps.event.addListener(this.map, "click", (event) => {
      this.addMarker(event.latLAng);
    });
  }

  placing(): void {
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      let placeResult = this.autocomplete.getPlace();
      if (placeResult !== null) {
        this.map.setCenter(placeResult.geometry.location);
        this.addMarker(placeResult.geometry.location);
      }
    });
  }

  bindAutofocus(place): void {
    this.autocomplete = new google.maps.places.Autocomplete(place, {});
  }

  private addMarker(latLAng: google.maps.LatLng){
    this.marker.setVisible(true);
    this.marker.setPosition(latLAng);
    this.marker.setMap(this.map);
    this.map.panTo(latLAng);
  }

  private codeLatLng(coord: google.maps.LatLng) : google.maps.GeocoderResult | void{
    this.geocoder.geocode({
      location: coord
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          return results[1];
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }

}
