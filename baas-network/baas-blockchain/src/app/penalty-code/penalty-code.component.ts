import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { penaltyCodeService } from './penalty-code.service';
@Component({
  selector: 'app-penalty-code',
  templateUrl: './penalty-code.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css','./penalty-code.component.css'],
  providers: [penaltyCodeService]
})
export class PenaltyCodeComponent implements OnInit {  
  private allPenaltyCodes;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;  
  private sub;
  private id; 

  constructor(public penaltyService: penaltyCodeService, private router: Router , private _Activatedroute:ActivatedRoute) {    
  };

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => {       
      this.id = params.get('id');       
      this.loadAll(this.id);             
    });    
    setInterval(() => { 
      this.loadAll(this.id); 
    }, 1000);
  }

  loadAll(id): Promise<any> {
    const tempList = [];    
    return this.penaltyService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {                               
        tempList.push(asset);       
      });      
      this.allPenaltyCodes = tempList;
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
   
}
