import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatusUpdateComponent } from 'src/app/order-management/order-status-update/order-status-update.component';


@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  OrderManagementList = [
    { TaskID: "1", TaskName: "Sweets and Salty Savoury", Supplier: "Chocovic", Location: "India", PMI: "Chocovic", Name: "Sahil Gupta", Designation: "General Manager", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N001", PurOrderDt: "13/04/2024" },
    { TaskID: "2", TaskName: "Tea", Supplier: "GoodLife", Location: "USA", PMI: "Esah(Rulio Tea Company)", Name: "Bijit Sharma", Designation: "CEO", ContactNo: "9876543210", Status: "Inventory Check", PurOrderNo: "PO00N002", PurOrderDt: "12/04/2024" },
    { TaskID: "3", TaskName: "Dates", Supplier: "Golden Target", Location: "Moracco", PMI: "Cooperative Mahi Coop", Name: "Mandar Tilak", Designation: "Marketing Manager", ContactNo: "9876543210", Status: "Order Assembly", PurOrderNo: "PO00N003", PurOrderDt: "11/04/2024"},
    { TaskID: "4", TaskName: "Coffee", Supplier: "Fanna Tech", Location: "Brazil", PMI: "Worldwide Trade Solutions", Name: "Saneesh Thomas", Designation: "Sales Manager", ContactNo: "9876543210", Status: "Reached Warehouse", PurOrderNo: "PO00N004", PurOrderDt: "10/04/2024"},
    { TaskID: "5", TaskName: "Syrups", Supplier: "Wink", Location: "Mexico", PMI: "Chocovic", Name: "Jessica garcia", Designation: "Operations Manager", ContactNo: "9876543210", Status: "Quality Check", PurOrderNo: "PO00N005", PurOrderDt: "9/04/2024"},
    { TaskID: "6", TaskName: "Almond Oil", Supplier: "Delta Foods", Location: "Germany", PMI: "Esah(Rulio Tea Company)", Name: "Joseph", Designation: "Engineer", ContactNo: "9876543210", Status: "Order Batch Processing", PurOrderNo: "PO00N006", PurOrderDt: "8/04/2024"},
    { TaskID: "7", TaskName: "Popcorn", Supplier: "Chocovic", Location: "Spain", PMI: "Cooperative Mahi Coop", Name: "Fatima", Designation: "Head of Export", ContactNo: "9876543210", Status: "Clearence InProgress", PurOrderNo: "PO00N007", PurOrderDt: "7/04/2024"},
  ];


  constructor(public dialog: MatDialog) { }


  UpdateOrderStatus(rowvalue:any) {

      var data = [rowvalue]

    const dialogRef = this.dialog.open(OrderStatusUpdateComponent, {
        height: '83%',
        width: '74%',
        data: { displaydata: data }, disableClose: true
      });
    
  }


  ngOnInit() {

  }

}
