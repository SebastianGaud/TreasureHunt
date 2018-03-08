import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'g-map',
  templateUrl: './g-map.component.html',
  styles: []
})
export class GMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  @Output('marker') markerPlaced: EventEmitter<google.maps.Marker> = new EventEmitter;

  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  marker: google.maps.Marker;


  constructor() {   }

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

    this.markerPlaced.emit(this.marker);

    google.maps.event.addListener(this.map, "click", (event) => {
      this.setMarkerPosition(event.latLng);
    });
  }

  placing(): void {
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      let placeResult = this.autocomplete.getPlace();
      if (placeResult !== null) {
        this.map.setCenter(placeResult.geometry.location);
        this.setMarkerPosition(placeResult.geometry.location);
      }
    });
  }

  bindAutofocus(place): void {
    this.autocomplete = new google.maps.places.Autocomplete(place, {});
  }

  private setMarkerPosition(latLng: google.maps.LatLng){
    this.marker.setVisible(true);
    this.marker.setPosition(latLng);
    this.marker.setMap(this.map);
    this.map.panTo(latLng);
  }
}
