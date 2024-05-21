import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddComponentComponent } from 'src/app/branding/add-component/add-component.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AzureBlobStorageService } from 'src/app/azure-blob-storage.service';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import * as JsBarcode from 'jsbarcode';
import { VoiceRecognitionService } from '../service/voice-recognition.service'

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css'],
  providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }, VoiceRecognitionService]

})
export class BrandingComponent {
  @ViewChild('barcode', { static: false }) barcode: ElementRef | any;
  Listen: boolean = false;
  Stop: boolean = true;
  BrandingList: any = []
  Auditlist: any = [];
  active: any;
  innerTabset: any;
  loadpackagingloaddata: any;
  packagingID: any;
  fileToUpload: any;
  uploadfilename: any;
  BrandID: any;
  loadartworkloaddata: any;
  loadApproveloaddata: any;
  region1: any = "No";
  region2: any = "No";
  region3: any = "No";
  region4: any = "No";
  region5: any = "No";
  region6: any = "No";
  loadProdimageloaddata: any;
  fileToUploadregion1: any;
  uploadfilenameregion1: any;
  fileToUploadregion2: any;
  uploadfilenameregion2: any;
  fileToUploadregion3: any;
  uploadfilenameregion3: any;
  fileToUploadregion4: any;
  uploadfilenameregion4: any;
  fileToUploadregion5: any;
  uploadfilenameregion5: any;
  fileToUploadregion6: any;
  uploadfilenameregion6: any;
  brandingtabshid:boolean =true
  TaskDetailID: any
  Warnings: any;
  Directions: any;
  Questions: any;
  proddescription: any;
  prodapplication: any;
  prodtechinfo: any;
  Uses: any;

  statusClicked: any;

  approvalsavelist: any = [];
  Brandingstatus:any;
  loadBrandstatusloaddata: any;
  barname: any = '000000000000';
  fileToUploadprodimage: any
  uploadfilenameprodimage: any;
  brandname: any =" ";


  Listenbrandname: boolean = false;
  Stopbrandname: boolean = true;
  Listenuses: boolean = false;
  Stopuses: boolean = true;
  Listenwarnings: boolean = false;
  Stopwarnings: boolean = true;
  StopDirections: boolean = true;
  ListenDirections: boolean = false;
  StopQuestions: boolean = true;
  ListenQuestions: boolean = false;
  StopProdspec: boolean = true;
  ListenProdspec: boolean = false;
  StopProdappln: boolean = true;
  ListenProdappln: boolean = false;
  Stopotherinfo: boolean = true;
  Listenotherinfo: boolean = false;

  SupplierID: any;
  ProductID: any;
  CategoryID: any;
  AssignedTo: any;
  Comments: any;
  hidbarcode: boolean = true
  hidbrandstatus: boolean =false
  constructor(public dialog: MatDialog, private http: HttpClient, private blobService: AzureBlobStorageService,public service: VoiceRecognitionService) {
    this.service.init()
  }

  wait(ms:any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  } 

  Createcomponent() {
    var datacomponent = [" ", this.BrandID]
    console.log(datacomponent)
    const dialogRef = this.dialog.open(AddComponentComponent, {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: { displaydata: datacomponent }
    })
    dialogRef.afterClosed().subscribe(result => {
      var data = result;
      this.wait(3000);
      this.packagingloaddata().subscribe((packagingloaddata) => {
        console.warn("packagingloaddata", packagingloaddata)
        this.loadpackagingloaddata = packagingloaddata
      })


    })
  }


  //update packaging
  selectpackaginggrid(rowvalue: any) {
    this.packagingID = rowvalue.ID
    var datacomponent = [this.packagingID, this.BrandID]
    console.log(datacomponent)
    const dialogRef = this.dialog.open(AddComponentComponent, {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: { displaydata: datacomponent }// Pass the selected packagingID  to the dialog
   
    })
    dialogRef.afterClosed().subscribe(result => {
      var data = result;
      this.wait(3000);
      this.packagingloaddata().subscribe((packagingloaddata) => {
        console.warn("packagingloaddata", packagingloaddata)
        this.loadpackagingloaddata = packagingloaddata
      })


    })
    
  }



