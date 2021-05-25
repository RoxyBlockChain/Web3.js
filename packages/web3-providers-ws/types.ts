import { IWeb3Provider, BaseRpcOptions } from 'web3-providers-base/types';

export interface IWeb3ProviderWs extends IWeb3Provider {
    reset: (params: any) => any;
    disconnect: () => void;
    reconnect: () => void;
}

export interface SubscriptionOptions extends BaseRpcOptions {}
