import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AzureBlobStorageService } from 'src/app/azure-blob-storage.service';
import { VoiceRecognitionService } from 'src/app/service/voice-recognition.service'

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css'],

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
  fileToUpload: any;
  uploadfilename: any;
  brandid: any;
  StopComponentname: boolean = true;
  ListenComponentname: boolean = false;
  Stopspecification: boolean = true;
  Listenspecification: boolean = false;
  Stopsize: boolean = true;
  Listensize: boolean = false;
  Stopcost: boolean = true;
  Listencost: boolean = false;

  filedrop: boolean = false
  fileshow: boolean = true
  constructor(public dialog: MatDialog, private http: HttpClient, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private blobService: AzureBlobStorageService, public service: VoiceRecognitionService) {
    this.service.init()
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


  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files[0];
    this.uploadfilename = files[0].name;

    console.log(this.fileToUpload, this.uploadfilename)
  }


  savecomponent() {
    if (this.ComponentName == "" || this.ComponentName == undefined || this.ComponentName == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the component name." } });
    }
    else if (this.Specification == "" || this.Specification == undefined || this.Specification == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the specification." } });
    }

    else if (this.Size == "" || this.Size == undefined || this.Size == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the size of the component." } });
    }
    else if (this.UnitCost == "" || this.UnitCost == undefined || this.UnitCost == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the cost of the component.." } });
    }
    else {

      if (this.uploadfilename == "" || this.uploadfilename == null || this.uploadfilename == undefined) {
        const component = {
          ComponentName: this.ComponentName,
          Specification: this.Specification,
          Size: this.Size,
          UnitCost: this.UnitCost.toString(),
          ImageName: "",
          ImageUrl: "",
          packagingID: this.packagingID,
          operation: "Insert",
          brandid: this.brandid
        };
        console.log(component)
        this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
          .subscribe(
            (response) => {
              console.log('Data inserted successfully:', response);
              this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Component saved successfully." } });
            },
            (error) => {
              console.error('Error inserting data:', error);
              if (error && error.error && error.error.errors) {
                const validationErrors = error.error.errors;
                console.log('Validation errors:', validationErrors);
              }
              //this.openSnackBar('Failed to save Component', 'close');
            }
          );
      }
      else {
        this.blobService.savecomponent(this.fileToUpload, this.uploadfilename, this.ComponentName, this.Specification, this.Size, this.UnitCost, this.packagingID, this.brandid ,() => {
          this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Component saved successfully." } });

        })
      }
    }
  }



  Updatecomponent() {
    if (this.ComponentName == "" || this.ComponentName == undefined || this.ComponentName == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the component name." } });
    }
    else if (this.Specification == "" || this.Specification == undefined || this.Specification == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the specification." } });
    }

    else if (this.Size == "" || this.Size == undefined || this.Size == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the size of the component." } });
    }
    else if (this.UnitCost == "" || this.UnitCost == undefined || this.UnitCost == null) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Enter the cost of the component.." } });
    }
    else {
      if (this.uploadfilename == "" || this.uploadfilename == null || this.uploadfilename == undefined) {
        const component = {
          ComponentName: this.ComponentName,
          Specification: this.Specification,
          Size: this.Size,
          UnitCost: this.UnitCost.toString(),
          ImageName: "",
          ImageUrl: "",
          packagingID: this.packagingID,
          operation: "Update",
          brandid:this.brandid
        };
        console.log(component)
        this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
          .subscribe(
            (response) => {
              console.log('Data inserted successfully:', response);
              this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Component updated successfully." } });
            },
            (error) => {
              console.error('Error inserting data:', error);
              if (error && error.error && error.error.errors) {
                const validationErrors = error.error.errors;
                console.log('Validation errors:', validationErrors);
              }
              //this.openSnackBar('Failed to save Component', 'close');
            }
          );
      }
      else {
        this.blobService.Updatecomponent(this.fileToUpload, this.uploadfilename, this.ComponentName, this.Specification, this.Size, this.UnitCost, this.packagingID, this.brandid, () => {

          this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Component updated successfully." } });

        })
      }
    }
  }

  //savecomponent() {
  //  const component = {
  //     ComponentName: this.ComponentName,
  //     Specification: this.Specification,
  //     Size: this.Size,
  //     UnitCost: this.UnitCost,
  //     ImageName: this.ImageName,
  //     ImageUrl: this.ImageUrl,
  //     packagingID: this.packagingID,
  //     operation: "Insert"
  //   };
  //  console.log(component)
  //  this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
  //  .subscribe(
  //    (response) => {
  //      console.log('Data inserted successfully:', response);
  //      this.openSnackBar('Component saved successfully', 'close');
  //    },
  //    (error) => {
  //      console.error('Error inserting data:', error);
  //      if (error && error.error && error.error.errors) {
  //        const validationErrors = error.error.errors;
  //        console.log('Validation errors:', validationErrors);
  //      }
  //      this.openSnackBar('Failed to save Component', 'close');
  //    }
  //  );

    
  //}




  //Updatecomponent() {
  //  const component = {
  //    ComponentName: this.ComponentName,
  //    Specification: this.Specification,
  //    Size: this.Size,
  //    UnitCost: this.UnitCost,
  //    ImageName: this.ImageName,
  //    ImageUrl: this.ImageUrl,
  //    packagingID: this.packagingID,
  //    operation: "Update"
  //  };
  //  console.log(component)
  //  this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
  //    .subscribe(
  //      (response) => {
  //        console.log('Data inserted successfully:', response);
  //        this.openSnackBar('Component saved successfully', 'close');
  //      },
  //      (error) => {
  //        console.error('Error inserting data:', error);
  //        if (error && error.error && error.error.errors) {
  //          const validationErrors = error.error.errors;
  //          console.log('Validation errors:', validationErrors);
  //        }
  //        this.openSnackBar('Failed to save Component', 'close');
  //      }
  //    );


  //}


  openDatePicker() {
    this.showDatePickerFlag = !this.showDatePickerFlag; // Toggle the visibility of the date picker
  }

  handleDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }

  //handleFileInput(event: any) {
  //  const files: FileList = event.target.files;
  //  this.uploadFiles(files);
  //}

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



 

  startServiceComponentname() {
    this.service.start()
    this.StopComponentname = false;
    this.ListenComponentname = true;
  }

  stopServiceComponentname() {
    this.service.stop()
    this.ComponentName = this.service.text
    this.service.text = ""
    this.StopComponentname = true;
    this.ListenComponentname = false;
  }

  startServicespecification() {
    this.service.start()
    this.Stopspecification = false;
    this.Listenspecification = true;
  }

  stopServicespecification() {
    this.service.stop()
    this.Specification = this.service.text
    this.service.text = ""
    this.Stopspecification = true;
    this.Listenspecification = false;
  }


  startServicesize() {
    this.service.start()
    this.Stopsize = false;
    this.Listensize = true;
  }

  stopServicesize() {
    this.service.stop()
    this.Size = this.service.text
    this.service.text = ""
    this.Stopsize = true;
    this.Listensize = false;
  }

 
  startServicecost() {
    this.service.start()
    this.Stopcost = false;
    this.Listencost = true;
  }

  stopServicecost() {
    this.service.stop()
    this.UnitCost = (Number(this.service.text)).toString()
    this.service.text = ""
    this.Stopcost = true;
    this.Listencost = false;
  }



  ngOnInit() {
    console.log(this.data.displaydata)
    this.packagingID = this.data.displaydata[0];
    this.brandid = this.data.displaydata[1];

    console.log(this.packagingID)
    if (this.packagingID == " " || this.packagingID == undefined || this.packagingID == null || this.brandid == " " || this.brandid == undefined || this.brandid == null || this.brandid=="") {
      this.hidsave = false
      this.hidupdate = true
      this.packagingID = 0
      this.brandid = 0
    }
    else {
    this.hidsave = true
      this.hidupdate = false
      this.filedrop = true
      this.fileshow =false
      this.packagingloaddata().subscribe((packagingloaddata) => {
        console.warn("packagingloaddata", packagingloaddata)
        this.loadpackagingloaddata = packagingloaddata
        this.packagingdata(this.loadpackagingloaddata)

      })
    }
   
  }

}
