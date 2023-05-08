// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgGrant } from "./types/cosmos/authz/v1beta1/tx";
import { MsgExec } from "./types/cosmos/authz/v1beta1/tx";
import { MsgRevoke } from "./types/cosmos/authz/v1beta1/tx";

import { GenericAuthorization as typeGenericAuthorization} from "./types"
import { Grant as typeGrant} from "./types"
import { GrantAuthorization as typeGrantAuthorization} from "./types"
import { GrantQueueItem as typeGrantQueueItem} from "./types"
import { EventGrant as typeEventGrant} from "./types"
import { EventRevoke as typeEventRevoke} from "./types"

export { MsgGrant, MsgExec, MsgRevoke };

type sendMsgGrantParams = {
  value: MsgGrant,
  fee?: StdFee,
  memo?: string
};

type sendMsgExecParams = {
  value: MsgExec,
  fee?: StdFee,
  memo?: string
};

type sendMsgRevokeParams = {
  value: MsgRevoke,
  fee?: StdFee,
  memo?: string
};


type msgGrantParams = {
  value: MsgGrant,
};

type msgExecParams = {
  value: MsgExec,
};

type msgRevokeParams = {
  value: MsgRevoke,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgGrant({ value, fee, memo }: sendMsgGrantParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgGrant: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgGrant({ value: MsgGrant.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgGrant: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgExec({ value, fee, memo }: sendMsgExecParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgExec: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgExec({ value: MsgExec.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgExec: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgRevoke({ value, fee, memo }: sendMsgRevokeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgRevoke: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgRevoke({ value: MsgRevoke.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgRevoke: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgGrant({ value }: msgGrantParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.authz.v1beta1.MsgGrant", value: MsgGrant.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgGrant: Could not create message: ' + e.message)
			}
		},
		
		msgExec({ value }: msgExecParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.authz.v1beta1.MsgExec", value: MsgExec.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgExec: Could not create message: ' + e.message)
			}
		},
		
		msgRevoke({ value }: msgRevokeParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.authz.v1beta1.MsgRevoke", value: MsgRevoke.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgRevoke: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						GenericAuthorization: getStructure(typeGenericAuthorization.fromPartial({})),
						Grant: getStructure(typeGrant.fromPartial({})),
						GrantAuthorization: getStructure(typeGrantAuthorization.fromPartial({})),
						GrantQueueItem: getStructure(typeGrantQueueItem.fromPartial({})),
						EventGrant: getStructure(typeEventGrant.fromPartial({})),
						EventRevoke: getStructure(typeEventRevoke.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			CosmosAuthzV1Beta1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;