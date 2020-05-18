/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AuthService } from './Service/auth.service';
import { NotifyService } from './Service/notify.service';
import { ServiceDetailService } from './servicedetail/servicedetail.service';
import { penaltyCodeService } from './penalty-code/penalty-code.service';
import { CustomerService } from './Customer/Customer.service';
import { ProviderService } from './Provider/Provider.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddDataComponent } from './AddData/AddData.component';
import { VerifyDataComponent } from './VerifyData/VerifyData.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { ProviderComponent } from './Provider/Provider.component';
import { CustomerComponent } from './Customer/Customer.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { contractComponent } from './contract/contract.component';
import { from } from 'rxjs/observable/from';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };
import { ServicedetailComponent } from './servicedetail/servicedetail.component';
import { PenaltyCodeComponent } from './penalty-code/penalty-code.component';
  @NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
    contractComponent,
    VerifyDataComponent,
    HomeComponent,
    DashboardComponent,
    ProviderComponent,
    CustomerComponent,
    LoginComponent,
    RegisterComponent,
    ContractDetailComponent,
    ServicedetailComponent,
    PenaltyCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [
    NotifyService,
    ServiceDetailService,
    penaltyCodeService,
    DataService,
    AuthService,
    CustomerService,
    ProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
