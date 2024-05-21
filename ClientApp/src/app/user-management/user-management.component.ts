
import { UserAddComponent } from '../user-add/user-add.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  data: any[] = [];
  private intervalId: any;

  constructor(private matDialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 500);
  }

  fetchData() {
   
    const query = '[AWS].[Sp_Select_Users]'
    
    const params = new HttpParams().set('spname', query);

    this.httpClient
      .get('https://awsgenericwebservice.azurewebsites.net/api/Service/SQLLOADEXEC', { params })
     
      .subscribe((data: any) => {
        /*console.log(data);*/
        this.data = data;
      });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  openDialog() {
      this.matDialog.open(UserAddComponent, {
        width: '70%', height: '70%'
      })
    }
  openEditDialog(user: any): void {
    const dialogRef = this.matDialog.open(UserEditComponent, {
      width: '70%',
      height: '70%',
      data: user // Pass the selected user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close events if needed
      console.log('The dialog was closed');
    });
  }
}
