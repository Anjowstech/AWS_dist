//import { Component, OnInit } from '@angular/core';
//import { UserAddComponent } from '../user-add/user-add.component';
//import { UserEditComponent } from '../user-edit/user-edit.component';
//import { MatDialog } from '@angular/material/dialog';
//import { HttpClient, HttpParams } from '@angular/common/http';





//@Component({
//  selector: 'app-user-management',
//  templateUrl: './user-management.component.html',
//  styleUrls: ['./user-management.component.css']
//})
//export class UserManagementComponent implements OnInit{

//    http: any;

//  ngOnInit(): void {
//    this.fetchData();


//  }

//  constructor(private matDialog: MatDialog, private httpClient: HttpClient) { }
//  data: any[] = [];
//  fetchData() {
//    const Query = "SELECT UserID,FirstName,LastName,ContactNumber,Address,DesignationID,Username,Password,Updateddate,Inserteddate  FROM [AWS].[tbl_Users]";
//    const params = new HttpParams().set('spname', Query);

//    this.httpClient
//      .get('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC', { params })
//      .subscribe((data: any) => {
//        console.log(data);
//        this.data = data;
//      });

//    }





//  openDialog() {
//    this.matDialog.open(UserAddComponent, {
//      width: '80%', height: '85%'
//    })
//  }
//  openDialogEdit() {
//    this.matDialog.open(UserEditComponent, {
//      width: '80%', height: '85%'
//    })
//  }




//  closeDialog(): void {
//    this.matDialog.closeAll();



//  }

//  title = 'AWS_dist';
//}
import { UserAddComponent } from '../user-add/user-add.component';
import { CameraComponent } from '../camera/camera.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
/*import { UserEditComponent } from '../user-edit/user-edit.component';*/

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  data: any[] = [];

  constructor(private matDialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {

    const query = '[AWS].[Sp_Select_Users]'

    const params = new HttpParams().set('spname', query);

    this.httpClient
      .get('https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC', { params })

      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
  }
  openDialog() {
    const dialogRef = this.matDialog.open(UserAddComponent, {
        width: '80%',
        height: '85%',

      });

      dialogRef.afterClosed().subscribe(result => {
        // Handle dialog close events if needed
        console.log('The dialog was closed');
        this.fetchData();
      });
    }
  }
  //  openEditDialog(user: any): void {
  //    const dialogRef = this.matDialog.open(UserEditComponent, {
  //      width: '80%',
  //      height: '85%',
  //      data: user // Pass the selected user data to the dialog
  //    });

  //    dialogRef.afterClosed().subscribe(result => {
  //      // Handle dialog close events if needed
  //      console.log('The dialog was closed');
  //    });
  //  }
  //}

