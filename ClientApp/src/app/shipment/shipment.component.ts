import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { ShipmentService } from 'src/app/shipment/service/shipment.service';
import { Observable } from 'rxjs';
/*import { MatSnackBar } from '@angular/material/snack-bar';*/
import { AzureBlobStorageService } from 'src/app/azure-blob-storage.service';

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
  Estimateddeliverytime: any;
  product: any;
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
  shipmentselecteddetails: any = [];
  listshipmentpost: shipmentpost[] = [];

  uploadfilename: any ="";
  fileToUpload: any;
  input: any | undefined;
  TaskID: any;
  Brand: any;
  Category: any;
  filedrop: boolean = false
  fileshow:boolean =true
  constructor(public dialog: MatDialog, private http: HttpClient, private service: ShipmentService,/* private _snackBar: MatSnackBar*/private blobService: AzureBlobStorageService,) {
  
  


  }


  openSnackBar(message: string, action: string, ) {
    //this._snackBar.open(message, action,{
    //  duration: 2000,
    //  verticalPosition: 'top',
    //  horizontalPosition: 'center',
    //})
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
    this.uploadfilename = rowvalue.Uploadfile
    
    if (this.uploadfilename == "" || this.uploadfilename == null || this.uploadfilename == undefined) {
      this.filedrop = false
      this.fileshow = true
    }
    else {
      this.filedrop = true
      this.fileshow = false
    }
    //this.input = document.getElementById("shipfile");
    //this.input.value = this.uploadfilename
    if (this.Status == "" || this.Status == null || this.Status == undefined) {
      this.Status = rowvalue.Status
    }
    else {
      this.Status = this.Status
      
      this.Statusselected = "selectedstatus"
    }

    console.log(this.Status)
    this.Brand = rowvalue.Brand;
    this.product = rowvalue.Product;
    this.Description = rowvalue.Description
    this.Category = rowvalue.Category

    this.shipmentselecteddetails = [rowvalue.TaskName, rowvalue.OrderId, rowvalue.TaskID, rowvalue.Product, rowvalue.ShipmentId, rowvalue.Category, rowvalue.Status, rowvalue.BrandID, rowvalue.CategoryID, rowvalue.ProductID, rowvalue.SupplierID, rowvalue.
      AssignedTo
];
  }



  shipmentstatusloaddata() {
    var query: string = "SELECT StatusDescription as [Status] from [AWS].[tbl_Status] where StatusType='Shipment'";
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
  handleDateChange(event: any) {
    console.log('Selected date:', event.target.value);
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
    var query: string = "[AWS].[Sp_Select_ShipmentTaskList]";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1, })
    //var query: string = "SELECT OrderId ,[Shipment Id] ShipmentId,FORMAT (cast ([Estimated delivery time]  as DateTime), 'dd-MM-yy') as EstimatedDeliverytime, TrackingId, [Task Name]  Taskname,[Upload file] Uploadfile,* from AWS.tbl_shipment_details";
    //var connection: string = "";
    //let params1 = new HttpParams().set('connection', connection).set('spname', query);
    //return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }


  //submit shipment


  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files[0];
    this.uploadfilename = files[0].name;
    
    console.log(this.fileToUpload, this.uploadfilename)
  }


  submitclick() {
    console.log(this.uploadfilename, this.filedrop, this.fileshow)
    if (this.uploadfilename == "" || this.uploadfilename == null || this.uploadfilename == undefined ||
      this.fileshow == false) {


      if (this.uploadfilename == "" || this.uploadfilename == null || this.uploadfilename == undefined) {
        this.uploadfilename =" "
      }

      this.shipmentdetails[0] = ([{
        TaskID: this.shipmentselecteddetails[2],
        OrderId: this.shipmentselecteddetails[1],
        TaskName: this.shipmentselecteddetails[0],
        Estimateddeliverytime: this.Estimateddeliverytime,
        Location: "",
        Status: this.Status,
        Description: this.Description,
        Blobpath: "",
        Uploadfile: this.uploadfilename,
        TrackingId: this.shipmentselecteddetails[2],
        SupplierID: this.shipmentselecteddetails[10],
        ProductID: this.shipmentselecteddetails[9],
        BrandID: this.shipmentselecteddetails[7],
        CategoryID: this.shipmentselecteddetails[8],
        AssignedTo: this.shipmentselecteddetails[11],
        Comments: "",
      }]);
      var JSONFileparams: string = JSON.stringify(this.shipmentdetails);
      console.log(JSONFileparams)
      var spname: string = "[AWS].[sp_update_shipmentdetails]";

      const genericspdata = {
        JSONFileparams: JSONFileparams,
        spname: spname
      }
      console.log(genericspdata)
      this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC', genericspdata, { responseType: 'text' })
        .subscribe(
          (response) => {
            console.log('Data inserted successfully:', response);
            this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Shipment submitted successfully." } });

          },
          (error) => {
            console.error('Error inserting data:', error);
            if (error && error.error && error.error.errors) {
              const validationErrors = error.error.errors;
              console.log('Validation errors:', validationErrors);
            }
          }
        );
   
    }
    else {
    
      this.blobService.updateshipmentupload(this.fileToUpload, this.uploadfilename, this.shipmentselecteddetails[2], this.shipmentselecteddetails[1], this.shipmentselecteddetails[0], this.Estimateddeliverytime, "", this.Status, this.Description, this.shipmentselecteddetails[10], this.shipmentselecteddetails[9], this.shipmentselecteddetails[7], this.shipmentselecteddetails[8], this.shipmentselecteddetails[11], "",() => {
        this.shipmentloaddata().subscribe((shipmentloaddata) => {
          console.warn("shipmentloaddata", shipmentloaddata)
          this.ShipmentList = shipmentloaddata
        })

        this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Shipment submitted successfully." } });


      })
    }

    
  }
  //submitclick() {
  //  const shipment = {
  //    ShipmentId: this.shipmentselecteddetails[4],
  //    OrderId: this.shipmentselecteddetails[1],
  //    TrackingId: this.shipmentselecteddetails[2],
  //    TaskName: this.shipmentselecteddetails[0],
  //    EstimatedDeliveryTime: this.shipmentselecteddetails[3],
  //    Location: this.shipmentselecteddetails[5],
  //    Status: this.Status,
  //    Description: this.Description,
  //    BlobPath: "",
  //    UploadFile: "",
  //  };
  //  this.handleFileInput(this.shipmentselecteddetails[4], this.shipmentselecteddetails[1], this.shipmentselecteddetails[2], this.shipmentselecteddetails[0], this.shipmentselecteddetails[3], this.shipmentselecteddetails[5], this.Status, this.Description, () => {

  //  })
  //}
  



 
  
  //submitclick(): Observable<string> {
  //  this.shipmentdetails[0] = ([{
  //    ShipmentId: this.shipmentselecteddetails[4],
  //    OrderId: this.shipmentselecteddetails[1],
  //    TrackingId: this.shipmentselecteddetails[2],
  //    TaskName: this.shipmentselecteddetails[0],
  //    EstimatedDeliveryTime: this.shipmentselecteddetails[3],
  //    Location: this.shipmentselecteddetails[5],
  //    Status: "InTransit",
  //    Description: this.Description,
  //    BlobPath: "",
  //    UploadFile: "",
  //  }]);
  //  var JSONFileparams: string = JSON.stringify(this.shipmentdetails);
  //  console.log(JSONFileparams)
  //  var spname: string = "[AWS].[sp_shipment_details]";

  //  let params1 = new HttpParams().set('JSONFileparams', JSONFileparams).set('spname', spname);
  //  console.log(params1)
  //  //let headers = new HttpHeaders();
  //  //headers = headers.append(jsonprams, spsname);
  //  //console.log(headers)
  //  //let fd = new FormData();
  //  //fd.set('JSONFileparams', jsonprams),
  //  //fd.set('spname', spsname)
  //  //console.log(fd)
  //  var result = this.http.post<string>('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC', { params:params1,responseType:'text'})
  //  //console.log(result)
    
  //  result.subscribe(
  //      (response) => {
  //        console.log('Data inserted successfully:', response);
  //        //this.openSnackBar('Supplier created successfully');
  //      },
  //      (error) => {
  //        console.error('Error inserting data:', error);
  //        if (error && error.error && error.error.errors) {
  //          const validationErrors = error.error.errors;
  //          console.log('Validation errors:', validationErrors);
  //        }
  //        //this.openSnackBar('Failed to create supplier');
  //      }
  //  );

  //  return result
  //  //console.log(this.shipmentselecteddetails)
  //  //this.shipmentdetails[0] = ([{
  //  //  ShipmentId: this.shipmentselecteddetails[4],
  //  //  OrderId: this.shipmentselecteddetails[1],
  //  //  TrackingId: this.shipmentselecteddetails[2],
  //  //  TaskName: this.shipmentselecteddetails[0],
  //  //  EstimatedDeliveryTime: this.shipmentselecteddetails[3],
  //  //  Location: this.shipmentselecteddetails[5],
  //  //  Status: this.Status,
  //  //  Description: this.Description,
  //  //  BlobPath: "",
  //  //  UploadFile: "",
     

  //  //}])



  //  //var jsonprams: any = JSON.stringify(this.shipmentdetails);
  //  //console.log(this.shipmentdetails)
  //  //var spsname = "[AWS].[sp_shipment_details]";
  //  //var Connection = "";
  //  //var data = { JSONFileparams, spname };
  //  //this.service.postData(data).subscribe(
  //  //  data => {

  //  //  }
          
         
  //  //);
  //  //console.log(data)
  //  //var jsonprams: any = JSON.stringify(this.shipmentdetails);
  //  //console.log(this.shipmentdetails)
  //  //var spsname = "[AWS].[sp_shipment_details]";
  //  //this.submitshipmentdetails(jsonprams, spsname).subscribe(response => {

  //  //  //this.listshipmentpost = response
  //  //  //console.warn("response", response)
  //  //  //this.datasubmitshipmentdetails = response


  //  //  //if (this.datasubmitshipmentdetails == "success") {


  //  //  //  this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Shipment saved sucessfully." } });

  //  //  //}
  //  //});
  //}

   
 

  ngOnInit() {


    this.shipmentstatusloaddata().subscribe((shipmentstatusloaddata) => {
      console.warn("shipmentstatusloaddata", shipmentstatusloaddata)
      this.loadshipmentstatusloaddata = shipmentstatusloaddata
    })



    this.shipmentloaddata().subscribe((shipmentloaddata) => {
      console.warn("shipmentloaddata", shipmentloaddata)
      this.ShipmentList = shipmentloaddata
    })
    
  }

}
export class shipmentpost {
  ShipmentId: string = "";
  OrderId: string = "";
  TrackingId: string = "";
  TaskName: string = "";
  EstimatedDeliveryTime: string = "";
  Location: string = "";
  Status: string = "";
  Description: string = "";
  BlobPath: string = "";
  UploadFile: string="";
}
