
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { HomeComponent } from "./home";
import { LoginComponent } from './login';
import { ActionsComponent} from './actions';
import { NewPlantComponent } from './new-plant';
import { ViewMoreComponent } from './viewMore';
import { ConfigurationComponent } from './configuration';
import { RatingComponent } from "./rating";
import { NotificationComponent } from "./notification";
import { ProfileComponent } from "./profile";
import { NewApplicationDialog } from './profile/add-application/add-application.component'
import { NewDeviceDialog } from './profile/add-device/add-device.component'
import { ChartComponent } from "./chart";

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ChartsModule} from 'ng2-charts';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ActionsComponent,
    MainNavComponent,
    NewPlantComponent,
    ViewMoreComponent,
    ConfigurationComponent,
    RatingComponent,
    NotificationComponent,
    ProfileComponent,
    NewApplicationDialog,
    NewDeviceDialog,
    ChartComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatGridListModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ChartsModule,
        NgSelectModule,
        NgbRatingModule
    ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewApplicationDialog, NewDeviceDialog]
})
export class AppModule { }
