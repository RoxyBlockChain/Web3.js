import { Web3Error, Web3PackageErrorConfig } from 'web3-core-logger/src/types';
import packageVersion from './_version';

export enum Web3EthTxErrorNames {
    noWeb3Provider = 'noWeb3Provider',
    invalidTxEip1559 = 'invalidTxEip1559',
}

interface Web3EthTxErrorsConfig extends Web3PackageErrorConfig {
    errors: Record<Web3EthTxErrorNames, Web3Error>;
}

export const Web3EthTxErrorsConfig: Web3EthTxErrorsConfig = {
    packageName: 'web3-eth-tx',
    packageVersion,
    errors: {
        noWeb3Provider: {
            code: 1,
            name: 'noWeb3Provider',
            msg: 'No Web3Provider was provided',
        },
        invalidTxEip1559: {
            code: 2,
            name: 'invalidTxEip1559',
            msg: 'Provided transaction data does not satisfy requirements of EIP-1559 transactions',
        },
    },
};
