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
import { CustomerService } from './Customer.service';
import 'rxjs/add/operator/toPromise';
import 'datatables.net';
import * as $ from 'jquery';

@Component({
  selector: 'app-customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  tableInitiated: boolean = false;
  table: any;

  cuId = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);  

  constructor(public serviceCustomer: CustomerService, fb: FormBuilder) {
    this.myForm = fb.group({
      cuId: this.cuId,
      username: this.username,
      password: this.password      
    });
    this.initDatatable();
  };

  ngOnInit(): void {
    this.loadAll();
    setInterval(() => { 
      this.loadAll(); 
    }, 1000);
  }
  initDatatable() {
    const ngThis = this;
    this.tableInitiated = true;
    $(document).ready(function () {
      ngThis.table = $('#dataTables-example').DataTable({
        stateSave: true,
        pagingType: 'full_numbers',
        dom: '<"top"fB>rt<"bottom"ipl>',
        order: [[1, "asc"]],
        columnDefs: [
          { orderable: false, targets: [0] },
          {
            targets: [0],
            className: 'dt-center'
          }
        ],
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search by name',
          zeroRecords: 'Nothing found - sorry',
          info: 'Show _START_ to _END_ of _TOTAL_ items',
          lengthMenu: '_MENU_ per page',
          paginate: {
            previous: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            first: '|<i class="fa fa-angle-left" aria-hidden="true"></i>',
            last: '<i class="fa fa-angle-right" aria-hidden="true"></i>|'
          }
        },
      });
    });
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCustomer.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.namespace.pqd.Customer',
      'cuId': this.cuId.value,
      'username': this.username.value,
      'password': this.password.value      
    };

    this.myForm.setValue({
      'cuId': null,
      'username': null,
      'password': null,
      'signature': null
    });

    return this.serviceCustomer.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'cuId': null,
        'username': null,
        'password': null,
        'signature': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.namespace.pqd.Customer',
      'username': this.username.value,
      'password': this.password.value
    };

    return this.serviceCustomer.updateParticipant(form.get('cuId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteParticipant(): Promise<any> {

    return this.serviceCustomer.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCustomer.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'cuId': null,
        'username': null,
        'password': null,
        'signature': null
      };

      if (result.cuId) {
        formObject.cuId = result.cuId;
      } else {
        formObject.cuId = null;
      }

      if (result.username) {
        formObject.username = result.username;
      } else {
        formObject.username = null;
      }

      if (result.password) {
        formObject.password = result.password;
      } else {
        formObject.password = null;
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
      'cuId': null,
      'username': null,
      'password': null      
    });
  }
}
