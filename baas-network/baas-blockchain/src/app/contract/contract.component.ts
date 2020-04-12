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
import { ActivatedRoute } from '@angular/router';
import { contractService } from './contract.service';
import 'rxjs/add/operator/toPromise';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css','./contract.component.css'],
  providers: [contractService]
})
export class contractComponent implements OnInit {

  myForm: FormGroup;
  signForm: FormGroup;
  votingForm: FormGroup;
  Contract_v = new FormControl('', Validators.required);
  isSuccessData = new FormControl('', Validators.required);
  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  public hash;
  private sub;
  private id;  
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

  constructor(public servicecontract: contractService, fb: FormBuilder, private router: Router , private _Activatedroute:ActivatedRoute) {
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
    this.signForm = fb.group({
      Contract: this.Contract
    });
    this.votingForm = fb.group({
      Contract_v: this.Contract_v,
      isSuccessData: this.isSuccessData
    });
  };

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => {       
      this.id = params.get('id'); 
      console.log(this.id);
      this.loadAll(this.id);             
    });    
    setInterval(() => { 
      this.loadAll(this.id); 
    }, 1000);
  }

  loadAll(id): Promise<any> {
    const tempList = [];
    let creatorInfo;
    let signatorInfo;
    return this.servicecontract.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {                               
        creatorInfo = JSON.stringify(asset.creator);        
        signatorInfo = JSON.stringify(asset.signator);
        if(creatorInfo.indexOf(id) != -1 || signatorInfo.indexOf(id) != -1){
          tempList.push(asset);
        }        
      });
      console.log(tempList);
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(file);
      let output;
      reader.onload = function(evt) {
        console.log(evt);
        output = CryptoJS.SHA256(reader.result).toString(CryptoJS.enc.Hex);
      }
      this.someValue = btoa(output);
      this.hash = output;
    }
  }
  // addAsset(form: any): Promise<any> {
  //   this.asset = {
  //     $class: 'org.namespace.pqd.contract',
  //     'assetId': this.assetId.value,
  //     'documentHash': this.documentHash.value,
  //     'creator': this.creator.value,
  //     'signator': this.signator.value,
  //     'creatorSigned': false,
  //     'signatorSigned': false,
  //     'state': this.state.value,
  //     'location': this.location.value,
  //     'description': this.description.value,
  //     'dayStart': this.dayStart.value,
  //     'time': this.time.value,
  //     'price': this.price.value,
  //     'rateSuccessContract': this.rateSuccessContract.value,
  //     'rateSuccess': this.rateSuccess.value,
  //     'N': this.N.value,
  //     'M': this.M.value
  //   };

  //   this.myForm.setValue({
  //     'assetId': null,
  //     'documentHash': null,
  //     'creator': null,
  //     'signator': null,
  //     'creatorSigned': null,
  //     'signatorSigned': null,
  //     'state': null,
  //     'location': null,
  //     'description': null,
  //     'dayStart': null,
  //     'time': null,
  //     'price': null,
  //     'rateSuccessContract': null,
  //     'rateSuccess': null,
  //     'N': null,
  //     'M': null
  //   });

  //   return this.servicecontract.addAsset(this.asset)
  //   .toPromise()
  //   .then(() => {
  //     this.errorMessage = null;
  //     this.myForm.setValue({
  //       'assetId': null,
  //       'documentHash': null,
  //       'creator': null,
  //       'signator': null,
  //       'creatorSigned': null,
  //       'signatorSigned': null,
  //       'state': null,
  //       'location': null,
  //       'description': null,
  //       'dayStart': null,
  //       'time': null,
  //       'price': null,
  //       'rateSuccessContract': null,
  //       'rateSuccess': null,
  //       'N': null,
  //       'M': null
  //     });
  //     this.loadAll();
  //   })
  //   .catch((error) => {
  //     if (error === 'Server error') {
  //         this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
  //     } else {
  //         this.errorMessage = error;
  //     }
  //   });
  // }


  // updateAsset(form: any): Promise<any> {
  //   this.asset = {
  //     $class: 'org.namespace.pqd.contract',
  //     'documentHash': this.documentHash.value,
  //     'creator': this.creator.value,
  //     'signator': this.signator.value,
  //     'creatorSigned': this.creatorSigned.value,
  //     'signatorSigned': this.signatorSigned.value,
  //     'state': this.state.value,
  //     'location': this.location.value,
  //     'description': this.description.value,
  //     'dayStart': this.dayStart.value,
  //     'time': this.time.value,
  //     'price': this.price.value,
  //     'rateSuccessContract': this.rateSuccessContract.value,
  //     'rateSuccess': this.rateSuccess.value,
  //     'N': this.N.value,
  //     'M': this.M.value
  //   };

  //   return this.servicecontract.updateAsset(form.get('assetId').value, this.asset)
  //   .toPromise()
  //   .then(() => {
  //     this.errorMessage = null;
  //     this.loadAll();
  //   })
  //   .catch((error) => {
  //     if (error === 'Server error') {
  //       this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
  //     } else if (error === '404 - Not Found') {
  //       this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
  //     } else {
  //       this.errorMessage = error;
  //     }
  //   });
  // }


  // deleteAsset(): Promise<any> {

  //   return this.servicecontract.deleteAsset(this.currentId)
  //   .toPromise()
  //   .then(() => {
  //     this.errorMessage = null;
  //     this.loadAll();
  //   })
  //   .catch((error) => {
  //     if (error === 'Server error') {
  //       this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
  //     } else if (error === '404 - Not Found') {
  //       this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
  //     } else {
  //       this.errorMessage = error;
  //     }
  //   });
  // }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicecontract.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
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
      };

      if (result.assetId) {
        formObject.assetId = result.assetId;
      } else {
        formObject.assetId = null;
      }

      if (result.documentHash) {
        formObject.documentHash = result.documentHash;
      } else {
        formObject.documentHash = null;
      }

      if (result.creator) {
        formObject.creator = result.creator;
      } else {
        formObject.creator = null;
      }

      if (result.signator) {
        formObject.signator = result.signator;
      } else {
        formObject.signator = null;
      }      
      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.location) {
        formObject.location = result.location;
      } else {
        formObject.location = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.dayStart) {
        formObject.dayStart = result.dayStart;
      } else {
        formObject.dayStart = null;
      }

      if (result.time) {
        formObject.time = result.time;
      } else {
        formObject.time = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.rateSuccessContract) {
        formObject.rateSuccessContract = result.rateSuccessContract;
      } else {
        formObject.rateSuccessContract = null;
      }

      if (result.rateSuccess) {
        formObject.rateSuccess = result.rateSuccess;
      } else {
        formObject.rateSuccess = null;
      }

      if (result.N) {
        formObject.N = result.N;
      } else {
        formObject.N = null;
      }

      if (result.M) {
        formObject.M = result.M;
      } else {
        formObject.M = null;
      }

      this.myForm.setValue(formObject);

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
  // addTransaction(form: any): Promise<any> {
  //   this.Transaction = {
  //     $class: 'org.namespace.pqd.signContract',
  //     'Contract': this.Contract.value
  //   };

  //   this.signForm.setValue({
  //     'Contract': null
  //   });

  //   return this.servicecontract.addTransaction(this.Transaction)
  //   .toPromise()
  //   .then(() => {
  //     this.errorMessage = null;
  //     this.signForm.setValue({
  //       'Contract': null,
  //     });
  //     this.loadAll();
  //   })
  //   .catch((error) => {
  //     if (error === 'Server error') {
  //       this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
  //     } else {
  //       this.errorMessage = error;
  //     }
  //   });
  // }
  // addVotingTransaction(form: any): Promise<any>{
  //   this.Transaction = {
  //     $class: 'org.namespace.pqd.updateVoting',
  //     'Contract': this.Contract_v.value,
  //     'isSuccessData': this.isSuccessData.value      
  //   };

  //   this.votingForm.setValue({
  //     'Contract_v': null,
  //     'isSuccessData': null      
  //   });
    

  //   return this.servicecontract.addTransaction(this.Transaction)
  //   .toPromise()
  //   .then(() => {
  //     this.errorMessage = null;
  //     this.votingForm.setValue({
  //       'Contract_v': null,
  //       'isSuccessData': null        
  //     });
  //     this.loadAll();
  //   })
  //   .catch((error) => {
  //     if (error === 'Server error') {
  //       this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
  //     } else {
  //       this.errorMessage = error;
  //     }
  //   });
  // }

  getDetail(assetId){
    this.router.navigate(['ContractDetail',assetId]);
  }

}
