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
/**
 * A member signs a contract
 * @param {org.namespace.pqd.signContract} sign - the signature to be processed
 * @transaction
 */
async function signContract(sign){
    const me = getCurrentParticipant();
    const theContract = sign.Contract;
    if(!me){
        throw new Error('The participant does not exist');
    }
    if(theContract.state != 'WAITING_SIGNATURES'){
        console.log('It cannot be signed')
    }else{
        if(sign.Contract.creator.getIdentifier() == me.getIdentifier()){
            if(theContract.creatorSigned){
                console.log('It was already be signed')
            }else{
                theContract.creatorSigned = true;
            }
        }else if(theContract.signator.getIdentifier() == me.getIdentifier()){
            if(theContract.signatorSigned){
                console.log('It was already be signed')
            }else{
                theContract.signatorSigned = true;
            }
        }
    }
    // let signedNotification = getFactory().newEvent('org.namespace.pqd','contractSignedNotification');
    // signedNotification.Contract = theContract;
    // if(me.getIdentifier() == theContract.creator){
    //     signedNotification.SignerP = getCurrentParticipant();
    // }else{
    //     signedNotification.SignerC = getCurrentParticipant();
    // }
    // emit(signedNotification);
    const contractRegistry = await getAssetRegistry('org.namespace.pqd.contract');
    await  contractRegistry.update(theContract);
}
/**
 * A member signs a contract
 * @param {org.namespace.pqd.completeSignOff} sign - the signature to be processed
 * @transaction
 */
async function completeSignOff(complete){
    const me = getCurrentParticipant();
    const theContract = complete.Contract;
    if(!me){
        throw new Error('The participant does not exist')
    }
    if(theContract.state != 'WAITING_SIGNATURES'){
        console.log('It cannot be signed')
    }else{
        if(theContract.creator.getIdentifier() == me.getIdentifier()){
            if(theContract.creatorSigned && theContract.signatorSigned){
                theContract.state = 'COMPLETE';
            }else{
                console.log('Signoff cannot be completed');
            }
        }else{
            console.log('Signoff cannot be completed')
        }
    }
    let completedNotification = getFactory().newEvent('org.namespace.pqd','contractCompletedNotification')
    completedNotification.Contract = theContract;
    emit(completedNotification);
    const contractRegistry = await getAssetRegistry('org.namespace.pqd.contract');
    await contractRegistry.update(theContract);
}
