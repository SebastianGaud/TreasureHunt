import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { } from '@types/googlemaps';


@Component({
  selector: 'generate-milestone',
  templateUrl: './generate-milestone.component.html',
  styles: []
})
export class GenerateMilestoneComponent implements OnInit {

  geocoder: google.maps.Geocoder;
  address: string = "";
  position: google.maps.LatLng;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private cf: ChangeDetectorRef
  ) {
    this.geocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  protected onMarkerPlaced($event) {
    this.position = $event.position;
    this.decodeCoords(this.position);
  }

  private decodeCoords(coords: google.maps.LatLng) {
    this.geocoder.geocode({
      location: coords
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) 
          this.address = results[0].formatted_address;
      }
    });

    this.cf.detectChanges();
  }
}
