import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ShipmentService {
  constructor(private http: HttpClient) { }

  postData(Connection:any,JSONFileparams: any, spname: any):Observable <any>{
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json' // Assuming JSON data
    });
    const data = { Connection, JSONFileparams, spname };
    console.log(data)
    var datareturn = this.http.post<any>('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC', data, { headers });
    console.log(datareturn)
    return datareturn
  }

}


