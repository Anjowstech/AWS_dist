import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';


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
  constructor(public dialog: MatDialog, private http: HttpClient,) {



  }


  Componentsubmitdetails() {
    var jsonprams: any = JSON.stringify(this.componentdetails);
    console.log(this.componentdetails)
    var spsname = "[AWS].[sp_insert_Packaging]";
    //var connection: string = "";
    var fd = new FormData();
    //fd.set('connection', connection)
    fd.set('JSONFileparams', jsonprams)
    fd.set('spname', spsname)
    console.log(jsonprams)
    return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC", fd, { responseType: 'text' })
  }



  savecomponent() {
    console.log(this.componentdetails)
    this.componentdetails[0] = ([{
      ComponentName: this.ComponentName,
      Specification: this.Specification,
      Size: this.Size,
      UnitCost: this.UnitCost,
      ImageName: this.ImageName,
      ImageUrl: this.ImageUrl,
   


    }])
    console.log(this.componentdetails)
    this.Componentsubmitdetails().subscribe((Componentsubmitdetails) => {
      console.warn("Componentsubmitdetails", Componentsubmitdetails)
      this.dataComponentsubmitdetails = Componentsubmitdetails

      if (this.dataComponentsubmitdetails == "success") {


       this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Component saved sucessfully." } });

      }

    })
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




  Cleardata() {
    this.ComponentName = " ";
    this.Specification = " ";
    this.Size = " ";
    this.UnitCost = " ";
    this.ImageName = " ";
    this.ImageUrl = " ";
  }

  ngOnInit() {
  }

}
