import { Component } from '@angular/core';
import { AddComponentComponent } from 'src/app/branding/add-component/add-component.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css']
})
export class BrandingComponent {
  OrderManagementList: any = []
  Auditlist: any = [];
  active: any;
  innerTabset: any;
  loadpackagingloaddata: any;
  packagingID: any;
  constructor(public dialog: MatDialog, private http: HttpClient,) { }


  Createcomponent() {
    const dialogRef = this.dialog.open(AddComponentComponent, {
      width: '80%',
      height: '85%',
      disableClose:true,
     // data: [this.packagingID] // Pass the selected packagingID  to the dialog
      //let dialogRef = this.dialog.open(AddComponentComponent, {
      //    height: '400px',
      //    width: '600px',
      //  });
    })
  }


  //update packaging
  selectpackaginggrid(rowvalue:any) {
    this.packagingID = rowvalue.ID
    const dialogRef = this.dialog.open(AddComponentComponent, {
      width: '80%',
      height: '85%',
      disableClose: true,
      data: { displaydata: this.packagingID } // Pass the selected packagingID  to the dialog
      //let dialogRef = this.dialog.open(AddComponentComponent, {
      //    height: '400px',
      //    width: '600px',
      //  });
    })
  }



  //branding grid load
  brandingloaddata() {
    var query: string = "SELECT [Task id] Taskid,[Task name] TaskName,[Contact No] ContactNo,[PO No] PurOrderNo,* from AWS.tbl_branding";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }



  //packaging grid load
  packagingloaddata() {
    var query: string = "SELECT * from [AWS].[tbl_Packaging]";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }

  ngOnInit() {

    this.brandingloaddata().subscribe((brandingloaddata) => {
      console.warn("brandingloaddata", brandingloaddata)
      this.OrderManagementList = brandingloaddata
    })

    this.packagingloaddata().subscribe((packagingloaddata) => {
      console.warn("packagingloaddata", packagingloaddata)
      this.loadpackagingloaddata = packagingloaddata


    })

   
    this.Auditlist = [
      { Date: "17/4/2024", TaskName: "TaskName: Sweets and Salty Savoury Branding is InProgress", Username: "Admin" },
      { Date: "16/4/2024", TaskName: "TaskName: Tea Branding is InProgress", Username: "Admin" },
      { Date: "13/4/2024", TaskName: "TaskName: Dates Branding is InProgress", Username: "Admin" },
      { Date: "12/4/2024", TaskName: "TaskName: Coffee Branding is InProgress", Username: "Admin" },
      { Date: "11/4/2024", TaskName: "TaskName: Syrups Branding is InProgress", Username: "Admin" },
      { Date: "10/4/2024", TaskName: "TaskName: Almond Oil Branding is InProgress", Username: "Admin" },
      { Date: "09/4/2024", TaskName: "TaskName: Popcorn Branding Completed", Username: "Admin" },

    ];
  }

}
