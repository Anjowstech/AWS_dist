import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { FaceloginComponent } from './facelogin/facelogin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardreportComponent } from './dashboardreport/dashboardreport.component';
import { CreatesupplierComponent } from './createsupplier/createsupplier.component';
import { ShipmentComponent } from './shipment/shipment.component';
const appRoutes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' }, { path: 'Facelogin', component: FaceloginComponent }, { path: 'login', component: LoginLayoutComponent, children: [{ path: '', component: LoginComponent }] },
{
  path: 'main', component: HomeComponent, children: [{ path: 'TaskList', component: TasklistComponent, pathMatch: 'full' },
    { path: 'Dashboardreport', component: DashboardreportComponent },
    { path: 'createsupplier', component: CreatesupplierComponent },

  ]
}
];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ToolbarComponent,
    LoginComponent,
    LoginLayoutComponent,
    TasklistComponent,
    FaceloginComponent,
    DashboardreportComponent,
    CreatesupplierComponent,
    ShipmentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatToolbarModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,

    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
  ],
  entryComponents: [TasklistComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
