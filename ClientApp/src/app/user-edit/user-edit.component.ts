//import { Component ,Inject} from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { HttpClient, HttpParams } from '@angular/common/http';
//import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';

//interface UserEntity {
  
  
//  FirstName: string;
//  LastName: string; 
//  ContactNumber: string;
//  Address: string;
//  Designation: string;
//  username: string;
//  Password: string;
//  ImageId: string;
//  Role: string;
//  PageAccess: string; 
///*  ModuleName: string;*/
//  /*operation: string;*/
//  UserID: string;
  
//}
//@Component({
//  selector: 'app-user-edit',
//  templateUrl: './user-edit.component.html',
//  styleUrls: ['./user-edit.component.css']
//})
//export class UserEditComponent {

  
  
//  FirstName: string = '';
//  LastName: string = '';
//  ContactNumber: string = ''; // Changed from 'supplierName' to match server-side parameter
//  Address: string = '';
//  Designation: string = '';
//  username: string = '';
//  Password: string = '';
//  ImageId: string = '';
//  Role: string = '';
//  PageAccess: string = '';
//  /*ModuleName: string = '';*/
//  UserID: string = '';
 

//  constructor(private http: HttpClient, private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }
//  closeDialog(): void {
//    this.matDialog.closeAll();
//  }
//  UpdateUser(): void {
//    const entity: UserEntity = {
//      ImageId:this.ImageId,
//      UserID: this.UserID,
//      FirstName: this.FirstName,
//      LastName: this.LastName, // Changed from 'supplierName' to match server-side parameter
//      ContactNumber: this.ContactNumber,
//      Address: this.Address,
//      Designation: this.Designation,
//      username: this.username,
//      Password: this.Password,
//      Role: this.Role,
//      PageAccess: this.PageAccess,
///*      ModuleName: this.ModuleName,*/ // Changed from 'phoneNumber' to match server-side parameter
//     /* operation: "update"*/
//    };
//    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/UserUpdate', entity)
//      .subscribe(
//        (response) => {
//          console.log('User Update successfully:', response);
//          this.openSnackBar('User Update Successfully');
//        },
//        (error) => {
//          console.error('Error Updating User:', error);
//          if (error && error.error && error.error.errors) {
//            const validationErrors = error.error.errors;
//            console.log('Validation errors:', validationErrors);
//            //console.log('Status:', error.status);
//            //console.log('Status Text:', error.statusText);
//            //console.log('Error Message:', error.message);
//            //console.log('Response Body:', error.error);
//            this.openSnackBar('Failed To Create User');
//          }
//        }
       

//    );

//  }
//  openSnackBar(message: string): void {
//    this.snackBar.open(message, 'Close', {
//      duration: 500,
//      horizontalPosition: 'center',
//      verticalPosition: 'top'
//    });

//  }


//  ngOnInit(): void {
//    console.log('Received data in SupplierEditComponent:', this.data);
//  }

//}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UserEntity {
  UserID: string;
  FirstName: string;
  LastName: string;
  ContactNumber: string;
  Address: string;
  Designation: string;
  username: string;
  Password: string;
  Imageid: string;
  Role: string;
  PageAccess: string;
  
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  UserID: string = '';
  FirstName: string = '';
  LastName: string = '';
  ContactNumber: string = '';
  Address: string = '';
  Designation: string = '';
  username: string = '';
  Password: string = '';
  Imageid: string = '';
  Role: string = '';
  PageAccess: string = '';
 

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
 /*   private snackBar: MatSnackBar*/
  ) { }
  handleButtonClick() {
    this.UpdateUser();
    this.closeDialog();
  }
  ngOnInit(): void {
    // Initialize the component's properties with the data received
    if (this.data) {
      this.UserID = this.data.UserID || '';
      this.FirstName = this.data.FirstName || '';
      this.LastName = this.data.LastName || '';
      this.ContactNumber = this.data.ContactNumber || '';
      this.Address = this.data.Address || '';
      this.Designation = this.data.Designation || '';
      this.username = this.data.UserName || '';
      this.Password = this.data.Password || '';
      this.Imageid = this.data.Imageid || '';
      this.Role =''|| '';
      this.PageAccess = this.data.PageAccess || '';
     
    }
    console.log('Received data in UserEditComponent:', this.data);
  }

  closeDialog(): void {
    this.matDialog.closeAll();
  }
  
  UpdateUser(): void {


    var UserID = this.UserID;
    var FirstName = this.FirstName;
    var LastName = this.LastName;
    var ContactNumber = this.ContactNumber;

    var Address = this.Address;
    var Designation = this.Designation;
    var username = this.username;
    var Password = this.Password;
    var Imageid = this.Imageid;
    var Role = this.Role;
    var PageAccess = this.PageAccess;
    
    const entity: UserEntity = {
      //UserID: this.UserID,
      //FirstName: this.FirstName,
      //LastName: this.LastName,
      //ContactNumber: this.ContactNumber,
      //Address: this.Address,
      //Designation: this.Designation,
      //username: this.username,
      //Password: this.Password,
      //Imageid: this.Imageid,
      //Role: this.Role,
      //PageAccess: this.PageAccess,
      UserID: UserID,
      FirstName: FirstName,
      LastName: LastName,
      ContactNumber: ContactNumber,
      Address: Address,
      Designation: Designation,
      username: username,
      Password: Password,
      Imageid: Imageid,
      Role: Role,
      PageAccess: PageAccess
    };
    /*console.log(UpdateUser);*/
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/UserUpdate', entity)
      .subscribe(
        (response) => {
          console.log('User Update successfully:', response);
          this.openSnackBar('User Update Successfully');
        },
        (error) => {
          console.error('Error Updating User:', error);
          this.openSnackBar('Failed To Update User');
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          }
        }
      );
  }
  clearFields() {
 /*   this.UserID =  '';*/
    this.FirstName = '';
    this.LastName ='';
    this.ContactNumber = '';
    this.Address = '';
    this.Designation =  '';
    this.username =  '';
    this.Password ='';
    this.Imageid =  '';
    this.Role = '';
    this.PageAccess =  '';
  }

 
  openSnackBar(message: string): void {
    //this.snackBar.open(message, 'Close', {
    //  duration: 5000, // Adjusted duration for better visibility
    //  horizontalPosition: 'center',
    //  verticalPosition: 'top'
    //});
  }
}
