import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

interface Entity {
  ID: string;
  SupplierCode: string;
  Description: string;
  BrandID: string;
  ProductID: string;
  Product: string;
  ProductCategoryID: string;
  Address: string;
  LocationID: string;
  PhoneNO: string;
  email: string;
  Date: string;
  StatusID: string;
}

@Component({
  selector: 'app-createsupplier',
  templateUrl: './createsupplier.component.html',
  styleUrls: ['./createsupplier.component.css']
})
export class CreatesupplierComponent {
  currentDate: string = '';
  Id: string = '';
  supplierCode: string = '';
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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { // Inject MatSnackBar
    this.currentDate = new Date().toISOString();
  }

  insertData(): void {
    const entity: Entity = {
      ID: this.Id,
      SupplierCode: this.supplierCode,
      Description: this.description,
      BrandID: this.brand_id,
      ProductID: this.pl,
      Product: this.selectedProduct,
      ProductCategoryID: this.selectedCategory,
      Address: this.address,
      LocationID: this.selectedLocation,
      PhoneNO: this.phoneNumber,
      email: this.email,
      Date: this.currentDate,
      StatusID: this.selectedStatus
    };

    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/CreateSupplier', entity)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          this.openSnackBar('Supplier created successfully');
        },
        (error) => {
          console.error('Error inserting data:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          }
          this.openSnackBar('Failed to create supplier');
        }
      );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  clearFields(): void {
    this.Id = '';
    this.supplierCode = '';
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

