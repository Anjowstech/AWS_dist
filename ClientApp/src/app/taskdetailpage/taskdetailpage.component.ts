import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsgBoxComponent } from 'src/app/msg-box/msg-box.component';
import { MAT_DIALOG_DATA, MatDialog, } from '@angular/material/dialog';
import { DataShareServiceService } from 'src/app/data-share-service.service';
import { CreatesupplierComponent } from '../createsupplier/createsupplier.component';
@Component({
  selector: 'app-taskdetailpage',
  templateUrl: './taskdetailpage.component.html',
  styleUrls: ['./taskdetailpage.component.css']
})
export class TaskdetailpageComponent {
  rowClicked: any;
  rowClicked1: any;
  Category: string = "";
  OrderManagementList: any;
  QA: any;
  filterMetadata = { count: 0 };
  searchband: string = '';
  Searchcategory: string = '';
  Searchproduct: string = '';
  //OrderManagementList = [
  //  { ProductTask: "Task List", TaskID: "1", TaskName: "Date", Supplier: "Chocovic", Location: "India", PMI: "Chocovic", Name: "Sahil Gupta", Designation: "GM", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N001", ProdcutDescription: "Saji" },
  //  { ProductTask: "Marketing Research", TaskID: "2", TaskName: "Date", Supplier: "Chocovic", Location: "USA", PMI: "Esah(Rulio Tea Company)", Name: "Bijit Sharma", Designation: "CEO", ContactNo: "9876543210", Status: "Order Completed", PurOrderNo: "PO00N002", ProdcutDescription: "Anjo" },
  //  { ProductTask: "Marketing Research", TaskID: "3", TaskName: "Date", Supplier: "Chocovic", Location: "Moracco", PMI: "Cooperative Mahi Coop", Name: "Mandar Tilak", Designation: "GM", ContactNo: "9876543210", Status: "Product Shipped", PurOrderNo: "PO00N003", ProdcutDescription: "John" },
  //  { ProductTask: "Task Detail", TaskID: "4", TaskName: "Date", Supplier: "Chocovic", Location: "Brazil", PMI: "Worldwide Trade Solutions", Name: "Saneesh Thomas", Designation: "CEO", ContactNo: "9876543210", Status: "Reached Warehouse", PurOrderNo: "PO00N004", ProdcutDescription: "Liwa" },
  //  { ProductTask: "Supplier Changed", TaskID: "5", TaskName: "Date", Supplier: "Chocovic", Location: "Mexico", PMI: "Chocovic", Name: "Jessica garcia", Designation: "GM", ContactNo: "9876543210", Status: "Clearence Completed", PurOrderNo: "PO00N005" },
  //  { ProductTask: "QA approved", TaskID: "6", TaskName: "Date", Supplier: "Chocovic", Location: "Germany", PMI: "Esah(Rulio Tea Company)", Name: "Joseph", Designation: "CEO", ContactNo: "9876543210", Status: "Branding Completed", PurOrderNo: "PO00N006", ProdcutDescription: "Anjo" },
  //  { ProductTask: "Certification approved", TaskID: "7", TaskName: "Date", Supplier: "Chocovic", Location: "Spain", PMI: "Cooperative Mahi Coop", Name: "Fatima", Designation: "GM", ContactNo: "9876543210", Status: "Product Shipped", PurOrderNo: "PO00N007", ProdcutDescription: "Biji" },
  //];
  //suppliersection = [
  //  { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Available", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Available", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Nil", PMI: "GM", Status: "Out of Stock", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "Saji", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Nil", PMI: "GM", Status: "Enquired", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "lm@srmfoods.com", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Nil", PMI: "GM", Status: "Enquired", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  //];
  //QA = [
  //  { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Waiting for approval", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Sent for approval", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Out of Stock", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "Saji", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Processing", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "lm@srmfoods.com", Updateddate: "Nil", Select: "" },
  //  { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Rejected", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  //];
  certifications = [
    { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Under Review", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Fail", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Valid", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "Saji", Updateddate: "Nil", Select: "" },
    { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Valid", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "lm@srmfoods.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "	Expired", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  ];
  upload = [
    { SupplierName: "Al Ain Co-Op", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Processing", ContactName: "Hala Nasser", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avinash.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Earth (Hypermarket, Supermarket, Mart)", ProductID: "Nil", LocationID: "Nil", Pl: "Nil", Type: "Nil", PMI: "Nil", Status: "Processing", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "jk@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Head to Market Trading Company", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Uploaded", ContactName: "Abdulla Aljenaibi", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "Liwa Gate (Liwa Mart)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "Approved", ContactName: "Mahesh Rajendran", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "avisds.kasinathan@censanext.com", Updateddate: "Nil", Select: "" },
    { SupplierName: "SRS (ShreeRamSales)", ProductID: "Chocovic", LocationID: "India", Pl: "Chocovic", Type: "Sahil Gupta", PMI: "GM", Status: "	Uploaded", ContactName: "Jatin Girdhar", ContactNo: "+91 9998765432", Email: "rm@srmfoods.com", Website: "rm@srmfoods.com", Updateddate: "Nil", Select: "" },
  ];
  StatusList = [{ Status: "Enquired" }, { Status: "Available" }, { Status: "Out of Stock" }];
  StatusListqa = [{ Status: "Rejected" }, { Status: "Processing" }, { Status: "Sent for approval" }, { Status: "Waiting for approval" }];
  Statuscertifications = [{ Status: "Under Review" }, { Status: "Valid" }, { Status: "Fail" }, { Status: "Expired" }];
  Statusupload = [{ Status: "Processing" }, { Status: "Uploaded" }, { Status: "Approved" }];
  suppliernameselection: string = '';
  supplierselctionStatus: any = [];
  qasuppliername: string = '';
  taskDescription: string = '';
  priceselection: string = '';
  priceLeadtime: string = '';
  Paymentterms: string = '';
  supplierDescription: string = '';
  suppliernamecertifications: string = '';
  qaStatus: any = [];
  cStatus: any = [];
  uploadStatus: any = [];
  suppliersection: any;
  suppliernameupload: string = '';
  Searchbrand: string = '';
  SearchCategory: string = '';
  SearchProduct: string = '';
  Searchregion: string = '';
  SupplierCode: string = '';
  qastatus: string = '';
  supplierassignment: string = '';
  supplierassigned: string = '';
  supplerselectidetil: any;
  chnagestatussuppplier: any;
  supplierdata: any;
  suplliertasdetilal: firsttabdata[][] = [];
  selectedSuppliers: { TaskID: string, SupplierID: string, ProductID: string, Status: string, AssignedTo: string, Comments: string, Price: string }[] = [];
  marketresarch: any;
  //saji
  taskname: string = '';
  taskmainstatus: string = '';
  i: number = 0;
  j: number = 0;
  TaskID: string = '';
  taskmaindescription: string = '';
  qaassignment: string = '';
  qadescription: string = '';
  qasavedetilsadd: any;
  bloburlqa: string = '';
  selectedSuppliers1: { TaskID: string, SupplierID: string, ProductID: string, Status: string, AssignedTo: string, Comments: string }[] = [];
  //marketresarch = [
  //  { Productimage: "https://firebasestorage.googleapis.com/v0/b/fifth-compiler-381605.appspot.com/o/beatuytdf.webp?alt=media&token=aff396d1-b371-45f4-a891-634c47a86ab8", ProductName: "Shampoo", Category: "Cosmetics", COO: "Nil", MarketName: "Shampoo", AwsName: "Shampoo", Comments: "Comments", MarketPrice: "$10", AWSPrice: "$7", Select: "" },
  //  { Productimage: "https://firebasestorage.googleapis.com/v0/b/fifth-compiler-381605.appspot.com/o/grocery1.jpg?alt=media&token=32592f0c-f98e-4b25-ae7c-f54a9fd32b6d", ProductName: "Coffe", Category: "Coffe", COO: "Nil", MarketName: "Coffepowder", AwsName: "Coffe", Comments: "Comments", MarketPrice: "$4", AWSPrice: "$2", Select: "" },
  //  { Productimage: "https://firebasestorage.googleapis.com/v0/b/fifth-compiler-381605.appspot.com/o/81IYIByQW%2BL.jpg?alt=media&token=9866bbda-d81e-4325-a65f-57abcc9607d2", ProductName: "Jaam", Category: "Jaam", COO: "Nil", MarketName: "Jaam", AwsName: "Jaam", Comments: "Comments", MarketPrice: "$1", AWSPrice: "$2", Select: "" },
  //];
  constructor(private http: HttpClient, public dialog: MatDialog, private dialogRef: MatDialog, private datashare: DataShareServiceService) { }
  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }
  setvalue(item: any) {
    this.suppliernameselection = item.SupplierName;
    this.supplierselctionStatus = item.Address;
    this.SupplierCode = item.SupplierCode;

  }
  changeTableRowColormarket(idx: any) {
    if (this.rowClicked1 === idx) this.rowClicked1 = -1;
    else this.rowClicked1 = idx;
  }
  setvaluemarket(item: any) {
    this.Category = item.Product;
    this.suppolierload().subscribe((suuplierloadc) => {
      console.warn("suuplierloadc", suuplierloadc)
      this.suppliersection = JSON.parse(suuplierloadc);
      this.suppliersection = this.suppliersection;
    })
  }
  setvalueqa(item: any) {
    this.qasuppliername = item.SupplierName;
    this.qaStatus = item.Status;
  }
  setvaluecertifications(item: any) {
    this.suppliernamecertifications = item.SupplierName;
    this.cStatus = item.Status;
  }
  setupload(item: any) {
    this.suppliernameupload = item.SupplierName;
    this.uploadStatus = item.Status;
  }
  //onCheckboxChange(item: any, event: any) {
  //  if (event.target.checked === true) {

  //    this.selectedSuppliers.add(item.SupplierName);
  //  } else {
  //    this.selectedSuppliers.delete(item.SupplierName);
  //  }
  //}
  //onCheckboxChange(item: any, event: any) {
  //  if (this.taskmainstatus == '' || this.supplierassignment == '') {
  //    this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Please select status and assigned person before sumbmitting the product' } });
  //    event.target.checked = false; // Uncheck the checkbox
  //    item.checked = false; // Reflect this change in the data model
  //    return; // Exit the function
  //  } else {
  //    const supplierProduct = { TaskID: this.TaskID.toString(), SupplierID: item.SupplierID.toString(), ProductID: item.ProductID.toString(), Status: this.taskmainstatus, AssignedTo: this.supplierassignment, Comments: this.taskmaindescription, Price: item.SupplierPrice.toString() };

  //    if (event.target.checked) {
  //      if (!this.selectedSuppliers.some(sp => sp.TaskID === supplierProduct.TaskID && sp.SupplierID === supplierProduct.SupplierID && sp.ProductID === supplierProduct.ProductID && sp.Status === supplierProduct.Status && sp.AssignedTo === supplierProduct.AssignedTo && sp.Comments === supplierProduct.Comments && sp.Price === supplierProduct.Price)) {
  //        this.selectedSuppliers.push(supplierProduct);
  //      }
  //    } else {
  //      this.selectedSuppliers = this.selectedSuppliers.filter(sp => !(sp.TaskID === supplierProduct.TaskID && sp.SupplierID === supplierProduct.SupplierID && sp.ProductID === supplierProduct.ProductID && sp.Price === supplierProduct.Price));
  //    }
  //  }
  //}
  qasave() {
    if (this.taskmainstatus == '' || this.qaassignment == '') {
      var messagebox = "validations";
    } else {
      this.qasavedata().subscribe((qadatdetails: any) => {
        console.warn("qadatdetails", qadatdetails)
        this.qasavedetilsadd = qadatdetails
        if (this.qasavedetilsadd == "saved") {
          this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Qa Submitted sucessfully' } });
        }
      })
    }
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
  assignedchangeqa(event: any) {
    this.qaassignment = event.target.value;
  }
  uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Here you can implement your logic to upload each file
      console.log('Uploading file:', file);
    }
  }
  qasavedata() {
    const qaadddata = JSON.stringify(this.selectedSuppliers1);
    const formData = new FormData();
    formData.append('qaadddatadetails', qaadddata);

    return this.http.post("", formData, {
      responseType: 'text'
    });
  }
  onCheckboxChange(item: any, event: any) {
    // Automatically uncheck the checkbox if taskmainstatus is empty
    if (item.SupplierPrice === null || item.SupplierPrice === undefined) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Please Add SupplierPrice  before sumbmitting the product' } });
      event.target.checked = false; // Uncheck the checkbox
      item.checked = false; // Reflect this change in the data model
      return; // Exit the function
    }
    if (this.taskmainstatus == '' || this.supplierassignment == '') {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Please select status and assigned person before sumbmitting the product' } });
      event.target.checked = false; // Uncheck the checkbox
      item.checked = false; // Reflect this change in the data model
      return; // Exit the function
    }

