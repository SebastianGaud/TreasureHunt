import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AppState } from "../../model/app-state";
import { Store } from "@ngrx/store";
import { IMilestone } from "../../model/milestone/milestone.d";
import { MilestoneService } from "../../service/milestone/milestone.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as MilestoneAction from '../../actions/milestone.actions';
import { FirebaseMilestone } from "../../model/firebase/firebase-milestone";
import 'rxjs/add/operator/takeUntil';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: "generate-milestone",
  templateUrl: "./generate-milestone.component.html",
  styles: []
})
export class GenerateMilestoneComponent implements OnDestroy, OnInit {

  milestonesStoreSubscription: Subscription;
  milestone: FirebaseMilestone;
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.store.dispatch(new MilestoneAction.ConnectMilestoneAction());
    this.geocoder = new google.maps.Geocoder();
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
          lat: this.position == null ? this.milestone.coords.lat : this.position.lat(),
          lng: this.position == null ? this.milestone.coords.lng : this.position.lng()
        }
      };

      if (this.milestone) {
        this.milestoneService.editMilestone(FirebaseMilestone.convert(this.milestone.key, milestone));
      } else {
        this.milestoneService.saveMilestone(milestone) 
      }

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

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.milestonesStoreSubscription = this.store.select<FirebaseMilestone[]>(state => state.milestones).subscribe(m => {
        if (m.length > 0) {
          this.milestone = m.find(m => m.key == id);
          console.log(m);
          this.firstFormGroup.setValue({
            name: this.milestone.name,
            desc: this.milestone.question,
            points: this.milestone.points
          });
          this.secondFormGroup.setValue({
            hint: this.milestone.hint,
            penalityPoints: this.milestone.penalityPoints
          });
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.milestonesStoreSubscription.unsubscribe();
    this.store.dispatch(new MilestoneAction.DisconnectMilestonesAction());
  }
}
