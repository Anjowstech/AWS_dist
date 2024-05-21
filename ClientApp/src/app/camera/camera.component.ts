import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AzureBlobStorageService } from 'src/app/azure-blob-storage.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit { 
  @ViewChild("video")
  public video!: ElementRef;
  fileToUploadprodimage: any;
  uploadfilenameprodimage: any;
  TaskId: any ="3";
  //ImageName: any ="Jam";
  //ImageUrl: any ="https://umbilerawfiles.blob.core.windows.net/awsmisdbx%2FBranding/jam.PNG";
  Description: any ="test";
  photodetails: any = [];
  @ViewChild("canvas")
  public canvas!: ElementRef;

  public captures: Array<any>;

  public constructor(public dialog: MatDialog, private http: HttpClient, private blobService: AzureBlobStorageService,) {
    this.captures = [];
  }
  public ngOnInit() { }

  public ngAfterViewInit() {
    let _video = this.video.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          _video.srcObject = stream;
          _video.play();
        });
        }
  }
  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }



  handleFileInputproductimage(event: any) {
    const files: FileList = event.target.files;
    this.fileToUploadprodimage = files[0];
    this.uploadfilenameprodimage = files[0].name;

    this.photodetails.push({
      "name": this.uploadfilenameprodimage,
      "file": this.fileToUploadprodimage
    })
    console.log(this.photodetails)

    //this.blobService.AddProdimage(this.fileToUploadprodimage, this.uploadfilenameprodimage, this.TaskDetailID, this.BrandID, () => {

    //  this.Prodimageloaddata().subscribe((Prodimageloaddata) => {
    //    console.warn("Prodimageloaddata", Prodimageloaddata)
    //    this.loadProdimageloaddata = Prodimageloaddata
    //    this.uploadfilenameprodimage = this.loadProdimageloaddata[0].product_image_name
    //    this.bloburlprodimage = this.loadProdimageloaddata[0].ProdImageUrlID


    //  })
    //})
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

  public submitphotos() {
    for (var i = 0; i <= this.photodetails.length; i++) {
      this.blobService.MRimages(this.photodetails[i].file, this.photodetails[i].name, this.TaskId, () => {
      })
    }
  
   
  }

}
