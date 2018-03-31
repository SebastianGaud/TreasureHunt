import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { } from "@types/googlemaps";
import { MatSnackBar } from "@angular/material";


@Component({
  selector: "g-map",
  templateUrl: "./g-map.component.html",
  styles: []
})
export class GMapComponent implements OnInit {

  @ViewChild("gmap") gmapElement: any;
  @Output("markerPlaced") markerPlaced: EventEmitter<google.maps.Marker> = new EventEmitter;

  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  marker: google.maps.Marker;


  constructor(
    private snack: MatSnackBar
  ) {   }

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
      this.setMarkerPosition(event.latLng);
    });
  }

  placing(): void {
    google.maps.event.addListener(this.autocomplete, "place_changed", () => {
      let placeResult = this.autocomplete.getPlace();
      if (placeResult != null && placeResult.geometry != null) {
        this.map.setCenter(placeResult.geometry.location);
        this.setMarkerPosition(placeResult.geometry.location);
      }else {
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
}
