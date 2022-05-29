import { Component, OnInit } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { ApiService } from "../_services/api.service";
import { CommonService } from "../_services/common.service";

@Component({
  selector: "app-trip-status",
  templateUrl: "./trip-status.page.html",
  styleUrls: ["./trip-status.page.scss"],
})
export class TripStatusPage implements OnInit {
  tripDetails: any = [];
  tripStatus: any = [];
  loadDocuments: any = [];
  skeleton: any = [];

  constructor(private api: ApiService, public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.tripDetails =
          this.common.router.getCurrentNavigation().extras.state.trip;
        console.log("tripDetails:", this.tripDetails);
      }
    });
  }

  ngOnInit() {
    this.getTripsStatus();
    this.skeleton.length = 6;
  }

  getTripsStatus() {
    const params = {
      id: this.tripDetails?.SubSystemLoadId,
    };
    this.api.getRequest("Mobile/GetSubLoadDetail/" + params?.id ).subscribe(
      (res: any) => {
        console.log("Res:", res);
        if (res?.message === "Success") {
          this.loadDocuments = res?.model?.lstSubSystemloaduploadModel;
          this.tripStatus = res?.model?.lstSubsystemstatustrackModel;
        } else {
          console.log("No data");
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  gotoPage(page: string) {
        const navigationExtras: NavigationExtras = {
      state: {
        trip: this.tripDetails,
        documents: this.loadDocuments
      }
    };
    this.common.router.navigate([page], navigationExtras);
  }
}
