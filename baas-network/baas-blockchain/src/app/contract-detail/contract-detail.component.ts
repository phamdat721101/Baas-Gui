import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { ContractDetailService } from './contract-detail.service';
import { contractService } from '../contract/contract.service';
import {contract} from '../org.namespace.pqd';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css', '../dist/css/sb-admin-2.css', '../vendor_block/font-awesome/css/font-awesome.min.css'],
  providers: [ContractDetailService, contractService]
})
export class ContractDetailComponent implements OnInit {
  private errorMessage;
  private contractDetail;
  private allTransactions;
  private user_id;
  private sub;
  private systemTransactions;
  private performedTransactions;
  // contractDetail : contract;

  constructor( public serviceTransaction: ContractDetailService,fb: FormBuilder, 
    private _Activatedroute:ActivatedRoute, 
    private contractService: contractService, 
    public auth: AuthService,
    private Router: Router) {          
  };

  ngOnInit(): void {
    this.auth.setCurrentUser(sessionStorage.getItem('auth_user'));
    this.sub = this._Activatedroute.paramMap.subscribe(params => {       
       this.user_id = params.get('id');        
       this.loadContract(this.user_id);     
       this.user_id = sessionStorage.getItem('id');        
    });
    setInterval(() => { 
      this.loadAllTransactions();
    }, 1000);    
  }

  loadContract(id): any{    
    return this.contractService.getAsset(id).toPromise()
    .then((result) => {
      this.errorMessage = null;                 
      this.contractDetail = result;            
      this.contractDetail.creator = this.contractDetail.creator.split("#").pop();   
      this.contractDetail.signator = this.contractDetail.signator.split("#").pop();   
      return result; 
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

  //sort the objects on key
  sortByKey(array, key): any {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  //get all transactions
  loadAllTransactions(): Promise<any> {

    //initialize arrays to collect performed and system transactions
    const tempList = [];
    const systemList = [];
    const performedList = [];

    //collect all transactions for display
    return this.serviceTransaction.getTransactions()
    .toPromise()
    .then((result) => {
      console.log(result);      
      //sort the transactions by timestamp
      result = this.sortByKey(result, 'transactionTimestamp');    
      this.errorMessage = null;
      
      // //for each transaction, determine whether system transaction
      result.forEach(transaction => {
        tempList.push(transaction);

        //split the transactionType string
        var importClass = transaction["transactionType"];
        var importClassArray = importClass.split(".");

        //if `hyperledger` string in the transactionType, then add to systemList, otherwise performedList
        if(importClassArray[1] == 'hyperledger'){
          systemList.push(transaction);
        }
        else {
          performedList.push(transaction);
        }
      });

      //update object
      this.systemTransactions = systemList;
      this.performedTransactions = performedList;
      this.allTransactions = tempList;      
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

}
