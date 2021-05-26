import { ProviderOptions } from 'web3-providers-base/types';

import Web3ProvidersWs from '../../src/index';

jest.mock('ws');

describe('constructs a Web3ProvidersWs instance with expected properties', () => {
    const providerOptions: ProviderOptions = {
        providerUrl: 'ws://127.0.0.1:8545',
    };

    let web3ProvidersWsCreateClientSpy: jest.SpyInstance;

    beforeEach(() => {
        web3ProvidersWsCreateClientSpy = jest.spyOn(
            Web3ProvidersWs,
            'createWebSocketClient'
        );
    });

    it('providerOptions', () => {
        const web3ProvidersHttp = new Web3ProvidersWs(providerOptions);
        expect(web3ProvidersHttp).toMatchObject(providerOptions);
        expect(web3ProvidersWsCreateClientSpy).toHaveBeenCalledTimes(1);
    });
});
