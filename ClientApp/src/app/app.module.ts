import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskdetailpageComponent } from './taskdetailpage/taskdetailpage.component';
import { MarketResearchComponent } from './market-research/market-research.component';
import { DesktopCameraService } from './service/desktop-camera.service';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ReOrderComponent } from './re-order/re-order.component';
import { OrderStatusUpdateComponent } from './order-management/order-status-update/order-status-update.component';
import { ReOrderPopUpComponent } from './re-order/re-order-pop-up/re-order-pop-up.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


const appRoutes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' }, { path: 'Facelogin', component: FaceloginComponent }, { path: 'login', component: LoginLayoutComponent, children: [{ path: '', component: LoginComponent }] },
{
  path: 'main', component: HomeComponent, children: [{ path: 'TaskList', component: TasklistComponent, pathMatch: 'full' },
    { path: 'Dashboardreport', component: DashboardreportComponent },
    { path: 'createsupplier', component: CreatesupplierComponent },
    { path: 'marketresearch', component: MarketResearchComponent },
    { path: 'Shipment', component: ShipmentComponent },
    { path: 'OrderMang', component: OrderManagementComponent },
    { path: 'ReOrder', component: ReOrderComponent }
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
    ShipmentComponent,
    TaskdetailpageComponent,
    MarketResearchComponent,
    OrderManagementComponent,
    ReOrderComponent,
    OrderStatusUpdateComponent,
    ReOrderPopUpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatToolbarModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    MatDialogModule,
        BrowserAnimationsModule,
  ],
  entryComponents: [TasklistComponent, ShipmentComponent, ReOrderPopUpComponent, OrderStatusUpdateComponent],
  providers: [
    DesktopCameraService,
  ],
  bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
