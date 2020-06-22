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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../Service/auth.service';
import { contractService } from '../contract/contract.service';
import 'rxjs/add/operator/toPromise';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'app-adddata',
  templateUrl: './AddData.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css','../css/dashboard.css','./AddData.component.css'],
  providers: [contractService]
})
export class AddDataComponent implements OnInit {
  myForm: FormGroup;
  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  public hash;
  someValue: string;
  assetId = new FormControl('', Validators.required);
  documentHash = new FormControl('', Validators.required);
  creator = new FormControl('', Validators.required);
  signator = new FormControl('', Validators.required);
  creatorSigned = new FormControl('', Validators.required);
  signatorSigned = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  dayStart = new FormControl('', Validators.required);
  time = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  rateSuccessContract = new FormControl('', Validators.required);
  rateSuccess = new FormControl('', Validators.required);
  N = new FormControl('', Validators.required);
  M = new FormControl('', Validators.required);
  Contract = new FormControl('', Validators.required);

  constructor(public servicecontract: contractService, fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.myForm = fb.group({
      assetId: this.assetId,
      documentHash: this.documentHash,
      creator: this.creator,
      signator: this.signator,
      creatorSigned: this.creatorSigned,
      signatorSigned: this.signatorSigned,
      state: this.state,
      location: this.location,
      description: this.description,
      dayStart: this.dayStart,
      time: this.time,
      price: this.price,
      rateSuccessContract: this.rateSuccessContract,
      rateSuccess: this.rateSuccess,
      N: this.N,
      M: this.M
    });
  };

  ngOnInit(): void {
    this.resetForm();
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      let output;
      reader.onload = function(evt) {
        output = CryptoJS.SHA256(reader.result).toString(CryptoJS.enc.Hex);
      }
      this.someValue = btoa(output);
      this.hash = output;
    }
  }
  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.namespace.pqd.contract',
      'assetId': this.assetId.value,
      'documentHash': this.documentHash.value,
      'creator': this.creator.value,
      'signator': this.signator.value,
      'creatorSigned': false,
      'signatorSigned': false,
      'state': this.state.value,
      'location': this.location.value,
      'description': this.description.value,
      'dayStart': this.dayStart.value,
      'time': this.time.value,
      'price': this.price.value,
      'rateSuccessContract': this.rateSuccessContract.value,
      'rateSuccess': this.rateSuccess.value,
      'N': this.N.value,
      'M': this.M.value
    };

    this.myForm.setValue({
      'assetId': null,
      'documentHash': null,
      'creator': null,
      'signator': null,
      'creatorSigned': null,
      'signatorSigned': null,
      'state': null,
      'location': null,
      'description': null,
      'dayStart': null,
      'time': null,
      'price': null,
      'rateSuccessContract': null,
      'rateSuccess': null,
      'N': null,
      'M': null
    });

    return this.servicecontract.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'assetId': null,
        'documentHash': null,
        'creator': null,
        'signator': null,
        'creatorSigned': null,
        'signatorSigned': null,
        'state': null,
        'location': null,
        'description': null,
        'dayStart': null,
        'time': null,
        'price': null,
        'rateSuccessContract': null,
        'rateSuccess': null,
        'N': null,
        'M': null
      });
      this.router.navigate(["/AddContract"]);
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }
  resetForm(): void {
    this.myForm.setValue({
      'assetId': null,
      'documentHash': null,
      'creator': null,
      'signator': null,
      'creatorSigned': null,
      'signatorSigned': null,
      'state': null,
      'location': null,
      'description': null,
      'dayStart': null,
      'time': null,
      'price': null,
      'rateSuccessContract': null,
      'rateSuccess': null,
      'N': null,
      'M': null
      });
  }
}
