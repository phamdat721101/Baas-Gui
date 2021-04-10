/**
 * A member signs a contract
 * @param {org.namespace.pqd.sendData} sign - the signature to be processed
 * @transaction
 */
async function sendData(sign){
    const me = getCurrentParticipant();
  	//get contract info
    const theContract = sign.Contract;
    if(!me){
        throw new Error('The participant does not exist');
    }
  	theContract.documentHash.push(sign.transactionId);
    const contractRegistry = await getAssetRegistry('org.namespace.pqd.contract');
  	//update info of provider
  	//const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
 	//const provider = await providerRegistry.get(theContract.creator.getIdentifier());
    await  contractRegistry.update(theContract);
  	//await providerRegistry.update(provider);
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
        const provider = await providerRegistry.get(tx.Contract.creator.getIdentifier());  
      	//Update total count in sending data
      	tx.Contract.totalCount += 1
      	provider.allSendDataCount += 1
      	provider.listServiceStat.forEach(sid => {
        	sid.totalCountLv1 += 1
          	sid.listServiceAgreement.forEach(aid => {
            	aid.totalCountLv2 += 1
            })
        })
      	//update success count in sending data
        if(tx.isSuccessData === true) {
          	tx.Contract.successCount += 1
            provider.successDataCount = provider.successDataCount + 1;
            provider.listServiceStat.map(sid => {              
                if(sid.serviceId == tx.serviceId){
                    sid.successCountLv1 += 1
                    sid.listServiceAgreement.map(aid => {
                        if(aid.agreementID == tx.slaId){
                            aid.successCountLv2 += 1
                        }
                    })
                }
              })
        }
      	//update model
        tx.Contract.rateSuccess = tx.Contract.successCount / tx.Contract.totalCount;
        await assetRegistry.update(tx.Contract);
        provider.ratingProvider = provider.successDataCount / provider.allSendDataCount;
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
/*
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

*/

/**
 * A member signs a contract
 * @param {org.namespace.pqd.addService}  addService
 * @transaction
 */
async function addService(tx) {
  const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
  const provider = await providerRegistry.get(tx.provider.getIdentifier());    
  if (provider.listServiceStat.length === 0) {
    var factory = getFactory();
    var newService = factory.newConcept('org.namespace.pqd', 'serviceStat');
    newService.serviceId = tx.serviceId;
    newService.successCountLv1 = 0;
    newService.totalCountLv1 = 0;
    newService.satisfaction = 0;
    newService.listServiceAgreement = []
    provider.listServiceStat.push(newService);
    await providerRegistry.update(provider);
    return;
  }
  for (index = 0; index < provider.listServiceStat.length; index++) {
    if (provider.listServiceStat[index].serviceId === tx.serviceId) {
      throw new Error('The service existed');
      return;
    }
    else {
      var factory = getFactory();
      var newService = factory.newConcept('org.namespace.pqd', 'serviceStat');
      newService.serviceId = tx.serviceId;
      newService.successCountLv1 = 0;
      newService.totalCountLv1 = 0;
      newService.satisfaction = 0;
      newService.listServiceAgreement = []
      provider.listServiceStat.push(newService);
      await providerRegistry.update(provider);
      return;
    }
  }
}

/**
 * A member signs a contract
 * @param {org.namespace.pqd.addAgreement} addAgreement
 * @transaction
 */
async function addAgreement(tx) {
  const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
  const provider = await providerRegistry.get(tx.provider.getIdentifier());
  if (provider.listServiceStat.length === 0) {
    throw new Error('No service existed in this list');
    return;
  }
  for (index = 0; index < provider.listServiceStat.length; index++) {
    if (provider.listServiceStat[index].serviceId === tx.serviceID) {
      if (provider.listServiceStat[index].listServiceAgreement.length === 0) {
          var factory = getFactory();
          var newAgreement = factory.newConcept('org.namespace.pqd', 'serviceAgreement');
          newAgreement.agreementID = tx.agreementID;
          newAgreement.successCountLv2 = 0;
          newAgreement.totalCountLv2 = 0;
          newAgreement.agreementContent = tx.agreementContent
          newAgreement.ruleList = []
          provider.listServiceStat[index].listServiceAgreement.push(newAgreement);
          await providerRegistry.update(provider);
          return;
      }
      for (i = 0; i < provider.listServiceStat[index].listServiceAgreement.length; i++) {
        if (provider.listServiceStat[index].listServiceAgreement[i].agreementID === tx.agreementID) {
          throw new Error('The agreement existed');
          return;
        }
      }
      var factory = getFactory();
      var newAgreement = factory.newConcept('org.namespace.pqd', 'serviceAgreement');
      newAgreement.agreementID = tx.agreementID;
      newAgreement.successCountLv2 = 0;
      newAgreement.totalCountLv2 = 0;
      newAgreement.agreementContent = tx.agreementContent
      newAgreement.ruleList = []
      provider.listServiceStat[index].listServiceAgreement.push(newAgreement);
      await providerRegistry.update(provider);
      return;
    }
  }
  throw new Error('No service matchs input serviceID');
  return;
}

/**
 * A member signs a contract
 * @param {org.namespace.pqd.addRulePenalty} add rule penalty 
 * @transaction
 */

async function addRulePenalty(tx) {
  const providerRegistry = await getParticipantRegistry('org.namespace.pqd.Provider');
  const provider = await providerRegistry.get(tx.provider.getIdentifier());
  if (provider.listServiceStat.length === 0) {
    throw new Error('No service existed in this list');
    return;
  }
  for (index = 0; index < provider.listServiceStat.length; index++) {
    if (provider.listServiceStat[index].serviceId === tx.serviceID) {
      if (provider.listServiceStat[index].listServiceAgreement.length === 0) {
        throw new Error('No agreement existed in this list');
        return;
      }
      for (i = 0; i < provider.listServiceStat[index].listServiceAgreement.length; i++) {
        if (provider.listServiceStat[index].listServiceAgreement[i].agreementID === tx.agreementID) {
          if (provider.listServiceStat[index].listServiceAgreement[i].ruleList.length === 0) {
            //if rule list current empty, add new rule to this empty list
            var factory = getFactory();
      		var newRule = factory.newConcept('org.namespace.pqd', 'rulePenalty');
      		newRule.ruleID = tx.ruleID;
            newRule.ruleContent = tx.ruleContent;
            newRule.rule = tx.ruleInfor;
            newRule.totalCountLv3 = 0;
            newRule.successCountLv3 = 0;
            provider.listServiceStat[index].listServiceAgreement[i].ruleList.push(newRule);
      		await providerRegistry.update(provider);
      		return;
          }
          for (j = 0; j < provider.listServiceStat[index].listServiceAgreement[i].ruleList.length; j++) {
            if (provider.listServiceStat[index].listServiceAgreement[i].ruleList[j].ruleID === tx.ruleID) {
              throw new Error('The ruleID existed');
              return;
            }
          }
          var factory = getFactory();
          var newRule = factory.newConcept('org.namespace.pqd', 'rulePenalty');
      	  newRule.ruleID = tx.ruleID;
          newRule.ruleContent = tx.ruleContent;
          newRule.rule = tx.ruleInfor;
          newRule.totalCountLv3 = 0;
          newRule.successCountLv3 = 0;
          provider.listServiceStat[index].listServiceAgreement[i].ruleList.push(newRule);
          await providerRegistry.update(provider);
      	  return;
        }
        
      }
      throw new Error('No agreement matchs input agreementID');
      return;
    }
  }
  throw new Error('No service matchs input serviceID');
  return;
}

