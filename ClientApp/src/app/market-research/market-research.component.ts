import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../camera/camera.component'
import { ViewImagesComponent } from '../view-images/view-images.component'
import { AzureBlobStorageService } from 'src/app/azure-blob-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-market-research',
  templateUrl: './market-research.component.html',
  styleUrls: ['./market-research.component.css']
})
export class MarketResearchComponent implements OnInit  {
  datapcc: any = [];
  OrderManagementList: any = []
  Auditlist: any = [];
  active: any;
  productdescription: any;
  ngtaskname: any;
  ngproduct: any;
  picturefile1: any;
  ngcategory: any;
  ngstatus: any;
  MRdetails: any = [];
  TaskDetailId: any;
  ProductName: any;
  COO: any;
  MarketName: any; 
  AWSName: any;
  MarketPrice: any;
  AWSPrice: any;
  Updatedby: any;
  Comments: any;
  ActiveStatus: any;
  ID: any;
  Category: any;

  constructor( public dialog: MatDialog, private http: HttpClient, private blobService: AzureBlobStorageService,) { }
  opencamera() {
    const dialogRef = this.dialog.open(CameraComponent, {
      width: '50%', height: '70%', disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //     console.log('The dialog was closed', result);

      if (result != "") {
      
      }
    });
  }
  viewimages() {
    const dialogRef = this.dialog.open(ViewImagesComponent, {
      width: '50%', height: '70%', disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //     console.log('The dialog was closed', result);

      if (result != "") {

      }
    });
  }

  submittaskMR() {
    this.MRdetails[0] = ([{
      TaskDetailId: this.TaskDetailId,
      ProductName: this.ProductName,
      COO:this.COO,
      MarketName:this.MarketName,
      AWSName:this.AWSName,
      Comments: this.Comments,
      MarketPrice: this.MarketPrice,
      AWSPrice: this.AWSPrice,
      Updatedby: this.Updatedby,
      ActiveStatus:this.ActiveStatus,
      ID:this.ID

    }])
    var JSONFileparams: string = JSON.stringify(this.MRdetails);
    console.log(JSONFileparams)
    var spname: string = "[AWS].[SP_Update_MarketResearch]";

    const genericspdata = {
      JSONFileparams: JSONFileparams,
      spname: spname
    }

    console.log(genericspdata)
    this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC', genericspdata, { responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);

        },
        (error) => {
          console.error('Error inserting data:', error);
          if (error && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          }
        }
      );
  }
  ngOnInit() {

  }

}

