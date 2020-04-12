import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';       

export enum contractState {
    WAITING_PAYMENT,
    COMPLETE_PAYMENT,
}
export class serviceStat {
    serviceId: string;
    successCount: number;
    totalCount: number;
}
export class locationService {
    province: string;
    district: string;
    address: string;
}
export class contract extends Asset {
    assetId: string;
    serviceId: string;
    documentHash: string[];
    timeState: string;
    dataStandard: string;
    timeTicket: Date[];
    creator: Provider;
    signator: Customer;
    state: contractState;
    location: locationService;
    description: string;
    dayStart: string;
    dayEnd: string;
    time: number;
    price: number;
    rateSuccessContract: number;
    rateSuccess: number;
    N: number;
    M: number;
}
export abstract class ledgerTransaction extends Transaction {
    Contract: contract;
}
export class commentService extends ledgerTransaction {
    comment: string;
}
export class evaluateData extends ledgerTransaction {
}
export class updateVoting extends Transaction {
    Contract: contract;
    isSuccessData: boolean;
}
export class signContract extends ledgerTransaction {
    dataHash: string;
}
export class payment extends ledgerTransaction {
    fee: number;
}
export class Provider extends Participant {
    proId: string;
    username: string;
    password: string;
    successDataCount: number;
    allSendDataCount: number;
    ratingProvider: number;
    listServiceStat: serviceStat[];
}
export class updateServiceStat extends Transaction {
    Contract: contract;
    provider: Provider;
    isSuccessData: boolean;
}
export class Customer extends Participant {
    cuId: string;
    username: string;
    password: string;
}