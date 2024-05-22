import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataShareServiceService } from 'src/app/data-share-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  public screenHeight!: number;
  public screenWidth!: number;
  isPortrait!: boolean;
  message!: string;
  connection: any;
  connectionstr: any;
  user: any;
  role: any;
  pass: any;
  dataListsave1: login[][] = [];
  userid: any;

  constructor(private router: Router, private http: HttpClient, private bpObserable: BreakpointObserver, private datashare: DataShareServiceService) { }
  userdata(username: string, password: string) {
    var usern: string = username;
    var passw: string = password;
  
      this.dataListsave1[0] = ([{
        Usernam: this.username,
        Pass: this.password,


      }]);
    
    var datasaveslist: any = JSON.stringify(this.dataListsave1);
    var query: string = "[AWS].[Sp_Select_Roles]";
    var connection: string = "";
    let params1 = new HttpParams().set('spname', query).set('JSONFileparams', datasaveslist);
    return this.http.get("https://awsgenericwebservice.azurewebsites.net/api/Service/GENERICLOGIN", { params: params1 })
  }

  ngOnInit() {
    this.bpObserable
      .observe([
        '(orientation: portrait)',
      ])
      .subscribe(result => {
        if (result.matches) {
          this.isPortrait = true;
          this.message = 'Turn your device (landscape) to see a larger image';
        }
      });
    this.bpObserable
      .observe([
        '(orientation: landscape)',
      ])
      .subscribe(result => {
        if (result.matches) {
          this.isPortrait = false;
          this.message = 'Turn your device (portrait) to see museum timings';
        }
      });
    this.screenHeight = (window.screen.height);
    this.screenWidth = (window.screen.width);
    if (this.screenWidth >= 900) {

    }

  }
  login() {
    if (this.username == "" || this.password == "") {
      alert("Invalid credentials");
    }
    else {
    this.userdata(this.username, this.password).subscribe((userdetails) => {
      console.warn("userdetails", userdetails)
      this.connection = userdetails

      /* this.connectionstr = item.databaseconnection;*/
      this.role = this.connection;
      /* this.pass = item.Password;*/
      for (let item of this.connection) {
        this.role = item.Rolename;
        this.user = item.Username;
        this.userid = item.UserId;
      }
    
      if (this.role != null && this.role !=' ' ) {
        this.datashare.senduser(this.user);
        this.datashare.senduserID(this.userid);
        this.router.navigate(['/main/Dashboardreport']);
        /* this.Datashare.sendrole(this.role);*/
       
      } else {
        alert("Invalid credentials");
      }
    })
    }
  }
  //login(): void {


  //  if (this.username == 'aws@gmail.com' && this.password == 'aws@123') {

  //    this.router.navigate(['/main/Dashboardreport']);
  //  } else {
  //    alert("Invalid credentials");
  //  }
  //}
}
export class login {
  Usernam!: string;
  Pass!: string;


}
