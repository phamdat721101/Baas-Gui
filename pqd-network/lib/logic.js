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

/**
 * Sample transaction
 * @param {org.namespace.pqd.Trade} Trade
 * @transaction
 */
async function tradeCommodity(trade) {
    trade.commodity.owner = trade.newOwner;
    let assetRegistry = await getAssetRegistry('org.namespace.pqd.Commodity');
    await assetRegistry.update(trade.commodity);
}
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

async function identityIssue() {
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@pqd-network');
        let result = await businessNetworkConnection.issueIdentity('org.namespace.pqd.Trader#trader1', 'pqd1')
        console.log(`userID = ${result.userID}`);
        console.log(`userSecret = ${result.userSecret}`);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

identityIssue();

