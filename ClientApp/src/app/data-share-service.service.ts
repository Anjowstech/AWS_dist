import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
//import { Createuser } from './createuser';
//import { IItem } from './IItem';
   

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {
  Url: string = '';
  unapproverawmat: any;
  // private _items: IItem[] = [1];
  pdctizatndtls: string[]=[];
  itemvalue: string = '';
  itemvalue1: string = '';
  itemvalue2: string = '';
  itemvalue3: string = '';
  itemvalue4: string = '';
  itemvalue5: string = '';
  itemvalue6: string = '';
  itemvalue7: string = '';
  itemvalue8: string = '';
  Temppass: string = "";
  itemlist1: string = "";
  itemcate: string = '';
  itemcateid: string = '';
  formco: string = "";
  gridinciname: string = "";
  formcodeinstruction: string = '';
  formcodeinstructiondata: string = '';
  itemrisklist: string[] = [];
  formuladetails: string[] = [];
  backtoformul: string[] = [];
  productpdrarray: string[] = [];
  restrictdetails: string[] = [];
  rawtable: any;
  datasharepdr: any;
  selectddata: any;
  itemcodetoraw: any = [];
  griddatafromproductcomp: any = [];
  labelvalues: string ='';
  itemcodeval: string = '';
  suppna: any;
  samplelist: any = [];
  searchpdritems: any = [];
  taskdetailid: any = [];
  datashareitemcode: any;
  datasharecasdata: any;
  FormulaCode: any;
  usern: any;
  compa: any;
  custocod: any;
  datashareclientlocation: any = [];
  datasharecasdetailsRM: any = [];
  productlist: string[]=[];
  Qclist: string[]=[];
  Phystabilitylist: string[]=[];
  producttestlist: string[]=[];
  clientid: string = '';
  searchformulasamplemgmntitems: any;
  searchformulaproductitems: any;
  prducttabformulookup: any;
  searchpdrdateitems: any;
  searchformulastatusitems: any;
  searchpdrstatusitems: any;
  searchitems: any;
  searchcustomeritems:any
  searchrawmatcategoryitems: any;
  searchsupplieritems: any;
  searchmanufactureitems: any;
  testproductlist: any;
  stabtestlist: any;
  combatipilitylist: any; 
  QCtestlist: any;
  navigate: any;
  prdcode: any;
  reportlist: any;
  usr: any;
  activetabmytasklist: any;
  reportsdsdetail: any
  uservalue: any;
  louser: any;
  userlist: any = [];

  reid: any;
  report_type: any;
  maintenancedate: any;
  ticketname: any;
  tickdetailid: any;
  equipmenttag: any;
  reportl: any;
  repname: any;
  ticket: any;
  userID: any;
  taskdetail:any=[]
  sendlogin(loginuser: string) {
    this.louser = loginuser
  }
  sendteststab(testvalues: string[]) {
    this.stabtestlist = testvalues

  }
  senduser(userid:any) {
    this.uservalue = userid
  }
  sendtaskdetail(testvalues: string[]) {
    this.taskdetail = testvalues
  }
  senduserID(userId: any) {
    this.userID = userId;
  }
  sendpdrlist(testvalues: any) {
    this.userlist = testvalues
  }
  
  getlogin() {
    return this.louser;
  }
  getuser() {
    return this.uservalue;
  }
  getuserID() {
    return this.userID;
  }
  gettasidfrmtasklist() {
    return this.taskdetail
  }
  getpdrlist() {
    return this.userlist;
  }
  constructor(private http: HttpClient) {

  }



  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
  EditUserService() {



  }




}
