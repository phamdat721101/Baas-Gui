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

import { contractComponent } from './contract/contract.component';
import { CommodityCustomerComponent } from './CommodityCustomer/CommodityCustomer.component';
import { CommodityProviderComponent } from './CommodityProvider/CommodityProvider.component';

import { VendorComponent } from './Vendor/Vendor.component';
import { ProviderComponent } from './Provider/Provider.component';
import { CustomerComponent } from './Customer/Customer.component';

import { signContractComponent } from './signContract/signContract.component';
import { completeSignOffComponent } from './completeSignOff/completeSignOff.component';
import { TradeComponent } from './Trade/Trade.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contract', component: contractComponent },
  { path: 'CommodityCustomer', component: CommodityCustomerComponent },
  { path: 'CommodityProvider', component: CommodityProviderComponent },
  { path: 'Vendor', component: VendorComponent },
  { path: 'Provider', component: ProviderComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'signContract', component: signContractComponent },
  { path: 'completeSignOff', component: completeSignOffComponent },
  { path: 'Trade', component: TradeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
