
import { Component, Inject, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataShareServiceService } from 'src/app/data-share-service.service';

declare var webkitSpeechRecognition: any;


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  loaddata: any;
  isload: boolean = true;
  clientid: any;
  AssignedTaskList: any;
  item: any;
  UserList: string[] = [];
  //AssignedTaskList = [
  //  { TaskID: "1", TaskName: "AFRA FOODS APRICOT JAM 375G (GLASS JAR)", Brand: "European Garden", Category: "JAMS", Product: "Food", DueDate: "30-04-2024", Assigenddate: "01-01-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "Praveen", Status: "InProgress", Department: "Clearance", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "skincare-products.jpg" },
  //  { TaskID: "2", TaskName: "AFRA FOODS BAKED BEANS IN TOMATO SAUCE 220G (CANNED)", Brand: "AFRA Foods", Category: "SAUCES", Product: "Food", DueDate: "15-04-2024", Assigenddate: "01-02-2024", InitiallyAssigned: "Mehfooz", CurrentlyAssigned: "Lalu", Status: "InProgress", Department: "Orders", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "8ozbottle.webp" },
  //  { TaskID: "3", TaskName: "Daily Bite FOODS BAKED BEANS IN TOMATO SAUCE 400G (CANNED)", Brand: "Daily Byte", Category: "SAUCES", Product: "Food", DueDate: "18-04-2024", Assigenddate: "01-03-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "Shekar", Status: "Pending for approval", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "download icon.png" },
  //  { TaskID: "4", TaskName: "Delita FOODS BBQ SAUCE ORIGINAL 18 OZ (510G)", Brand: "Delita", Category: "SAUCES", Product: "Food", DueDate: "19-04-2024", Assigenddate: "01-01-2024", InitiallyAssigned: "Mehfooz", CurrentlyAssigned: "Sharaz", Status: "Pending for approval", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "8ozbottle.webp" },
  //  { TaskID: "5", TaskName: "Oil Tree FOODS BLENDED VEG COOKING OIL PET BOTTLE W/H 1.5L", Brand: "Oil Tree", Category: "Cooking Oil", Product: "Oil", DueDate: "25-04-2024", Assigenddate: "01-04-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "ere", Status: "Not started", Department: "Design", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "skincare-products.jpg" },
  //  { TaskID: "6", TaskName: "Raya FOODS CHICK PEAS 400G (CANNED)", Brand: "RAYA", Category: "Canned", Product: "Food", DueDate: "28-04-2024", Assigenddate: "01-05-2024", InitiallyAssigned: "Mehfooz", CurrentlyAssigned: "yuu", Status: "Completed", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "8ozbottle.webp" },
  //  { TaskID: "7", TaskName: "Super Tasty FOODS CHICKEN LUNCHEON MEAT 200G", Brand: "SUPER Tasty", Category: "Meat", Product: "Food", DueDate: "30-04-2024", Assigenddate: "01-05-2024", InitiallyAssigned: "Arfat", CurrentlyAssigned: "uoo", Status: "Approved", Department: "Purchaser", Images: "https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/skincare-products.jpg (next) https://umbilerawfiles.blob.core.windows.net/docusav2%2FSF_Documets/8ozbottle.webp", ImageName: "skincare-products.jpg" },
  //];
  filterMetadata = { count: 0 };
  ngtaskname: string = "";
  ngstatus: string = "";
  ngbrand: string = "";
  ngcategory: string = "";
  ngproduct: string = "";
  ngassigneddate: string = "";
  ngassignedto: string = "";
  ngdepartment: string = "";
  filtdata: any;
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
  dep_data_load: any = "";
  asgn_data_load: any;
  product_data_load: any;
  category_data_load: any;
  brand_data_load: any;
    taskname: any;
    assignto: any;
    description: any;
    brand: any;
    category: any;
    status: any;
    department: any;
    duedate: any;
    assigndate: any;
    createddate: any;
    taskid: any;
  binddata: any[] = [];
  results: string="";
  filterdata: any;
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router, private datashare: DataShareServiceService) {
  
}
  ViewAWSWorkFlow(rowvalue: any) {
    //var data = [rowvalue]

    //const dialogRef = this.dialog.open(AWSWorkFlowComponent, {
    //  height: '70%',
    //  width: '50%',
    //  data: { displaydata: data }, disableClose: true
    //});
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
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata:any) => alldata.Status.toLowerCase().includes(filterValueLowerngstatus));
    }

  }

  brandfilter(brand: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngbrand = brand.toLowerCase();
    if (filterValueLowerngbrand != "" || filterValueLowerngbrand != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Brand.toLowerCase().includes(filterValueLowerngbrand));
    }
  }

  categoryfilter(category: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngcategory = category.toLowerCase();
    if (filterValueLowerngcategory != "" || filterValueLowerngcategory != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Category.toLowerCase().includes(filterValueLowerngcategory));
    }
  }

  productfilter(product: any) {
    this.AssignedTaskList = this.loadtaskdata
    let filterValueLowerngproduct = product.toLowerCase();
    if (filterValueLowerngproduct != "" || filterValueLowerngproduct != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Product.toLowerCase().includes(filterValueLowerngproduct));
    }
  }

  assignedtofilter(assignto: any) {
    this.AssignedTaskList = this.loadtaskdata

    let filterValueLowerngassignedto = assignto.toLowerCase();

    if (filterValueLowerngassignedto != "" || filterValueLowerngassignedto != undefined) {
      var data1 = this.AssignedTaskList.filter((alldata: any) => alldata.InitiallyAssigned.toLowerCase().includes(filterValueLowerngassignedto));
      var data2 = this.AssignedTaskList.filter((alldata: any) => alldata.CurrentlyAssigned.toLowerCase().includes(filterValueLowerngassignedto));

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
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Department.toLowerCase().includes(filterValueLowerngdepartment));
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
        this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Assigenddate.toLowerCase().includes(filterValueLowerngassigneddate));
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
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.TaskName.toLowerCase().includes(filterValueLowerngtaskname));
    }
    if (filterValueLowerngstatus != "" || filterValueLowerngstatus != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Status.toLowerCase().includes(filterValueLowerngstatus));
    }
    if (filterValueLowerngbrand != "" || filterValueLowerngbrand != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Brand.toLowerCase().includes(filterValueLowerngbrand));
    }

    if (filterValueLowerngcategory != "" || filterValueLowerngcategory != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Category.toLowerCase().includes(filterValueLowerngcategory));
    }
    if (filterValueLowerngproduct != "" || filterValueLowerngproduct != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Product.toLowerCase().includes(filterValueLowerngproduct));
    }

    if (this.TodayDate !== ngassigneddate) {
      if (filterValueLowerngassigneddate != "" || filterValueLowerngassigneddate != undefined) {
        this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Assigenddate.toLowerCase().includes(filterValueLowerngassigneddate));
      }
    }

    if (filterValueLowerngassignedto != "" || filterValueLowerngassignedto != undefined) {
      var data1 = this.AssignedTaskList.filter((alldata: any) => alldata.InitiallyAssigned.toLowerCase().includes(filterValueLowerngassignedto));
      var data2 = this.AssignedTaskList.filter((alldata: any) => alldata.CurrentlyAssigned.toLowerCase().includes(filterValueLowerngassignedto));

      this.AssignedTaskList = data1;
      if (data2.length > 0) {
        this.AssignedTaskList = data2;
      }
    }
    if (filterValueLowerngdepartment != "" || filterValueLowerngdepartment != undefined) {
      this.AssignedTaskList = this.AssignedTaskList.filter((alldata: any) => alldata.Department.toLowerCase().includes(filterValueLowerngdepartment));
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
  
    this.alldata().subscribe((loadtask) => {

      //   console.warn("loadall", loadequip)
    //  this.loaddata = [];
      this.loadtaskdata = loadtask

    })
  }
  statusInProgress(){
    this.isload = true;
    /*this.datesearch = '';*/
    this.InProgress().subscribe((inprogress) => {

      //    console.warn("loadgeneral", general)
      this.loaddata = [];
      this.loaddata = inprogress
      this.isload = false;
    })
  }
  statusPending() {
    this.isload = true;
    /*this.datesearch = '';*/
    this.pending().subscribe((pendingdata) => {

      //    console.warn("loadgeneral", general)
      this.loaddata = [];
      this.loaddata = pendingdata
      this.isload = false;
    })
  }
  
  AllTabclickload() {
    this.alldata().subscribe((loadtask) => {

      console.warn("AllLoad", loadtask)
      this.loaddata = [];
      this.loaddata = loadtask

    })
  }
  statusCompleted() {
     this.isload = true;
    /*this.datesearch = '';*/
    this.completed().subscribe((completeddata) => {

      //    console.warn("loadgeneral", general)
      this.loaddata = [];
      this.loaddata = completeddata
      this.isload = false;
    })
  }
    //this.department_load().subscribe((dep_load) => {
    //  console.warn("department_load", dep_load)
    //  this.dep_data_load = dep_load;
    //})
  categoryLoad() {
    this.category_load().subscribe((cat_load) => {
      console.warn("category_load", cat_load)
      this.category_data_load = cat_load;
    })
  }
  brandLoad() {
    this.category_load().subscribe((brand_load) => {
      console.warn("brand_load", brand_load)
      this.brand_data_load = brand_load;
    })
  }
  statusApproved() {
    this.isload = true;
    /*this.datesearch = '';*/
    this.approve().subscribe((approveddata) => {

      //    console.warn("loadgeneral", general)
      this.loaddata = [];
      this.loaddata = approveddata
      this.isload = false;
    })
  }
  statusNotstarted(){
  this.isload = true;
  /*this.datesearch = '';*/
  this.Notstarted().subscribe((notstartdata) => {

    //    console.warn("loadgeneral", general)
    this.loaddata = [];
    this.loaddata = notstartdata
    this.isload = false;
  })
  }
  departmntLoad() {
    this.department_load().subscribe((dep_load) => {
      console.warn("department_load", dep_load)
      this.dep_data_load = dep_load;
    })
  }
  productLoad() {
    this.product_load().subscribe((prod_load) => {
      console.warn("department_load", prod_load)
      this.product_data_load = prod_load;
    })
  }
  assignedTo() {
    this.assignperson_load().subscribe((asign_load) => {
      console.warn("department_load", asign_load)
      this.asgn_data_load = asign_load;
    })
  }
  startListening() {
    
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      this.wait(2000);
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      vSearch.onresult = (e: any) => {
        this.wait(2000);

          console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
       
        this.filterdata = e.results[0][0].transcript;
        if (this.filtdata == '') {
          this.filtdata = e.results[0][0].transcript;
        }
       // this.filtdata = this.results.replace(".", "");
       // this.getResult();
        
        // console.log(this.results);
        vSearch.stop();

      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }
  wait(ms:any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  getResult() {
  
    
    //  console.log(this.results);
  }
  alldata() {


    var spname = "[AWS].[Sp_Select_TaskList]";
  /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })
    //var fd = new FormData()
    //fd.set('spname', spname)
    ///*fd.set('clientid', clientid)*/
    //return this.http.post("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", fd)

  }
  product_load() {
    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "Approved")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)
  }
  assignperson_load() {
    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "Approved")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)
  }
  approve() {
    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "Approved")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)
  }
  completed() {
    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "completed")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("/", fd)
}
  InProgress() {

    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "InProgress")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)



  }
 
  Notstarted() {

    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "Notstarted")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)



  }
   category_load(){
     var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
     var parameter = "@status";
     var clientid = this.clientid;
     var fd = new FormData()
     fd.set('spname', spsname)
     fd.set('ticketid', "Notstarted")
     fd.set('parameter', parameter)
     fd.set('clientid', clientid)
     return this.http.post("", fd)
}
  pending() {

    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@status";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "pending")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)



  }
  department_load() {
    var spsname = "[makpower].[Sp_Select_Ticketheader_Withcategory]"
    var parameter = "@department";
    var clientid = this.clientid;
    var fd = new FormData()
    fd.set('spname', spsname)
    fd.set('ticketid', "pending")
    fd.set('parameter', parameter)
    fd.set('clientid', clientid)
    return this.http.post("", fd)
  }
  OpenAddtask(item: any) {
    this.taskid=item.TaskID
    this.taskname = item.TaskName
    this.assignto = item.assignto
    this.description = item.Description
    this.brand = item.Brand
    this.category = item.Category
    this.status = item.Status
    this.department = item.Department
    this.duedate = item.DueDate
    this.assigndate = item.AssignDate
    /*this.createddate = item.CreateDate*/
    this.binddata = [this.taskid, this.taskname, this.assignto, this.description, this.brand, this.category, this.status, this.department, this.duedate, this.assigndate]
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '80%', height: '80%', data: { displaydata: this.binddata },disableClose: true
    });
  }
  opentaskdetails(item: any) {
    this.taskid = item.TaskID
    this.UserList.push(this.taskid);
    this.datashare.sendtaskdetail(this.UserList);
    this.router.navigate(['/main/TaskdetailpageComponent']);
  }
}


