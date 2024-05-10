import { Component, OnInit,Inject } from '@angular/core';
import { DataShareServiceService } from 'src/app/data-share-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-status-update',
  templateUrl: './order-status-update.component.html',
  styleUrls: ['./order-status-update.component.css']
})
export class OrderStatusUpdateComponent implements OnInit {

  TaskID: any="";
  TaskName: any = "";
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

  StatusList = [ { Status: "Inventory Check" }, { Status: "Order Assembly" }, { Status: "Quality Check" }, { Status: "Packing" }, { Status: "Order Documentation" }, { Status: "Order Batch Processing" }, { Status: "Order Verification and Final Checks" }];


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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


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

  ngOnInit() {

    var AWSOrderMngData: any = this.data.displaydata

    this.TaskID = AWSOrderMngData[0].TaskID;
    this.TaskName = AWSOrderMngData[0].TaskName;
    this.Status = AWSOrderMngData[0].Status;
    this.Department = AWSOrderMngData[0].Department;
    this.PurOrdNo = AWSOrderMngData[0].PurOrderNo;
    this.PurOrdDate = AWSOrderMngData[0].PurOrderDt;
    /*this.Images = AWSOrderMngData[0].Status;*/

  }

}
