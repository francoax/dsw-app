import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent],
=======
import { SharedModule } from "./modules/shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule
    ]
>>>>>>> 63d3f6f59b4a5cc32dccf6b1444a485e4868bba7
})
export class AppModule {}
