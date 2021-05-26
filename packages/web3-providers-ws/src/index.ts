import Web3ProviderBase from 'web3-providers-base';
import { ProviderOptions, BaseRpcOptions } from 'web3-providers-base/types';
import WebSocket from 'isomorphic-ws';

import { IWeb3ProviderWs, WebSocketStates } from '../types';

export default class Web3ProvidersWs
    extends Web3ProviderBase
    implements IWeb3ProviderWs
{
    private _webSocketClient: WebSocket;

    constructor(options: ProviderOptions) {
        super(options);
        this._webSocketClient = Web3ProvidersWs.createWebSocketClient(
            options.providerUrl
        );
    }

    static validateProviderUrl(providerUrl: string): boolean {
        try {
            return (
                typeof providerUrl !== 'string' ||
                /^ws(s)?:\/\//i.test(providerUrl)
            );
        } catch (error) {
            throw Error(`Failed to validate provider string: ${error.message}`);
        }
    }

    static createWebSocketClient(baseUrl: string): WebSocket {
        try {
            if (!Web3ProvidersWs.validateProviderUrl(baseUrl))
                throw Error('Invalid WS(S) URL provided');
            return new WebSocket(baseUrl);
        } catch (error) {
            throw Error(`Failed to create WebSocket client: ${error.message}`);
        }
    }

    setProvider(providerUrl: string) {
        try {
            this._webSocketClient =
                Web3ProvidersWs.createWebSocketClient(providerUrl);
            super.providerUrl = providerUrl;
        } catch (error) {
            throw Error(`Failed to set provider: ${error.message}`);
        }
    }

    supportsSubscriptions() {
        return true;
    }

    // async reconnect() {
    //     try {
    //         if (
    //             this._webSocketClient === undefined ||
    //             this._webSocketClient.readyState === WebSocketStates.CLOSED
    //         )
    //             this._webSocketClient = await Web3ProvidersWs.createWebSocketClient(
    //                 super.providerUrl
    //             );
    //     } catch (error) {
    //         throw Error(`Failed to connect WebSocket: ${error.message}`);
    //     }
    // }

    async send(options: BaseRpcOptions) {
        try {
            if (this._webSocketClient === undefined)
                throw Error('No WebSocket client initiliazed');
            switch (this._webSocketClient.readyState) {
                case WebSocketStates.CONNECTING:
                    // TODO Add request to queue, then submit when ready
                    break;
                case WebSocketStates.OPEN:
                    this._webSocketClient.send(
                        JSON.stringify({
                            id:
                                options.id ||
                                Math.floor(
                                    Math.random() * Number.MAX_SAFE_INTEGER
                                ), // generate random integer
                            jsonrpc: options.jsonrpc || '2.0',
                            method: options.method,
                            params: options.params,
                        })
                    );
                    break;
                case WebSocketStates.CLOSING:
                    // TODO Add request to queue, then try to reconnect?
                    break;
                case WebSocketStates.CLOSED:
                    // TODO Add request to queue, then try to reconnect?
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw Error(`Error sending: ${error.message}`);
        }
    }

    // subscribe(options: SubscriptionOptions): {
    //     eventEmitter: EventEmitter;
    //     subscriptionId: number;
    // } {
    //     try {
    //         if (this._webSocketClient === undefined)
    //             throw Error('No HTTP client initiliazed');
    //         const eventEmitter = new EventEmitter();
    //         const subscriptionId = Math.floor(
    //             Math.random() * Number.MAX_SAFE_INTEGER
    //         ); // generate random integer
    //         this._subscribe(options, eventEmitter, subscriptionId);
    //         return { eventEmitter, subscriptionId };
    //     } catch (error) {
    //         throw Error(`Error subscribing: ${error.message}`);
    //     }
    // }

    // private async _subscribe(
    //     options: SubscriptionOptions,
    //     eventEmitter: EventEmitter,
    //     subscriptionId: number
    // ) {
    //     try {
    //         const response = await this.send(options);
    //         eventEmitter.emit('response', response);
    //         this._subscriptions[subscriptionId] = setTimeout(
    //             () => this._subscribe(options, eventEmitter, subscriptionId),
    //             options.milisecondsBetweenRequests || 1000
    //         );
    //     } catch (error) {
    //         throw Error(`Error subscribing: ${error.message}`);
    //     }
    // }

    // unsubscribe(eventEmitter: EventEmitter, subscriptionId: number) {
    //     try {
    //         if (!this._subscriptions[subscriptionId])
    //             throw Error(
    //                 `Subscription with id: ${subscriptionId} does not exist`
    //             );
    //         clearTimeout(this._subscriptions[subscriptionId]);
    //         eventEmitter.emit('unsubscribed');
    //         delete this._subscriptions[subscriptionId];
    //     } catch (error) {
    //         throw Error(`Error unsubscribing: ${error.message}`);
    //     }
    // }
}
