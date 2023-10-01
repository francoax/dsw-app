import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/shared.module";
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastInterceptor } from '../shared/toast/toast.interceptor';


@NgModule({
    declarations: [
        LayoutComponent,
        AdminsListComponent,
        AdminManagementComponent
    ],
    imports: [
        CommonModule,
        SuperAdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers : [
      { provide : HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi: true }
    ]
})
export class SuperAdminModule { }
