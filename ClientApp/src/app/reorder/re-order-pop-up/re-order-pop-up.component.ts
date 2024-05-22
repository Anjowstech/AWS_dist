import { Component, OnInit ,Inject} from '@angular/core';
import { DataShareServiceService } from 'src/app/data-share-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';

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

  //LocationList = [{ location: "India" }, { location: "USA" }, { location: "Moracco" }, { location: "Brazil" }, { location: "Mexico" }, { location: "Germany" }, { location: "Spain" },];

  //NameList = [{ Name: "Sahil Gupta" }, { Name: "Bijit Sharma" }, { Name: "Mandar Tilak" }, { Name: "Saneesh Thomas" }, { Name: "Jessica garcia" }, { Name: "Joseph" }, { Name: "Fatima" },];

  UserNameListData: any;
  LocationListData: any;


  customer_id: any = "";
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
  Comments: any = "";
  TaskDescription: any = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private http: HttpClient, public dialogRef: MatDialog) { }

  Confirm() {

    var Description = this.TaskDescription;
    var customer_id = this.customer_id;
    var Location = this.Location;
    var order_date = this.order_date;
    var total_amount = this.Cost;
    var shipping_address = this.shipping_address;
    var Quantity = this.Qty;
    var Updatedby = this.Updatedby;
    var PurchaseOrderNo = this.PONo;
    var Status = "In Progress";
    var Productname = this.ProductName;
    var InvoiceNo = this.InvoiceNo;
    var InvoiceDt = this.InvoiceDt;
    var TaskID = this.TaskID;
    var SupplierID = this.SupplierID;
    var ProductID = this.ProductID;
    var BrandID = this.BrandID;
    var CategoryID = this.CategoryID;
    var AssignedTo = this.AssignedTo;
    var Comments = this.Comments;


    const order = {
      Description: Description,
      customer_id: customer_id,
      Location: Location,
      order_date: order_date,
      total_amount: this.Cost.toString(),
      shipping_address: shipping_address,
      Quantity: Quantity,
      /*Updatedby: Updatedby,*/
      PurchaseOrderNo: PurchaseOrderNo,
      Status: "Order Placed",
      Productname: Productname,


      InvoiceNo: InvoiceNo,
      InvoiceDt: InvoiceDt,
      TaskID: TaskID,
      SupplierID: SupplierID,
      ProductID: ProductID,
      BrandID: BrandID,
      CategoryID: CategoryID,
      AssignedTo: AssignedTo,
      Comments: Comments,
    };
    console.log(order);
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/OrderInsert',
      order).subscribe((response) => {
        console.log('Data Updated successfully:', response);
        this.dialogRef.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'ReOrdered Successfully' } });
        this.router.navigate(['/main/OrderMang']);
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

  ChangeLocation(event:any) {
    this.Location = event.target.value;
  }
  ChangeName(event: any) {
    this.Name = event.target.value;
  }


  UserNameList() {
    var query: string = "SELECT FirstName + ' ' + LastName as CustomerName from aws.tbl_users ";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }

  LocationList() {
    var query: string = "SELECT Name as Location from aws.tbl_location ";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }

  ngOnInit() {

    var AWSWorkFlowData: any = this.data.displaydata

    this.PONo = AWSWorkFlowData[0].PurchaseOrderNo;
    this.ProductName = AWSWorkFlowData[0].ProductName;
    this.Cost = this.data.displaydata[1];
    this.Qty = AWSWorkFlowData[0].SelectedQty;
    this.Location = AWSWorkFlowData[0].Location;
    this.Name = AWSWorkFlowData[0].CustomerName;
    //this.ContactNo = AWSWorkFlowData[0].ContactNo;



    this.TaskDescription = AWSWorkFlowData[0].Description;
    this.customer_id = AWSWorkFlowData[0].customer_id;
    this.order_date = AWSWorkFlowData[0].order_date;
    this.shipping_address = AWSWorkFlowData[0].shipping_address;
    this.InvoiceNo = AWSWorkFlowData[0].InvoiceNo;
    this.InvoiceDt = AWSWorkFlowData[0].InvoiceDt;
    this.TaskID = AWSWorkFlowData[0].TaskDetailID;
    this.SupplierID = AWSWorkFlowData[0].SupplierID;
    this.ProductID = AWSWorkFlowData[0].ProductID;
    this.BrandID = AWSWorkFlowData[0].BrandID;
    this.CategoryID = AWSWorkFlowData[0].CategoryID;
    this.AssignedTo = AWSWorkFlowData[0].AssignedTo;
    this.Comments = AWSWorkFlowData[0].Comments;






    this.UserNameList().subscribe((UserNameList) => {
      console.warn("UserNameList", UserNameList)
      this.UserNameListData = UserNameList
    })

    this.LocationList().subscribe((LocationList) => {
      console.warn("LocationList", LocationList)
      this.LocationListData = LocationList
    })
  }

}
