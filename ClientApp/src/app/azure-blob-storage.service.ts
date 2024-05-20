import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {
  // Enter your storage account name
  picturesAccount = "umbilerawfiles";
  picturesContainer = "awsmisdbx/Branding";   // container name
  token = "sp=racwdli&st=2024-05-15T12:31:50Z&se=2025-05-14T20:31:50Z&sv=2022-11-02&sr=c&sig=xu%2B6bEZzZST8CrJmkBB8eflkHD1ptievkWOZv7RS%2FZM%3D";
  imgedata:string=""

  PicContainer: string="";
  constructor(private http: HttpClient) { }

  public updateshipmentupload( content: Blob, name: string, ShipmentId: string, OrderId: string, TrackingId: string, TaskName: string, EstimatedDeliveryTime: string, Location: string, Status: string, Description: string, handler: () => void) {

    this.PicContainer = "awsmisdbx/Branding";

    const blockBlobClient = this.containerClient2(this.token, this.PicContainer).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
    blobUrl: blockBlobClient.url
    let blobimage = blockBlobClient.url
    console.log(blobimage)
    var image = blobimage.split("?")
    this.imgedata = image[0];

    if (this.imgedata == "" || this.imgedata == undefined || this.imgedata == null) {
      this.imgedata == ""
    }
    if (name == "" || name == undefined || name == null) {
      name == ""
    }
    const shipment = {
      ShipmentId: ShipmentId,
      OrderId: OrderId,
      TrackingId: TrackingId,
      TaskName: TaskName,
      EstimatedDeliveryTime: EstimatedDeliveryTime,
      Location: Location,
      Status: Status,
      Description: Description,
      BlobPath: this.imgedata,
      UploadFile: name,
    };
    console.log(shipment)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/Updateshipment', shipment)
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
    this.uploadBlob(content, name, this.containerClient2(this.token, this.PicContainer), handler)
    //if (this.dataload == "Success") {
    //  return "Success"
    //}
  }

  public savecomponent(content: Blob, name: string, ComponentName: string, Specification: string, Size: string, UnitCost: string, packagingID: string, brandid:string,  handler: () => void) {

    this.PicContainer = "awsmisdbx/Branding";

    const blockBlobClient = this.containerClient2(this.token, this.PicContainer).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
    blobUrl: blockBlobClient.url
    let blobimage = blockBlobClient.url
    console.log(blobimage)
    var image = blobimage.split("?")
    this.imgedata = image[0];

    if (this.imgedata == "" || this.imgedata == undefined || this.imgedata == null) {
      this.imgedata == ""
    }
    if (name == "" || name == undefined || name == null) {
      name == ""
    }

    const component = {
      ComponentName: ComponentName,
      Specification: Specification,
      Size: Size,
      UnitCost: UnitCost,
      ImageName: name,
      ImageUrl: this.imgedata,
      packagingID: packagingID,
      operation: "Insert",
      brandid: brandid
    };
    console.log(component)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          //this.openSnackBar('Component saved successfully', 'close');
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
    this.uploadBlob(content, name, this.containerClient2(this.token, this.PicContainer), handler)
    //if (this.dataload == "Success") {
    //  return "Success"
    //}
  }

  public Updatecomponent(content: Blob, name: string, ComponentName: string, Specification: string, Size: string, UnitCost: string, packagingID: string, brandid: string, handler: () => void) {

    this.PicContainer = "awsmisdbx/Branding";

    const blockBlobClient = this.containerClient2(this.token, this.PicContainer).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
    blobUrl: blockBlobClient.url
    let blobimage = blockBlobClient.url
    console.log(blobimage)
    var image = blobimage.split("?")
    this.imgedata = image[0];

    if (this.imgedata == "" || this.imgedata == undefined || this.imgedata == null) {
      this.imgedata == ""
    }
    if (name == "" || name == undefined || name == null) {
      name == ""
    }

    const component = {
      ComponentName: ComponentName,
      Specification: Specification,
      Size: Size,
      UnitCost: UnitCost,
      ImageName: name,
      ImageUrl: this.imgedata,
      packagingID: packagingID,
      operation: "Update",
      brandid: brandid
    };
    console.log(component)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/addcomponent', component)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          //this.openSnackBar('Component saved successfully', 'close');
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
    this.uploadBlob(content, name, this.containerClient2(this.token, this.PicContainer), handler)
    //if (this.dataload == "Success") {
    //  return "Success"
    //}
  }



  public AddArtwork(content: Blob, name: string, BrandingID: string,handler: () => void) {

    this.PicContainer = "awsmisdbx/Branding";

    const blockBlobClient = this.containerClient2(this.token, this.PicContainer).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
    blobUrl: blockBlobClient.url
    let blobimage = blockBlobClient.url
    console.log(blobimage)
    var image = blobimage.split("?")
    this.imgedata = image[0];

    if (this.imgedata == "" || this.imgedata == undefined || this.imgedata == null) {
      this.imgedata == ""
    }
    if (name == "" || name == undefined || name == null) {
      name == ""
    }

    const artwork = {
      BrandingID: BrandingID,
      Picturefile: name,
      Bloburl: this.imgedata,
    };
    console.log(artwork)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/artwork', artwork)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          //this.openSnackBar('Component saved successfully', 'close');
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
    this.uploadBlob(content, name, this.containerClient2(this.token, this.PicContainer), handler)
    //if (this.dataload == "Success") {
    //  return "Success"
    //}
  }

  public AddProdimage(content: Blob, name: string, TaskDetailID: string, BrandID:string, handler: () => void) {

    this.PicContainer = "awsmisdbx/Branding";

    const blockBlobClient = this.containerClient2(this.token, this.PicContainer).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
    blobUrl: blockBlobClient.url
    let blobimage = blockBlobClient.url
    console.log(blobimage)
    var image = blobimage.split("?")
    this.imgedata = image[0];

    if (this.imgedata == "" || this.imgedata == undefined || this.imgedata == null) {
      this.imgedata == ""
    }
    if (name == "" || name == undefined || name == null) {
      name == ""
    }

    const Prodimage = {
      TaskDetailID: TaskDetailID,
      BrandID: BrandID,
      product_image_name: name,
      ProdImageUrlID: this.imgedata,
    };
    console.log(Prodimage)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/AddProdimage', Prodimage)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          //this.openSnackBar('Component saved successfully', 'close');
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
    this.uploadBlob(content, name, this.containerClient2(this.token, this.PicContainer), handler)
    //if (this.dataload == "Success") {
    //  return "Success"
    //}
  }


  public brandingapprovals(content: Blob, name: string, Brandid: string, Region: string, Regionapprovalstatus: string, handler: () => void) {

    this.PicContainer = "awsmisdbx/Branding";

    const blockBlobClient = this.containerClient2(this.token, this.PicContainer).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
    blobUrl: blockBlobClient.url
    let blobimage = blockBlobClient.url
    console.log(blobimage)
    var image = blobimage.split("?")
    this.imgedata = image[0];

    if (this.imgedata == "" || this.imgedata == undefined || this.imgedata == null) {
      this.imgedata == ""
    }
    if (name == "" || name == undefined || name == null) {
      name == ""
    }

    const approvals = {
      Brandid: Brandid,
      Region: Region,
      Regionapprovalstatus: Regionapprovalstatus,
      Filename: name,
      Bloburl: this.imgedata,
    };
    console.log(approvals)
    this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/BrandingApproval', approvals)
      .subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
          //this.openSnackBar('Component saved successfully', 'close');
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
    this.uploadBlob(content, name, this.containerClient2(this.token, this.PicContainer), handler)
    //if (this.dataload == "Success") {
    //  return "Success"
    //}
  }




  private uploadBlob(content: Blob, name: string, client: ContainerClient, handler: () => void) {
    let blockBlobClient = client.getBlockBlobClient(name);
    let bloburl = client.url;
    blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
  }
  public async listImages(): Promise<string[]> {
    let result: string[] = []
    let blobs = this.containerClient(this.token).listBlobsFlat();
    for await (const blob of blobs) {
      result.push(blob.name)
    }
    return result;
  }
  public containerClient(sas: string): ContainerClient {
    let token = this.token;
    return new BlobServiceClient(`https://${this.picturesAccount}.blob.core.windows.net?${token}`)
      .getContainerClient(this.picturesContainer);
  }


  public containerClient2(sas: string, picContainer: string): ContainerClient {
    let token = this.token;

    return new BlobServiceClient(`https://${this.picturesAccount}.blob.core.windows.net?${token}`)
      .getContainerClient(picContainer);
  }

}
