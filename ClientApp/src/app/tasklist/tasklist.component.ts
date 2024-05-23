
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
  assign_load_data: any = [];
  loadstatusdata: any = [];
  loadassigndata: any = [];
  loaddeptdata: any = [];
  loaddatedata: any = [];
  department_tabload_data: any = [];
  loadstatustasdataLoad: any = [];
  category_tabload_data:any=[]
  loadcatdata: any;
  TodayDate: any;
  Status: any;
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
  Category: any;
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
  Department: any;
    taskid: any;
  binddata: any[] = [];
  results: string="";
  filterdata: any;
  IntiallyAssigned: string = "";
  userID: any;
  userId: string="";
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
  opentaskdetail(item: any) {
    var taskid = item.TaskID;
    this.datashare.sendtaskdetail(taskid);
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
      console.log('The dialog was closed', result);
      this.alldata().subscribe((loadtask) => {
        this.loadtaskdata = loadtask
        this.loadtaskdata = JSON.parse(loadtask);


      })

    });
  }
  assignto_tabload() {


    var spname = "[AWS].[Sp_Select_AssignedTo]";
    /*  var clientid = this.clientid;*/

    //   console.log(spsname)
    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })


  }
  department_Tabload() {


    var spname = "[AWS].[Sp_Select_DepartmentList]";
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
  ngOnInit() {
    this.userId = this.datashare.getuserID();
    this.alldata().subscribe((loadtask) => {
      this.loadtaskdata = loadtask
      this.loadtaskdata = JSON.parse(loadtask);
      

    })
    this.statusTab_LoaDdata().subscribe((loadstatus:any) => {

      console.warn("loadstatus", loadstatus)

      this.loadstatustasdataLoad = loadstatus;

    })
    this.assignto_tabload().subscribe((assignto_load) => {

      console.warn("assignto_load", assignto_load)

      this.assign_load_data = assignto_load;

    })
    this.department_Tabload().subscribe((department_load:any) => {

      console.warn("department_load", department_load)

      this.department_tabload_data = department_load;

    })
    this.category_dropdownload().subscribe((category_tabload) => {

      console.warn("category_load", category_tabload)

      this.category_tabload_data = category_tabload;

    })
  }
  
  
  AllTabclickload() {
    this.alldata().subscribe((loadtask) => {
      this.loadtaskdata = loadtask
      this.loadtaskdata = JSON.parse(loadtask);


    })
  }
 
  
  status_tabLoad(stat: any) {
    var data:any = stat;
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_TaskList_Status]",
      parameter: this.Status,
      spparameter: "@status"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  StatusTab_Load(event:any) {
    this.Status =event.target.innerText;
    this.status_tabLoad(this.Status).subscribe((loadstatus) => {

      console.warn("loadstatus", loadstatus)
      this.loadstatusdata = JSON.parse(loadstatus);
      this.loadtaskdata = this.loadstatusdata;
    })
  }
  category_tabLoad(cat: string) {
    var data: any = cat;
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_TaskList_Category]",
      parameter: this.Category,
      spparameter: "@Category"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  CategoryTab_Load(event: any) {
    this.Category = event.target.innerText;
    this.category_tabLoad(this.Category).subscribe((cat) => {

      //    console.warn("loadhold", hold)
      console.warn("cat", cat)
      this.loadcatdata = JSON.parse(cat);
      this.loadtaskdata = this.loadcatdata;

    })
  }


  AssigedTo_tabLoad(assign: string) {
    var data: any = assign;
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_TaskList_AssignedTo]",
      parameter: this.IntiallyAssigned,
      spparameter: "@AssignedTo"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  AssigedToTab_Load(event: any) {
    this.IntiallyAssigned = event.target.innerText;
    this.AssigedTo_tabLoad(this.IntiallyAssigned).subscribe((assinload) => {
      console.warn("assinload", assinload)
      this.loadassigndata =JSON.parse(assinload);
      this.loadtaskdata = this.loadassigndata;

    })
  }


  Department_ftabLoad(dept: string) {
    var data: any = dept;
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_TaskList_Department]",
      parameter: this.Department,
      spparameter: "@Department"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  DepartmentTab_filterLoad(event: any) {
    this.Department = event.target.innerText;
    this.Department_ftabLoad(this.Department).subscribe((deptload) => {
      console.warn("assinload", deptload)
      this.loaddeptdata = JSON.parse(deptload);
      this.loadtaskdata = this.loaddeptdata;

    })
  }


  AssignDateLoad_filterLoad(assigndate: string) {
    var data: any = assigndate;
    const selectspparam = {
      connection: "",
      spname: "[AWS].[Sp_Select_TaskList_AssignedDate]",
      parameter: this.ngassigneddate,
      spparameter: "@AssignedDate"
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
  AssignDateLoad_inputfilterLoad(event: any) {
    this.ngassigneddate = event.target.value;
    this.AssignDateLoad_filterLoad(this.ngassigneddate).subscribe((dateload) => {
      console.warn("dateload", dateload)
      this.loaddatedata = JSON.parse(dateload);
      this.loadtaskdata = this.loaddatedata;

    })
  }
  
  
  statusTab_LoaDdata() {


    var spname = "[AWS].[Sp_Select_statusList]";

    let params1 = new HttpParams().set('spname', spname);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })


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
  //alldata() {


  //  var spname = "[AWS].[Sp_Select_TaskList]";
  ///*  var clientid = this.clientid;*/

  //  //   console.log(spsname)
  //  let params1 = new HttpParams().set('spname', spname);
  //  return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC", { params: params1 })
    

  //}
  alldata() {

    /*var data: any = userID;*/
    const selectspparam = {
   

      spname: "[AWS].[Sp_Select_TaskList]",
      parameter: this.userId.toString(),
      spparameter: "@UserId",
    }
    console.log(selectspparam)
    return this.http.post('https://awsgenericwebservice.azurewebsites.net/api/Service/SelectSpwithparam', selectspparam, { responseType: 'text' })
  }
   
  
  
  
 
 
   
  
  
  OpenAddtask(item: any) {
    this.taskid=item.TaskID
    this.taskname = item.TaskName
    this.assignto = item.CurrentlyAssigned
    this.description = item.Description
    this.brand = item.Brand
    this.category = item.Category
    this.status = item.Status
    this.department = item.Department
    this.duedate = item.DueDate
    this.assigndate = item.AssignedDate
    /*this.createddate = item.CreateDate*/
    this.binddata = [this.taskid, this.taskname, this.assignto, this.description, this.brand, this.category, this.status, this.department, this.duedate, this.assigndate]
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '80%', height: '80%', data: { displaydata: this.binddata },disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.alldata().subscribe((loadtask) => {
        this.loadtaskdata = loadtask
        this.loadtaskdata = JSON.parse(loadtask);


      })
     
    });
  }
 
}


