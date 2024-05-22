import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {
  equipmentid: any;
  ticketid: any
  uservalue: any;
  louser: any;
  clientid: any;
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
  
  sendlogin(loginuser: string) {
    this.louser = loginuser
  }
  senduser(user: any) {
    this.uservalue = user;
  }
 
  senduserID(userId: any) {
    this.userID = userId;
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
