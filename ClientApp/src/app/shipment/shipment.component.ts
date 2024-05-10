import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { ShipmentService } from 'src/app/shipment/service/shipment.service';


@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css'],
  providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }, ShipmentService]
})
export class ShipmentComponent implements OnInit {
  
  ShipmentList: any = []
  todaydate = new Date().toISOString().split('T')[0];
  taskname: any;
  oderID: any;
  Status: any;
  EstimatedDeliverytime: any;
  TrackingID: any;
  selectedstatus: any;
  trackinghid: boolean = true
  Statusselected: any;
  results: any;
  rowClicked: any;
  statusClicked: any;
  loadshipmentstatusloaddata: any;
  hidstatus: boolean = false
  shipmentdetails: any = []
  ShipmentId: any;
  Description: any;
  datasubmitshipmentdetails: any;
  shipmentselecteddetails: any = []
  constructor(public dialog: MatDialog, private http: HttpClient, private service: ShipmentService) {



  }




  //To highlight the row clicked in dropdown
  changestatus(event: any, index: any) {
    this.trackinghid = false
    var selectedStatus = event.target.value
    this.Status = selectedStatus

    if (this.statusClicked === index) this.statusClicked = -1;
    else this.statusClicked = index;
  }

  //To set value for tracking graph
  Trackingshipment(rowvalue: any) {
    this.trackinghid = false
    this.taskname = rowvalue.TaskName;
    this.oderID = rowvalue.OrderId;
    if (this.Status == "" || this.Status == null || this.Status == undefined) {
    }
    else {
      this.Status = this.Status
      this.Statusselected = "selectedstatus"
    }
    this.TrackingID = rowvalue.TrackingId;
    this.EstimatedDeliverytime = rowvalue.EstimatedDeliverytime;

    this.shipmentselecteddetails = [rowvalue.Taskname, rowvalue.OrderId, rowvalue.TrackingId, rowvalue.EstimatedDeliverytime, rowvalue.ShipmentId, rowvalue.Location, rowvalue.Status];
  }



