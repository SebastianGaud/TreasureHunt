import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { } from '@types/googlemaps';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import { ADD_MILESTONE, AddMilestoneAction } from '../../actions/milestone.actions';
import { Milestone } from '../../model/milestone/milestone';


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
  firstFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    points: new FormControl('', [Validators.required, Validators.min(1)])
  });
  secondFormGroup = new FormGroup({
    hint: new FormControl('', Validators.required),
    penalityPoints: new FormControl('', [Validators.required, Validators.min(1)])

  });

  constructor(
    private cf: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.geocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
  }

  protected submit() {
    this.firstFormGroup.updateValueAndValidity();
    this.secondFormGroup.updateValueAndValidity();
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      let milestone: Milestone = {
        name: this.firstFormGroup.get('name').value,
        question: this.firstFormGroup.get('desc').value,
        points: this.firstFormGroup.get('points').value,
        hint: this.secondFormGroup.get('hint').value,
        penalityPoints: this.secondFormGroup.get('penalityPoints').value,
        hintOpened: false,
        opened: false,
        id: null 
      }
      this.store.dispatch(new AddMilestoneAction(milestone));
    }
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
  }
}
