import { Component, OnInit,Inject } from '@angular/core';
import { DataShareServiceService } from 'src/app/data-share-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AzureBlobStorageService } from 'src/app/azure-blob-storage.service';

@Component({
  selector: 'app-order-status-update',
  templateUrl: './order-status-update.component.html',
  styleUrls: ['./order-status-update.component.css'],
  providers: [DatePipe]
})
export class OrderStatusUpdateComponent implements OnInit {

  OrderID: any="";
  Description: any = "";
  Status: any = "";
  Department: any = "";
  Images: any = "";

  PurOrdNo: any = "";
  PurOrdDate: any = "";

  //StatusList = [{ Status: "Branding Completed" }, { Status: "Order Completed" }, { Status: "Clearence InProgress" }, { Status: "Reached Warehouse" }, { Status: "Clearence Completed" }];

  //OrderManagementhistory = [
  //  { ProductTask: "Clearence InProgress", TaskName: "Clearence", OnDate: "13/04/24", ByUser: "Sharaz", ProdcutDescription: "Product Clearence is InProgress" },
  //  { ProductTask: "Order Completed", TaskName: "Ordered", OnDate: "12/04/24", ByUser: "Afrat", ProdcutDescription: "Product order is completed" },
  //  { ProductTask: "Branding Completed", TaskName: "Productized", OnDate: "11/04/24", ByUser: "Shekar", ProdcutDescription: "Product is productized" },
  //  { ProductTask: "Product Approved", TaskName: "Approved", OnDate: "10/04/24", ByUser: "Praveen", ProdcutDescription: "Product is approved" },

  //];

 // StatusList = [ { Status: "Inventory Check" }, { Status: "Order Assembly" }, { Status: "Quality Check" }, { Status: "Packing" }, { Status: "Order Documentation" }, { Status: "Order Batch Processing" }, { Status: "Order Verification and Final Checks" }];

  Quantity: any = "";

  customer_id: any = "";
  Location: any = "";
  order_date: any = "";
  total_amount: any = "";
  shipping_address: any = "";
  Updatedby: any = "";

  InvoiceNo: any = "";
  InvoiceDt: any = "";

  TaskID: any = "";
  SupplierID: any = "";
  ProductID: any = "";
  BrandID: any = "";
  CategoryID: any = "";
  AssignedTo: any = "";
  TaskDescription: any = "";


  OrderManagementhistory = [
    { ProductTask: "Order Verification and Final Checks", TaskName: "Approved", OnDate: "17/04/24", ByUser: "Praveen", ProdcutDescription: "Order Verification and Final Checks are inprogress by our team." },
    { ProductTask: "Order Batch Processing", TaskName: "Approved", OnDate: "16/04/24", ByUser: "Afrat", ProdcutDescription: "Order Batch Processing is done." },
    { ProductTask: "Order Documentation", TaskName: "Approved", OnDate: "14/04/24", ByUser: "Shekar", ProdcutDescription: "Order Documentation is completed ,please check." },
    { ProductTask: "Packing", TaskName: "Approved", OnDate: "13/04/24", ByUser: "Praveen", ProdcutDescription: "Packing of the order is completed." },
    { ProductTask: "Quality Check", TaskName: "Productized", OnDate: "12/04/24", ByUser: "Shekar", ProdcutDescription: "Quality Check of the Product is completed." },
    { ProductTask: "Order Assembly", TaskName: "Ordered", OnDate: "11/04/24", ByUser: "Afrat", ProdcutDescription: "Order Assembly is completed." },
    { ProductTask: "Inventory Check", TaskName: "Clearence", OnDate: "10/04/24", ByUser: "Sharaz", ProdcutDescription: "Inventory Check is completed." },
    { ProductTask: "Branding Completed", TaskName: "Clearence", OnDate: "9/04/24", ByUser: "Afrat", ProdcutDescription: "Branding Completed ,kindly start with next steps." },

  ];

