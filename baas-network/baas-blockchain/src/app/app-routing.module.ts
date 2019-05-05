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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthService } from './Service/auth.service';
import { AppComponent } from './app.component';
import { ProviderComponent } from './Provider/Provider.component';
import { CustomerComponent } from './Customer/Customer.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { AddDataComponent } from './AddData/AddData.component';
import { VerifyDataComponent } from './VerifyData/VerifyData.component';
import { contractComponent } from './contract/contract.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent},
  { path: 'AddData', component: AddDataComponent},
  { path: 'AddContract', component: contractComponent},
  { path: 'VerifyData', component: VerifyDataComponent},
  { path: 'Provider', component: ProviderComponent},
  { path: 'Customer', component: CustomerComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Register', component: RegisterComponent},
  { path: 'Home', component: HomeComponent, canActivate:[AuthService]},
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
