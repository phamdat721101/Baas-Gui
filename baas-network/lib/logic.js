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
    // if(!me){
    //     throw new Error('The participant does not exist');
    // }
    // if(theContract.state != 'WAITING_SIGNATURES'){
    //     console.log('It cannot be signed')
    // }else{
    //     if(sign.Contract.creator.getIdentifier() == me.getIdentifier()){
    //         if(theContract.creatorSigned){
    //             console.log('It was already be signed')
    //         }else{
    //             theContract.creatorSigned = true;
    //         }
    //     }else if(theContract.signator.getIdentifier() == me.getIdentifier()){
    //         if(theContract.signatorSigned){
    //             console.log('It was already be signed')
    //         }else{
    //             theContract.signatorSigned = true;
    //         }
    //     }
    // }
    // if(theContract.creatorSigned == true && theContract.signatorSigned == true){
    //     theContract.state = 'COMPLETE';
    // }
  	theContract.documentHash.push(sign.transactionId);
    const contractRegistry = await getAssetRegistry('org.namespace.pqd.contract');
    await  contractRegistry.update(theContract);
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


/**
 * Sample transaction
 * @param {org.namespace.pqd.updateServiceStat} update
 * @transaction
 */
async function updateServiceStat(tx) {
	const assetRegistry = await getAssetRegistry('org.namespace.pqd.contract');
    const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
 	const provider = await providerRegistry.get(tx.Contract.creator.getIdentifier());
    var index;
    var isExistId = false;
    if(provider.listServiceStat.length === 0) {
        var factory = getFactory();
        var newService = factory.newConcept('org.namespace.pqd', 'serviceStat');
        newService.serviceId = tx.Contract.serviceId;
        newService.totalCount = 1;
        if(tx.isSuccessData === true) {
            newService.successCount = 1;
        }
        else {
            newService.successCount = 0;
        }
        provider.listServiceStat.push(newService);
        await providerRegistry.update(provider);
    }
    else {
        for(index = 0; index < provider.listServiceStat.length; index++) {
            if(provider.listServiceStat[index].serviceId === tx.Contract.serviceId) {
                isExistId = true;
                provider.listServiceStat[index].totalCount = provider.listServiceStat[index].totalCount + 1;
                if(tx.isSuccessData === true) {
                    provider.listServiceStat[index].successCount =  provider.listServiceStat[index].successCount +1;
                }
                await providerRegistry.update(provider);
                return;
            }
        }
        if(isExistId === false) {
            var factory = getFactory();
            var newService = factory.newConcept('org.namespace.pqd', 'serviceStat');
            newService.serviceId = tx.Contract.serviceId;
            newService.totalCount = 1;
            if(tx.isSuccessData === true) {
                newService.successCount = 1;
            }
            else {
                newService.successCount = 0;
            }
            provider.listServiceStat.push(newService);
            await providerRegistry.update(provider);
        }

    }
}

/**
 * Sample transaction
 * @param {org.namespace.pqd.pernaltySLA} pernalty
 * @transaction
 */
async function pernaltySLA(tx) {
	const assetRegistry = await getAssetRegistry('org.namespace.pqd.contract');
    const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
 	const provider = await providerRegistry.get(tx.Contract.creator.getIdentifier());
	
  	for(index = 0; index < provider.ruleSLAService.length; index++) {
      	if(tx.Contract.serviceId  === provider.ruleSLAService[index].serviceID) {
          if(tx.contract.rateSuccess < provider.ruleSLAService[index].ruleQuality.rule99 && tx.contract.rateSuccess >= provider.ruleSLAService[index].ruleQuality.rule95) {
            
          }
          if(tx.contract.rateSuccess < provider.ruleSLAService[index].ruleQuality.rule95 && tx.contract.rateSuccess >= provider.ruleSLAService[index].ruleQuality.rule90) {
            
          }
          if(tx.contract.rateSuccess < provider.ruleSLAService[index].ruleQuality.rule90) {
            
          }
        }
    }
}