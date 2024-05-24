import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatusUpdateComponent } from 'src/app/order-management/order-status-update/order-status-update.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';

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

  dataListsave1: any = [];
  OrderManagementListData: any;
  constructor(public dialog: MatDialog, private http: HttpClient) { }


  UpdateOrderStatus(rowvalue:any) {
    var data = [rowvalue]

    if (data[0].StatusCol == "Order Approved") {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Approved Orders cannot be edited' } });
    }
    else{
      const dialogRef = this.dialog.open(OrderStatusUpdateComponent, {
        height: '83%',
        width: '74%',
        data: { displaydata: data }, disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.Orderdata().subscribe((Orderdata) => {
          console.warn("Orderdata", Orderdata)
          this.OrderManagementListData = Orderdata
        })
      });
    }
    
    
  }


  Orderdata() {
    var query: string = "SELECT a.*, cast(a.updateddate as varchar) as updateddatecol, c.StatusDescription StatusCol, Name LocationCol, cast(a.inserteddate as varchar) as inserteddatecol , d.SupplierID,d.ProductID,d.BrandID,d.CategoryID,d.AssignedTo,d.Description as TaskDescription from aws.tbl_Order a join  aws.tbl_location b on b.LocationID = a.Locationid join  aws.tbl_Status c on c.StatusID = a.StatusID join aws.tbl_TaskDetails d on a.TaskDetailID = d.TaskDetailID where c.StatusType in ( 'Order Management' ,'ReOrder') or  c.StatusDescription = 'Branding Approved'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }




  ngOnInit() {

    this.Orderdata().subscribe((Orderdata) => {
      console.warn("Orderdata", Orderdata)
      this.OrderManagementListData = Orderdata
    })



  }

}