    const supplierProduct = {
      TaskID: this.TaskID.toString(),
      SupplierID: item.SupplierID.toString(),
      ProductID: item.ProductID.toString(),
      Status: this.taskmainstatus,
      AssignedTo: this.supplierassignment,
      Comments: this.taskmaindescription,
      Price: item.SupplierPrice.toString()
    };

    if (event.target.checked) {
      if (!this.selectedSuppliers.some(sp => sp.TaskID === supplierProduct.TaskID && sp.SupplierID === supplierProduct.SupplierID && sp.ProductID === supplierProduct.ProductID && sp.Status === supplierProduct.Status && sp.AssignedTo === supplierProduct.AssignedTo && sp.Comments === supplierProduct.Comments && sp.Price === supplierProduct.Price)) {
        this.selectedSuppliers.push(supplierProduct);
        item.checked = true; // Reflect this change in the data model
      }
    } else {
      this.selectedSuppliers = this.selectedSuppliers.filter(sp => !(sp.TaskID === supplierProduct.TaskID && sp.SupplierID === supplierProduct.SupplierID && sp.ProductID === supplierProduct.ProductID && sp.Price === supplierProduct.Price));
      item.checked = false; // Reflect this change in the data model
    }
  }
  onCheckboxChangeqa(item: any, event: any) {
    // Automatically uncheck the checkbox if taskmainstatus is empty
    if (item.Price === null || item.Price === undefined) {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Please Add SupplierPrice  before sumbmitting the product' } });
      event.target.checked = false; // Uncheck the checkbox
      item.checked = false; // Reflect this change in the data model
      return; // Exit the function
    }
    if (this.taskmainstatus == '' || this.qaassignment == '') {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Please select qA assignedperson   before sumbmitting the qa' } });
      event.target.checked = false; // Uncheck the checkbox
      item.checked = false; // Reflect this change in the data model
      return; // Exit the function
    }

    const supplierProduct1 = {
      TaskID: this.TaskID.toString(),
      SupplierID: item.SupplierID.toString(),
      ProductID: item.ProductID.toString(),
      Status: this.taskmainstatus,
      AssignedTo: this.qaassignment,
      Comments: this.qadescription,
    };

    if (event.target.checked) {
      if (!this.selectedSuppliers1.some(sp => sp.TaskID === supplierProduct1.TaskID && sp.SupplierID === supplierProduct1.SupplierID && sp.ProductID === supplierProduct1.ProductID && sp.Status === supplierProduct1.Status && sp.AssignedTo === supplierProduct1.AssignedTo && sp.Comments === supplierProduct1.Comments)) {
        this.selectedSuppliers1.push(supplierProduct1);
        item.checked = true; // Reflect this change in the data model
      }
    } else {
      this.selectedSuppliers1 = this.selectedSuppliers1.filter(sp => !(sp.TaskID === supplierProduct1.TaskID && sp.SupplierID === supplierProduct1.SupplierID && sp.ProductID === supplierProduct1.ProductID));
      item.checked = false; // Reflect this change in the data model
    }
  }
  supplierloadcategory() {
    var spsname = "[AWS].[Sp_Select_TaskDetailTaskList]"
    var parameter = this.Category;
    var clientid = '';
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "pending")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("https://genericwebservicemaxpower.azurewebsites.net/SelectSpwithparam", fd)
  }

  //suppplierselctiondata() {
  //  var jsonprams: any = JSON.stringify(this.selectedSuppliers);
  //  var fd = new FormData();
  //  fd.set('JSONFileparams', jsonprams)
  //  console.log(jsonprams)
  //  return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/suppliersave", jsonprams, { responseType: 'text' })
  //}
  suppplierselctiondata() {
    const jsonParams = JSON.stringify(this.selectedSuppliers);
    const formData = new FormData();
    formData.append('JSONFileparams', jsonParams);

    return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/suppliersave", formData, {
      responseType: 'text'
    });
  }
  //suppolierload() {
  //  var spname = "[AWS].[Sp_Select_MRSupplier]";
  //  let params1 = new HttpParams().set('spname', spname);
  //  return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })
  //}
  //suppolierload() {
  //  var spsname = "[AWS].[Sp_Select_MRSupplier]"
  //  var parameter = "Sweet and sault savoury";
  //  var fd = new FormData()
  //  fd.set('spname', spsname)
  //  fd.set('parameter', parameter)
  //  fd.set('spparameter', 'Sweet and sault savoury')
  //  return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam", fd)
  //}
  //suppolierload() {
  //  var Query = "SELECT distinct a.ID as SupplierID,a.SupplierName,isnull(b.Price, 0) as SupplierPrice,d.Name as Location,PL,h.ProductCategoryName Category,PMI,g.StatusDescription as [Status],'' ContactName,PhoneNo as ContactNo, Email, Website, [Website-2], a.Updateddate, c.ProductID, c.Product from AWS.tbl_Supplier a left join aws.tbl_Product c on a.ProductID = c.ProductID left join aws.tbl_Location d on a.LocationID = d.LocationID left join aws.tbl_Designation e on a.DesignationID = e.DesignationID left join aws.tbl_Brand f on a.BrandID = f.BrandID left join(select StatusId, StatusType, StatusDescription from[AWS].[tbl_Status] where StatusType = 'Supplier Selection' and ActiveStatus = 'Y') g on a.statusid = g.StatusId left join[AWS].[tbl_ProductCategory] h on a.ProductCategoryID = h.ProductCategoryID left join aws.tbl_SupplierPrice b on a.ID = b.SupplierID and a.ProductID = b.ProductID and ActiveStatus = 'Y' where c.Product = '" + this.Category +"'";
  //  let catparams1 = new HttpParams().set('spname', Query);
  //  console.log(catparams1);
  //  return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: catparams1 })
  //}
  suppolierload() {
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_MRSupplier]",
      parameter: this.Category,
      spparameter: "@ProductName"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  //marketreachload() {
  //  var spname = "[AWS].[Sp_Select_MRTaskList]";
  //  let params1 = new HttpParams().set('spname', spname);
  //  return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })

  //}
  marketreachload(taskid: any) {
    var taskidetail = taskid.toString();
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_TaskDetailTaskList]",
      parameter: taskidetail,
      spparameter: "@TaskId"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  //qaload() {
  //  var spname = "[AWS].[Sp_Select_SupplierSelectedList]";
  //  let params1 = new HttpParams().set('spname', spname);
  //  return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })

  //}
  qaload() {
    var taskidetail = this.TaskID.toString();
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_SupplierSelectedList]",
      parameter: taskidetail,
      spparameter: "@TaskId"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  taskhistorydata() {
    var query: string = "SELECT Date,ActivityDetails,a.Updatedby LastUpdatedby,b.ModuleName from aws.tbl_Workflow a join aws.tbl_Modules b on a.ModuleID = b.ModuleID";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('spname', query);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLLOADEXEC", { params: params1, })
  }
  //taskhistorydata() {
  //  const selectspparam = {
  //    connection: "",
  //    spname: "[AWS].[sp_Select_TaskHistory]",
  //    parameter: "1",
  //    spparameter: "@TaskID"
  //  }
  //  console.log(selectspparam)
  //  return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  //}
  statustaskmain(event: any) {
    this.taskmainstatus = event.target.value;
  }
  assignedchangesupplier(event: any) {
    this.supplierassignment = event.target.value;
  }
  statuschngesupplier(event: any) {
    this.chnagestatussuppplier = event.target.value;

  }
  supplierassignedchange(event: any) {
    this.supplierassigned = event.target.value;
  }
  qastatuschange(event: any) {
    this.qastatus = event.target.value;
  }
  createsupplier() {
    const dialogRef = this.dialog.open(CreatesupplierComponent, {
      width: '80%', height: '80%', disableClose: true
    });
  }
  onRowClicksuplier(supplier: any): void {
    //console.log('Clicked row:', supplier);   
    //const dialogRef = this.matDialog.open(SupplierEditComponent, {
    //  width: '80%',
    //  height: '85%',
    //  data: supplier 
    //});

    //dialogRef.afterClosed().subscribe(result => {

    //  console.log('Dialog closed with result:', result);
  
    //});
  }
  suppliersave() {
    if (this.taskmainstatus == '' || this.supplierassignment == '') {
      this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'validation error' } });
    } else {
      this.suppplierselctiondata().subscribe((suppliersave: any) => {
        console.warn("suppliersave", suppliersave)
        this.supplerselectidetil = suppliersave
        if (this.supplerselectidetil == "saved") {
          this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: 'Product Submitted sucessfully' } });
          this.qaload().subscribe((qadata) => {
            console.warn("qadata", qadata)
            this.QA = JSON.parse(qadata);
            this.QA = this.QA;
          })
        }
      })
    }
  }

  ngOnInit() {
    var taskdata = this.datashare.gettasidfrmtasklist();
    this.TaskID = taskdata;
    this.datashare.sendtaskdetail([]);
    //this.suppolierload().subscribe((loadworkflow: any) => {
    //  console.warn("loadworkflow", loadworkflow)
    //  this.suppliersection = loadworkflow
    //})
    this.marketreachload(this.TaskID).subscribe((marketdata1: any) => {
      console.warn("marketdata1", marketdata1)
      this.marketresarch = JSON.parse(marketdata1);
      this.marketresarch = this.marketresarch;
      this.taskname = this.marketresarch[0].TaskName;
      this.TaskID = this.marketresarch[0].TaskID;
    })
    this.taskhistorydata().subscribe((history) => {
      console.warn("history", history)
      this.OrderManagementList = history
    })
    this.qaload().subscribe((qadata) => {
      console.warn("qadata", qadata)
      this.QA = JSON.parse(qadata);
      this.QA = this.QA;
    })
  }
}
export class firsttabdata {
  TaskID: string = '';
  SupplierID: string = '';
  ProductID: string = '';
  BrandID: string = '';
  CategoryID: string = '';
  Leadtime: string = '';
  Pay: string = '';
  StatusID: string = '';
  Description: string = '';
  TaskDetailDescription: string = '';
  SupplierUpdatesDescription: string = '';
  supplierassigned: string = '';
}
