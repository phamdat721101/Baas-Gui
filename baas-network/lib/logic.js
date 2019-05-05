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
    if(theContract.creatorSigned == true && theContract.signatorSigned == true){
        theContract.state = 'COMPLETE';
    }
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
    const contractRegistry = await getAssetRegistry('org.namespace.pqd.contract');
    await contractRegistry.update(theContract);
}

/**
 * Sample transaction
 * @param {org.namespace.pqd.updateVoting} voting
 * @transaction
 */
async function updateVoting(tx) {  
    try {
        const assetRegistry = await getAssetRegistry('org.namespace.pqd.contract');
        const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
        //const me = getCurrentParticipant();
        //const theContract = sign.Contract;
        const provider = await providerRegistry.get(tx.Contract.creator.getIdentifier());        
        tx.Contract.N = tx.Contract.N + 1;
        if(tx.isSuccessData === true) {
            tx.Contract.M = tx.Contract.M + 1;
            provider.successDataCount = provider.successDataCount + 1;
        }
        tx.Contract.rateSuccess = tx.Contract.M / tx.Contract.N;
        provider.allSendDataCount = provider.allSendDataCount + 1;
        provider.ratingProvider = provider.successDataCount / provider.allSendDataCount;
        await assetRegistry.update(tx.Contract);
        await providerRegistry.update(provider);
    } catch(exception) {
        throw new Error(exception);
    }
}
