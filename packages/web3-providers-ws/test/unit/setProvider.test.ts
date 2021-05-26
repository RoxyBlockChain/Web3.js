import { ProviderOptions } from 'web3-providers-base/types';

import Web3ProvidersWs from '../../src/index';

jest.mock('ws');

describe('Web3ProvidersWs.setProvider', () => {
    const updatedProviderUrl = 'ws://foo.bar';

    let providerOptions: ProviderOptions;
    let web3ProvidersWsCreateClientSpy: jest.SpyInstance;

    beforeEach(() => {
        providerOptions = {
            providerUrl: 'ws://127.0.0.1:8545',
        };

        web3ProvidersWsCreateClientSpy = jest.spyOn(
            Web3ProvidersWs,
            'createWebSocketClient'
        );
    });

    it('should update the provider with updatedProviderUrl', () => {
        const web3ProvidersWs = new Web3ProvidersWs(providerOptions);
        expect(web3ProvidersWs).toMatchObject(providerOptions); // Sanity
        web3ProvidersWs.setProvider(updatedProviderUrl);
        expect(web3ProvidersWsCreateClientSpy).toHaveBeenCalledTimes(2);
    });

    it('should error because provider string is invalid', () => {
        const web3ProvidersWs = new Web3ProvidersWs(providerOptions);
        expect(web3ProvidersWs).toMatchObject(providerOptions); // Sanity
        expect(() => {
            web3ProvidersWs.setProvider('foobar');
            expect(web3ProvidersWsCreateClientSpy).toHaveBeenCalledTimes(1);
        }).toThrowError(
            'Failed to create WebSocket client: Invalid WS(S) URL provided'
        );
    });
});