  OrderFiles: any="";
  Productname: any = "";
  ReOrderhistorydata: any = "";
  FileUpload: any;
  StatusListData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public datepipe: DatePipe, public dialogRef: MatDialog, private http: HttpClient, private blobService: AzureBlobStorageService) {}


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

    this.OrderFiles = files[0].name;
    this.FileUpload = files[0];
  }


  OrderSubmit() {
    //this.dialogRef.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Updated Successfully' } });
    // this.dialogRef.closeAll();




    var Description = this.Description;
    var customer_id = this.customer_id;
    var Location = this.Location;
    var order_date = this.PurOrdDate;
    var total_amount = this.total_amount;
    var shipping_address = this.shipping_address;
    var Quantity = this.Quantity;
    var Updatedby = this.Updatedby;
    var PurchaseOrderNo = this.PurOrdNo;
    var Status = this.Status;
    var Productname = this.Productname;
    var InvoiceNo = this.InvoiceNo;
    var InvoiceDt = this.InvoiceDt;
    var OrderId = this.OrderID;


    var TaskID = this.TaskID;
    var SupplierID = this.SupplierID;
    var ProductID = this.ProductID;
    var BrandID = this.BrandID;
    var CategoryID = this.CategoryID;
    var AssignedTo = this.AssignedTo;
    var TaskDescription = this.TaskDescription;


    const orderUpdate = {
      Description: Description,
      customer_id: customer_id,
      Location: Location,
      order_date: order_date,
      total_amount: total_amount.toString(),
      shipping_address: shipping_address,
      Quantity: Quantity,
      
      PurchaseOrderNo: PurchaseOrderNo,
      Status: Status,
      InvoiceNo: InvoiceNo,
      InvoiceDt: InvoiceDt,
      Productname: Productname,
      OrderId: OrderId,

      TaskID :TaskID,
      SupplierID :SupplierID,
      ProductID :ProductID,
      BrandID :BrandID,
      CategoryID :CategoryID,
      AssignedTo :AssignedTo,
      Comments :TaskDescription,
    };
    console.log(orderUpdate);


    var Filename = this.OrderFiles;
    var File_path = "https://assets.unileversolutions.com/v1/2237144.png?im=Resize,width=540,height=540";


    const orderhistoryinsert = {
      OrderId: OrderId,
      Status: Status,
      Description: Description,
      Filename: Filename,
      File_path: File_path,
      Updatedby: Updatedby
    };


    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/OrderUpdate',orderUpdate).subscribe((response) => {
        console.log('Data Updated successfully:', response);

      this.blobService.OrderUpdateimage(this.FileUpload, this.OrderFiles, orderhistoryinsert, () => { })
      this.dialogRef.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Updated Successfully' } });


      },
        (error) => {
          console.error('Error Updating data:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          }
        }
    );

  }


  SatusChange(event: any) {
    this.Status = event.target.value;
  }


  ReOrderdata() {
    var query: string = "SELECT Status as ProductTask,Description as ProdcutDescription,cast( Updated_date as varchar) as OnDate,Updatedby as ByUser,Filename,File_path from aws.tbl_order_history where OrderID='" + this.OrderID +"'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }

  StatusList() {
    var query: string = "SELECT StatusDescription as Status from AWS.tbl_Status where StatusType='Order Management'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }




  ngOnInit() {

    var AWSOrderMngData: any = this.data.displaydata


    this.OrderID = AWSOrderMngData[0].OrderId;
    //this.Description = AWSOrderMngData[0].Description;
    this.Status = AWSOrderMngData[0].StatusCol;
    this.PurOrdNo = AWSOrderMngData[0].PurchaseOrderNo;
    this.PurOrdDate = AWSOrderMngData[0].inserteddatecol;
    this.InvoiceNo = AWSOrderMngData[0].InvoiceNo;
    this.InvoiceDt = AWSOrderMngData[0].InvoiceDt;

    this.customer_id = AWSOrderMngData[0].customer_id;
    this.Location = AWSOrderMngData[0].LocationCol;
    this.order_date = AWSOrderMngData[0].order_date;
    this.total_amount = AWSOrderMngData[0].total_amount;
    this.shipping_address = AWSOrderMngData[0].shipping_address;
    this.Quantity = AWSOrderMngData[0].Quantity;

    this.Updatedby = AWSOrderMngData[0].Updatedby;
    this.Productname = AWSOrderMngData[0].ProductName;


    this.TaskID = AWSOrderMngData[0].TaskDetailID;
    this.SupplierID = AWSOrderMngData[0].SupplierID;
    this.ProductID = AWSOrderMngData[0].ProductID;
    this.BrandID = AWSOrderMngData[0].BrandID;
    this.CategoryID = AWSOrderMngData[0].CategoryID;
    this.AssignedTo = AWSOrderMngData[0].AssignedTo;
    this.TaskDescription = AWSOrderMngData[0].TaskDescription;




    var year = new Date().getFullYear().toString();
    var month = (new Date().getMonth() + 1).toString();
    if (month.length == 1) {
      month = '0' + month;
    }
    var date = new Date().getDate().toString();
    if (date.length == 1) {
      date = '0' + date;
    }

    var DateVal = year + '-' + month + '-' + date;
    this.PurOrdDate = DateVal;
    this.InvoiceDt = DateVal;

   // this.PurOrdDate = this.datepipe.transform(this.PurOrdDate, 'yyyy-MM-dd');

    //this.TaskID = AWSOrderMngData[0].TaskID;
    //this.TaskName = AWSOrderMngData[0].TaskName;
    //this.Status = AWSOrderMngData[0].Status;
    //this.Department = AWSOrderMngData[0].Department;
    //this.PurOrdNo = AWSOrderMngData[0].PurOrderNo;
    //this.PurOrdDate = AWSOrderMngData[0].PurOrderDt;
    /*this.Images = AWSOrderMngData[0].Status;*/


    this.ReOrderdata().subscribe((Orderdata) => {
      console.warn("Orderdata", Orderdata)
      this.ReOrderhistorydata = Orderdata
    })
    this.StatusList().subscribe((StatusList) => {
      console.warn("StatusList", StatusList)
      this.StatusListData = StatusList
    })

  }

}
