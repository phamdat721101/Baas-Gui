import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../Provider/Provider.service';
import { ServiceDetailService } from './servicedetail.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { Provider } from '../org.namespace.pqd';

@Component({
  selector: 'app-servicedetail',
  templateUrl: './servicedetail.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css','./servicedetail.component.css'],
  providers: [ServiceDetailService]
})
export class ServicedetailComponent implements OnInit {

  provider : Provider;
  private errorMessage;
  private sub;
  private id;
  public allAssets;

  constructor(public providerService: ServiceDetailService, 
    private _Activatedroute:ActivatedRoute,
    public auth: AuthService){ }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id');     
    this.auth.setCurrentUser(sessionStorage.getItem('auth_user'));
    setInterval(() => { 
      this.loadProviderService(this.id);
    }, 1000);
    // this.sub=this._Activatedroute.paramMap.subscribe(params => {       
            
    // });
  }

  loadProviderService(id): Promise<any>{
    const tempList = [];
    return this.providerService.getparticipant(id).toPromise()
    .then((result) => {
      this.errorMessage = null;     
      result.listServiceStat.forEach(item => {
        tempList.push(item);
      });
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
