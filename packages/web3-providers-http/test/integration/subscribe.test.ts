import { ProviderOptions, RpcOptions } from 'web3-providers-base/types';

import Web3ProvidersHttp from '../../src/index';
import { HttpOptions } from '../../types';

describe('Web3ProvidersHttp.subscribe', () => {
    const providerOptions: ProviderOptions = {
        providerUrl: 'http://127.0.0.1:8545',
    };
    const rpcOptions: RpcOptions = {
        id: 42,
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
    };
    const httpOptions: HttpOptions = {
        subscriptionOptions: {
            milisecondsBetweenRequests: 1000,
        },
    };
    const expectedResult = {
        id: rpcOptions.id,
        jsonrpc: rpcOptions.jsonrpc,
        result: '0x0',
    };
    const expectedNumResponses = 2;

    let web3ProvidersHttp: Web3ProvidersHttp;

    beforeAll(() => {
        web3ProvidersHttp = new Web3ProvidersHttp(providerOptions);
    });

    it('should receive expectedNumResponses', async (done) => {
        const responses: any[] = [];
        const { eventEmitter, subscriptionId } =
            await web3ProvidersHttp.subscribe(rpcOptions, httpOptions);
        eventEmitter.on('response', (response) => {
            expect(response).toMatchObject(expectedResult);
            responses.push(response);
        });
        setTimeout(() => {
            web3ProvidersHttp.unsubscribe(eventEmitter, subscriptionId);
            expect(responses.length).toBe(expectedNumResponses);
            done();
        }, expectedNumResponses * httpOptions.subscriptionOptions.milisecondsBetweenRequests);
    });
});
