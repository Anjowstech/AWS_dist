import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  user: any


  constructor(private router: Router, private http: HttpClient, private bpObserable: BreakpointObserver) { }
  userdata(username: string, password: string) {
    var usern: string = username;
    var passw: string = password;
    var query: string = " SELECT username,password FROM login where  username='" + this.username + "'and password='" + this.password + "'";
    var connection: string = "";
    let params1 = new HttpParams().set('connection', connection).set('query', query);
    return this.http.get("https://multitenancyloginuat.azurewebsites.net/Loadarlsdetails", { params: params1, })
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
  //login(){
  //  this.userdata(this.username, this.password).subscribe((userdetails) => {
  //    console.warn("userdetails", userdetails)
  //    this.connection = userdetails

  //    for (let item of this.connection) {
  //      this.connectionstr = item.databaseconnection;
  //      this.user = item.username;

  //    }
  //    if (this.username != null && this.connectionstr != null && this.username == this.user) {
  //      this.router.navigate(['/Home']);


  //    } else {
  //      alert("Invalid credentials");
  //    }
  //  })

  //}
  login(): void {


    if (this.username == 'aws@gmail.com' && this.password == 'aws@123') {

      this.router.navigate(['/main/Dashboardreport']);
    } else {
      alert("Invalid credentials");
    }
  }
}
