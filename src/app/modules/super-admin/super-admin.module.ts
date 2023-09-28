import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/shared.module";
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
})
export class SuperAdminModule { }
