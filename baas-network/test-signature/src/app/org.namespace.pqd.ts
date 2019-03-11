import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.namespace.pqd{
   export enum contractState {
      WAITING_SIGNATURES,
      COMPLETE,
   }
   export class contract extends Asset {
      assetId: string;
      documentHash: string;
      creator: Provider;
      signator: Customer;
      creatorSigned: boolean;
      signatorSigned: boolean;
      state: contractState;
   }
   export abstract class ledgerTransaction extends Transaction {
      Contract: contract;
   }
   export class signContract extends ledgerTransaction {
   }
   export class completeSignOff extends ledgerTransaction {
   }
   export class CommodityCustomer extends Asset {
      tradingSymbol: string;
      description: string;
      mainExchange: string;
      quantity: number;
      owner: Customer;
   }
   export class CommodityProvider extends Asset {
      tradingSymbol: string;
      description: string;
      mainExchange: string;
      quantity: number;
      owner: Provider;
   }
   export class Vendor extends Participant {
      venId: string;
      username: string;
      password: string;
   }
   export class Trade extends Transaction {
      data: CommodityProvider;
      owner: Customer;
   }
   export class Provider extends Participant {
      proId: string;
      username: string;
      password: string;
   }
   export class Customer extends Participant {
      cuId: string;
      username: string;
      password: string;
   }
   export class contractSignedNotification extends Event {
      Contract: contract;
      SignerP: Provider;
      SignerC: Customer;
   }
   export class contractCompletedNotification extends Event {
      Contract: contract;
   }
// }
