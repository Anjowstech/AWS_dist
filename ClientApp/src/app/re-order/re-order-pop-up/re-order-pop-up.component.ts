import { Component, OnInit ,Inject} from '@angular/core';
import { DataShareServiceService } from 'src/app/data-share-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-re-order-pop-up',
  templateUrl: './re-order-pop-up.component.html',
  styleUrls: ['./re-order-pop-up.component.css']
})
export class ReOrderPopUpComponent implements OnInit {
  PONo: any="";
  ProductName: any="";
  Qty: any="";
  Cost: any="";
  Location: any="";
  Name: any="";
  ContactNo: any="";

  LocationList = [{ location: "India" }, { location: "USA" }, { location: "Moracco" }, { location: "Brazil" }, { location: "Mexico" }, { location: "Germany" }, { location: "Spain" },];

  NameList = [{ Name: "Sahil Gupta" }, { Name: "Bijit Sharma" }, { Name: "Mandar Tilak" }, { Name: "Saneesh Thomas" }, { Name: "Jessica garcia" }, { Name: "Joseph" }, { Name: "Fatima" },];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  Confirm() {
    this.router.navigate(['/main/OrderManagement']);
  }

  ChangeLocation(event:any) {
    this.Location = event.target.value;
  }
  ChangeName(event: any) {
    this.Name = event.target.value;
  }

  ngOnInit() {

    var AWSWorkFlowData: any = this.data.displaydata

    this.PONo = AWSWorkFlowData[0].PurOrderNo;
    this.ProductName = AWSWorkFlowData[0].TaskName;
    this.Cost = this.data.displaydata[1];
    this.Qty = AWSWorkFlowData[0].SelectedQty;
    this.Location = AWSWorkFlowData[0].Location;
    this.Name = AWSWorkFlowData[0].Name;
    this.ContactNo = AWSWorkFlowData[0].ContactNo;

  }

}
