import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/shared.module";
import { AdminsListComponent } from './admins-list/admins-list.component';


@NgModule({
    declarations: [
        LayoutComponent,
        AdminsListComponent
    ],
    imports: [
        CommonModule,
        SuperAdminRoutingModule,
        SharedModule
    ],
    exports: [LayoutComponent]
})
export class SuperAdminModule { }
