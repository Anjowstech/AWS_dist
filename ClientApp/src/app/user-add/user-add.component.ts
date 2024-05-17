import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FaceRegisterComponent } from '../face-register/face-register.component';
import { DataShareServiceService } from 'src/app/data-share-service.service';

interface User {
  FirstName: string;
  LastName: string; // Changed from 'SupplierName' to match server-side parameter
  ContactNumber: string;
  Address: string;
  Designation: string;
  username: string;
  Password: string;
  Role: string;
  PageAccess: string; // Changed from 'PhoneNo' to match server-side parameter
  ModuleName: string;
/*  operation: string;*/
}
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  firstName: string = '';
  LastName: string = '';
  ContactNumber: string = ''; // Changed from 'supplierName' to match server-side parameter
  Address: string = '';
  Designation: string = '';
  username: string = '';
  Password: string = '';
  Role: string = '';
  PageAccess: string = '';
  ModuleName: string = '';





  Userlist: string[] = [];
  user: any = {};
  responseData: any;

  constructor(private matDialog: MatDialog, private http: HttpClient, private datashare: DataShareServiceService, ) { }
  openFaceRegisterDialog() {
    this.matDialog.open(FaceRegisterComponent, {
      width: '80%',
      height: '85%'
    });
  }
  handleButtonClick() {
    this.insertUser();
    this.openFaceRegisterDialog(); // Call the first function
   
    this.Userlist.push(this.username)
    this.Userlist.push(this.Password)
    this.datashare.sendpdrlist(this.Userlist);

   


  }
  closeDialog(): void {
    this.matDialog.closeAll();
  }

  insertUser(): void {
    const entity: User = {
      FirstName: this.firstName,
      LastName: this.LastName, // Changed from 'supplierName' to match server-side parameter
      ContactNumber: this.ContactNumber,
      Address: this.Address,
      Designation: this.Designation,
      username: this.username,
      Password: this.Password,
      Role: this.Role,
      PageAccess: this.PageAccess,
      ModuleName: this.ModuleName, // Changed from 'phoneNumber' to match server-side parameter
      /*operation:"insert"*/
    };

    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/UserManage', entity)
      .subscribe(
        (response) => {
          console.log('User Added successfully:', response);
      //    this.openSnackBar('User Created Successfully');
        },
        (error) => {
          console.error('Error Adding User:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
            console.log('Status:', error.status);
            console.log('Status Text:', error.statusText);
            console.log('Error Message:', error.message);
            console.log('Response Body:', error.error);
           // this.openSnackBar('Failed To Create User');
          }
        }

      );

  }
  //openSnackBar(message: string): void {
  //  this.snackBar.open(message, 'Close', {
  //    duration: 500,
  //    horizontalPosition: 'center',
  //    verticalPosition: 'top'
  //  });

  //}

}

