import { PrefixedHexString, ValidTypes } from 'web3-core-types/src/types';

type JsonAccessListItem = { address: PrefixedHexString; storageKeys: string[] };

export interface EthTxBase {
    nonce?: ValidTypes;
    to?: PrefixedHexString;
    data?: PrefixedHexString;
    v?: ValidTypes;
    r?: PrefixedHexString;
    s?: PrefixedHexString;
    value?: ValidTypes;
    chainId?: ValidTypes;
    gasLimit?: ValidTypes;
}

export interface EthTxLegacy extends EthTxBase {
    gasPrice?: ValidTypes;
}

export interface EthTxEip2930 extends EthTxLegacy {
    accessList?: JsonAccessListItem[];
    type?: ValidTypes;
}

export interface EthTxEip1559 extends EthTxEip2930 {
    gasPrice?: never;
    maxPriorityFeePerGas?: ValidTypes;
    maxFeePerGas?: ValidTypes;
}

export interface EthTxOptions {
    fillProperties?: false
}

export interface EthTxNormalized {
    nonce?: ValidTypes;
    to?: PrefixedHexString;
    data?: PrefixedHexString;
    v?: ValidTypes;
    r?: PrefixedHexString;
    s?: PrefixedHexString;
    value?: ValidTypes;
    chainId?: ValidTypes;
    gasLimit?: ValidTypes;
    gasPrice?: ValidTypes;
    accessList?: JsonAccessListItem[];
    type?: ValidTypes;
    maxPriorityFeePerGas?: ValidTypes;
    maxFeePerGas?: ValidTypes;
}
