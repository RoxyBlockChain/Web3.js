import { IWeb3Provider, BaseRpcOptions } from 'web3-providers-base/types';
import { EventEmitter } from 'events';

export interface IWeb3ProviderHttp extends IWeb3Provider {
    subscribe: (options: BaseRpcOptions) => {
        eventEmitter: EventEmitter;
        subscriptionId: number;
    };
    unsubscribe: (eventEmitter: EventEmitter, subscriptionId: number) => void;
}

export interface SubscriptionOptions extends BaseRpcOptions {
    milisecondsBetweenRequests?: number;
}
