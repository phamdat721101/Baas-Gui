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
import { contract } from '../org.namespace.pqd';
import { signContract } from '../org.namespace.pqd';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class contractService {

  private NAMESPACE = 'contract';
  private NAMESPACE1 = 'signContract';

  constructor(private dataService: DataService<any>) {
  };

  public getAll(): Observable<contract[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<contract> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<contract> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<contract> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<contract> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

  public getTransaction(id: any): Observable<signContract> {
    return this.dataService.getSingle(this.NAMESPACE1, id);
  }

  public addTransaction(itemToAdd: any): Observable<signContract> {
    return this.dataService.add(this.NAMESPACE1, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<signContract> {
    return this.dataService.update(this.NAMESPACE1, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<signContract> {
    return this.dataService.delete(this.NAMESPACE1, id);
  }

}
