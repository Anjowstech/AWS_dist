import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ShipmentService {
  constructor(private http: HttpClient) { }

  postData(data: any):Observable <string>{
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json' // Assuming JSON data
    });
    console.log(data)
    var datareturn = this.http.post<string>('https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICSQLEXEC', data);
    console.log(datareturn)
    return datareturn
  }

}


