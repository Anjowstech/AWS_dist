import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskdetailpage',
  templateUrl: './taskdetailpage.component.html',
  styleUrls: ['./taskdetailpage.component.css']
})
export class TaskdetailpageComponent {
  rowClicked:any;
  OrderManagementList = [
    { ProductTask: "Supplier Approved", TaskID: "1", TaskName: "Date", Supplier: "Chocovic", Location: "India", PMI: "Chocovic", Name: "Sahil Gupta", Designation: "GM", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N001", ProdcutDescription: "Saji" },
    { ProductTask: "Supplier Changed", TaskID: "2", TaskName: "Date", Supplier: "Chocovic", Location: "USA", PMI: "Esah(Rulio Tea Company)", Name: "Bijit Sharma", Designation: "CEO", ContactNo: "9876543210", Status: "Order Completed", PurOrderNo: "PO00N002", ProdcutDescription: "Anjo" },
    { ProductTask: "Supplier Changed", TaskID: "3", TaskName: "Date", Supplier: "Chocovic", Location: "Moracco", PMI: "Cooperative Mahi Coop", Name: "Mandar Tilak", Designation: "GM", ContactNo: "9876543210", Status: "Product Shipped", PurOrderNo: "PO00N003", ProdcutDescription: "John" },
    { ProductTask: "Supplier Changed", TaskID: "4", TaskName: "Date", Supplier: "Chocovic", Location: "Brazil", PMI: "Worldwide Trade Solutions", Name: "Saneesh Thomas", Designation: "CEO", ContactNo: "9876543210", Status: "Reached Warehouse", PurOrderNo: "PO00N004", ProdcutDescription: "Liwa" },
    { ProductTask: "Supplier Changed", TaskID: "5", TaskName: "Date", Supplier: "Chocovic", Location: "Mexico", PMI: "Chocovic", Name: "Jessica garcia", Designation: "GM", ContactNo: "9876543210", Status: "Clearence Completed", PurOrderNo: "PO00N005" },
    { ProductTask: "QA approved", TaskID: "6", TaskName: "Date", Supplier: "Chocovic", Location: "Germany", PMI: "Esah(Rulio Tea Company)", Name: "Joseph", Designation: "CEO", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N006", ProdcutDescription: "Anjo" },
    { ProductTask: "Certification approved", TaskID: "7", TaskName: "Date", Supplier: "Chocovic", Location: "Spain", PMI: "Cooperative Mahi Coop", Name: "Fatima", Designation: "GM", ContactNo: "9876543210", Status: "Product Shipped", PurOrderNo: "PO00N007", ProdcutDescription: "Biji" },
  ];
  suppliersection = [
    { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Available", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Available", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Nil", PMI: "GM", Status: "Out of Stock", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "Saji", Updateddate: "Nil", Select: "" },
    { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Nil", PMI: "GM", Status: "Enquired", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "lm@srmfoods.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Nil", PMI: "GM", Status: "Enquired", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  ];
  QA = [
    { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Waiting for approval", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Sent for approval", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Out of Stock", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "Saji", Updateddate: "Nil", Select: "" },
    { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Processing", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "lm@srmfoods.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Rejected", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  ];
  certifications = [
    { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Under Review", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Fail", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Valid", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "Saji", Updateddate: "Nil", Select: "" },
    { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Valid", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "lm@srmfoods.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "	Expired", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  ];
  upload = [
    { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Processing", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Processing", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Uploaded", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Approved", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "	Uploaded", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  ];
  StatusList = [{ Status: "Enquired" }, { Status: "Available" }, { Status: "Out of Stock" }];
  StatusListqa = [{ Status: "Rejected" }, { Status: "Processing" }, { Status: "Sent for approval" }, { Status: "Waiting for approval" }];
  Statuscertifications = [{ Status: "Under Review" }, { Status: "Valid" }, { Status: "Fail" }, { Status: "Expired" }];
  Statusupload = [{ Status: "Processing" }, { Status: "Uploaded" }, { Status: "Approved" }];
  suppliernameselection: string = '';
  supplierselctionStatus: any = [];
  qasuppliername: string = '';
  suppliernamecertifications: string = '';
  qaStatus: any = [];
  cStatus: any = [];
  uploadStatus: any = [];
  suppliernameupload: string='';
  constructor() { }
  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  setvalue(item:any) {
    this.suppliernameselection = item.SupplierName;
    this.supplierselctionStatus = item.Status;
  }
  setvalueqa(item:any) {
    this.qasuppliername = item.SupplierName;
    this.qaStatus = item.Status;
  }
  setvaluecertifications(item:any) {
    this.suppliernamecertifications = item.SupplierName;
    this.cStatus = item.Status;
  }
  setupload(item:any) {
    this.suppliernameupload = item.SupplierName;
    this.uploadStatus = item.Status;
  }
  ngOnInit() {
  }
}
