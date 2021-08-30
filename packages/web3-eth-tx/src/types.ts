import {
    IWeb3Provider,
    PrefixedHexString,
    ValidTypes,
} from 'web3-core-types/src/types';

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
    dontFillProperties?: true;
    web3Provider?: IWeb3Provider;
}

export interface EthTxNormalized {
    nonce?: PrefixedHexString;
    to?: PrefixedHexString;
    data?: PrefixedHexString;
    v?: PrefixedHexString;
    r?: PrefixedHexString;
    s?: PrefixedHexString;
    value?: PrefixedHexString;
    chainId?: PrefixedHexString;
    gasLimit?: PrefixedHexString;
    gasPrice?: PrefixedHexString;
    accessList?: JsonAccessListItem[];
    type?: PrefixedHexString;
    maxPriorityFeePerGas?: PrefixedHexString;
    maxFeePerGas?: PrefixedHexString;
}
