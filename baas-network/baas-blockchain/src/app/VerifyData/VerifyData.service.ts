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

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../Service/auth.service';
import { Customer } from '../org.namespace.pqd';
import { Provider } from '../org.namespace.pqd';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LoginService {

  private NAMESPACE_CUSTOMER = 'Customer';

  private NAMESPACE_PROVIDER = 'Provider';

  constructor(private dataService1: DataService<Customer>,  
  private dataService3: DataService<Provider>,
  private auth: AuthService){
  };  
  public getCustomer(id: any){
    return this.dataService1.getSingle(this.NAMESPACE_CUSTOMER, id);
  }
  public getProvider(id: any){
    return this.dataService3.getSingle(this.NAMESPACE_PROVIDER, id);
  }
  public getparticipant(id: any, role: any){
  }
}
