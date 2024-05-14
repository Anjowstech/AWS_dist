import { Component, Inject, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as pbi from 'powerbi-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboardreport',
  templateUrl: './dashboardreport.component.html',
  styleUrls: ['./dashboardreport.component.css']
})
export class DashboardreportComponent {
  @ViewChild('reportContainer1', { static: true }) reportContainer1: any;

  public report!: pbi.Embed;
  isMobile: any;
  clientid: any = "";
  dataloadallstatusdetail: any;
  filterdetail: any = [];
  constructor(private http: HttpClient, private observer: BreakpointObserver) { }
  showReport1(Token: any, reportid: any) {
    //Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTNhNTQ0NWItMzBkMS00MWVkLTlhODAtZDhlYTc1YTE2MzlmLyIsImlhdCI6MTcxMjkyNjUyMCwibmJmIjoxNzEyOTI2NTIwLCJleHAiOjE3MTI5MzA5MzQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFJWjA3MnZ1RE9jNjZpWkZmc2U5dm1rMDJvK1NqSE9pdHRmNzVwNmpIRWIralFvYjdpbTRwZGR1djBEVzl0SmRHIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImI4OGRjMzc1LTY3MzktNGVkOS04NWI0LTY4MGM3YThlNGY2ZCIsImFwcGlkYWNyIjoiMSIsImdpdmVuX25hbWUiOiJBZG1pbndzdGVjaCIsImlwYWRkciI6IjUyLjE4Mi4yMjguMTUxIiwibmFtZSI6IkFkbWlud3N0ZWNoIiwib2lkIjoiYWY5ZWQ0NzQtMzcxMS00MzliLWI2NDMtNTk4MDdkODllNGQ1IiwicHVpZCI6IjEwMDMyMDAwQTJDQkY5NTAiLCJyaCI6IjAuQVVrQVcwU2xvOUV3N1VHYWdOanFkYUZqbndrQUFBQUFBQUFBd0FBQUFBQUFBQUJKQUNVLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6InNKQkhIOVRSNFZSNnFiRlBjbktBcVFfbTM2N2FLRW44OXp4NWtUOUxjZ0EiLCJ0aWQiOiJhM2E1NDQ1Yi0zMGQxLTQxZWQtOWE4MC1kOGVhNzVhMTYzOWYiLCJ1bmlxdWVfbmFtZSI6IkFkbWlud3N0ZWNoQHdzdGVjaC5jby5pbiIsInVwbiI6IkFkbWlud3N0ZWNoQHdzdGVjaC5jby5pbiIsInV0aSI6Iks4NVF6NnNWYUVXQy1BUFlORHdCQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfcGwiOiJlbi1VUyJ9.PlNhn4mpcBc9wW7e-AFQGztTzHiczgO1fDNuz9duB1opC9QKuWvVn9rySWz2b8Ul6aIxjAB8vGDnYwPHAJXEKWqpIpYw-dKVLD3Kb6yBv2vlFrq6lvn7ht7oblTlBYBesK_Ck-xue58UKJLdTo9emh0Nbs9_nFeZZ6ROlQhtlElEcEM-bA9urqMwxnETNvbtnEXUEq2wLzqWYeaBk1lf0W07QxlpaFaoTJnWYwEUktYFCyQWAax7dMyDpqWZYE6eyS2VD8qfzf8Dt_UPAm_7OoT-B8FfgnsCPAm8MAuIRf8_SASDQwTt_bXVwBOBjJSomAsUpVcof_92SnD9Ickz9A";
    //reportid = "2fa6ea43-1fb1-4d8a-8441-8edbbfa6bd8a";
    try {
      // Embed URL    
      let embedUrl = 'https://app.powerbi.com/reportEmbed';
      let embedReportId = reportid;
      let settings: pbi.IEmbedSettings = {
        filterPaneEnabled: false,
        navContentPaneEnabled: true,
      };

      let config: pbi.IEmbedConfiguration = {
        type: 'report',
        tokenType: pbi.models.TokenType.Aad,
        accessToken: Token,
        //datasetBinding: {
        //  datasetId: "83c8b211-ed48-4017-a7d5-afae49aaf8bd" // The dataset id that you want the report to use 
        //},
        // permissions: pbi.models.Permissions.All,
        embedUrl: embedUrl,
        id: embedReportId,


        settings: {
          layoutType: pbi.models.LayoutType.MobilePortrait,

          customLayout: {
            displayOption: pbi.models.DisplayOption.ActualSize

          },

          filterPaneEnabled: false,
          navContentPaneEnabled: true
        }
      };





      let reportContainer1 = this.reportContainer1.nativeElement;

      //let reportContainer = <HTMLElement>document.getElementById('reportContainer2');
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

      powerbi.reset(reportContainer1);
      this.report = powerbi.embed(reportContainer1, config);

      this.report.off("loaded");

      this.report.on("loaded", () => {
        console.log("Loaded");

      });


      this.report.on("error", () => {
        console.log("Error");
      });
    }
    catch (e) {
      throw e;
    }
  }
  showReport(Token: any, reportid: any) {
    /*Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTNhNTQ0NWItMzBkMS00MWVkLTlhODAtZDhlYTc1YTE2MzlmLyIsImlhdCI6MTcxMjkyNjUyMCwibmJmIjoxNzEyOTI2NTIwLCJleHAiOjE3MTI5MzA5MzQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFJWjA3MnZ1RE9jNjZpWkZmc2U5dm1rMDJvK1NqSE9pdHRmNzVwNmpIRWIralFvYjdpbTRwZGR1djBEVzl0SmRHIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImI4OGRjMzc1LTY3MzktNGVkOS04NWI0LTY4MGM3YThlNGY2ZCIsImFwcGlkYWNyIjoiMSIsImdpdmVuX25hbWUiOiJBZG1pbndzdGVjaCIsImlwYWRkciI6IjUyLjE4Mi4yMjguMTUxIiwibmFtZSI6IkFkbWlud3N0ZWNoIiwib2lkIjoiYWY5ZWQ0NzQtMzcxMS00MzliLWI2NDMtNTk4MDdkODllNGQ1IiwicHVpZCI6IjEwMDMyMDAwQTJDQkY5NTAiLCJyaCI6IjAuQVVrQVcwU2xvOUV3N1VHYWdOanFkYUZqbndrQUFBQUFBQUFBd0FBQUFBQUFBQUJKQUNVLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6InNKQkhIOVRSNFZSNnFiRlBjbktBcVFfbTM2N2FLRW44OXp4NWtUOUxjZ0EiLCJ0aWQiOiJhM2E1NDQ1Yi0zMGQxLTQxZWQtOWE4MC1kOGVhNzVhMTYzOWYiLCJ1bmlxdWVfbmFtZSI6IkFkbWlud3N0ZWNoQHdzdGVjaC5jby5pbiIsInVwbiI6IkFkbWlud3N0ZWNoQHdzdGVjaC5jby5pbiIsInV0aSI6Iks4NVF6NnNWYUVXQy1BUFlORHdCQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfcGwiOiJlbi1VUyJ9.PlNhn4mpcBc9wW7e-AFQGztTzHiczgO1fDNuz9duB1opC9QKuWvVn9rySWz2b8Ul6aIxjAB8vGDnYwPHAJXEKWqpIpYw-dKVLD3Kb6yBv2vlFrq6lvn7ht7oblTlBYBesK_Ck-xue58UKJLdTo9emh0Nbs9_nFeZZ6ROlQhtlElEcEM-bA9urqMwxnETNvbtnEXUEq2wLzqWYeaBk1lf0W07QxlpaFaoTJnWYwEUktYFCyQWAax7dMyDpqWZYE6eyS2VD8qfzf8Dt_UPAm_7OoT-B8FfgnsCPAm8MAuIRf8_SASDQwTt_bXVwBOBjJSomAsUpVcof_92SnD9Ickz9A";*/
    reportid = "2fa6ea43-1fb1-4d8a-8441-8edbbfa6bd8a";
    try {
      // Embed URL    
      let embedUrl = 'https://app.powerbi.com/reportEmbed';
      let embedReportId = reportid;
      let settings: pbi.IEmbedSettings = {
        filterPaneEnabled: false,
        navContentPaneEnabled: true,
      };

      let config: pbi.IEmbedConfiguration = {
        type: 'report',
        tokenType: pbi.models.TokenType.Aad,
        accessToken: Token,
        //datasetBinding: {
        //  datasetId: "83c8b211-ed48-4017-a7d5-afae49aaf8bd" // The dataset id that you want the report to use 
        //},
        // permissions: pbi.models.Permissions.All,
        embedUrl: embedUrl,
        id: embedReportId,


        settings: {
          layoutType: pbi.models.LayoutType.Custom,

          customLayout: {
            displayOption: pbi.models.DisplayOption.ActualSize

          },

          filterPaneEnabled: false,
          navContentPaneEnabled: true
        }
      };





      let reportContainer1 = this.reportContainer1.nativeElement;

      //let reportContainer = <HTMLElement>document.getElementById('reportContainer2');
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

      powerbi.reset(reportContainer1);
      this.report = powerbi.embed(reportContainer1, config);

      this.report.off("loaded");

      this.report.on("loaded", () => {
        console.log("Loaded");

      });


      this.report.on("error", () => {
        console.log("Error");
      });
    }
    catch (e) {
      throw e;
    }
  }
  getaccesstoken() {

    return this.http.get("https://makpowerwebservice.azurewebsites.net//Loadticket1")
  }
  loadallstatusdetail() {
    var jsonprams: any = JSON.stringify(this.filterdetail);
    console.log(this.filterdetail)
    var spsname = "[makpower].[Sp_Technician_timesheet]";
    let params1 = new HttpParams().set('JSONFileparams', jsonprams).set('spname', spsname).set('clientid', this.clientid);
    console.log(params1)
    return this.http.get("https://genericwebservicemaxpower.azurewebsites.net/GENERICSPMULTIPLE", { params: params1 })
  }
  ngAfterViewInit() {
    /*  this.clientid = this.Datashare.getclientid();*/
    this.clientid = "";
    this.loadallstatusdetail().subscribe((loadallstatusdetail: any) => {
      console.warn("loadallstatusdetail", loadallstatusdetail)
      this.dataloadallstatusdetail = loadallstatusdetail
    })
    this.getaccesstoken().subscribe((accesstoken1: any) => {
      var access = accesstoken1[0].access;
      this.observer.observe(['(max-width: 900px)']).subscribe((screenSize) => {
        if (screenSize.matches) {
          this.isMobile = true;
          var Token = "7e3aaf49-db6f-423a-a45c-3d10d4118d3f";
          var reportid = "2fa6ea43-1fb1-4d8a-8441-8edbbfa6bd8a";
          this.showReport1(access, reportid)
        } else {
          this.isMobile = false;
          var Token = "7e3aaf49-db6f-423a-a45c-3d10d4118d3f";
          var reportid = "2fa6ea43-1fb1-4d8a-8441-8edbbfa6bd8a";
          this.showReport(access, reportid)
        }
      });
    })

  }
  ngOnInit() {
  }

}

