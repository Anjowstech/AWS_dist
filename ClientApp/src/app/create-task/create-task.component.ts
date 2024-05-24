import { Component, Inject, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MsgBoxComponent } from '../msg-box/msg-box.component';
import { formatDate } from '@angular/common';
import { DataShareServiceService } from 'src/app/data-share-service.service';
declare var webkitSpeechRecognition: any;
interface AddTask {
  TaskName: string ;
  IntiallyAssigned: string;
  Description: string ;
  Brand: string ;
  ProductCategory: string ;
  Status: string;
 
  Department: string;
  Duedate: string ;
  Assigneddate: string;
 
  DocURL: string ;
  
}
interface UpdateTask {
  TaskID: string;
  TaskName: string;
/*  IntiallyAssigned: string;*/
  Description: string;
  Brand: string;
  ProductCategory: string;
  Status: string;
  CurrentlyAssigned: string;
  Department: string;
  Duedate: string;
  Assigneddate: string;

  DocURL: string;

}
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  TaskName: any;
  IntiallyAssigned: any="";
  Description: string="";
  Brand: string ="--Please enter---";
  ProductCategory: any ="--Please enter---";
  Status: string="Task created";
  Department: string="Purchase department";
  Duedate: any="";
  Assigneddate: any="";
  isproductsave: boolean = false;
  isproductupdate: boolean = true;
  iscreatehead: boolean = false;
  isedithead: boolean = true;
  istaskname: boolean=false;
  loadtaskdata: any = [];
  brand_load_data: any = [];
  category_load_data: any = [];
  department_load_data: any = [];
  assign_load_data: any = [];
  results: any;
  CurrentlyAssigned: string = "";
  user: any;
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialog, private datashare: DataShareServiceService) { }
  currentDate: any;
  placeholderText: string = 'Custom Placeholder';
  showDatePickerFlag: boolean = false;
  inserttask: insertdata[][] = [];
  item:any;
  //TaskName: any;
  //AssignTo: string = "";
  //fileupload = "";
  //error: any;
  //IntiallyAssigned: string = "";
  //Description: string = "";
  //Brand: string = "";
  //ProductCategory: string = "";
  //Status: string = "";
  //Department: string = "";
  //Duedate: string = "";
  AssignedDate: string = "";
  Inserteddate: string = "";
  DocURL: string = "";

  TaskID: any;
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
  startListening() {

    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      vSearch.onresult = (e: any) => {
        //   console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
        this.results = e.results[0][0].transcript;
        this.getResult();
        // console.log(this.results);
        vSearch.stop();

      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }
  getResult() {
    this.TaskName = this.results.replace(".", "");
    //  console.log(this.results);
  }
  //Addbrand(): void {


  //  const dialogRef = this.dialog.open(AddbrandComponent, {
  //    width: '30%', height: '25%', disableClose: true
  //  });
  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed', result);



  //  });
  //}
  //Addcategory(): void {


  //  const dialogRef = this.dialog.open(AddcategoryComponent, {
  //    width: '30%', height: '25%', disableClose: true
  //  });
  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed', result);



  //  });
  //}
  //Addstatus(): void {


  //  const dialogRef = this.dialog.open(AddstatusComponent, {
  //    width: '30%', height: '25%', disableClose: true
  //  });
  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed', result);



  //  });
  //}
  //Addeartment(): void {


  //  const dialogRef = this.dialog.open(AddDepartmentComponent, {
  //    width: '30%', height: '25%', disableClose: true
  //  });
  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed', result);



  //  });
  //}
  //addtask() :void{

  //  const entity: AddTask = {
  //    taskName: this.taskname,
  //    IntiallyAssigned: this.assignto,
  //    description: this.description,
  //    Brand: this.brand,
  //    ProductCategory: this.category,
  //    Status: this.status,
  //    Department: this.department,
  //    Duedate: this.duedate,
  //    AssignedDate: this.assigndate,
  //    Inserteddate: this.createddate,
  //    DocURL: "",
  //    operation: "Insert"

  //  };


  //  /*var jsonprams: any = JSON.stringify(this.inserttask);*/
  //  // console.log(this.inserttechniciatn)
  //  /*var operation="Inserted"*/
  //  /*var spsname = "[makpower].[Sp_insert_Technicians]";*/
  //  this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/CreateUpdateSupplier', entity)

  //  // console.log(params1)


  //}
  //updatetask() {

  //  const entity: AddTask = {
  //    operation: "Insert",
  //    TaskName: "applesAS",
  //    Description: "food",
  //    Duedate: "2024/05/31",
  //    AssignedDate: "2024/05/31",
  //    IntiallyAssigned: "praveen",
  //    Status: "Inprogress",
  //    Inserteddate: "2024/05/31",
  //    DocURL: "string",
  //    Department: "FOOD",
  //    Brand: "nesto",
  //    ProductCategory: "fruits"



  //  };
  statusdata() {


    var spname = "[AWS].[Sp_Select_statusList]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })
    //var fd = new FormData()
    //fd.set('spname', spname)
    ///*fd.set('clientid', clientid)*/
    //return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", fd)

  }
  brand_dropdownload() {


    var spname = "[AWS].[Sp_Select_brand]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })
    

  }
  category_dropdownload() {


    var spname = "[AWS].[Sp_Select_ProductCategory]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })


  }
  assignedto_dropdownload() {


    var spname = "[AWS].[Sp_Select_AssignedTo]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })


  }
  department_dropdownload() {


    var spname = "[AWS].[Sp_Select_DepartmentList]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })


  }
assignto_dropdownload() {


  var spname = "[AWS].[Sp_Select_AssignedTo]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })


  }
   

  addtask() {
    const entity: AddTask = {
      
      TaskName: this.TaskName,
      Description: this.Description,
      Duedate: this.Duedate,
      Assigneddate: this.Assigneddate,
      IntiallyAssigned: this.IntiallyAssigned,
      Status: this.Status,
      DocURL: this.DocURL,
      Department: this.Department,
      Brand: this.Brand,
      ProductCategory: this.ProductCategory,
      /*operation: "insert"*/
    };
    if (this.TaskName == null) {
      alert("please enter the task name")
    } else if (this.Brand == '--Please enter---') {
      this.Brand = "";
    } else if (this.ProductCategory == '--Please enter---') {
      this.ProductCategory = "";
    } else
        {
                this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/AddTask', entity)
                    .subscribe((response) => {
                      console.log('Data inserted successfully:', response);
                      response.statusMessage =="Task Added"
                      if (response.statusMessage == "Task Added") {
                        this.dialogRef.closeAll();
                        this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Task is created successfully." } });
                      }
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
  }
  updatetask() {
    const entity: UpdateTask = {
     
      TaskName: this.TaskName,
      Description: this.Description,
      Duedate: this.Duedate,
      Assigneddate: this.Assigneddate,
     /* IntiallyAssigned: this.IntiallyAssigned,*/
      CurrentlyAssigned: this.IntiallyAssigned,
      Department: this.Department,
      Status: this.Status,
      Brand: this.Brand,
      DocURL: this.DocURL,
    
     
      ProductCategory: this.ProductCategory,
      TaskID: this.TaskID.toString(),
      /*operation: "insert"*/
    };
    if (this.TaskName == null) {
    
    } else {
      this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/UpdateTask', entity)
        .subscribe((response) => {
          console.log('Data Updated successfully:', response);
          response.statusMessage == "Task Updated"
        
          if (response.statusMessage == "Task Updated") {
            this.dialogRef.closeAll();
            this.dialog.open(MsgBoxComponent, { width: 'auto', height: 'auto', data: { displaydata: "Ticket is updated successfully." } });
          }
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
  }


  
  ngOnInit() {
  
    this.user = this.datashare.getuser();
    this.IntiallyAssigned = this.user;
    this.Assigneddate = formatDate((new Date()), 'MM/dd/yyyy', 'en-US');
    this.statusdata().subscribe((loadtask) => {

      console.warn("loadtask", loadtask)
     
      this.loadtaskdata = loadtask;
    
    })
    this.brand_dropdownload().subscribe((brand_load) => {

      console.warn("brand_load", brand_load)

      this.brand_load_data = brand_load;

    })
    this.assignto_dropdownload().subscribe((assignto_load) => {

      console.warn("assignto_load", assignto_load)

      this.assign_load_data = assignto_load;

    })
    this.category_dropdownload().subscribe((category_load) => {

      console.warn("category_load", category_load)

      this.category_load_data = category_load;

    })
    this.department_dropdownload().subscribe((department_load) => {

      console.warn("department_load", department_load)

      this.department_load_data = department_load;

    })

    var detailsdata: any = this.data.displaydata;
 
    if (this.data.displaydata == undefined) {
     
      this.isproductsave = false;
      this.isproductupdate = true;
      this.iscreatehead= false;
      this.isedithead = true;
      this.IntiallyAssigned = this.user;
    
      this.Duedate = new Date().toISOString().split('T')[0];
}
    else {
      this.istaskname = true;
      this.iscreatehead = true;
      this.isedithead = false;
      this.isproductsave = true;
      this.isproductupdate = false;
     
      this.TaskID = this.data.displaydata[0];
      this.TaskName = this.data.displaydata[1];
      this.IntiallyAssigned = this.data.displaydata[2];

      this.Description = this.data.displaydata[3];
   /*   this.Duedate = this.data.displaydata[4];*/
      this.Brand = this.data.displaydata[4];
      this.ProductCategory = this.data.displaydata[5];
      this.Status = this.data.displaydata[6];
      this.Department = this.data.displaydata[7];
      this.Duedate = this.data.displaydata[8];
      this.Assigneddate = this.data.displaydata[9];
    
    
    /*  this.DocURL = this.data.displaydata[10];*/
      
      //this.Brand = this.data.displaydata[9];
      //this.ProductCategory = this.data.displaydata[10];

    }
    

  }

}
export class insertdata {
  taskname: string = "";
  assignto: string = "";
  description: string = "";
  brand: string = "";
  category: string = "";
  status: string = "";
  department: string = "";
  duedate: string = "";
  assigndate: string = "";
  createddate: string = "";
  fileupload: string = "";
  operation: string = "Insert";
}

