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

'use strict';
/**
 * Write your transction processor functions here
 */


/** Trade a marble to a new player
 * @param  {org.sample.updateInforSeller} tx
 * @transaction
 */
async function updateInforSeller(tx) {
  let businessNetworkConnection = new BusinessNetworkConnection();
  tx.provider.name = tx.newName;
  tx.provider.signature = tx.newSignature;
  const assetRegistry = await getAssetRegistry('org.sample.Provider');
  await assetRegistry.update(tx.provider);
}
/** Trade a marble to a new player
 * @param  {org.sample.updateInforBuyer} tx
 * @transaction
 */
async function updateInforBuyer(tx) {
  tx.customer.name = tx.newName;
  tx.customer.signature = tx.newSignature;
  const assetRegistry = await getAssetRegistry('org.sample.Customer');
  await assetRegistry.update(tx.customer);
}

/** Trade a marble to a new player
 * @param  {org.sample.updateContract} tx
 * @transaction
 */
async function updateContract(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldId = tx.contract.serviceId;
    
    // Update the asset with the new value.
    tx.contract.serviceId = tx.newServiceId;
    tx.contract.price = tx.newPrice;
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.sample.Contract');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.contract);
}


/** Trade a marble to a new player
 * @param  {org.sample.CreateDataLog} tx 
 * @transaction
 */
async function CreateDataLog(tx) {  // eslint-disable-line no-unused-vars

}
const ParticipantAdd = require('composer-cli').Participant.Add;

let options = {
  card: 'admin@tutorial-network',
  data: '{"$class":"org.sample.Customer","CustomerId":"cu1","name":"cu1","signature":"Smith"}'
};

ParticipantAdd.handler(options);
