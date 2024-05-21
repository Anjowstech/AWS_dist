//import { Component } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
//import { HttpClient, HttpParams } from '@angular/common/http';
//import { FaceRegisterComponent } from '../face-register/face-register.component';
//import { DataShareServiceService } from 'src/app/data-share-service.service';
//import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';
//interface User {
//  firstName: string;
//  LastName: string; // Changed from 'SupplierName' to match server-side parameter
//  ContactNumber: string;
//  Address: string;
//  Designation: string;
//  username: string;
//  Password: string;
//  Role: string;
//  PageAccess: string; // Changed from 'PhoneNo' to match server-side parameter
///*  ModuleName: string;*/
// /* operation: string;*/

//}
//@Component({
//  selector: 'app-user-add',
//  templateUrl: './user-add.component.html',
//  styleUrls: ['./user-add.component.css']
//})
//export class UserAddComponent {
//  firstName: string = '';
//  LastName: string = '';
//  ContactNumber: string = ''; // Changed from 'supplierName' to match server-side parameter
//  Address: string = '';
//  Designation: string = '';
//  username: string = '';
//  Password: string = '';
//  Role: string = '';
//  PageAccess: string = '';
///*  ModuleName: string = '';*/
 





//  Userlist: string[] = [];
//  user: any = {};
//  responseData: any;

//  constructor(private matDialog: MatDialog, private http: HttpClient, private datashare: DataShareServiceService, private snackBar: MatSnackBar) { }
//  openFaceRegisterDialog() {
//    this.matDialog.open(FaceRegisterComponent, {
//      width: '80%',
//      height: '85%'
//    });
//  }
//  handleButtonClick() {
//    this.insertUser();
//    this.openFaceRegisterDialog(); // Call the first function
   
//    this.Userlist.push(this.username)
//    this.Userlist.push(this.Password)
//    this.datashare.sendpdrlist(this.Userlist);

   


//  }
//  closeDialog(): void {
//    this.matDialog.closeAll();
//  }

//  insertUser(): void {
//    const entity: User = {
//      firstName: this.firstName,
//      LastName: this.LastName, // Changed from 'supplierName' to match server-side parameter
//      ContactNumber: this.ContactNumber,
//      Address: this.Address,
//      Designation: this.Designation,
//      username: this.username,
//      Password: this.Password,
//      Role: this.Role,
//      PageAccess: this.PageAccess,
//     /* ModuleName: this.ModuleName,*/ // Changed from 'phoneNumber' to match server-side parameter
//      /*operation:"insert"*/
//    };

//    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/UserManage', entity)
//      .subscribe(
     
//        (response) => {
//          console.log('Server Response:', response);
//          if (response.statusMessage === 'User Added') {
//            this.openSnackBar('User Created Successfully');
//          } else if (response.statusMessage === 'Username already exists.') {
//            this.openSnackBar('Username already exists. Please choose a different username.');
//          } else {
//            this.openSnackBar('An unexpected response was received.');
//          }
//        },
//        (error) => {
//          console.error('Username already exists.', error);
//          //          if (error && error.status === 409)

//          console.error('Error Adding User:', error);
//          if (error && error.error && error.error.errors) {
//            const validationErrors = error.error.errors;
//            console.log('Validation errors:', validationErrors);
//            console.log('Status:', error.status);
//            console.log('Status Text:', error.statusText);
//            console.log('Error Message:', error.message);
//            console.log('Response Body:', error.error);
//            this.openSnackBar('Failed To Create User');
//          }
//        }

//      );

//  }
//  clearFields() {
//    this.firstName = '';
//    this.LastName = '';
//    this.ContactNumber = ''; // Changed from 'supplierName' to match server-side parameter
//    this.Address = '';
//    this.Designation = '';
//    this.username = '';
//    this.Password = '';
//    this.Role = '';
//    this.PageAccess = '';
//  }



//  openSnackBar(message: string): void {
//    this.snackBar.open(message, 'Close', {
//      duration: 5000,
//      horizontalPosition: 'center',
//      verticalPosition: 'top'
//    });

//  }

//}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FaceRegisterComponent } from '../face-register/face-register.component';
import { DataShareServiceService } from 'src/app/data-share-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
interface User {
  firstName: string;
  LastName: string;
  ContactNumber: string;
  Address: string;
  Designation: string;
  username: string;
  Password: string;
  Role: string;
  PageAccess: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  firstName: string = '';
  LastName: string = '';
  ContactNumber: string = '';
  Address: string = '';
  Designation: string = '';
  username: string = '';
  Password: string = '';
  Role: string = '';
  PageAccess: string = '';

  Userlist: string[] = [];
  user: any = {};
  responseData: any;

  constructor(
    private matDialog: MatDialog,
    private http: HttpClient,
    private datashare: DataShareServiceService,
   /* private snackBar: MatSnackBar*/
  ) { }

  openFaceRegisterDialog() {
    this.matDialog.open(FaceRegisterComponent, {
      width: '80%',
      height: '85%'
    });
  }

  handleButtonClick() {
    this.insertUser();
    this.openFaceRegisterDialog();
    this.Userlist.push(this.username);
    this.Userlist.push(this.Password);
    this.datashare.sendpdrlist(this.Userlist);
  }

  closeDialog(): void {
    this.matDialog.closeAll();
  }

  insertUser(): void {
    const entity: User = {
      firstName: this.firstName,
      LastName: this.LastName,
      ContactNumber: this.ContactNumber,
      Address: this.Address,
      Designation: this.Designation,
      username: this.username,
      Password: this.Password,
      Role: this.Role,
      PageAccess: this.PageAccess
    };

    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/UserManage', entity)
      .subscribe(
        (response) => {
          console.log('Server Response:', response);
          if (response.statusMessage === 'User Added') {
            this.openSnackBar('User Created Successfully', 'blue-snackbar');
          } else if (response.statusMessage === 'Username already exists.') {
            this.openSnackBar('Username already exists. Please choose a different username.', 'blue-snackbar');
          } else {
            this.openSnackBar('An unexpected response was received.', 'blue-snackbar');
          }
        },
        (error) => {
          console.error('Error Adding User:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
            this.openSnackBar('Failed To Create User', 'blue-snackbar');
          } else {
            this.openSnackBar('An unexpected error occurred. Please try again later.', 'blue-snackbar');
          }
        }
      );
  }

  clearFields() {
    this.firstName = '';
    this.LastName = '';
    this.ContactNumber = '';
    this.Address = '';
    this.Designation = '';
    this.username = '';
    this.Password = '';
    this.Role = '';
    this.PageAccess = '';
  }

  openSnackBar(message: string, panelClass: string): void {
    //this.snackBar.open(message, 'Close', {
    //  duration: 5000,
    //  horizontalPosition: 'center',
    //  verticalPosition: 'top',
    //  panelClass: [panelClass]
    //});
  }
}

