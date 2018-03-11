import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AppState } from "../../model/app-state";
import { Store } from "@ngrx/store";
import { IMilestone } from "../../model/milestone/milestone.d";
import { MilestoneService } from "../../service/milestone/milestone.service";
import { Router } from "@angular/router";


@Component({
  selector: "generate-milestone",
  templateUrl: "./generate-milestone.component.html",
  styles: []
})
export class GenerateMilestoneComponent implements OnInit {

  geocoder: google.maps.Geocoder;
  address: string = "";
  position: google.maps.LatLng;
  isLinear = false;
  firstFormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
    points: new FormControl("", [Validators.required, Validators.min(1)])
  });
  secondFormGroup = new FormGroup({
    hint: new FormControl("", Validators.required),
    penalityPoints: new FormControl("", [Validators.required, Validators.min(1)])

  });

  constructor(
    private cf: ChangeDetectorRef,
    private store: Store<AppState>,
    private milestoneService: MilestoneService,
    private router: Router
  ) {
    this.geocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
  }

  submit() {
    this.firstFormGroup.updateValueAndValidity();
    this.secondFormGroup.updateValueAndValidity();
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      let milestone: IMilestone = {
        name: this.firstFormGroup.get("name").value,
        question: this.firstFormGroup.get("desc").value,
        points: this.firstFormGroup.get("points").value,
        hint: this.secondFormGroup.get("hint").value,
        penalityPoints: this.secondFormGroup.get("penalityPoints").value,
        hintOpened: false,
        opened: false,
        coords: {
          lat: this.position.lat(),
          lng: this.position.lng()
        }
      };

      this.milestoneService.saveMilestone(milestone);
      this.router.navigate(["backend"]);
    }
  }

  onMarkerPlaced($event) {
    this.position = $event.position;
    this.decodeCoords(this.position);
  }

  private decodeCoords(coords: google.maps.LatLng) {
    this.geocoder.geocode({
      location: coords
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.address = results[0].formatted_address;
        }
      }
    });
  }
}
