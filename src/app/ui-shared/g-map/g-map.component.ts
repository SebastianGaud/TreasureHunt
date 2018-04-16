import { Component, EventEmitter, OnInit, Output, ViewChild, Input, AfterViewInit } from "@angular/core";
import { } from "@types/googlemaps";
import { MatSnackBar } from "@angular/material";


@Component({
  selector: "g-map",
  templateUrl: "./g-map.component.html",
  styles: []
})
export class GMapComponent implements OnInit, AfterViewInit {


  @ViewChild("gmap") gmapElement: any;
  @Input("initial-location") initialLocation: google.maps.LatLng;
  @Output("markerPlaced") markerPlaced: EventEmitter<google.maps.Marker> = new EventEmitter;


  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  marker: google.maps.Marker;


  constructor(
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    let initialLocation = this.initialLocation || new google.maps.LatLng(44.644675, 10.920186);

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
      this.setMarkerPosition(event.latLng);
    });
  }

  ngAfterViewInit(): void {
    this.initialLocation ? this.geocodeLatLng() : null;
  }

  placing(): void {
    google.maps.event.addListener(this.autocomplete, "place_changed", () => {
      let placeResult = this.autocomplete.getPlace();
      if (placeResult != null && placeResult.geometry != null) {
        this.map.setCenter(placeResult.geometry.location);
        this.setMarkerPosition(placeResult.geometry.location);
      } else {
        this.snack.open('Un problema con il luogo ha impedito la creazione del pin, accertarti di selezionare il luogo dalla lista, oppure sceglierlo direttamente dalla mappa', 'Chiudi', {
          duration: 10000
        })
      }
    });
  }

  bindAutofocus(place): void {
    this.autocomplete = new google.maps.places.Autocomplete(place, {});
  }

  private setMarkerPosition(latLng: google.maps.LatLng) {
    this.marker.setVisible(true);
    this.marker.setPosition(latLng);
    this.marker.setMap(this.map);
    this.map.panTo(latLng);
    this.markerPlaced.emit(this.marker);
  }

  private geocodeLatLng() {
    let geocoder = new google.maps.Geocoder;
    var latlng = this.initialLocation;
    geocoder.geocode({
      'location': latlng
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map.setZoom(17);
        if (results[0]) {
          this.marker = new google.maps.Marker({
            position: latlng,
            map: this.map
          });
        } else {
          this.snack.open('Non sono stati trovati risultati in base alla coordinate', 'Close', {
            duration: 5000
          })
        }
      } else {
        this.snack.open('Non sono riusco a localizzare le coordinate perchè: ' + status, 'Close', {
          duration: 5000
        })
      }
    });
  }
}
