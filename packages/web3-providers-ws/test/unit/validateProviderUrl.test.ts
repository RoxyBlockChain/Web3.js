import Web3ProvidersWs from '../../src/index';

describe('Web3ProvidersWs.validateProviderUrl', () => {
    it('should return true', () => {
        const providerUrl = 'ws://localhost:8545';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(true);
    });

    it('should return true', () => {
        const providerUrl = 'ws://localhost';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(true);
    });

    it('should return true', () => {
        const providerUrl = 'ws://localhost.com';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(true);
    });

    it('should return true', () => {
        const providerUrl = 'wss://localhost';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(true);
    });

    it('should return false', () => {
        const providerUrl = 'localhost.com';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(false);
    });

    it('should return false', () => {
        const providerUrl = 'email@foo.com';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(false);
    });

    it('should return false', () => {
        const providerUrl = 'htp://localhost';
        expect(Web3ProvidersWs.validateProviderUrl(providerUrl)).toBe(false);
    });
});
