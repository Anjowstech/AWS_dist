import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddComponentComponent } from '../app/branding/add-component/add-component.component';
import { MsgBoxComponent } from '../app/msg-box/msg-box.component';
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
import { BrandingComponent } from './branding/branding.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ReorderComponent } from './reorder/reorder.component';
import { CameraComponent } from './camera/camera.component';
import { ViewImagesComponent } from './view-images/view-images.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTaskComponent } from './create-task/create-task.component';
import { LuggageReportComponent } from './luggage-report/luggage-report.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { FaceAPILogInComponent } from './face-apilog-in/face-apilog-in.component';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from '../app/user-edit/user-edit.component';
import { ReOrderPopUpComponent } from '../app/reorder/re-order-pop-up/re-order-pop-up.component';
import { OrderStatusUpdateComponent } from '../app/order-management/order-status-update/order-status-update.component';

const appRoutes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' }, { path: 'Facelogin', component: FaceAPILogInComponent }, { path: 'login', component: LoginLayoutComponent, children: [{ path: '', component: LoginComponent }] },
{
  path: 'main', component: HomeComponent, children: [{ path: 'TaskList', component: TasklistComponent, pathMatch: 'full' },
    { path: 'Dashboardreport', component: DashboardreportComponent },
    { path: 'createsupplier', component: CreatesupplierComponent },
    { path: 'TaskdetailpageComponent', component: TaskdetailpageComponent },
    { path: 'marketresearch', component: MarketResearchComponent },
    { path: 'Branding', component: BrandingComponent },
    { path: 'ordermanagement', component: OrderManagementComponent },
    { path: 'Shipment', component: ShipmentComponent },
    { path: 'Reorder', component: ReorderComponent },
    { path: 'admin', component: UserManagementComponent }
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
    AddComponentComponent,
    DashboardreportComponent,
    CreatesupplierComponent,
    ShipmentComponent,
    TaskdetailpageComponent,
    MarketResearchComponent,
    BrandingComponent,
    OrderManagementComponent,
    ReorderComponent,
    OrderStatusUpdateComponent,
    CameraComponent,
    ViewImagesComponent,
    ReOrderPopUpComponent,
    UserEditComponent,
    CreateTaskComponent,
    LuggageReportComponent,
    WorkflowComponent,
    FaceAPILogInComponent,
    AdminComponent,
    UserManagementComponent,
    UserAddComponent,
    MsgBoxComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatToolbarModule,
    MatDividerModule,
    NgbModule,
    NoopAnimationsModule,
MatSidenavModule ,
    FlexLayoutModule,

    FormsModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    MatDialogModule,
        BrowserAnimationsModule,
  ],
  entryComponents: [TasklistComponent, ShipmentComponent, CameraComponent, ViewImagesComponent, UserAddComponent, AddComponentComponent, MsgBoxComponent, UserEditComponent, ReOrderPopUpComponent, OrderStatusUpdateComponent],
  providers: [],
  bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
