import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../Provider/Provider.service';
import { ActivatedRoute } from '@angular/router';
import { Provider } from '../org.namespace.pqd';

@Component({
  selector: 'app-servicedetail',
  templateUrl: './servicedetail.component.html',
  styleUrls: ['../vendor_block/bootstrap/css/bootstrap.min.css','../vendor_block/metisMenu/metisMenu.min.css','../vendor_block/datatables-plugins/dataTables.bootstrap.css',
  '../vendor_block/datatables-responsive/dataTables.responsive.css',
'../dist/css/sb-admin-2.css',
'../vendor_block/font-awesome/css/font-awesome.min.css','./servicedetail.component.css'],
  providers: [ProviderService]
})
export class ServicedetailComponent implements OnInit {

  provider : Provider;
  private errorMessage;
  private sub;
  private id;
  private allAssets;

  constructor(public providerService: ProviderService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.sub=this._Activatedroute.paramMap.subscribe(params => {       
      this.id = params.get('id'); 
      this.loadProviderService(this.id);
   });
  }

  loadProviderService(id): any{
    const tempList = [];
    return this.providerService.getparticipant(id).toPromise()
    .then((result) => {
      this.errorMessage = null;     
      result.listServiceStat.forEach(item => {
        tempList.push(item);
      });
      this.allAssets = tempList;
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

}
