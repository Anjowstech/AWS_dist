
import { Component, Inject, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WorkflowComponent } from '../workflow/workflow.component';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  AssignedTaskList = [
    { TaskID: "1", TaskName: "AFRA FOODS APRICOT JAM 375G (GLASS JAR)", Brand: "European Garden", Category: "JAMS", Product: "Food", DueDate: "30-04-2024", Assigenddate: "01-01-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "Praveen", Status: "InProgress", Department: "Clearance", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "skincare-products.jpg" },
    { TaskID: "2", TaskName: "AFRA FOODS BAKED BEANS IN TOMATO SAUCE 220G (CANNED)", Brand: "AFRA Foods", Category: "SAUCES", Product: "Food", DueDate: "15-04-2024", Assigenddate: "01-02-2024", InitiallyAssigned: "Mehfooz", CurrentlyAssigned: "Lalu", Status: "InProgress", Department: "Orders", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "8ozbottle.webp" },
    { TaskID: "3", TaskName: "Daily Bite FOODS BAKED BEANS IN TOMATO SAUCE 400G (CANNED)", Brand: "Daily Byte", Category: "SAUCES", Product: "Food", DueDate: "18-04-2024", Assigenddate: "01-03-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "Shekar", Status: "Pending for approval", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "download icon.png" },
    { TaskID: "4", TaskName: "Delita FOODS BBQ SAUCE ORIGINAL 18 OZ (510G)", Brand: "Delita", Category: "SAUCES", Product: "Food", DueDate: "19-04-2024", Assigenddate: "01-01-2024", InitiallyAssigned: "Mehfooz", CurrentlyAssigned: "Sharaz", Status: "Pending for approval", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "8ozbottle.webp" },
    { TaskID: "5", TaskName: "Oil Tree FOODS BLENDED VEG COOKING OIL PET BOTTLE W/H 1.5L", Brand: "Oil Tree", Category: "Cooking Oil", Product: "Oil", DueDate: "25-04-2024", Assigenddate: "01-04-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "ere", Status: "Not started", Department: "Design", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "skincare-products.jpg" },
    { TaskID: "6", TaskName: "Raya FOODS CHICK PEAS 400G (CANNED)", Brand: "RAYA", Category: "Canned", Product: "Food", DueDate: "28-04-2024", Assigenddate: "01-05-2024", InitiallyAssigned: "Mehfooz", CurrentlyAssigned: "yuu", Status: "Completed", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "8ozbottle.webp" },
    { TaskID: "7", TaskName: "Super Tasty FOODS CHICKEN LUNCHEON MEAT 200G", Brand: "SUPER Tasty", Category: "Meat", Product: "Food", DueDate: "30-04-2024", Assigenddate: "01-05-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "uoo", Status: "Approved", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "skincare-products.jpg" },
  ];
  filterMetadata = { count: 0 };
  ngtaskname: string = "";
  ngstatus: string = "";
  ngbrand: string = "";
  ngcategory: string = "";
  ngproduct: string = "";
  ngassigneddate: string = "";
  ngassignedto: string = "";
  ngdepartment: string = "";

  loadtaskdata: any = [];
  TodayDate: any;

  i: any;
  j: any;
  uniqueDataProduct: any;
  uniqueDataBrand: any;
  uniqueDataCategory: any;
  uniqueDataAssigned: any;
  uniqueDataDepartment: any;
  ngSearch: string = "";
  selectedFile: any;
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) { }
  ViewAWSWorkFlow(rowvalue: any) {
    var data = [rowvalue]

    const dialogRef = this.dialog.open(WorkflowComponent, {
      height: '70%',
      width: '50%',
      data: { displaydata: data }, disableClose: true
    });
  }
  openedittask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '80%', height: '80%', disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //     console.log('The dialog was closed', result);

      if (result != "") {

      }
    });

  }
  CreateTask(rowvalue: any) {
    //const dialogRef = this.dialog.open(CreateTaskComponent, {
    //  height: '85%',
    //  width: '80%',
    //  disableClose: true
    //});
  }

  ViewImage(rowvalue: any) {
    //var data = [rowvalue]

    //const dialogRef = this.dialog.open(ViewImagesComponent, {
    //  height: '70%',
    //  width: '30%',
    //  data: { displaydata: data }, disableClose: true
    //});
  }


  OpenTaskReport(rowvalue: any) {
    var data = [rowvalue]

    //const dialogRef = this.dialog.open(TaskReportComponent, {
    //  height: '80%',
    //  width: '80%',
    //  disableClose: true,
    //  data: { displaydata: data }
    //});
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  opentaskdetail() {
    this.router.navigate(['/main/TaskdetailpageComponent']);
  }

  statusfilter(status: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngstatus = status.toLowerCase();
    if (filterValueLowerngstatus != "" || filterValueLowerngstatus != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Status.toLowerCase().includes(filterValueLowerngstatus));
    }

  }

  brandfilter(brand: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngbrand = brand.toLowerCase();
    if (filterValueLowerngbrand != "" || filterValueLowerngbrand != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Brand.toLowerCase().includes(filterValueLowerngbrand));
    }
  }

  categoryfilter(category: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngcategory = category.toLowerCase();
    if (filterValueLowerngcategory != "" || filterValueLowerngcategory != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Category.toLowerCase().includes(filterValueLowerngcategory));
    }
  }

  productfilter(product: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngproduct = product.toLowerCase();
    if (filterValueLowerngproduct != "" || filterValueLowerngproduct != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Product.toLowerCase().includes(filterValueLowerngproduct));
    }
  }

  assignedtofilter(assignto: any) {
    this.AssignedTaskList = this.loadtaskdata

    let filterValueLowerngassignedto = assignto.toLowerCase();

    if (filterValueLowerngassignedto != "" || filterValueLowerngassignedto != undefined) {
      var data1 = this.AssignedTaskList.filter((alldata) => alldata.InitiallyAssigned.toLowerCase().includes(filterValueLowerngassignedto));
      var data2 = this.AssignedTaskList.filter((alldata) => alldata.CurrentlyAssigned.toLowerCase().includes(filterValueLowerngassignedto));

      this.AssignedTaskList = data1;
      if (data2.length > 0) {
        this.AssignedTaskList = data2;
      }
    }
  }


  departmentfilter(department: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngdepartment = department.toLowerCase();
    if (filterValueLowerngdepartment != "" || filterValueLowerngdepartment != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Department.toLowerCase().includes(filterValueLowerngdepartment));
    }
  }


  assigndatefilter(assigndate: any) {
    this.AssignedTaskList = this.loadtaskdata
    let AssignDt = assigndate.split("-");
    var Year = AssignDt[0];
    var Month = AssignDt[1];
    var Date = AssignDt[2];

    let filterValueLowerngassigneddate = Date + "-" + Month + "-" + Year;

    if (this.TodayDate !== assigndate) {
      if (filterValueLowerngassigneddate != "" || filterValueLowerngassigneddate != undefined) {
        this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Assigenddate.toLowerCase().includes(filterValueLowerngassigneddate));
      }
    }
  }



  applyfilter(ngtaskname: any, ngstatus: any, ngbrand: any, ngcategory: any, ngproduct: any, ngassigneddate: any, ngassignedto: any, ngdepartment: any) {

    this.AssignedTaskList = this.loadtaskdata

    let filterValueLowerngtaskname = ngtaskname.toLowerCase();
    let filterValueLowerngstatus = ngstatus.toLowerCase();
    let filterValueLowerngbrand = ngbrand.toLowerCase();
    let filterValueLowerngcategory = ngcategory.toLowerCase();
    let filterValueLowerngproduct = ngproduct.toLowerCase();
    let filterValueLowerngassignedto = ngassignedto.toLowerCase();
    let filterValueLowerngdepartment = ngdepartment.toLowerCase();




    let AssignDt = ngassigneddate.split("-");
    var Year = AssignDt[0];
    var Month = AssignDt[1];
    var Date = AssignDt[2];

    let filterValueLowerngassigneddate = Date + "-" + Month + "-" + Year;



    if (filterValueLowerngtaskname != "" || filterValueLowerngtaskname != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.TaskName.toLowerCase().includes(filterValueLowerngtaskname));
    }
    if (filterValueLowerngstatus != "" || filterValueLowerngstatus != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Status.toLowerCase().includes(filterValueLowerngstatus));
    }
    if (filterValueLowerngbrand != "" || filterValueLowerngbrand != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Brand.toLowerCase().includes(filterValueLowerngbrand));
    }

    if (filterValueLowerngcategory != "" || filterValueLowerngcategory != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Category.toLowerCase().includes(filterValueLowerngcategory));
    }
    if (filterValueLowerngproduct != "" || filterValueLowerngproduct != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Product.toLowerCase().includes(filterValueLowerngproduct));
    }

    if (this.TodayDate !== ngassigneddate) {
      if (filterValueLowerngassigneddate != "" || filterValueLowerngassigneddate != undefined) {
        this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Assigenddate.toLowerCase().includes(filterValueLowerngassigneddate));
      }
    }

    if (filterValueLowerngassignedto != "" || filterValueLowerngassignedto != undefined) {
      var data1 = this.AssignedTaskList.filter((alldata) => alldata.InitiallyAssigned.toLowerCase().includes(filterValueLowerngassignedto));
      var data2 = this.AssignedTaskList.filter((alldata) => alldata.CurrentlyAssigned.toLowerCase().includes(filterValueLowerngassignedto));

      this.AssignedTaskList = data1;
      if (data2.length > 0) {
        this.AssignedTaskList = data2;
      }
    }
    if (filterValueLowerngdepartment != "" || filterValueLowerngdepartment != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata) => alldata.Department.toLowerCase().includes(filterValueLowerngdepartment));
    }


  }
 
  addtask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '80%', height: '80%', disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //     console.log('The dialog was closed', result);

      if (result != "") {

      }
    });
    
  }
  
  ngOnInit() {
    throw new Error('Method not implemented.');
  }



}


