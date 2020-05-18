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

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { contractService } from '../contract/contract.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css'],
  providers:[contractService]
})
export class DashboardComponent implements OnInit {
  private id;
  public errorMessage;
  public allAssets;
  public notify_message;
  constructor (
    public auth: AuthService,
    private Router: Router,
    public contractService: contractService
  ) {
  }

  ngOnInit(): void{    
    //console.log("This is session: ", sessionStorage.getItem('id'));
    this.id = sessionStorage.getItem('id');        
    this.auth.setCurrentUser(sessionStorage.getItem('auth_user'));
    setInterval(() => {       
      this.loadAll(this.id);       
    }, 1000);
  }

  /*-Start to load All SLA contract-*/
  loadAll(id): Promise<any> {
    const tempList = [];
    const notifyList = [];
    let creatorInfo;
    let signatorInfo;
    return this.contractService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {                               
        creatorInfo = JSON.stringify(asset.creator);        
        signatorInfo = JSON.stringify(asset.signator); 
        if(asset.timeState == "PenaltyRule"){
          notifyList.push("Data of " + asset.assetId + " was not been sent after 15 minutes");
        }
        if(creatorInfo.indexOf(id) != -1 || signatorInfo.indexOf(id) != -1){
          tempList.push(asset);
        }        
      }); 
      this.notify_message = notifyList;
      //console.log("Length of notify ", this.notify_message.length);
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }
}
