import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.page.html',
  styleUrls: ['./document-details.page.scss'],
})
export class DocumentDetailsPage implements OnInit {
  tripDetails: any = [];
  allDocuments: any = [];
  docFile: any = [];

  constructor(public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.tripDetails =
          this.common.router.getCurrentNavigation().extras.state.trip;
          this.allDocuments =
          this.common.router.getCurrentNavigation().extras.state.documents;
        console.log("tripDetails:", this.tripDetails);
        console.log("allDocuments:", this.allDocuments);
      }
    });
   }

  ngOnInit() {}

  openFile(file) {
    console.log('file:',file);
    this.docFile = file;
  }

}