  shipmentstatusloaddata() {
    var query: string = "SELECT StatusDescription as [Status] from [AWS].[tbl_Status] where StatusType='Shipment Status'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }

  //to hide the table status (to avoid repeating the status twice)
  hidtablestatus() {
    this.hidstatus = true
  }

  //upload data

  placeholderText: string = 'Custom Placeholder';
  showDatePickerFlag: boolean = false;


  openDatePicker() {
    this.showDatePickerFlag = !this.showDatePickerFlag; // Toggle the visibility of the date picker
  }

  handleDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.uploadFiles(files);
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.uploadFiles(files);
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Here you can implement your logic to upload each file
      console.log('Uploading file:', file);
    }
  }



  //Shipment grid load
  shipmentloaddata() {
    var query: string = "SELECT OrderId ,[Shipment Id] ShipmentId,FORMAT (cast ([Estimated delivery time]  as DateTime), 'dd-MM-yy') as EstimatedDeliverytime, TrackingId, [Task Name]  Taskname,* from aws.shipment_details";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }


  //submit shipment

  submitshipmentdetails(Connection:any,jsonprams: any, spsname: any) {

    const headers: any = new HttpHeaders({
      jsonprams
    });

    console.log(jsonprams, spsname)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC', spsname, { headers });
  }

 
  
  submitclick() {
    console.log(this.shipmentselecteddetails)
    this.shipmentdetails[0] = ([{
      ShipmentId: this.shipmentselecteddetails[4],
      OrderId: this.shipmentselecteddetails[1],
      TrackingId: this.shipmentselecteddetails[2],
      TaskName: this.shipmentselecteddetails[0],
      EstimatedDeliveryTime: this.shipmentselecteddetails[3],
      Location: this.shipmentselecteddetails[5],
      Status: this.Status,
      Description: this.Description,
      BlobPath: "",
      UploadFile: "",
     

    }])



    var jsonprams: any = JSON.stringify(this.shipmentdetails);
    console.log(this.shipmentdetails)
    var spsname = "[AWS].[sp_shipment_details]";
    var Connection = "";
    var data = { jsonprams, spsname };
    this.service.postData(Connection,jsonprams, spsname).subscribe(
      (response: any) => {
        console.log('Response:', response);
      },
      (error: any) => {
        console.error('Error:', error);
      });
    console.log(this.shipmentdetails)
    //var jsonprams: any = JSON.stringify(this.shipmentdetails);
    //console.log(this.shipmentdetails)
    //var spsname = "[AWS].[sp_shipment_details]";
    //this.submitshipmentdetails(jsonprams, spsname).subscribe(response => {
    //  console.warn("response", response)
    //  this.datasubmitshipmentdetails = response


    //  if (this.datasubmitshipmentdetails == "success") {


    //    this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Shipment saved sucessfully." } });

    //  }
    //});
  }

   
 

  ngOnInit() {


    this.shipmentstatusloaddata().subscribe((shipmentstatusloaddata) => {
      console.warn("shipmentstatusloaddata", shipmentstatusloaddata)
      this.loadshipmentstatusloaddata = shipmentstatusloaddata
    })



    this.shipmentloaddata().subscribe((shipmentloaddata) => {
      console.warn("shipmentloaddata", shipmentloaddata)
      this.ShipmentList = shipmentloaddata
    })
    //    this.ShipmentList = [{ OrderID: "OD75649641", TrackingID: "TD123", TaskName: "Sweets and Salty Savoury", EstimatedDeliverytime: "18/4/2024 ", Location: "India", Sku: "P001", Status: "Ready for shipment" },
    //      { OrderID: "OD75649652", TrackingID: "TD124", TaskName: "Tea", Supplier: "Chocovic", EstimatedDeliverytime: "19/4/2024 ", Location: "USA", Sku: "P002", Status: "Left from warehouse" },
    //      {
    //        OrderID: "OD75649763", TrackingID: "TD125", TaskName: "Dates", Supplier: "Chocovic", EstimatedDeliverytime: "20/4/2024 ", Location: "Moracco", Sku: "P003", Status: "In Transit" },
    //      { OrderID: "OD756434274", TrackingID: "TD145", TaskName: "Coffee", Supplier: "Chocovic", EstimatedDeliverytime: "21/4/2024 ", Location: "Brazil", Sku: "P004", Status: "Delivered to warehouse" },
    //      {
    //        OrderID: "OD756494323", TrackingID: "TD156", TaskName: "Jam", Supplier: "Chocovic", EstimatedDeliverytime: "20/4/2024 ", Location: "Moracco", Sku: "P005", Status: "In Transit"
    //      },
    //      { OrderID: "OD75649674", TrackingID: "TD126", TaskName: "Nuts", Supplier: "Chocovic", EstimatedDeliverytime: "30/4/2024 ", Location: "Brazil", Sku: "P006", Status: "Delivered to warehouse" },
    //      { OrderID: "OD75649685", TrackingID: "TD127", TaskName: "Syrups", Supplier: "Chocovic", EstimatedDeliverytime: "25/4/2024 ", Location: "Mexico", Sku: "P007", Status: "Failed Attempt" }, { OrderID: "OD75649641", TrackingID: "TD123", TaskName: "Sweets and Salty Savoury", EstimatedDeliverytime: "18/4/2024 ", Location: "India", Sku: "P001", Status: "Ready for shipment" },
    //      { OrderID: "OD75649652", TrackingID: "TD124", TaskName: "Tea", Supplier: "Chocovic", EstimatedDeliverytime: "19/4/2024 ", Location: "USA", Sku: "P002", Status: "Left from warehouse" },
    //{
    //  OrderID: "OD75649763", TrackingID: "TD125", TaskName: "Dates", Supplier: "Chocovic", EstimatedDeliverytime: "20/4/2024 ", Location: "Moracco", Sku: "P003", Status: "In Transit"
    //},
    //{ OrderID: "OD756434274", TrackingID: "TD145", TaskName: "Coffee", Supplier: "Chocovic", EstimatedDeliverytime: "21/4/2024 ", Location: "Brazil", Sku: "P004", Status: "Delivered to warehouse" },
    //{
    //  OrderID: "OD756494323", TrackingID: "TD156", TaskName: "Jam", Supplier: "Chocovic", EstimatedDeliverytime: "20/4/2024 ", Location: "Moracco", Sku: "P005", Status: "In Transit"
    //},
    //{ OrderID: "OD75649674", TrackingID: "TD126", TaskName: "Nuts", Supplier: "Chocovic", EstimatedDeliverytime: "30/4/2024 ", Location: "Brazil", Sku: "P006", Status: "Delivered to warehouse" },
    //{ OrderID: "OD75649685", TrackingID: "TD127", TaskName: "Syrups", Supplier: "Chocovic", EstimatedDeliverytime: "25/4/2024 ", Location: "Mexico", Sku: "P007", Status: "Failed Attempt" }
    //  ];
  }

}
