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
import { LoginService } from './Login.service';
import { AuthService } from '../Service/auth.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['../css/styles.css','../css/datepicker3.css','./Login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);

  constructor(public serviceLogin: LoginService, fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.myForm = fb.group({
      id: this.id,
      password: this.password,
      role: this.role
    });
  };

  ngOnInit(): void {
    
  }
  decodeUserFromToken(token:any) {
    return this.jwtHelper.decodeToken(token);
  }
  Login(): Promise<any>{    
    if(this.role.value == 'Vendor'){
      if(this.id.value == "ven1"
        && this.password.value == "721101"){
        console.log('Success to login');
        this.auth.setCurrentUser('Vendor');
        window.location.href = "http://103.48.80.41:8080/"
      }
      else{
        alert('Fail to login');
        this.router.navigate(['/Login']);
      }
      //   return this.serviceLogin.getVendor(this.id.value).toPromise()
      // .then((result) =>{
        
      // }).catch((error) => {
      //   if (error === 'Server error') {
      //     this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      //   } else if (error === '404 - Not Found') {
      //     this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      //     this.errorMessage = error;
      //   }
      // });
    }
    else if(this.role.value == 'Customer'){
        return this.serviceLogin.getCustomer(this.id.value).toPromise()
      .then((result) =>{
        if(this.id.value == result.cuId
          && this.password.value == result.password){          
          this.auth.setCurrentUser('Customer');
          sessionStorage.setItem('id', result.cuId);
          sessionStorage.setItem('auth_user', 'Customer');
          this.router.navigate(['/Home']);
        }
        else{          
          alert('Fail to login');
          this.router.navigate(['/Login']);
        }
      }).catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          this.errorMessage = error;
        }
        alert('Fail to login');
        this.router.navigate(['/Login']);
      });
    }
    else if(this.role.value == 'Provider'){
        return this.serviceLogin.getProvider(this.id.value).toPromise()
      .then((result) =>{
        if(this.id.value == result.proId
          && this.password.value == result.password){          
          this.auth.setCurrentUser('Provider');
          sessionStorage.setItem('id', result.proId);
          sessionStorage.setItem('auth_user', 'Provider');
          this.router.navigate(['/Home']);
        }
        else{
          alert('Fail to login');
          this.router.navigate(['/Login']);
        }
      }).catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          this.errorMessage = error;
        }
        alert('Fail to login');
        this.router.navigate(['/Login']);
      });
    }else{
      alert('Fail to login');
      this.router.navigate(['/Login']);
    }
  }

}
