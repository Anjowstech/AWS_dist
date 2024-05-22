import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
//import { Createuser } from './createuser';
//import { IItem } from './IItem';
   

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {
  Url: string;
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
  userID: any;
  senduser(user: any) {
    this.uservalue = user;
  }
  senduserID(userId: any) {
    this.userID = userId;
  }
  sendproductdetails(productvalues: string[]) {
    this.productlist = productvalues
  }
  sendsdsdetails(sdsreportdata: string[]) {
    this.reportsdsdetail = sdsreportdata
  }
  sendusername(usrname: string) {
    this.usr = usrname;
  }
  sendreportdetails(reportvalues: string[]) {
    this.reportlist = reportvalues
  }
 
  sendformlastatus(searchformulastatus: string[]) {
    this.searchformulastatusitems = searchformulastatus

  }
  sendpdrstatus(searchpdrstatus: string[]) {
    this.searchpdrstatusitems = searchpdrstatus
  }
  sendformulaproduct(searchpdr: string[]) {
    this.searchpdritems = searchpdr
  }
  sendformulasample(searchpdr: string[]) {
    this.searchitems = searchpdr
  }
  sendrawmat(searchsubcategoryrawmat: string[]) {
    this.searchrawmatcategoryitems = searchsubcategoryrawmat
  }
  sendQCdetails(QCvalues: string[]) {
    this.Qclist = QCvalues
  }
  sentdataproductpdr(backproduct: string[]) {
    this.productpdrarray = backproduct
  }
  sendPhystability(Phystabilityvalues: string[]) {
    this.Phystabilitylist = Phystabilityvalues
  }
  sendproducttest(producttestvalues: string[]) {
    this.producttestlist = producttestvalues

  }
  sendpdroductco(prodtcode: string) {
    this.prdcode = prodtcode;
  }
  sendconnection(clientd: string) {
    this.clientid = clientd;
  }
  sendlogindetails(username: string) {
   // username = username[0].toUpperCase() + username.substr(1).toLowerCase();
    this.usern = username;
  }
  sendcompdetails(company: string) {
    this.compa = company;
  }
  senditemtoraw(itemda: string) {
    this.itemcodetoraw = itemda;
  }
  sendgridfromproduct(griddatacomponent: string) {
    this.griddatafromproductcomp = griddatacomponent;
  }
  senditemtosupplier(suppl: string) {
    this.suppna = suppl;
  }
  sendcustomercode(ccode: string) {
    this.custocod = ccode;
  }
  sendpdrno(pdrno: string) {
    this.datasharepdr = pdrno
  }
  senditemcode(itemcode: string) {
    this.itemcodeval = itemcode;
  }
  sendlabel(incilabel:string) {
    this.labelvalues = incilabel
  }
  sendrestrictiondetails(formularestrictiondetails: string[]) {
    this.restrictdetails = formularestrictiondetails
  }
  sendaddlocation(searchlocation: string[]) {
    this.datashareclientlocation = searchlocation
  }
  sendmodulenavpdr(FormulaCode: string) {
    this.FormulaCode = FormulaCode;
  }
  sendItemcodeno(itemcode: string) {
    this.datashareitemcode = itemcode
  }

  backtoformuladetails(backtoform: string[]) {
    this.backtoformul = backtoform
  }
  sendformuladetails(formuladetailsvalues: string[]) {
    this.formuladetails = formuladetailsvalues
  }
  sendforminstruction(formulacodeinstruction: string) {
    this.formcodeinstruction = formulacodeinstruction

  }
  sendgridinciname(inciname:string) {
    this.gridinciname = inciname
  }
  sendforminstdata(formuladatainstr:string) {
    this.formcodeinstructiondata = formuladatainstr
  }
  sendrawtable(rawgrid: string) {
    this.rawtable = rawgrid;
  }

  sendformcode(formcode: string) {
    this.formco = formcode;
  }
  searchItemname(item1: string) {
    this.itemcate = item1;
   


  }
  sendsampledetails(samplevalues: string[]) {
    this.samplelist = samplevalues
  }
  activetabdatamytask(datacctiveteab: string) {
    this.activetabmytasklist = datacctiveteab
  }


  sendpdrlist(listvalues: string[]) {
    this.searchpdritems = listvalues
  }
  sendtaskdetail(taskiddata: string[]) {
    this.taskdetailid = taskiddata
  }
  searchItemlist(item1: any) {
    this.itemrisklist = item1;



  }
  sendcasdata(searchcas: string[]) {
    this.datasharecasdata = searchcas
  }
  searchItemid(item2: string) {
    this.itemcateid = item2;
  }
  sendcasitems(casdata: string[]) {
    this.datasharecasdetailsRM = casdata
  }
  addItem(item: string) {
    this.itemvalue = item


  }
  
  addItem1(item: string, item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, item8: string) {
    this.itemvalue = item
    this.itemvalue1 = item1
    this.itemvalue2 = item2
    this.itemvalue3 = item3
    this.itemvalue4 = item4
    this.itemvalue5 = item5
    this.itemvalue6 = item6
    this.itemvalue7 = item7
    this.itemvalue8 = item8



  }
  

  sendpdrdatelist(listvalues: string[]) {
    this.searchpdrdateitems = listvalues
  }
sendsupplierlist(supplierlistvalues: string[]) {
    this.searchsupplieritems = supplierlistvalues

  }
  sendcustomerlist(customerlistvalues: string[]) {
    this.searchcustomeritems = customerlistvalues

  }
  sendsamplemanagementdatafromformula(samplemanagementfromformula: string[]) {
    this.searchformulasamplemgmntitems = samplemanagementfromformula
  }
  sendproductizationdata(productfromformula: string[]) {
    this.searchformulaproductitems = productfromformula
  }
  formulaprodataforproductization(datanavtran: string[]) {
    this.prducttabformulookup = datanavtran
  }
  sendmanufacturelist(manufacturelistvalues: string[]) {
    this.searchmanufactureitems = manufacturelistvalues

  }
  
  //----------------Test Status----
  sendtestproduct(testvalues: string[]) {
    this.testproductlist = testvalues

  }
  sendteststab(testvalues: string[]) {
    this.stabtestlist = testvalues

  }
  sendtestcompatibility(testvalues: string[]) {
    this.combatipilitylist = testvalues

  }
  sendtestqc(testvalues: string[]) {
    this.QCtestlist = testvalues

  }
  sendpdrnav(testvalues: string[]) {
    this.navigate = testvalues



  }
  sendunapproverawmatdetails(unapproverawmatvalues: string[]) {
    this.unapproverawmat = unapproverawmatvalues
  }
  sendproductcodeCM(pdctcodedetails: string[]) {
    this.pdctizatndtls = pdctcodedetails;
  }
  getuser() {
    return this.uservalue;
  }
  getuserID() {
    return this.userID;
  }
  getsdsdetailsreport() {
    return this.reportsdsdetail
  }
  getproductcodeCM(): string[] {
    return this.pdctizatndtls
  }
  getunapproverawmatdetails() {
    return this.unapproverawmat
  }
  getusrname():string {
    return this.usr;
  }
  getreportdetails() {
    return this.reportlist
  }
  getpdrocode() {
    return this.prdcode
  }
  getnavpdrlist() {
    return this.navigate
  }
  gettestproduct() {
    return this.testproductlist
  }
  getteststab() {
    return this.stabtestlist
  }
  getpdrarrayfromproduct(): any {
    return this.productpdrarray;
  }
  gettestcombatipility() {
    return this.combatipilitylist
  }
  getmytasklisttab() {
    return this.activetabmytasklist
  }
  gettestqc() {
    return this.QCtestlist
  }
  //test status-----------
getmanufacturelist() {
    return this.searchmanufactureitems
  }
  getsupplierlist() {
    return this.searchsupplieritems
  } getcustomerlist() {
    return this.searchcustomeritems
  }
  getsamplemgmntdatafromformula() {
    return this.searchformulasamplemgmntitems
  }
  getproductdatafromformula() {
    return this.searchformulaproductitems
  }
  getgriddataforcomponent() {
    return this.griddatafromproductcomp
  }
  getdatafromproductformulapage() {
    return this.prducttabformulookup
  }
  getpdrdatelist(): any {
    return this.searchpdrdateitems;
  }
  //DatashareTempPass(itempass: string) {
  //  this.Temppass = itempass
  //}
  getcompany(): string {
    return this.compa;

  }
  getconnection(): string {
    return this.clientid;
  }
  getcasdetails(): string[] {
    return this.datasharecasdetailsRM;
  }
  getlogin(): string {
    return this.usern;
  }
  getitemcode(): string {
    return this.itemcodeval;
  }
getitemtosupplier(): string {
  return this.suppna;
  }
  getitemcoderaw(): string {
    return this.itemcodetoraw;
  }
  getmodulenavpdr(): string {
    return this.FormulaCode;
  }
  getformulastatus() {
    return this.searchformulastatusitems
  }
  getformulasample() {
    return this.searchitems
  }
  getpdrstatus() {
    return this.searchpdrstatusitems
  }
  getrawmat() {
    return this.searchrawmatcategoryitems
  }
  getformulaproduct() {
    return this.searchpdritems
  }
  gettasidfrmtasklist() {
    return this.taskdetailid
  }
  getitemcode1(): string {
    return this.datashareitemcode;
  }
  getcustocode(): string {
    return this.custocod;
  }
  DatashareTempPass(): any {
    var itemlist1: [string] = [this.itemlist1]
    return itemlist1;
  }
  getclientlocation(): string[] {
    return this.datashareclientlocation;
  }
  getlabel():string {
    return this.labelvalues;
  }
  getcasdata(): string[] {
    return this.datasharecasdata;
  }
  getsample(): any {
    return this.samplelist;



  }




  getpdrlist(): any {
    return this.searchpdritems;
  }
  getpdrno(): string {
    return this.datasharepdr;
  }
  getrestrictiondetails(): any {
    return this.restrictdetails ;
  }
  getbackformdetails(): any {
    return this.backtoformul;
  }
  getformuladetails(): any {
    return this.formuladetails;
  }
  getsendforminstruction(): string {
    return this.formcodeinstruction;
  }
  getrawtable(): string {
    return this.rawtable;
  }
  getsendforminstdata():string {
    return this.formcodeinstructiondata;
  }
  getformcode(): string{
  return this.formco;
  }

  getgridinciname(): string {
    return this.gridinciname;
  }

  getcate(): string {


    return this.itemcate;
    

  }
  getitemlist(): any {
    return this.itemrisklist;
  }
  getcateid(): string{
  return this.itemcateid;
  }
  clean(){
    this.itemcate = '';
    this.itemcateid = '';
  }

  getItems(): string {
    return this.itemvalue;



  }
  getItems1(): any {



    var itemList: [string, string, string, string, string, string, string, string, string] = [this.itemvalue, this.itemvalue1, this.itemvalue2, this.itemvalue3, this.itemvalue4, this.itemvalue5, this.itemvalue6, this.itemvalue7, this.itemvalue8]
    return itemList;



  }
  getproduct(): any {
    return this.productlist;

  }
  getQC(): any {
    return this.Qclist;
  }
  getPhystability(): any {
    return this.Phystabilitylist;
  }
  getproducttest(): any {
    return this.producttestlist;
  }
  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:52060';
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
