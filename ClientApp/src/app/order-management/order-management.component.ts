import { Component } from '@angular/core';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {
  trackinghid: boolean = true;
  OrderManagementList = [
    { TaskID: "1", TaskName: "Sweets and Salty Savoury", Supplier: "Chocovic", Location: "India", PMI: "Chocovic", Name: "Sahil Gupta", Designation: "General Manager", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N001", PurOrderDt: "13/04/2024" },
    { TaskID: "2", TaskName: "Tea", Supplier: "GoodLife", Location: "USA", PMI: "Esah(Rulio Tea Company)", Name: "Bijit Sharma", Designation: "CEO", ContactNo: "9876543210", Status: "Inventory Check", PurOrderNo: "PO00N002", PurOrderDt: "12/04/2024" },
    { TaskID: "3", TaskName: "Dates", Supplier: "Golden Target", Location: "Moracco", PMI: "Cooperative Mahi Coop", Name: "Mandar Tilak", Designation: "Marketing Manager", ContactNo: "9876543210", Status: "Order Assembly", PurOrderNo: "PO00N003", PurOrderDt: "11/04/2024" },
    { TaskID: "4", TaskName: "Coffee", Supplier: "Fanna Tech", Location: "Brazil", PMI: "Worldwide Trade Solutions", Name: "Saneesh Thomas", Designation: "Sales Manager", ContactNo: "9876543210", Status: "Reached Warehouse", PurOrderNo: "PO00N004", PurOrderDt: "10/04/2024" },
    { TaskID: "5", TaskName: "Syrups", Supplier: "Wink", Location: "Mexico", PMI: "Chocovic", Name: "Jessica garcia", Designation: "Operations Manager", ContactNo: "9876543210", Status: "Quality Check", PurOrderNo: "PO00N005", PurOrderDt: "9/04/2024" },
    { TaskID: "6", TaskName: "Almond Oil", Supplier: "Delta Foods", Location: "Germany", PMI: "Esah(Rulio Tea Company)", Name: "Joseph", Designation: "Engineer", ContactNo: "9876543210", Status: "Order Batch Processing", PurOrderNo: "PO00N006", PurOrderDt: "8/04/2024" },
    { TaskID: "7", TaskName: "Popcorn", Supplier: "Chocovic", Location: "Spain", PMI: "Cooperative Mahi Coop", Name: "Fatima", Designation: "Head of Export", ContactNo: "9876543210", Status: "Clearence InProgress", PurOrderNo: "PO00N007", PurOrderDt: "7/04/2024" },
  ];
  rowClicked:any;
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
  TaskID: any;
  TaskName: any;
  Status: any;
  Department: any;
  Images: any;

  PurOrdNo: any;
  PurOrdDate: any;
  StatusList = [{ Status: "Inventory Check" }, { Status: "Order Assembly" }, { Status: "Quality Check" }, { Status: "Packing" }, { Status: "Order Documentation" }, { Status: "Order Batch Processing" }, { Status: "Order Verification and Final Checks" }];

  constructor() { }

  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  UpdateOrderStatus(rowvalue:any) {
    this.trackinghid = false;
    //  var data = [rowvalue]

    //const dialogRef = this.dialog.open(OrderStatusUpdateComponent, {
    //    height: '83%',
    //    width: '74%',
    //    data: { displaydata: data }, disableClose: true
    //  });
    this.TaskID = rowvalue.TaskID;
    this.TaskName = rowvalue.TaskName;
    this.Status = rowvalue.Status;
    this.Department = rowvalue.Department;
    this.PurOrdNo = rowvalue.PurOrderNo;
    this.PurOrdDate = rowvalue.PurOrderDt;
  }
  cleardata() {
    this.trackinghid = true;
  }

  ngOnInit() {

  }

}
