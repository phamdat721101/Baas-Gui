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
import { RegisterService } from './Register.service';
import { ProviderService } from '../Provider/Provider.service';
import { CustomerService } from '../Customer/Customer.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  myFormCustomer: FormGroup;

  private allParticipants;
  private customer;
  private provider;
  private currentId;
  private errorMessage;

  cuId = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  myFormProvider: FormGroup;

  proId = new FormControl('', Validators.required);
  usernamePro = new FormControl('', Validators.required);
  passwordPro = new FormControl('', Validators.required);

  constructor(public serviceRegister: RegisterService, fb: FormBuilder, public serviceCustomer: CustomerService
    , public serviceProvider: ProviderService
    , private router: Router) {
    this.myFormCustomer = fb.group({
      cuId: this.cuId,
      username: this.username,
      password: this.password
    });
    this.myFormProvider = fb.group({
      proId: this.proId,
      usernamePro: this.usernamePro,
      passwordPro: this.passwordPro
    });
  };

  ngOnInit(): void {
    
  }
  addCustomer(form: any): Promise<any> {
    this.customer = {
      $class: 'org.namespace.pqd.Customer',
      'cuId': this.cuId.value,
      'username': this.username.value,
      'password': this.password.value
    };

    this.myFormCustomer.setValue({
      'cuId': null,
      'username': null,
      'password': null
    });

    return this.serviceCustomer.addParticipant(this.customer)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myFormCustomer.setValue({
        'cuId': null,
        'username': null,
        'password': null
      });
      this.router.navigate(['/Login']);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  addProvider(form: any): Promise<any> {
    this.provider = {
      $class: 'org.namespace.pqd.Provider',
      'proId': this.proId.value,
      'username': this.usernamePro.value,
      'password': this.passwordPro.value
    };

    this.myFormProvider.setValue({
      'proId': null,
      'usernamePro': null,
      'passwordPro': null
    });

    return this.serviceProvider.addParticipant(this.provider)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myFormProvider.setValue({
        'proId': null,
        'usernamePro': null,
        'passwordPro': null
      });
      this.router.navigate(['/Login']);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }
  
}
