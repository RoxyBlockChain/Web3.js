import { formatOutputObject } from 'web3-utils';
import { ValidTypesEnum } from 'web3-core-types/src/types';
import { TransactionFactory } from '@ethereumjs/tx';

import { EthTxEip1559, EthTxEip2930, EthTxLegacy, EthTxNormalized, EthTxOptions } from './types';
import { PrefixedHexString } from '../../web3-core-types/lib/types';

export function initEthTx(
    txData: EthTxLegacy | EthTxEip2930 | EthTxEip1559,
    options?: EthTxOptions
) {
    try {
        const normalizedTxData = formatOutputObject(
            txData,
            [
                'nonce',
                'v',
                'value',
                'chainId',
                'gasLimit',
                'gasPrice',
                'type',
                'maxPriorityFeePerGas',
                'maxFeePerGas',
            ],
            ValidTypesEnum.PrefixedHexString
        );

        let modifiedTxData = normalizedTxData;
        if (normalizedTxData.type === undefined)
            modifiedTxData.type = determineTxType(normalizedTxData);
    } catch (error) {
        throw error;
    }
}

function determineTxType(txData: EthTxNormalized): PrefixedHexString {
    
}
