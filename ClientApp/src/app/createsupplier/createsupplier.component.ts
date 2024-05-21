import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
/*import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';*/

interface Entity {
  SupplierName: string;
  SupplierCode: string; // Changed from 'SupplierName' to match server-side parameter
  Description: string;
  BrandID: string;
  ProductID: string;
  Product: string;
  ProductCategoryID: string;
  Address: string;
  LocationID: string;
  PhoneNO: string; // Changed from 'PhoneNo' to match server-side parameter
  email: string;
  Date: string;
  StatusID: string;
  operation: string;
}

@Component({
  selector: 'app-createsupplier',
  templateUrl: './createsupplier.component.html',
  styleUrls: ['./createsupplier.component.css']
})

  
export class CreatesupplierComponent {
  currentDate: string = '';
  SupplierName: string = '';
  SupplierCode: string = ''; // Changed from 'supplierName' to match server-side parameter
  description: string = '';
  brand_id: string = '';
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
  pl: string = '';
  selectedProduct: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  selectedLocation: string = '';



  constructor(private http: HttpClient, /*private snackBar: MatSnackBar*/) {
    this.currentDate = new Date().toISOString();
  }

  insertData(): void {
    const entity: Entity = {
      SupplierName: this.SupplierName,
      SupplierCode: this.SupplierCode, // Changed from 'supplierName' to match server-side parameter
      Description: this.description,
      BrandID: this.brand_id,
      ProductID: this.selectedProduct,
      Product: this.pl,
      ProductCategoryID: this.selectedCategory,
      Address: this.address,
      LocationID: this.selectedLocation,
      PhoneNO: this.phoneNumber, // Changed from 'phoneNumber' to match server-side parameter
      email: this.email,
      Date: this.currentDate,
      StatusID: this.selectedStatus,
      operation: "insert"
    };
    //CreateSupplier
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/CreateUpdateSupplier', entity)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          this.openSnackBar('Supplier Created Successfully');
        },
        (error) => {
          console.error('Error inserting data:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
            this.openSnackBar('Failed To Create Supplier');
          }
        }
      );

  }
  openSnackBar(message: string): void {
    //this.snackBar.open(message, 'Close', {
    //  duration: 500,
    //  horizontalPosition: 'center',
    //  verticalPosition: 'top'
    //});
  }
  clearFields(): void {
    this.SupplierName = '';
    this.SupplierCode = '';
    this.description = '';
    this.brand_id = '';
    this.address = '';
    this.phoneNumber = '';
    this.email = '';
    this.pl = '';
    this.selectedProduct = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.selectedLocation = '';
  }
}
