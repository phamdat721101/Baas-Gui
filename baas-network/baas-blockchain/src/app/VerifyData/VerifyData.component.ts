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
import {LoginService} from '../Login/Login.service';
import 'rxjs/add/operator/toPromise';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-verifydata',
  templateUrl: './VerifyData.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css','../css/dashboard.css','./VerifyData.component.css'],
  providers: [LoginService]
})
export class VerifyDataComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);

  constructor(public serviceVerifyData: LoginService, fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.myForm = fb.group({
      id: this.id,
      password: this.password,
      role: this.role
    });
  };

  ngOnInit(): void {
    
  }

}
