import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent {
  componentdetails:any=[]
  placeholderText: string = 'Custom Placeholder';
  showDatePickerFlag: boolean = false;
  ComponentName: any;
  Specification: any;
  Size: any;
  UnitCost: any;
  ImageName: any = " ";
  ImageUrl: any = " ";
  dataComponentsubmitdetails: any;
  loadpackagingloaddata: any;
  packagingID: any;
  hidsave:boolean =false
  hidupdate: boolean = true

  constructor(public dialog: MatDialog, private http: HttpClient, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {



  }

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }
  //Componentsubmitdetails() {
  //  var jsonprams: any = JSON.stringify(this.componentdetails);
  //  console.log(this.componentdetails)
  //  var spsname = "[AWS].[sp_insert_Packaging]";
  //  //var connection: string = "";
  //  var fd = new FormData();
  //  //fd.set('connection', connection)
  //  fd.set('JSONFileparams', jsonprams)
  //  fd.set('spname', spsname)
  //  console.log(jsonprams)
  //  return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC", fd, { responseType: 'text' })
  //}



  savecomponent() {
    const component = {
       ComponentName: this.ComponentName,
       Specification: this.Specification,
       Size: this.Size,
       UnitCost: this.UnitCost,
       ImageName: this.ImageName,
       ImageUrl: this.ImageUrl,
       packagingID: this.packagingID,
       operation: "Insert"
     };
    console.log(component)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
    .subscribe(
      (response) => {
        console.log('Data inserted successfully:', response);
        this.openSnackBar('Component saved successfully', 'close');
      },
      (error) => {
        console.error('Error inserting data:', error);
        if (error && error.error && error.error.errors) {
          const validationErrors = error.error.errors;
          console.log('Validation errors:', validationErrors);
        }
        this.openSnackBar('Failed to save Component', 'close');
      }
    );

    
  }




  Updatecomponent() {
    const component = {
      ComponentName: this.ComponentName,
      Specification: this.Specification,
      Size: this.Size,
      UnitCost: this.UnitCost,
      ImageName: this.ImageName,
      ImageUrl: this.ImageUrl,
      packagingID: this.packagingID,
      operation: "Update"
    };
    console.log(component)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          this.openSnackBar('Component saved successfully', 'close');
        },
        (error) => {
          console.error('Error inserting data:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          }
          this.openSnackBar('Failed to save Component', 'close');
        }
      );


  }


  openDatePicker() {
    this.showDatePickerFlag = !this.showDatePickerFlag; // Toggle the visibility of the date picker
  }

  handleDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.uploadFiles(files);
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.uploadFiles(files);
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Here you can implement your logic to upload each file
      console.log('Uploading file:', file);
    }
  }


  packagingloaddata() {
    var query: string = "SELECT * from [AWS].[tbl_Packaging] where ID='" + this.packagingID +"'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }


  Cleardata() {
    this.ComponentName = " ";
    this.Specification = " ";
    this.Size = " ";
    this.UnitCost = " ";
    this.ImageName = " ";
    this.ImageUrl = " ";
  }



  packagingdata(cstmrdata: any) {
    for (let item of cstmrdata) {

      this.ComponentName = item.ComponentName;
      this.Specification = item.Specification;
      this.Size = item.Size;
      this.UnitCost = item.UnitCost;
      this.ImageName = item.ImageName;
    }

  }

  ngOnInit() {
    this.packagingID = this.data.displaydata;
    console.log(this.packagingID)
    if (this.packagingID == "" || this.packagingID == undefined || this.packagingID == null) {
      this.hidsave = false
      this.hidupdate = true
    }
    else {
      this.hidsave = true
      this.hidupdate = false
      this.packagingloaddata().subscribe((packagingloaddata) => {
        console.warn("packagingloaddata", packagingloaddata)
        this.loadpackagingloaddata = packagingloaddata
        this.packagingdata(this.loadpackagingloaddata)

      })
    }
   
  }

}
