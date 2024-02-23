import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockPageComponent } from './ui/block-page/block-page.component';
import {GraphqlModule} from "./graphql.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastService} from "ecapture-ng-ui";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    AppComponent,
    BlockPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphqlModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ConfirmDialogModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
