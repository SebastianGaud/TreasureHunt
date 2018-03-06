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

  
  constructor() { }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(44.2227398, 12.040731199999982),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  placing() : void {
    google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
      let placeResult = this.autocomplete.getPlace();
      console.log(placeResult);

      this.map.setCenter(placeResult.geometry.location);
    });
  }

  bindAutofocus(place) : void {
    this.autocomplete = new google.maps.places.Autocomplete(place, {});
  }

}