  //branding grid load
  brandingloaddata() {
    var query: string = "[AWS].[Sp_Select_BrandingTaskList]";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1, })
  }



  //packaging grid load
  packagingloaddata() {
    var query: string = "SELECT * from [AWS].[tbl_Packaging] where BrandingId ='" + this.BrandID +"'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }



  //Artwork load
  artworkloaddata() {
    var query: string = "SELECT * from [AWS].[tbl_artwork]  where BrandingID ='" + this.BrandID  +"'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }





 

  handleFileInputartwork(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files[0];
    this.uploadfilename = files[0].name;
    this.blobService.AddArtwork(this.fileToUpload, this.uploadfilename, this.BrandID, () => {
       this.artworkloaddata().subscribe((artworkloaddata) => {
      console.warn("artworkloaddata", artworkloaddata)
      this.loadartworkloaddata = artworkloaddata


    })

    })
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
  //Approvals branding



  Approveloaddata() {
    var query: string = "SELECT * from  [AWS].[tbl_branding_approval] where Brandid ='" + this.BrandID + "'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }

  handleFileInputapproval(event: any) {
    const files: FileList = event.target.files;
    this.fileToUploadregion1 = files[0];
    this.uploadfilenameregion1 = files[0].name;

    this.blobService.brandingapprovals(this.fileToUploadregion1, this.uploadfilenameregion1, this.BrandID, (Number(this.TaskDetailID)).toString(), "documentApproval", () => {

      this.Approveloaddata().subscribe((Approveloaddata) => {
        console.warn("Approveloaddata", Approveloaddata)
        this.loadApproveloaddata = Approveloaddata

      })
    })
  
  }


  //loadprodimage
  Prodimageloaddata() {
    var query: string = "SELECT * from AWS.tbl_branding where Brandid ='" + this.BrandID + "' ";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }
  handleFileInputproductimage(event: any) {
    const files: FileList = event.target.files;
    this.fileToUploadprodimage = files[0];
    this.uploadfilenameprodimage = files[0].name;

    this.blobService.AddProdimage(this.fileToUploadprodimage, this.uploadfilenameprodimage, this.TaskDetailID, this.BrandID, () => {

      this.Prodimageloaddata().subscribe((Prodimageloaddata) => {
        console.warn("Prodimageloaddata", Prodimageloaddata)
        this.loadProdimageloaddata = Prodimageloaddata
        this.uploadfilenameprodimage = this.loadProdimageloaddata[0].product_image_name
        

      })
    })
  }




  //Submitbranding

  Submitbranding() {
    if (this.Brandingstatus == "" || this.Brandingstatus == null || this.Brandingstatus == undefined) {

      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Please select the status" } });
    }
    else {

      if (this.barname == "" || this.barname == null || this.barname == undefined) {
        this.barname =" "
      }
      if (this.Uses == "" || this.Uses == null || this.Uses == undefined) {
        this.Uses = " "
      }

      if (this.Warnings == "" || this.Warnings == null || this.Warnings == undefined) {
        this.Warnings = " "
      }

      if (this.Directions == "" || this.Directions == null || this.Directions == undefined) {
        this.Directions = " "
      }

      if (this.Questions == "" || this.Questions == null || this.Questions == undefined) {
        this.Questions = " "
      }

      if (this.proddescription == "" || this.proddescription == null || this.proddescription == undefined) {
        this.proddescription = " "
      }

      if (this.prodapplication == "" || this.prodapplication == null || this.prodapplication == undefined) {
        this.prodapplication = " "
      }

      if (this.prodtechinfo == "" || this.prodtechinfo == null || this.prodtechinfo == undefined) {
        this.prodtechinfo = " "
      }

      if (this.uploadfilenameprodimage == "" || this.uploadfilenameprodimage == null || this.uploadfilenameprodimage == undefined) {
        this.uploadfilenameprodimage = " "
      }

      if (this.TaskDetailID == "" || this.TaskDetailID == null || this.TaskDetailID == undefined) {
        this.TaskDetailID = 0
      }

      if (this.SupplierID == "" || this.SupplierID == null || this.SupplierID == undefined) {
        this.SupplierID = 0
      }

      if (this.ProductID == "" || this.ProductID == null || this.ProductID == undefined) {
        this.ProductID = 0
      }

      if (this.CategoryID == "" || this.CategoryID == null || this.CategoryID == undefined) {
        this.CategoryID = 0
      }
      
      const brandingdata = {
        TaskID: this.TaskDetailID,
        SupplierID: this.SupplierID,
        ProductID: this.ProductID,
        CategoryID: this.CategoryID,
        BrandidURL: this.barname,
        Uses: this.Uses,
        Warnings: this.Warnings,
        Directions: this.Directions,
        Questions: this.Questions,
        Product_description: this.proddescription,
        Applications: this.prodapplication,
        Technical_Information: this.prodtechinfo,
        brandingstatus: this.Brandingstatus,
        product_image_name: this.uploadfilenameprodimage,
        brand_name: this.brandname,
        AssignedTo: this.AssignedTo,
        Comments: ""
      }
    
      console.log(brandingdata)
      this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/BrandingSubmit', brandingdata)
        .subscribe(
          (response) => {
            console.log('Data inserted successfully:', response);
            this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Branding submitted successfully." } });

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
  

    
  
  }


  //clickbrandgrid to load

  clickbrandinggrid(rowvalue: any,index:any) {

    console.log(index)
    this.brandingtabshid = false
    this.hidbrandstatus = false
    if (this.statusClicked === index) {
      this.statusClicked = -1;
    }
    else {
      this.statusClicked = index;
    }
    this.BrandID = rowvalue.BrandID
    this.TaskDetailID = rowvalue.TaskID
    this.SupplierID = rowvalue.SupplierID,
    this.ProductID = rowvalue.ProductID,
    this.CategoryID = rowvalue.CategoryID,
      this.AssignedTo = rowvalue.AssignedTo,
      this.Brandingstatus = rowvalue.brandingstatus
    console.log(this.BrandID, this.TaskDetailID, this.SupplierID, this.ProductID, this.CategoryID, this.Brandingstatus)

   
    this.artworkloaddata().subscribe((artworkloaddata) => {
      console.warn("artworkloaddata", artworkloaddata)
      this.loadartworkloaddata = artworkloaddata
    })
    this.packagingloaddata().subscribe((packagingloaddata) => {
      console.warn("packagingloaddata", packagingloaddata)
      this.loadpackagingloaddata = packagingloaddata
    })
    this.Approveloaddata().subscribe((Approveloaddata) => {
      console.warn("Approveloaddata", Approveloaddata)
      this.loadApproveloaddata = Approveloaddata

    })
    this.Brandstatusloaddata().subscribe((Brandstatusloaddata) => {
      console.warn("Brandstatusloaddata", Brandstatusloaddata)
      this.loadBrandstatusloaddata = Brandstatusloaddata
    })

    this.Prodimageloaddata().subscribe((Prodimageloaddata) => {
      console.warn("Prodimageloaddata", Prodimageloaddata)
      this.loadProdimageloaddata = Prodimageloaddata
      this.Brandingdata(this.loadProdimageloaddata)
      if (this.barname == "" || this.barname == undefined || this.barname == null) {
        this.hidbarcode = true
      }
      else {
        this.hidbarcode =false
        this.geraBarCode();
      }
    })

  }

  Cleardata() {
    this.TaskDetailID = "";
    this.BrandID = "";
    this.barname = "";
    this.Uses = "";
    this.Warnings = "";
    this.Directions = "";
    this.Questions = "";
    this.proddescription = "";
    this.prodapplication = "";
    this.prodtechinfo = "";
    this.Brandingstatus = "";
    this.uploadfilenameprodimage = "";
    this.brandname = "";
  }


  Brandingdata(cstmrdata: any) {
    this.Cleardata();
    for (let item of cstmrdata) {
      this.TaskDetailID = item.TaskDetailID
      this.BrandID = item.BrandID
      this.barname = item.BrandidURL
      this.Uses = item.Uses
      this.Warnings = item.Warnings
      this.Directions = item.Directions
      this.Questions = item.Questions
      this.proddescription = item.Product_description
      this.prodapplication = item.Applications
      this.prodtechinfo = item.Technical_Information
      this.Brandingstatus = item.brandingstatus
      this.uploadfilenameprodimage = item.product_image_name
      this.brandname = item.brand_name
    }

  }
  //statusload
  Brandstatusloaddata() {
    var query: string = "SELECT * from aws.tbl_Status where ModuleID =5";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }




  //barcodegenerate

  geraBarCode() {
    if (this.barname.length < 12 && this.barname != "") {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Your Input has the wrong length or contains characters,which can not be encoded with the barcode with 12-digit UPC-A format' } });
    }
    else {
      this.hidbarcode = false;
      JsBarcode(this.barcode.nativeElement, this.barname, {
        format: 'CODE128',
      });
    }
  }



  startServicebrandname() {
    this.service.start()
    this.Stopbrandname = false;
    this.Listenbrandname = true;
  }

  stopServicebrandname() {
    this.service.stop()
    this.brandname = this.service.text
    this.service.text =""
    this.Stopbrandname = true;
    this.Listenbrandname = false;
  }


  startServiceuses() {
    this.service.start()
    this.Stopuses = false;
    this.Listenuses = true;
  }

  stopServiceuses() {
    this.service.stop()
    this.Uses = this.service.text
    this.service.text = ""
    this.Stopuses = true;
    this.Listenuses = false;
  }


  startServicewarnings() {
    this.service.start()
    this.Stopwarnings = false;
    this.Listenwarnings = true;
  }

  stopServicewarnings() {
    this.service.stop()
    this.Warnings = this.service.text
    this.service.text = ""
    this.Stopwarnings = true;
    this.Listenwarnings = false;
  }
  startServiceDirections() {
    this.service.start()
    this.StopDirections = false;
    this.ListenDirections = true;
  }

  stopServiceDirections() {
    this.service.stop()
    this.Directions = this.service.text
    this.service.text = ""
    this.StopDirections = true;
    this.ListenDirections = false;
  }


  startServiceQuestions() {
    this.service.start()
    this.StopQuestions = false;
    this.ListenQuestions = true;
  }

  stopServiceQuestions() {
    this.service.stop()
    this.Questions = this.service.text
    this.service.text = ""
    this.StopQuestions = true;
    this.ListenQuestions = false;
  }



  startServiceProdspec() {
    this.service.start()
    this.StopProdspec = false;
    this.ListenProdspec = true;
  }

  stopServiceProdspec() {
    this.service.stop()
    this.proddescription = this.service.text
    this.service.text = ""
    this.StopProdspec = true;
    this.ListenProdspec = false;
  }
  startServiceProdappln() {
    this.service.start()
    this.StopProdappln = false;
    this.ListenProdappln = true;
  }

  stopServiceProdappln() {
    this.service.stop()
    this.prodapplication = this.service.text
    this.service.text = ""
    this.StopProdappln = true;
    this.ListenProdappln = false;
  }


  startServiceotherinfo() {
    this.service.start()
    this.Stopotherinfo = false;
    this.Listenotherinfo = true;
  }

  stopServiceotherinfo() {
    this.service.stop()
    this.prodtechinfo = this.service.text
    this.service.text = ""
    this.Stopotherinfo = true;
    this.Listenotherinfo = false;
  }



    //SupplierReport() {
    //  const selectspparam = {
    //    connection:"",
    //    spname: "[AWS].[Sp_Select_MRSupplier_Comparison]",
    //    parameter: "aws@123",
    //    spparameter: "@SupplierName"
    //  }
    //  console.log(selectspparam)
    //  return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType:'text' })
    // }


  ngOnInit() {
    //this.SupplierReport().subscribe((SupplierReport) => {
    //  console.warn("SupplierReport", SupplierReport)
    //  var SupplierReportdata = SupplierReport
    //  console.log(SupplierReportdata)
    //})

    this.brandingloaddata().subscribe((brandingloaddata) => {
      console.warn("brandingloaddata", brandingloaddata)
      this.BrandingList = brandingloaddata
    })

    this.packagingloaddata().subscribe((packagingloaddata) => {
      console.warn("packagingloaddata", packagingloaddata)
      this.loadpackagingloaddata = packagingloaddata


    })
    this.Brandstatusloaddata().subscribe((Brandstatusloaddata) => {
      console.warn("Brandstatusloaddata", Brandstatusloaddata)
      this.loadBrandstatusloaddata = Brandstatusloaddata
    })
   
  
  }

}
